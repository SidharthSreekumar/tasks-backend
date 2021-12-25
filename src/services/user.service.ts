import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument, UserInput } from '../models/user.model';
import log from '../utils/logger';

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return omit(user, ['password', '_id', '__v']);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const user = await User.findOne(query, {}, options);
    return omit(user, ['password', '_id', '__v']);
  } catch (error: any) {
    log.error(error.message);
    throw error;
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  try {
    const user = await User.findOneAndUpdate(query, update, options);
    return omit(user, ['password', '_id', '__v']);
  } catch (error: any) {
    log.error(error.message);
    throw error;
  }
}

export async function findAndDeleteUser(query:FilterQuery<UserDocument>) {
  try {
    return User.deleteOne(query);
  } catch (error: any) {
    log.error(error.message);
    throw error;
  }
}
