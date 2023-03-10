//we now have the ability to swap out our queries for subscriptions
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { gql } from '@apollo/client';
import { GET_QUEUED_SONGS } from './queries';

const httpLink = createHttpLink({
  uri: 'https://creative-caiman-76.hasura.app/v1/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = 'uICuHOqKZ7P56wwn2cIKi02Sv4yN003YRHy1kD0nhls8OHLiCVMDOpg4OjGF6S4o';
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token
    }
  }
});
const wsLink = new WebSocketLink({
  uri: `wss://creative-caiman-76.hasura.app/v1/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    // connectionParams: {
    //   authToken: 'uICuHOqKZ7P56wwn2cIKi02Sv4yN003YRHy1kD0nhls8OHLiCVMDOpg4OjGF6S4o'
    // }
    connectionParams: {
      headers: {
        'x-hasura-access-key': 'uICuHOqKZ7P56wwn2cIKi02Sv4yN003YRHy1kD0nhls8OHLiCVMDOpg4OjGF6S4o'
      }
    }
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const typeDefs = gql`
  extend type Song {
    id: uuid!
    title: String!
    artist: String!
    thumbnail: String!
    duration: Float!
    url: String!
  }
 input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
  }
  extend type Query {
      queue: [Song]!
  }

  extend type Mutation {
    addOrRemoveFromQueue(input: SongInput!): [Song]!
  }
  `;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  typeDefs
});

 const data = {
  queue: []
}
client.writeQuery({
    query: GET_QUEUED_SONGS,
    data: { data }
  });
  console.log(data)
// console.log(writeQuery);
export default client;
