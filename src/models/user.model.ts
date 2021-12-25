import mongoose from 'mongoose';
import validator from 'validator';

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document{
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
