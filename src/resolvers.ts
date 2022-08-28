import { Entity } from "./types";

export const resolvers = {
    Query: {
      testMessage: () => {
        return "Hello World!!"
      },
    },
    Mutation: {
      add : async (parent: any, input: Entity) => {
        return {
          name: `${input.name} Added`
        };
      }
    }
  };