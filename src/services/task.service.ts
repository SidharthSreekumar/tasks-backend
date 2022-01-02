import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Task, { TaskDocument, TaskInput } from '../models/task.model';
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
        _id: 1
      }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findTaskById(
  taskId: TaskDocument['_id'],
  options: QueryOptions = { lean: true }
) {
  try {
    return await Task.findOne({ _id: taskId }, {}, options);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateTaskById(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions = {
    returnDocument: 'before',
    lean: true
  }
) {
  try {
    return Task.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteTaskById(query: FilterQuery<TaskDocument>) {
  try {
    return Task.deleteOne(query)
  } catch (error: any) {
    throw new Error(error);
  }
}
