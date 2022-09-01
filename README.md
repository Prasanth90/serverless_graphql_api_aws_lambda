## Deployment
- Currently deployed at https://serverless.staara.ca/graphql


## About

GraphQL Endpoint(s) to manage ping pong game results

## Enpoints

- Endpoint to create a new player (Provide Player details)
- Endpoint to store a new game result (Provide Player 1, Player 2, Winner)
- Endpoint to query all the players with their wins/losses
- Endpoint to query all the available players

## Build and Deploy
- serverless deploy

## Unit Tests
- npm run test

## Architecture

- User Serverless architecture (https://www.serverless.com/)
- Allows us to deploy direclty to AWS Lambda.
- DynamoDB is used for storage

## Queries Example

`query GetPlayers {
  players {
    firstName
    lastName
    playerId
  }
}`

`query GetPlayersWithStats {
  playersWithRank {
    wins
    losses
    playerId
    firstName
    lastName
  } 
}`

`mutation CreatePlayer {
  createPlayer(firstName: "Michael", lastName: "Scofield", country: "Fox River") {
    firstName
    lastName
    country
  }
}`

`mutation CreateResult {
  addMatchResult(playerOneId: "9aee555d-44e5-4b60-9b21-1715b26424a6", playerTwoId: "2f61ab71-d8b3-4325-befe-99481e2dee08", winnerId: "2f61ab71-d8b3-4325-befe-99481e2dee08") {
    playerOneId,
    playerTwoId,
    winnerId
  }
}`




**[LIVE DEMO](https://serverless.staara.ca/graphql)**
