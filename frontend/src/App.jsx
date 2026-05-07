import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Typography, Button, Card, Row, Col, FloatButton, Space } from 'antd';
import { CameraOutlined, WarningOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// Identidad visual basada en redes2nodos
const themeConfig = {
  token: {
    colorPrimary: '#00b96b', // Verde comunitario
    colorInfo: '#00b96b',
    borderRadius: 12, // Bordes más suaves como en el modelo
    wireframe: false,
  },
};

const App = () => {
  const [reportes, setReportes] = useState([]);

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        
        {/* Header estilo Redes2Nodos */}
        <Header style={{ 
          background: '#fff', 
          padding: '20px 0', 
          height: 'auto', 
          textAlign: 'center', 
          lineHeight: 'normal',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
        }}>
          <Space direction="vertical" size={0}>
            <Title level={2} style={{ margin: 0, color: '#00b96b' }}>
              🏠 Caseta Comunal
            </Title>
            <Text type="secondary">
              <EnvironmentOutlined /> Vereda Florencia, Caquetá
            </Text>
          </Space>
        </Header>

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          {/* Sección de Acción Principal */}
          <Card 
            style={{ 
              marginBottom: 32, 
              textAlign: 'center', 
              borderRadius: 16,
              border: '2px dashed #00b96b',
              background: '#f6ffed'
            }}
          >
            <CameraOutlined style={{ fontSize: '54px', color: '#00b96b', marginBottom: '16px' }} />
            <Title level={3} style={{ marginTop: 0 }}>¿Hay una novedad en la vereda?</Title>
            <Text style={{ display: 'block', marginBottom: '20px' }}>
              Toma una foto para que los administradores puedan verla.
            </Text>
            <Button 
              type="primary" 
              size="large" 
              icon={<CameraOutlined />}
              block 
              style={{ height: '64px', fontSize: '20px', borderRadius: '12px', fontWeight: 'bold' }}
            >
              REPORTAR AHORA
            </Button>
          </Card>

          {/* Listado de Reportes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={4} style={{ margin: 0 }}>Reportes Recientes</Title>
            <Text type="secondary">{reportes.length} reportes hoy</Text>
          </div>

          <Row gutter={[16, 16]}>
            {/* Tarjeta de ejemplo */}
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={<img alt="ejemplo" src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=500" style={{ height: 200, objectFit: 'cover' }} />}
                style={{ borderRadius: 12, overflow: 'hidden' }}
                actions={[
                  <Space><ClockCircleOutlined /> <Text type="secondary">Pendiente</Text></Space>
                ]}
              >
                <Card.Meta 
                  title="Estado de la vía" 
                  description="Derrumbe pequeño cerca a la escuela. Se necesita ayuda para limpiar."
                />
              </Card>
            </Col>
          </Row>
        </Content>

        <Footer style={{ textAlign: 'center', color: '#bfbfbf' }}>
          ObsidianCat Studio ©2024 - Herramienta para la Comunidad
        </Footer>

        <FloatButton 
          icon={<WarningOutlined />} 
          type="primary" 
          tooltip="Emergencia" 
          style={{ right: 24, bottom: 24 }}
        />
        
      </Layout>
    </ConfigProvider>
  );
};

export default App;