import React, { useState } from 'react';
import type { Task } from '../../types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface TaskAddDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
}

export const TaskAddDialog: React.FC<TaskAddDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal');
  const [isDone, setIsDone] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      isDone,
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('normal');
    setIsDone(false);
    onClose();
  }

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить задачу</DialogTitle>
        <DialogContent>
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              autoFocus
              label="Название задачи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
            <TextField
              select
              label="Приоритет"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as 'low' | 'normal' | 'high')
              }
              fullWidth
              variant="outlined"
            >
              <MenuItem value="low">Низкий</MenuItem>
              <MenuItem value="normal">Обычный</MenuItem>
              <MenuItem value="high">Высокий</MenuItem>
            </TextField>

            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={isDone}
                  onChange={(e) => setIsDone(e.target.checked)}
                ></Checkbox>

              }
              label="Выполнено"
            /> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button 
            onClick={handleAdd} 
            variant="contained"
            disabled={!title.trim()}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    );
  };