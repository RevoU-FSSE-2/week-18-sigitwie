import React  from 'react';
import { Modal, List, Button, Typography, Form, Input, Select, DatePicker, message } from 'antd';
import { useProjectData } from "../../contexts/ProjectsContext"; 

const { Text } = Typography;
const { Option } = Select;

interface ProjectDetailModalProps {
  project: {
    id: string;
    name: string;
    description: string;
    managerId: string;
    createdAt: string;
    updatedAt: string;
    manager: { username: string };
    tasks?: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
      dueDate: string;
      assignedTo: string;
      projectId: string;
      createdAt: string;
      updatedAt: string;
      assignee: { username: string };
    }[];
  };
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [newTaskForm] = Form.useForm();
  const { fetchProjects } = useProjectData();

  const handleAddTaskSubmit = async () => {
    const formData = newTaskForm.getFieldsValue();

    try {
      const response = await fetch('https://w18.eswe.dev/v1/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        // Update projects context
        fetchProjects();

        message.success('Task added successfully!');
        newTaskForm.resetFields();
      } else {
        const errorData = await response.json();
        message.error(`Failed to add task: ${errorData.message || 'An unknown error occurred'}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Error adding task: ${error.message}`);
      } else {
        message.error(`Error adding task`);
      }
    }
  };
  

  return (
    <Modal 
      title={project.name} 
      open={true} 
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="addTask" type="primary" onClick={handleAddTaskSubmit}>
          Add Task
        </Button>
      ]}
    >  
      <div style={{padding:"10px"}}>
      <h3>Project Description:</h3>
      <p>{project.description}</p>
      
      <Text type="secondary">
        Manager: {project.manager.username}
      </Text>
        </div>
      <h3>Tasks:</h3>
      <List
        style={{padding:"10px"}}
        itemLayout="horizontal"
        dataSource={project.tasks}
        renderItem={task => (
          <List.Item>
            <List.Item.Meta
              title={task.title}
              description={
                <>
                  <p>Description: {task.description}</p>
                  <p>Status: {task.status}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p>Assigned To: {task.assignee.username}</p>
                </>
              }
            />
          </List.Item>
        )}
      />

      <div style={{padding:"10px", borderRadius:"8px", backgroundColor:"#F1F1F1"}}>
        <div style={{padding:"10px"}}>
        <Typography.Title level={5}
            style={{color: "#2E2E2E", margin:"0 16px 16px 0" }}>Add new task</Typography.Title>
      <Form form={newTaskForm} initialValues={{ projectId: project.id }}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="New">New</Option>
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
          <Select>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="assignee" label="Assignee" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="projectId" label="Project Id" hidden>
          <Input />
        </Form.Item>
      </Form>
      </div>
      </div>
    </Modal>
  );
}

export default ProjectDetailModal;
