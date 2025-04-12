import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    taskFilter: 'all', // 'all' | 'to-do' | 'in-progress' | 'completed'
    theme: 'light', // 'light' | 'dark'
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTaskFilter: (state, action) => {
      state.taskFilter = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTaskFilter, toggleTheme } = uiSlice.actions;

// Selectors
export const selectSidebarOpen = state => state.ui.sidebarOpen;
export const selectTaskFilter = state => state.ui.taskFilter;
export const selectTheme = state => state.ui.theme;

export default uiSlice.reducer;