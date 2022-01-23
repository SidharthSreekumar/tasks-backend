import { omit } from 'lodash';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument, UserInput } from '../models/user.model';
import log from '../utils/logger';

/**
 * Create a new user.
 * @param {UserInput} input - UserInput - The input object that will be used to
create the user.
 * @returns The user object.
 */
export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return omit(user, ['password', '_id', '__v']);
  } catch (e: any) {
    throw new Error(e);
  }
}

/**
 * `findUser` is a function that finds a user by a query.
 * @param query - FilterQuery<UserDocument>
 * @param {QueryOptions} options - QueryOptions
 * @returns The user object, with the password and __v removed.
 */
export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const user = await User.findOne(query, {}, options);
    return omit(user, ['password', '__v']);
  } catch (error: any) {
    log.error(error.message);
    throw error;
  }
}

/**
 * Find a user by a query and update it with an update query.
 * @param query - FilterQuery<UserDocument>
 * @param update - UpdateQuery<UserDocument>
 * @param {QueryOptions} options - QueryOptions
 * @returns The user object with the updated fields.
 */
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

/**
 * Find a user by a query and delete it.
 * @param query - FilterQuery<UserDocument>
 * @returns A Promise that resolves to the number of documents deleted.
 */
export async function findAndDeleteUser(query: FilterQuery<UserDocument>) {
  try {
    return User.deleteOne(query);
  } catch (error: any) {
    log.error(error.message);
    throw error;
  }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return false;
    }
    log.info(user)
    const isValid: boolean = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), 'password');
  } catch (error) {
    throw new Error("User search failed");
  }
}
