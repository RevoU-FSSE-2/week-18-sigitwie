import React, { CSSProperties } from 'react';
import { Input as MyInput, ConfigProvider } from 'antd';

interface CustomInputProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  name: string;
  value: string;
  type?: string;
  style?: CSSProperties;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorPrimary: "#460273",
            activeShadow: "none",
            paddingBlock: 10,
            colorError: "#730217",
            algorithm: true,
            colorBgContainer: "#393A3D",
            colorTextPlaceholder: "rgba(242,242,242,.25)",
            colorBorder: "#393A3D",
            colorText: "rgba(242,242,242)",
            borderRadius: 8
          },
        },
      }}
    >
      <MyInput {...props} />
    </ConfigProvider>
  );
};

export default CustomInput;
