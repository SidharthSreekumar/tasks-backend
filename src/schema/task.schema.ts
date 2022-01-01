import { boolean, number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Task name is required'
    }),
    description: string().min(120, 'Description should be at least 120 characters long'),
    completionStatus: boolean({
      required_error: 'Completion status is required'
    }),
    priority: number({
      required_error: 'Priority value is required'
    })
  })
};

export const createTaskSchema = object({
  ...payload
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
