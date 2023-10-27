import React from 'react';
import { Modal, Button } from 'antd';
import { TaskForm } from '..';

interface TaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  form: any;
}

const TaskModal: React.FC<TaskModalProps> = ({ isVisible, onClose, onEdit, onDelete, form }) => {
  return (
    <Modal
      title="Task Details"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="edit" type="primary" onClick={onEdit}>
          Save
        </Button>,
        <Button key="delete" onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <TaskForm form={form} />
    </Modal>
  );
};

export default TaskModal;
