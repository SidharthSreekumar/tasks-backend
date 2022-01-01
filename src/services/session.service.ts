import { get } from 'lodash';
import Session, { SessionDocument } from '../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { verifyJwt, signJwt } from '../utils/jwt';
import { findUser } from './user.service';
import log from '../utils/logger';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function updateManySessions(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateMany(query, update)
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken, 'refreshtoken');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await Session.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  return signJwt(
    { ...user, session: session._id },
    'accesstoken',
    { expiresIn: process.env.ACCESSTOKENTTL } // 15 minutes
  );
}
