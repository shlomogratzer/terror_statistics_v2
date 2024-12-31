export const typeDefs = `#graphql
type IAttack {
    eventid: Int
  iyear: Int
  imonth: Int
  iday: Int
  country_txt: String
  region_txt: String
  city: String
  latitude: Float
  longitude: Float
  attacktype1_txt: String
  targtype1_txt: String
  target1: String
  gname: String
  weaptype1_txt: String
  nkill: Float
  nwound: Float 
  nperps: Float 
  summary: String
}
type Query {
    getAllTerrorAttack: [IAttack]
  getAvgTerrorAttackByRegion: [IAttack]
  getTerrorAttackByCountry(country_txt: String!): [IAttack]
  getTerrorAttackByRegion(region_txt: String!): [IAttack]
  getTerrorAttackByCity(city: String!): [IAttack]
  getAttacksByGroups(gname: String!): [IAttack]
}
`;
