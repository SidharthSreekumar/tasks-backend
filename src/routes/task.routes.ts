import { Express, Request, Response } from 'express';
import { createTaskHandler, getTasksHandler } from '../controllers/task.controller';
import requireUser from '../middlewares/requireUser';
import validateResource from '../middlewares/validateResource';
import { createTaskSchema } from '../schema/task.schema';

function taskRoutes(app: Express) {
  app.post('/api/task', [validateResource(createTaskSchema), requireUser], createTaskHandler);
  app.get('/api/task', requireUser, getTasksHandler)
}

export default taskRoutes;
