import type { Task } from "../types";

export type CreateTaskDto = Omit<Task, 'id'>;
export type UpdateTaskDto = {
  id: number;
  isDone: boolean;
};



export async function getTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks');

  if (!response.ok) {
    throw new Error(`Не удалось загрузить Задачи: ${response.status}`);
  }

  return response.json() as Promise<Task[]>;
}



export async function createTask(payload: CreateTaskDto): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Не удалось создать Задачу: ${response.status}`);
  }

  return response.json() as Promise<Task>;
}



export const updateTask = async (dto: UpdateTaskDto): Promise<Task> => {
  const response = await fetch(`/api/tasks/${dto.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isDone: dto.isDone }),
  });

  if (!response.ok) {
    throw new Error(`Не удалось создать Задачу: ${response.status}`);
  }

  return response.json();
};

