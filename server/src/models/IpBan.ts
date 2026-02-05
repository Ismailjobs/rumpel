import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIpBan extends Document {
  ip: string;
  bannedUntil: Date;
  createdAt: Date;
}

const BAN_HOURS = 10;

const IpBanSchema = new Schema<IIpBan>(
  {
    ip: { type: String, required: true, unique: true },
    bannedUntil: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "ip_bans" }
);

export const IpBan: Model<IIpBan> =
  mongoose.models.IpBan ?? mongoose.model<IIpBan>("IpBan", IpBanSchema);

export function getBanDurationMs(): number {
  return BAN_HOURS * 60 * 60 * 1000;
}
