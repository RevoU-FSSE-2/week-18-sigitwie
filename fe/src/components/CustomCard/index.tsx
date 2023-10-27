import React, { CSSProperties } from 'react';
import { Card as MyCard, ConfigProvider } from 'antd';

interface CustomCardProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  style?: CSSProperties;
  children: React.ReactNode;
}

export const CustomCard: React.FC<CustomCardProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBgContainer: "#2A2B2D",
            colorBorderSecondary: "#474749"
          },
        },
      }}
    >
      <MyCard {...props} />
    </ConfigProvider>
  );
};

export default CustomCard;
