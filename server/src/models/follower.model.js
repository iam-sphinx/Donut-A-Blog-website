import { Schema, model } from "mongoose";

const followerSchema = new Schema(
  {
    followTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Follower = model("Follower", followerSchema);
