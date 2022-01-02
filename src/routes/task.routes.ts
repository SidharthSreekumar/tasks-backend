import { Express } from 'express';
import { createTaskHandler, deleteTaskHandler, getTasksHandler, updateTaskHandler } from '../controllers/task.controller';
import requireUser from '../middlewares/requireUser';
import validateResource from '../middlewares/validateResource';
import { createTaskSchema, updateTaskSchema } from '../schema/task.schema';

function taskRoutes(app: Express) {
  app.post('/api/task', [validateResource(createTaskSchema), requireUser], createTaskHandler);
  app.get('/api/task', requireUser, getTasksHandler);
  app.put(
    '/api/task/:taskId',
    [validateResource(updateTaskSchema), requireUser],
    updateTaskHandler
  );
  app.delete('/api/task/:taskId', requireUser, deleteTaskHandler)
}

export default taskRoutes;
