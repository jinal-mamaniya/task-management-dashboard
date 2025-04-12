import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;