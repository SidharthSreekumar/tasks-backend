import { Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateManySessions,
  updateSession
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt';

/**
 * Create user session handler
 *
 * @param req Request Object
 * @param res Response Object
 * @returns Response
 */
export async function createUserSessionHandler(req: Request, res: Response) {
  const user: any = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  const session = await createSession(user._id, req.get('user-agent') || '');

  // Creating access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    'accesstoken',
    { expiresIn: process.env.ACCESSTOKENTTL } // 15 minutes,
  );

  // Creating refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    'refreshtoken',
    { expiresIn: process.env.REFRESHTOKENTTL } // 15 minutes
  );

  return res.send({ accessToken, refreshToken });
}

/**
 * Get user session handler
 *
 * @param req Request Object
 * @param res Response Object
 * @returns Response
 */
export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

/**
 * Delete user session handler
 *
 * @param req Request Object
 * @param res Response Object
 * @returns Response
 */
export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null
  });
}

/**
 * Delete all user sessions handler
 *
 * @param req Request Object
 * @param res Response Object
 * @returns Response
 */
export async function deleteAllSessionsHandler(req: Request, res: Response) {
  const user = res.locals.user._id;
  await updateManySessions({ user }, { valid: false });
  return res.sendStatus(200);
}
