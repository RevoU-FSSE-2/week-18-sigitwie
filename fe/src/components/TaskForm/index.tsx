import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

interface TaskFormProps {
  form: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
        <div style={{padding:"20px", borderRadius:"8px", backgroundColor:"#F1F1F1"}}>
      <Form.Item 
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Please input the title!" },
          { max: 50, message: "Title cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Task Title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please input the description!" },
          {
            max: 200,
            message: "Description cannot exceed 200 characters!",
          },
        ]}
      >
        <Input.TextArea placeholder="Task Description" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[
          { required: true, message: "Please select the status!" },
        ]}
      >
        <Select placeholder="Select a status">
          <Option value="New">New</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[
          { required: true, message: "Please select the priority!" },
        ]}
      >
        <Select placeholder="Select a priority">
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[
          { required: true, message: "Please select the due date!" },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name="assignee"
        label="Assignee"
        rules={[
          { required: true, message: "Please input the assignee!" },
          { max: 50, message: "Assignee cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Assignee" />
      </Form.Item>
      </div>
    </Form>
  );
};

export default TaskForm;
