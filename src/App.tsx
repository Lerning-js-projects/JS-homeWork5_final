
import './App.css'
import { Typography } from '@mui/material'
import type { Task } from './types'


export const tasks: Task[] = [
  {
    id: 1,
    title: "Закончить вебинары по Python",
    description: "",
    priority: "normal",
    isDone: false,
  },
    {
    id: 2,
    title: "Сделать ДЗ 2 по модулю Java Script",
    description: "",
    priority: "high",
    isDone: true,
  },
    {
    id: 3,
    title: "Продумать, но не отрисовывать элементы для операций над задчами этого Задания",
    description: "",
    priority: "low",
    isDone: false,
  },
    {
    id: 4,
    title: "Сдать итоговое домашнее задание по Python",
    description: "",
    priority: "high",
    isDone: false,
  }
]

interface AppProps {
  tasks: Task[]; 
}

export const App: React.FC<AppProps> = ({ tasks }) => {
  
  return (
    <>
      <Typography variant='h3' >
        Список задач:
      </Typography>
      <Typography variant="h5" >
        {tasks.map((task) => (
          <div key={task.id} className="container1">
            <p><strong>Задача</strong>: {task.title}</p>
            <p>Приоритет: {task.priority}</p>
            <p>Статус: {task.isDone ? "Выполнено ✅" : "Не выполнено "}</p>
          </div> 
        ))}
      </Typography>
    </>
  )
}


