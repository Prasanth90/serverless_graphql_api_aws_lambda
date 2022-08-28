import { Entity } from "./types";
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
    Query: {
      testMessage: () => {
        return "Hello World!!"
      },
    },
    Mutation: {
      add : async (parent: any, input: Entity) => {
        const id = v4()
        const params : any = {
          TableName: process.env.ITEM_TABLE,
          Item: {
            itemId: id,
            name: input.name,
            score: 100
          },
        }
        await dynamoDb.put(params).promise();
        return {
          name: `${input.name} Added`
        };
      }
    }
  };