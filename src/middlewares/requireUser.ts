import { Request, Response, NextFunction } from "express";

/**
 * Middleware to make sure that user object is available in locals
 *
 * @param req Request Object
 * @param res Response Object
 * @param next Next Function
 * @returns Reponse
 */
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
