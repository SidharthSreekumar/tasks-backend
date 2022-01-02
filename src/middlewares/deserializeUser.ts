import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { reIssueAccessToken } from '../services/session.service';
/**
 * Middleware that verifies access token, decodes token payload
 * and returns new access token if expired.
 *
 * @param  req Request Object
 * @param res Response Object
 * @param next NextFunction
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  // Extracting access token from authorization header
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  // Extracting refresh token from x-refresh header
  const refreshToken = get(req, 'headers.x-refresh');
  if (!accessToken) {
    return next();
  }

  // Verifying token
  const { decoded, expired } = verifyJwt(accessToken, 'accesstoken');

  // If successfully decoded add user object to response locals
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // If access token is expired, return new one in x-access-token response header
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, 'accesstoken');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
