import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    testMessage: String!
  }
  type Mutation {
    add(name: String!, playerOneId: String!, playerTwoId: String!, winnerId: String!): Entity!
  }
  type Entity {
    name: String!
    playerOneId: String!
    playerTwoId: String!
    winnerId: String!
  }
`;