import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task.schema';
import {
  createTask,
  deleteTaskById,
  findTaskById,
  getTasks,
  updateTaskById
} from '../services/task.service';

/**
 * Create user task handler
 * 
 * @param req Request Object with body of type CreateTaskInput
 * @param res Response Object
 * @returns Response
 */
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

/**
 * Get all user tasks handler
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns Response
 */
export async function getTasksHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const tasks = await getTasks(userId);
    res.send(tasks);
  } catch (error) {
    res.status(404).send('Fetch tasks operation failed.');
  }
}

/**
 * Update user task by id handler
 * 
 * @param req Request Object with params of type UpdateTaskInput
 * @param res Response Object
 * @returns Response
 */
export async function updateTaskHandler(req: Request<UpdateTaskInput['params']>, res: Response) {
  const userId = res.locals.user._id;
  const taskId = req.params.taskId;
  const body = req.body;
  try {
    const task = await findTaskById(taskId);
    if (!task) return res.sendStatus(404);
    if (String(task?.user) !== userId) return res.sendStatus(403);
    const result = await updateTaskById({ taskId }, body);
    res.send(omit(result, ['__v', 'user']));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

/**
 * Delete user task by id handler
 * 
 * @param req Request Object with params of type UpdateTaskInput
 * @param res Response Object
 * @returns Response
 */
export async function deleteTaskHandler(req: Request<UpdateTaskInput['params']>, res: Response) {
  const userId = res.locals.user._id;
  const taskId = req.params.taskId;
  try {
    const task = await findTaskById(taskId);
    if (!task) return res.sendStatus(404);
    if (String(task?.user) !== userId) return res.sendStatus(403);
    await deleteTaskById({ taskId });
    res.sendStatus(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
