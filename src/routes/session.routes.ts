import { Express } from 'express';
import {
  createUserSessionHandler,
  deleteAllSessionsHandler,
  deleteSessionHandler,
  getUserSessionHandler
} from '../controllers/session.controller';
import requireUser from '../middlewares/requireUser';

function sessionRoutes(app: Express) {
  app.post('/api/session', createUserSessionHandler);
  app.get('/api/session', requireUser, getUserSessionHandler);
  app.delete('/api/session', requireUser, deleteSessionHandler);
  app.delete('/api/all-session', requireUser, deleteAllSessionsHandler);
}

export default sessionRoutes;
