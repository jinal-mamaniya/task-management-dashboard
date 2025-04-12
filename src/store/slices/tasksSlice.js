import { createSlice } from '@reduxjs/toolkit';

// Sample initial tasks
const initialTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the project proposal document for the client meeting',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-09-15',
    category: 'Work'
  },
  {
    id: 2,
    title: 'Grocery shopping',
    description: 'Buy fruits, vegetables, and other essentials',
    status: 'to-do',
    priority: 'medium',
    dueDate: '2023-09-10',
    category: 'Personal'
  },
  {
    id: 3,
    title: 'Gym workout',
    description: 'Complete 30 minutes of cardio and strength training',
    status: 'completed',
    priority: 'low',
    dueDate: '2023-09-08',
    category: 'Health'
  },
  {
    id: 4,
    title: 'Read book chapter',
    description: 'Read chapter 5 of "Effective TypeScript"',
    status: 'to-do',
    priority: 'medium',
    dueDate: '2023-09-12',
    category: 'Learning'
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: initialTasks,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, updateTaskStatus } = tasksSlice.actions;

// Selectors
export const selectAllTasks = state => state.tasks.tasks;
export const selectTasksByStatus = (state, status) => 
  state.tasks.tasks.filter(task => task.status === status);
export const selectTaskStats = state => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    todo: tasks.filter(task => task.status === 'to-do').length,
    overdue: tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const now = new Date();
      return dueDate < now && task.status !== 'completed';
    }).length,
  };
};

export default tasksSlice.reducer;