import React, { CSSProperties } from 'react';
import { Tabs as AntTabs, ConfigProvider, TabsProps as AntTabsProps } from 'antd';

interface TabsProps extends AntTabsProps {
  style?: CSSProperties;
  tabBarStyle?: CSSProperties;
  // ... other props you want to customize
}

export const CustomTabs: React.FC<TabsProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: "#DFDFDF",
            titleFontSize: 16,
            colorBorderSecondary: "#474749",
            itemSelectedColor: "#FFFFFF"
          },
        },
      }}
    >
      <AntTabs {...props} />
    </ConfigProvider>
  );
};

export default CustomTabs;