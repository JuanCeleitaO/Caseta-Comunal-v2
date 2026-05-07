import React, { useState } from 'react';
import { ConfigProvider, Layout, Row, Col, Typography, Button, Card } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

import HeaderSection from './components/Layout/Header';
import ReportCard from './components/Reports/ReportCard';
import ReportModal from './components/Reports/ReportModal';

const { Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0); // Para recargar la lista

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b', borderRadius: 12 } }}>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>

        <HeaderSection />

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

          {/* Banner de Acción */}
          <Card style={{ marginBottom: 32, textAlign: 'center', border: '2px dashed #00b96b', background: '#f6ffed' }}>
            <Title level={3}>¿Algo para reportar hoy?</Title>
            <Button
              type="primary"
              size="large"
              icon={<CameraOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{ height: 60, padding: '0 40px', fontSize: 18, fontWeight: 'bold' }}
            >
              CREAR REPORTE
            </Button>
          </Card>

          <Title level={4}>Reportes de la Vereda</Title>
          <Row gutter={[16, 16]}>
            {/* Aquí mapearemos los reportes reales de la DB pronto */}
            <Col xs={24} sm={12} lg={8}>
              <ReportCard
                title="Ejemplo"
                description="Aquí aparecerán los reportes"
                imageUrl="https://via.placeholder.com/400x200"
              />
            </Col>
          </Row>

          <ReportModal
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              setRefresh(prev => prev + 1);
            }}
          />
        </Content>

      </Layout>
    </ConfigProvider>
  );
};

export default App;