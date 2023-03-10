import {  gql } from '@apollo/client';
//subscriptions change the data in real time
//Subscriptions are long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs. Most commonly, updated results are pushed from the server to subscribing clients. For example, a chat application's server might use a subscription to push newly received messages to all clients in a particular chat room.

// Because subscription updates are usually pushed by the server (instead of polled by the client), they usually use the WebSocket protocol instead of HTTP.

export const GET_SONGS = gql`
  subscription getSongs {
    songs(order_by: { created_at: desc }) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`;