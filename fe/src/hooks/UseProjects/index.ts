import { useState, useCallback } from "react";
import { Project } from "../../utils/type";
import { message } from 'antd';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        "https://w18.eswe.dev/v1/api/projects/all-projects",
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("The network did not respond appropriately.");
      }

      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("The network did not respond appropriately.")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProject = async (projectData: any) => {
    const userDataString = sessionStorage.getItem("user");
    if (!userDataString) {
      throw new Error("No user data found in session storage.");
    }
    const userData = JSON.parse(userDataString);
    const managerId = userData.id;

    const fullProjectData = {
      ...projectData,
      managerId
    };

    try {
      const response = await fetch(
        "https://w18.eswe.dev/v1/api/projects/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(fullProjectData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "The network did not respond appropriately.");
      }

      // Setelah berhasil menambahkan proyek, panggil fetchProjects untuk memperbarui state dengan data terbaru
      fetchProjects();
      message.success('Project added successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Error adding project.');
    }
};


  const editProject = async (projectId: string, updatedData: any) => {
    try {
      const response = await fetch(`https://w18.eswe.dev/v1/api/projects/update/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'The network did not respond appropriately.');
      }

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId
            ? { ...project, ...updatedData }
            : project
        )
      );
      message.success('Project updated successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Error updating project.');
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`https://w18.eswe.dev/v1/api/projects/delete/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'The network did not respond appropriately.');
      }

      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      message.success('Project deleted successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Error deleting project.');
    }
  };

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    addProject,
    editProject,
    deleteProject
  };
};

export default useProjects;
