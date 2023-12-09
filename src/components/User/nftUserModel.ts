import { Schema } from "mongoose";
import * as connections from "../../config/connection/connection";


const NFTuserSchema: Schema = new Schema(
    {
        OrderId: {
        type: String,
        unique: true,
        trim: true,
      },
      TokenContract: String,
      TokenId: String,
      Price: String,
      isListed: Boolean,
      isBought: Boolean,
    },
    {
      collection: "nftUser",
      versionKey: false,
    }
  );

  export default connections.db.model<any>("NFTuserModel", NFTuserSchema);
