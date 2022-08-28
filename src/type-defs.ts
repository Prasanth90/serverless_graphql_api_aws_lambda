import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    testMessage: String!
  }
  type Mutation {
    add(name: String!): Entity!
  }
  type Entity {
    name: String!
  }
`;