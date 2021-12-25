import { Express } from 'express';
import { createUserHandler, deleteUserHandler, getUserHandler, updateUserHandler } from '../controllers/user.controller';

function userRoutes(app: Express) {
  app.post('/api/user', createUserHandler);

  app.get('/api/user/:username', getUserHandler);

  app.put('/api/user/:username', updateUserHandler);

  app.delete('/api/user/:username', deleteUserHandler);
}

export default userRoutes;
