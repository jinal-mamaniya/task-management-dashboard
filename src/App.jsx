import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainLayout } from "./components/layout";
import {
  Dashboard,
  TasksPage,
  CalendarPage,
  ReportsPage,
  SettingsPage,
  SignInPage,
  NotFound,
} from "./pages";
import { selectIsAuthenticated } from "./store/slices/authSlice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isAuthenticated ? (
              <MainLayout>
                <TasksPage />
              </MainLayout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            isAuthenticated ? (
              <MainLayout>
                <CalendarPage />
              </MainLayout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated ? (
              <MainLayout>
                <ReportsPage />
              </MainLayout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/404"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
