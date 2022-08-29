import { Entity } from "./types";
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { bool } from "aws-sdk/clients/signer";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
    Query: {
      testMessage: () => {
        return "Hello World!!"
      },
    },
    Mutation: {
      add : async (parent: any, input: Entity) => {
      
        await updateMatchResults(input);
        await updateWinsLosses(input.playerOneId, input.playerOneId === input.winnerId);
        await updateWinsLosses(input.playerTwoId, input.playerTwoId === input.winnerId);

        return {
          name: `${input.name} Added`
        };
      }
    }
  };

  const updateMatchResults = async (input: Entity) => {
    const id = v4()
        const params : any = {
          TableName: process.env.ITEM_TABLE,
          Item: {
            itemId: id,
            playerOneId: input.playerOneId,
            playerTwoId: input.playerTwoId,
            winner: input.winnerId,
            score: 100
          },
        }

    await dynamoDb.put(params).promise();
  }

  const updateWinsLosses = async (playerId: string, isWon: bool) => {
    const getParamsPlayer : any = {
      TableName: process.env.RANK_TABLE || '',
      Key: {
        playerId : playerId
      }
     };
     
    const playerDetails = await dynamoDb.get(getParamsPlayer).promise();
    
    if(playerDetails.Item) {
      console.log("Fetched item", playerDetails.Item);
      const params = {
        TableName: process.env.RANK_TABLE || '',
        Key: {
          playerId : playerId
        },
        UpdateExpression: "set wins = :x, losses = :y",
        ExpressionAttributeValues: {
            ":x": isWon ? playerDetails.Item.wins + 1 : playerDetails.Item.wins,
            ":y": isWon ? playerDetails.Item.losses : playerDetails.Item.losses + 1
        }
      };
      await dynamoDb.update(params).promise();
    }
    else {
      console.log(playerDetails, "Player details Not found, Inserting a new record", playerId);
      const putParams : any = {
        TableName: process.env.RANK_TABLE,
        Item: {
          playerId: playerId,
          wins: isWon ? 1 : 0,
          losses: isWon ? 0 : 1
        },
      };
      await dynamoDb.put(putParams).promise();
    }
  }