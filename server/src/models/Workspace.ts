import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  inviteCode: string;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    inviteCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkspace>("Workspace", workspaceSchema);
