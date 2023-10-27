import React, { CSSProperties } from 'react';
import { Button as MyButton, ConfigProvider } from 'antd';

interface CustomButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  block?: boolean;
  type?: "primary" | "default"| "dashed" | "link" | "text";
  shape?: "circle" | "round";
  style?: CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#460273",
            primaryShadow: "none",
            controlHeight: 48,
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

export default CustomButton;
