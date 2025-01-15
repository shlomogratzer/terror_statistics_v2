import GraphQLBigInt from "graphql-bigint";
import Attack from "../models/terrorAtack";
import {
  getAvgTerrorAttackByRegion,
  getTerrorAttackByCasualties,
} from "../service/analysisService";
import { log } from "console";

export const resolvers = {
  BigInt: GraphQLBigInt,
  Query: {
    getAvgTerrorAttackByRegion: async () => {
      const response = await getAvgTerrorAttackByRegion();
      return response;
    },

    getTerrorAttackByRegion: async (
      parent: any,
      args: { region_txt: string; skip?: number; limit?: number }
    ) => {
      const { region_txt, skip = 0, limit = 10 } = args;
      const response = await Attack.find({ region_txt })
        .skip(skip)
        .limit(limit);

      return response;
    },

    getContrys: async () => {
      const response = await Attack.distinct("country_txt");
      return response;
    },
    getContrysByRegion: async (parent: any, args: { region_txt: string }) => {
      const { region_txt } = args;
      const response = await Attack.distinct("country_txt", {
        region_txt,
      });
      return response;
    },

    getTerrorAttackByCountry: async (
      parent: any,
      args: {
        country_txt: string;
        skip: number;
        limit: number;
      }
    ) => {
      const { country_txt, skip, limit } = args;
      const response = await Attack.find({ country_txt })

        .skip(skip)
        .limit(limit);
      console.log(country_txt);

      console.log(response);
      return response;
    },
    getCitysByContry: async (parent: any, args: { country_txt: string }) => {
      const { country_txt } = args;
      const response = await Attack.distinct("city", { country_txt });
      console.log(country_txt);

      return response;
    },
    getTerrorAttackByCity: async (parent: any, args: { city: string }) => {
      const { city } = args;
      const response = await Attack.find({ city });
      return response;
    },
    getTerrorAttackByCasualties: async () => {
      const response = await getTerrorAttackByCasualties();
      console.log(response);

      return response;
    },
    getTerrorAttackByType: async (
      parent: any,
      args: { attacktype1_txt: string; skip?: number; limit?: number }
    ) => {
      const { attacktype1_txt, skip = 0, limit = 10 } = args;
      const tAttak = await Attack.find({ attacktype1_txt })
        .skip(skip)
        .limit(limit);
      return tAttak;
    },
  },
};
