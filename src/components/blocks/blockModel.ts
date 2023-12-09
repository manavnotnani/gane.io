import mongoose, { Schema } from "mongoose";
import * as connection from "../../config/connection/connection";

const blockSchema = new Schema({
  contract: { type: String, required: true },
  lastBlock: { type: Number, required: true },
  chainType: { type: String, required: true },
  cronInProcess: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});
var blocksModel = connection.db.model("blocks", blockSchema);

export default blocksModel;
