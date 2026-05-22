import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Space, Avatar } from 'antd';
import { HomeTwoTone, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderSection = () => {
    const [nombreUsuario, setNombreUsuario] = useState(null);

    // Buscamos si hay un usuario logueado al cargar el Header
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const usuario = JSON.parse(userData);
                if (usuario && usuario.nombre) {
                    setNombreUsuario(usuario.nombre);
                }
            } catch (error) {
                console.error("Error al leer datos del usuario", error);
            }
        }
    }, []);

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

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Si hay usuario, mostramos su nombre y avatar */}
                {nombreUsuario && (
                    <Space style={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Avatar style={{ backgroundColor: '#00b96b' }} icon={<UserOutlined />} />
                        <Text strong style={{ color: '#595959' }}>{nombreUsuario}</Text>
                    </Space>
                )}
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
            </div>
        </Header>
    );
};

export default HeaderSection;