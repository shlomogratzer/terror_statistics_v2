import Attack, { IAttack } from "../models/terrorAtack";
export const resolvers = {
  Query: {
    getAllTerrorAttack: async () => {
      const tAttak = await Attack.find();
      return tAttak;
    },
  },
};
