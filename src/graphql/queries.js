import { gql } from "@apollo/client";

export const GET_QUEUED_SONGS = gql `
query getQueuedSongs {
  queue @client {
    id
    duration @client
    title @client
    artist @client
    thumbnail @client
    url @client
  }
}
`;

