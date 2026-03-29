import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import type { Task } from "../../types";
import { useState } from "react";
import { TaskList } from "./TaskList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  createTask, 
  getTasks, 
  updateTask, 
  type CreateTaskDto, 
  type UpdateTaskDto 
} from "../../api/tasks";

type TasksProps = {tasks: Task[];};

export const Tasks: React.FC<TasksProps> = ({ }) => {
  //const [tasks, setTasks] = useState<Task[]>([])

  const queryClient = useQueryClient()

  const {data: tasks = [], isLoading} = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  const createTaskMutation = useMutation<Task, Error, CreateTaskDto>({
    mutationFn: createTask,
    onSuccess: (createTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (current => [...(current || []), createTask]))
      setSelectedTaskId(createTask.id)
    }
  })
  
  const updateTaskMutation = useMutation<Task, Error, UpdateTaskDto>({
    mutationFn: updateTask,
    onSuccess: () => {
      // Обновляем кэш после успешного обновления
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    }
  })

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)


  return (
    <Stack direction="column" spacing={2} width="80vw">
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Список задач:
      </Typography>

      <Stack direction="row" spacing={10}>
        <Box width="50%">
          {isLoading && <Typography>Загрузка...</Typography>}
          <TaskList tasks={tasks}
            // onAddTask={(newTask) => setTasks([...tasks, newTask])}
            onAddTask={(newTask) => createTaskMutation.mutateAsync(newTask)}
            onSelectTask={(id) => setSelectedTaskId(id)}
            selectedTaskId={selectedTaskId}
          />
        </Box>

        <Box width="50%">
          {selectedTaskId !== null ? (
            <Stack direction='column' spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h5">Выбранная задача:</Typography>
              <Stack direction="row" alignItems="center" spacing={2} width="100%">
                <Typography sx={{ flex: 1 }}>
                  {tasks.find(task => task.id === selectedTaskId)?.description ||
                   'Описание не добавлено.'
                  }
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tasks.find(task => task.id === selectedTaskId)?.isDone || false}
                      onChange={(e) => {
                        const newIsDone = e.target.checked;
                        if (selectedTaskId !== null) {
                          updateTaskMutation.mutate({ id: selectedTaskId, isDone: newIsDone })
                        }
                      }}
                    />
                  }
                  label="Выполнено"
                />
              </Stack>
            </Stack>
          ) : (
            <Stack direction='column' spacing={0}>
              <Typography variant="h6">Выбери задачу: узнай подробнее</Typography>
              <Typography variant="h6">и отметь сделанной</Typography>
            </Stack>
          )}
        </Box>

      </Stack>
    </Stack>
  );
}