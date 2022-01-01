import { omit } from 'lodash';
import Task, { TaskInput } from '../models/task.model';
import { UserDocument } from '../models/user.model';

export async function createTask(userId: UserDocument['_id'], taskInput: TaskInput) {
  try {
    const task = await Task.create({ user: userId, ...taskInput });
    return omit(task.toJSON(), ['user', '_id', '__v']);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTasks(userId: UserDocument['_id']) {
  try {
    return await Task.find(
      {
        user: userId
      },
      {
        name: 1,
        description: 1,
        completionStatus: 1,
        createdAt: 1,
        updatedAt: 1,
        priority: 1,
        _id: 0
      }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}
