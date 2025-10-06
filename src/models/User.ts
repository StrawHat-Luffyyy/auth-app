import mongoose, { Model, Document, Schema } from "mongoose";

export interface IUSER extends Document {
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}

const UserSchema: Schema<IUSER> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

const User: Model<IUSER> = mongoose.models.User || mongoose.model<IUSER>('User', UserSchema)

export default User;