import React from 'react';
import { Layout, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const HeaderSection = () => {
    return (
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <HomeOutlined style={{ fontSize: '24px', color: '#00b96b', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0 }}>Caseta Comunal</Title>
        </Header>
    );
};

export default HeaderSection;