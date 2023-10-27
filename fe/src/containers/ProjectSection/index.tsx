import React, { useState, useEffect } from "react";
import { CustomCard } from "../../components";
import { Typography, message } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import ProjectModal from "../../components/ProjectModal";
import ProjectCard from "../../components/ProjectCard";
import { Project } from "../../utils/type";
import { useProjectData } from "../../contexts/ProjectsContext"; 

const ProjectSection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined
  );

  // Use the custom hook from the context
  const {
    projects,
    isLoading,
    error,
    fetchProjects,
    addProject,
    editProject,
    deleteProject,
  } = useProjectData();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  

  const handleAddProject = async (projectData: Project) => {
    try {
      await addProject(projectData);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to add project!");
    }
  };

  const handleEditProjectSubmit = async (
    projectId: string,
    updatedData: Project
  ) => {
    try {
      await editProject(projectId, updatedData);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit project!");
    }
  };

  const handleEditButtonClick = (projectId: string) => {
    const projectToEdit = projects.find((p) => p.id === projectId);
    if (projectToEdit) {
      setEditingProject(projectToEdit);
      setIsModalVisible(true);
    }
  };

  const handleDeleteButtonClick = (projectId: string) => {
    deleteProject(projectId);
  };

  return (
    <CustomCard
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Title level={5} style={{ margin: 0, color: "#DFDFDF" }}>
            Projects
          </Typography.Title>
          <PlusCircleFilled
            onClick={() => setIsModalVisible(true)}
            style={{ fontSize: 24, cursor: "pointer", color: "#d9d9d9" }}
          />
        </div>
      }
    >
      {isLoading && <p style={{ color: "#646464" }}>Loading projects...</p>}
      {error && (
        <p style={{ color: "#646464" }}>
          Error fetching projects: {error.message}
        </p>
      )}
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={handleEditButtonClick}
          onDelete={handleDeleteButtonClick}
        />
      ))}

      {isModalVisible && (
        <ProjectModal
          visible={isModalVisible}
          project={editingProject}
          onClose={() => {
            setIsModalVisible(false);
            setEditingProject(undefined);
          }}
          onSubmit={async (values: Project) => {
            if (editingProject) {
              await handleEditProjectSubmit(editingProject.id, values);
            } else {
              await handleAddProject(values);
            }
          }}
        />
      )}
    </CustomCard>
  );
};

export default ProjectSection;
