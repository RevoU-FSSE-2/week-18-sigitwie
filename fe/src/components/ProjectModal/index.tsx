import { Modal, Form, Input, Button } from "antd";
import { Project } from "../../utils/type";

interface ProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  project?: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ visible, onClose, onSubmit, project }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={project ? "Edit Project" : "Add New Project"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
       initialValues={project ? project : {}}
       onFinish={handleFinish}
       form={form}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: "Please input project name!" }]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Project Description"
          name="description"
          rules={[
            { required: true, message: "Please input project description!" },
          ]}
        >
          <Input.TextArea maxLength={300} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {project ? "Update Project" : "Add Project"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
