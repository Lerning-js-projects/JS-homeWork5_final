import { 
  Button, 
  Stack, 
  Typography 
} from "@mui/material";
import type { Task } from "../../types";
import { useState } from "react";
import { TaskAddDialog } from "./TaskAddDialog";

type TaskListProps = {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onSelectTask: (id: number) => void;
  selectedTaskId: number | null;
};

const priorityLabels: Record<Task["priority"], string> = {
  high: "Приоритет: высокий",
  low: "Приоритет: низкий",
  normal: "Приоритет: средний",
};

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onAddTask, 
  onSelectTask, 
  selectedTaskId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Stack direction="column" spacing={2}>
      <Button 
        variant="outlined"
        size="large"
        onClick={() => setOpenDialog(true)}
      >
        + Добавить Задачу
      </Button>

      <TaskAddDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={(newTask) => {
          onAddTask({ ...newTask, id: Date.now() });
        }}
      />

      {tasks.map(task => (
        <Stack key={task.id} 
          direction="row" 
          spacing={1} 
          width="100%" 
          alignItems="center"
          onClick={() => onSelectTask(task.id)}
          sx={{
            bgcolor: task.id === selectedTaskId ? 'rgba(137, 161, 189, 0.3)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(111, 156, 207, 0.1)', cursor: 'pointer' },
          }}
        >
          {/* <Typography variant="subtitle2">{task.id}</Typography> */}
          <Stack direction="row" alignItems="center" width="100%">
            <Typography variant="h6" width="140%">{task.title}</Typography>
            <Typography 
              variant="subtitle1"
              sx={{
                color: 'rgba(202, 119, 24, 0.9)',
                fontWeight: 600,
                ml: 'auto'
              }}
            >
              {priorityLabels[task.priority]}
            </Typography>
          </Stack>

        </Stack>

      ))}

    </Stack>
  );
};