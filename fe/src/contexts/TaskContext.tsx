import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Task } from "../utils/type";

const BASE_URL = "https://w18.eswe.dev/v1/api/tasks";

interface TasksProviderProps {
    children: React.ReactNode;
}

interface TaskContextState {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  editTask: (id: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TaskContextState | null>(null);

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/all-tasks`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("The network did not respond appropriately.");
    }
    return response.json();
  };

  const editTask = async (id: string, updatedData: Partial<Task>): Promise<void> => {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error("Error updating the task.");
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("Error deleting the task.");
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const data = await fetchAllTasks();
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("The network did not respond appropriately."));
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider value={{ tasks, isLoading, error, refetch: fetchTasks, editTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTaskData = () => {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error("useTaskData must be used within a TasksProvider");
  }
  return context;
};
