import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    players: [Player!]!
    playersWithRank: [PlayerStats!]!
  }
  type Mutation {
    addMatchResult(playerOneId: String!, playerTwoId: String!, winnerId: String!): MatchResult!
    createPlayer(firstName: String!, lastName: String!, country: String!): Player!
  }
  type MatchResult {
    playerOneId: String!
    playerTwoId: String!
    winnerId: String!
  }
  type Player {
    playerId: String!
    firstName: String!
    lastName: String!
    country: String!
  }
  type PlayerStats {
    firstName: String!
    lastName: String!
    playerId: String!
    wins: Int!
    losses: Int!
  }
`;