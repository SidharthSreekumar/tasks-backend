import { Request, Response } from 'express';
import { CreateTaskInput } from '../schema/task.schema';
import { createTask, getTasks } from '../services/task.service';

export async function createTaskHandler(
  req: Request<never, never, CreateTaskInput['body']>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;
  try {
    const task = await createTask(userId, body);
    res.send(task);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getTasksHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const tasks = await getTasks(userId);
    res.send(tasks);
  } catch (error) {
    res.status(404).send('Fetch tasks operation failed.')
  }
}
