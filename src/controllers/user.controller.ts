import { Request, Response } from 'express';
import { omit } from 'lodash';
import User, { UserInput } from '../models/user.model';
import { findAndDeleteUser, findAndUpdateUser, findUser } from '../services/user.service';
import log from '../utils/logger';

/**
 * Create user handler
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function createUserHandler(req: Request, res: Response) {
  const body = req.body as UserInput;
  try {
    const user = await User.create(body);
    res.send(omit(user.toJSON(), ['password', '_id', '__v']));
  } catch (error: any) {
    log.error(error);
    res.status(409).send('User creation failed! Username and Email should be unique');
  }
}

/**
 * Get user by username handler
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function getUserHandler(req: Request, res: Response) {
  const username: string = req.params.username;
  try {
    const user = await findUser({ username });
    res.send(omit(user, "_id"));
  } catch (error: any) {
    log.error(error);
    res.sendStatus(404);
  }
}

/**
 * Update user by username handler
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function updateUserHandler(req: Request, res: Response) {
  const username: string = req.params.username;
  const update = req.body;

  const user = await findUser({ username });

  if (!user) {
    return res.sendStatus(404);
  }

  const userUpdated = await findAndUpdateUser({ username }, update, { new: true, lean: true });
  return res.send(userUpdated);
}

/**
 * Delete user by username handler
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function deleteUserHandler(req: Request, res: Response) {
  const username: string = req.params.username;
  const user = await findUser({ username });
  if (!user) {
    return res.sendStatus(404);
  }
  await findAndDeleteUser({ username });
  return res.sendStatus(200);
}
