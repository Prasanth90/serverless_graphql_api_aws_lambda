import {describe, test} from '@jest/globals';
import * as resolvers from '../src/resolvers';
import { Player } from '../src/types';

describe('Resolver module', () => {
  test('Create new Player', async () => {
    const player: Player = {playerId: '1', lastName: 'abc', firstName: 'xyz', country: 'CAN'};
    const mockedDbPut: any = {
      put: () => {
        return {
          promise: async () => {
            return {
              $response: {

              }
            }
          }
        }
      },
      get: () => {
        return {
          promise: async () => {
            return {
              Item : player
            }
          }
        }
      },
    }
    jest.spyOn(resolvers, "dynamoDb").mockReturnValue(mockedDbPut);
    const result: any = await resolvers.createPlayer(player);
    expect(result.playerId).toBe(player.playerId);
  });
});