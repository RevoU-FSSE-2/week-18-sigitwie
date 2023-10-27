import React, { useContext } from 'react';
import { CustomMenu } from '../CustomMenu';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { CustomCard } from '../CustomCard';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';  // Langkah 1: Import useLocation

const Sidebar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const location = useLocation();  // Langkah 2: Gunakan useLocation untuk mendapatkan lokasi saat ini

    if (!authContext) {
        throw new Error("Sidebar must be inside an AuthProvider");
    }

    const { logout } = authContext;

    const handleMenuClick = (key: string) => {
        if (key === 'signout') {
            logout();
        }
    };

    const menuItems = [
        { key: "home", icon: <HomeOutlined />, content: "Home", path: '/home' },
        // { key: "inbox", icon: <InboxOutlined />, content: "Projects", path: '/projects' },
        { key: "signout", icon: <LogoutOutlined />, content: "Sign out" },
    ];
    
    const antdItems = menuItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.content,
    }));
    
    return (
        <CustomCard title='' style={{height:'98vh'}}>
            {/* Langkah 3: Atur properti selectedKeys berdasarkan lokasi/path saat ini */}
            <CustomMenu items={antdItems} mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[menuItems.find(item => item.path === location.pathname)?.key || '']} />
        </CustomCard>
    );
};

export default Sidebar;
