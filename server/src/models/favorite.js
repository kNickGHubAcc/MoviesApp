import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.js";


export default mongoose.model("Favorite", mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,     //Τύπος δεδομένων που αντιπροσωπεύει το Id ενός αντικειμένου στη βάση
      ref: "User",
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
    mediaRate: {
      type: Number,
      required: true
    },
  }, modelOptions)
);