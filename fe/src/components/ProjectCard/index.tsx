import React, { useState } from "react";
import { Card, Dropdown, Typography, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Project } from "../../utils/type";
import ProjectDetailModal from "../../components/ProjectDetailModal";
import { useProjectData } from "../../contexts/ProjectsContext";  // <-- Importing the custom hook from the context

interface ProjectCardProps {
  project: Project;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Using the data and methods from ProjectContext:
  const {
    // You can destructure and use other context states or methods if needed.
    // For example: projects, addProject, editProject, etc.
  } = useProjectData();

  const handleCardClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const projectMenu = (projectId: string) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          onEdit(projectId);
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        onClick={(e) => {
          e.domEvent.stopPropagation(); // Stop the propagation when menu is clicked
          onDelete(projectId);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Card
        key={project.id}
        style={{ margin: "16px 0", cursor: "pointer" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title
            level={5}
            style={{ margin: 0, color: "#DFDFDF" }}
            onClick={handleCardClick} 
          >
            {project.name}
          </Typography.Title>
          <Dropdown overlay={projectMenu(project.id)}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined
                style={{
                  color: "#DFDFDF",
                  marginRight: "8px",
                  fontSize: "20px",
                }}
              />
            </a>
          </Dropdown>
        </div>
      </Card>
      {isModalVisible && (
        <ProjectDetailModal project={project} onClose={closeModal} />
      )}
    </>
  );
};

export default ProjectCard;
