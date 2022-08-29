import { MatchResult, Player, PlayerStats } from "./types";
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
    Query: {
      players: async () => {
        return await getAllDocuments(process.env.PLAYERS_TABLE || '');
      },
      playersWithRank: async () => {
        return await getAllDocuments(process.env.RANK_TABLE || '');
      },
    },
    Mutation: {
      addMatchResult : async (parent: any, input: MatchResult) : Promise<MatchResult> => {   
        await updateMatchResults(input);
        await updateWinsLosses(input.playerOneId, input.playerOneId === input.winnerId);
        await updateWinsLosses(input.playerTwoId, input.playerTwoId === input.winnerId);
        return {
          playerOneId: input.playerOneId,
          playerTwoId: input.playerTwoId,
          winnerId: input.winnerId
        };
      },
      createPlayer : async (parent:any, input: Player) => {
        return await createPlayer(input);
      }
    }
  };

  const getAllDocuments = async (tableName: string) : Promise<any[]> => {
    const params: any = {
      TableName: tableName
    };

    const scanResults : any[] = [];
    let items;
    do {
      items =  await dynamoDb.scan(params).promise();
      if(items) {
        items.Items?.forEach((item : any) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
      }
    } while(items?.LastEvaluatedKey);
  
    return scanResults;
  }

  const createPlayer =async (player: Player) => {
    const id = v4()
    const params : any = {
      TableName: process.env.PLAYERS_TABLE,
      Item: {
        playerId: id,
        firstName: player.firstName,
        lastName: player.lastName,
        country: player.country
      },
    }

    const putItem = await dynamoDb.put(params).promise();

    if(!putItem.$response.error) {
      const getParams : any = {
        TableName: process.env.PLAYERS_TABLE,
        Key: {
          playerId: id,
        },
      }
  
      const createdItem = await dynamoDb.get(getParams).promise();
      return createdItem.Item
    }

    return {};
  }

  const getPlayer = async (playerId: string) => {
    const getParams : any = {
      TableName: process.env.PLAYERS_TABLE,
      Key: {
        playerId: playerId,
      },
    }
    const createdItem = await dynamoDb.get(getParams).promise();
    return createdItem.Item
  }

  const updateMatchResults = async (input: MatchResult) => {
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
      const playerInfo : any = await getPlayer(playerId);
      console.log(playerDetails, "Player details Not found, Inserting a new record", playerId, playerInfo);    
      const putParams : any = {
        TableName: process.env.RANK_TABLE,
        Item: {
          playerId: playerId,
          wins: isWon ? 1 : 0,
          losses: isWon ? 0 : 1,
          firstName: playerInfo.firstName,
          lastName: playerInfo.lastName
        },
      };
      await dynamoDb.put(putParams).promise();
    }
  }