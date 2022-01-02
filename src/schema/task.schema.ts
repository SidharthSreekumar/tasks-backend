import { boolean, number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Task name is required'
    }),
    description: string(),
    completionStatus: boolean({
      required_error: 'Completion status is required'
    }),
    priority: number({
      required_error: 'Priority value is required'
    })
  })
};

const params = {
  params: object({
    taskId: string({
      required_error: 'taskId is required'
    })
  })
};

export const createTaskSchema = object({
  ...payload
});

export const updateTaskSchema = object({
  ...payload,
  ...params
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
