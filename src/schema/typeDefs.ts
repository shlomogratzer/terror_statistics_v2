export const typeDefs = `#graphql
scalar BigInt
type IAttack {
    eventid: BigInt
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

type ICasualtiesByType{
  tAttak:[ISumCasualtie]
  amounts:Int
}
type ISumCasualtie {
  _id: String
  sumCasualties:Float
}
type ICasualtiesByRegion {
  amountsAttack: Int
  tAttak:[ICasualtieByRegion]
}
type ICasualtieByRegion {
  _id: String
  AverageCasualties: Float
  
}
type Query {
  getAllTerrorAttack: [IAttack]
  #region querys
  getAvgTerrorAttackByRegion:ICasualtiesByRegion
  getTerrorAttackByRegion(region_txt: String!, skip: Int, limit: Int): [IAttack]
  getTerrorAttackByCountry(country_txt: String!, skip: Int, limit: Int): [IAttack]
  getTerrorAttackByCity(city: String!, skip: Int, limit: Int): [IAttack]
  getCitysByContry(country_txt: String!): [String]
  getContrys: [String]
  getContrysByRegion(region_txt: String!): [String]
  #casualties by type attacks
  getTerrorAttackByCasualties: ICasualtiesByType
  getTerrorAttackByType(attacktype1_txt: String!, skip: Int, limit: Int): [IAttack]
  #casualties by groups
  getAttacksByGroups(gname: String!): [IAttack]
}
`;
