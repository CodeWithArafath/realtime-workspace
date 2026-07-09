import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  workspace: Types.ObjectId;
  channel: string;
  sender: Types.ObjectId;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    channel: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);