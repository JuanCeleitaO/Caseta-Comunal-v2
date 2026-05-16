import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { HomeTwoTone, ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const HeaderSection = () => {
    return (
        <Header style={{
            background: '#ffffff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid #f0f0f0',
            height: '64px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <HomeTwoTone twoToneColor="#00b96b" style={{ fontSize: '24px', marginRight: '8px' }} />
                <Title level={4} style={{ margin: 0, color: '#1f1f1f', fontWeight: 'bold', fontSize: '18px' }}>
                    Caseta Comunal
                </Title>
            </div>

            <Button
                type="default"
                icon={<ArrowLeftOutlined />}
                onClick={() => window.history.back()}
                style={{
                    borderRadius: '8px',
                    fontWeight: '600',
                    color: '#595959'
                }}
            >
                Volver
            </Button>
        </Header>
    );
};

export default HeaderSection;