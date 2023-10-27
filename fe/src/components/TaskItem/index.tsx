import React from "react";
import { Badge, Space, Typography, Modal, Form, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CustomCard, TaskModal } from "..";
import { Task } from "../../utils/type";
import { useTaskData } from "../../contexts/TaskContext";
import moment from "moment";

const getBadgeProps = (priority: string) => {
  switch (priority) {
    case "High":
      return { text: "High", color: "#BF1F2C" };
    case "Medium":
      return { text: "Medium", color: "#DFA204" };
    case "Low":
      return { text: "Low", color: "#377120" };
    default:
      return { text: "", color: "default" };
  }
};

const getIconColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "green";
    case "New":
      return "gray";
    case "In Progress":
      return "yellow";
    default:
      return "";
  }
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const badgeProps = getBadgeProps(task.priority);
  const iconColor = getIconColor(task.status);
  const { editTask, deleteTask, refetch } = useTaskData(); 

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: moment(task.dueDate),
      assignee: task.assignee.username,
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleEdit = async () => {
    try {
      const updatedTask = await form.validateFields();
      await editTask(task.id, updatedTask);
      message.success("Task updated successfully");
      closeModal();
      refetch();
    } catch (error) {
      message.error("Failed to update the task");
    }
  };

  const handleDeleteConfirmation = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      content: "This operation cannot be undone.",
      onOk: async () => {
        try {
          await deleteTask(task.id);
          message.success("Task deleted successfully");
          closeModal();
          refetch();
        } catch (error) {
          message.error("Failed to delete the task");
        }
      },
    });
  };

  return (
    <Space
      key={task.id}
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginBottom: 16 }}
    >
      <Badge.Ribbon text={badgeProps.text} color={badgeProps.color}>
        <CustomCard
          title={
            <Typography.Title
              level={5}
              style={{ margin: 0, color: "#DFDFDF", cursor: "pointer" }}
              onClick={showModal}
            >
              {iconColor && (
                <CheckCircleOutlined
                  style={{ color: iconColor, marginRight: "8px" }}
                />
              )}
              {task.title}
            </Typography.Title>
          }
        >
          <Typography.Paragraph style={{ margin: 0, color: "#DFDFDF" }}>
            <p>Source: {task.project.name}</p>
            <p>Description: {task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          </Typography.Paragraph>
        </CustomCard>
      </Badge.Ribbon>
      <TaskModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onEdit={handleEdit}
        onDelete={handleDeleteConfirmation}
        form={form}
      />
    </Space>
  );
};

export default TaskItem;
