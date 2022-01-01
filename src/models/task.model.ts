import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface TaskInput {
  name: string;
  description: string;
  completionStatus: boolean;
  priority: number;
}

export interface TaskDocument extends TaskInput, mongoose.Document {
  user: UserDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    completionStatus: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Number,
      default: 0,
      validate(value: number) {
        if (![0, 1, 2].includes(value)) {
          throw new Error('Value should be one of these [0, 1, 2]');
        }
      }
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model<TaskDocument>('Task', taskSchema)

export default Task;
