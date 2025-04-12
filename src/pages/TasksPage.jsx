import React, { useState } from 'react';
import styled from 'styled-components';
import { TaskForm, TaskList, TaskEditForm } from '../components/tasks';

const TasksContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TasksPage = () => {
  const [editingTask, setEditingTask] = useState(null);
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCloseEditForm = () => {
    setEditingTask(null);
  };
  
  return (
    <div>
      <h1>Tasks</h1>
      <p>Manage and organize your tasks</p>
      
      {editingTask ? (
        <TaskEditForm task={editingTask} onClose={handleCloseEditForm} />
      ) : (
        <TaskForm />
      )}
      
      <TasksContainer>
        <TaskList onEditTask={handleEditTask} />
      </TasksContainer>
    </div>
  );
};

export default TasksPage;