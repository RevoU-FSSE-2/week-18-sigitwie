import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "../pages";
import ProtectedRoute from "./ProtectedRoutes";
import { AuthProvider } from "../contexts/AuthContext";
import { TasksProvider } from "../contexts/TaskContext";
import { ProjectsProvider } from '../contexts/ProjectsContext';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
      <ProjectsProvider>
        <TasksProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </TasksProvider>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
