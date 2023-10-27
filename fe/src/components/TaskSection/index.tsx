import React from "react";
import { Typography } from "antd";
import { TaskItem, CustomCard, CustomTabs } from "../../components";
import { useTaskData } from "../../contexts/TaskContext";

const TaskSection: React.FC = () => {
  const { tasks, isLoading, error } = useTaskData();

  const groupedTasks = {
    New: tasks.filter((task) => task.status === "New"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  const items = Object.entries(groupedTasks).map(([status, tasks], index) => ({
    key: (index + 1).toString(),
    label: status,
    children: tasks.map((task) => <TaskItem key={task.id} task={task} />),
  }));

  return (
    <CustomCard
      title={
        <Typography.Title level={5} style={{ color: "#DFDFDF", margin: 0 }}>
          My tasks
        </Typography.Title>
      }
    >
      {isLoading && <p style={{ color: "#646464" }}>Loading tasks...</p>}
      {error && (
        <p style={{ color: "#646464" }}>
          Error fetching tasks: {error.message}
        </p>
      )}
      <CustomTabs defaultActiveKey="1" items={items} />
    </CustomCard>
  );
};

export default TaskSection;
