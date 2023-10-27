import React from 'react';
import { Menu as MyMenu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

interface CustomMenuProps extends Omit<MenuProps, 'items'> {
    items: MenuItem[];
}

export const CustomMenu: React.FC<CustomMenuProps> = ({ items, ...restProps }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        colorPrimary: "#202020",
                        colorBgContainer: "#2A2B2D",
                        colorBorder: "#393A3D",
                        itemColor: "#FFFFFF",
                        itemSelectedColor: "#FFFFFF",
                        borderRadius: 8,
                        itemSelectedBg: "#474749",
                        itemHoverColor: "#FFFFFF",
                        iconSize: 16,
                        
                    },
                },
            }}
        >
            <MyMenu items={items} {...restProps} />
        </ConfigProvider>
    );
};

export default CustomMenu;
