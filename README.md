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


**[LIVE DEMO](https://serverless.staara.ca/graphql)**
