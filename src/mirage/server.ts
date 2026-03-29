import { createServer, Model, Response } from "miragejs";
import type { Task } from "../types";

type TaskPayload = Omit<Task, "id">;

let nextTaskId = 1

export function makeServer() {
  return createServer({
    models: {
      task: Model,
    },

    seeds(server: any) {
      const seedTasks: Task[] = [];

      seedTasks.forEach((task) => server.create('task', task));
    },

    routes() {
      this.namespace = 'api';
      this.timing = 0;

      // GET /api/tasks -> отдает массив Задач
      this.get('/tasks', (schema: any) => {
        const records = schema.all('task').models;
        return records.map((record: any) => record.attrs as Task);
      });

      // POST /api/tasks {с телом запроса} -> добавляет Задачу с новым id
      this.post('/tasks', (schema: any, request: any) => {
        const payload = JSON.parse(request.requestBody) as TaskPayload;

        const newTask: Task = {id: nextTaskId++, ...payload };

        const record = schema.create('task', newTask);
        return record.attrs as Task;
      });

      // PATCH /api/tasks/:id {isDone, ...} -> обновляет задачу
      this.patch('/tasks/:id', (schema: any, request: any) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const task = schema.find('task', id);
        if (!task) {
          return new Response(404, {}, { error: 'Task not found' });
        }
        task.update(attrs);
        return task.attrs;
      });
    },
  });
}