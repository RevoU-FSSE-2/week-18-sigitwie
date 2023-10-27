import React, { CSSProperties } from 'react';
import { Button as MyButton, ConfigProvider } from 'antd';

interface EditButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  block?: boolean;
  type?: "primary" | "default"| "dashed" | "link" | "text";
  shape?: "circle" | "round";
  style?: CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const EditButton: React.FC<EditButtonProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#460273",
            primaryShadow: "none",
            controlHeight: 32,
            fontWeight: 600,
            algorithm: true,
          },
        },
      }}
    >
      <MyButton {...props} />
    </ConfigProvider>
  );
};

export default EditButton;
