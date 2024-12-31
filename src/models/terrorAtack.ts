import { Document, Schema, model } from "mongoose";

export interface IAttack extends Document {
  eventid: number;
  iyear: number;
  imonth: number;
  iday: number;
  country_txt: string;
  region_txt: string;
  city: string;
  latitude: number;
  longitude: number;
  attacktype1_txt: string;
  targtype1_txt: string;
  target1: string;
  gname: string;
  weaptype1_txt: string;
  nkill: number | null;
  nwound: number | null;
  nperps: number | null;
  summary: string | null;
}
const AttackSchema = new Schema<IAttack>({
  eventid: { type: Number, unique: true },
  iyear: { type: Number },
  imonth: { type: Number },
  iday: { type: Number },
  country_txt: { type: String },
  region_txt: { type: String },
  city: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  attacktype1_txt: { type: String },
  targtype1_txt: { type: String },
  target1: { type: String },
  gname: { type: String },
  weaptype1_txt: { type: String },
  nkill: { type: Number, default: null },
  nwound: { type: Number, default: null },
  nperps: { type: Number, default: null },
  summary: { type: String, default: null },
});

AttackSchema.index({ region_txt: 1 });
AttackSchema.index({ attacktype1_txt: 1 });
AttackSchema.index({ nwound: 1 });
AttackSchema.index({ nkill: 1 });
AttackSchema.index({ iyear: 1 });
export default model<IAttack>("Attack", AttackSchema);
