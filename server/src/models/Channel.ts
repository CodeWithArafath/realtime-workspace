import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChannel extends Document {
  name: string;
  workspace: Types.ObjectId;
  createdBy: Types.ObjectId;
}

const channelSchema = new Schema<IChannel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IChannel>("Channel", channelSchema);