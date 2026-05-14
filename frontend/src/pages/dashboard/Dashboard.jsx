import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Spin, Empty, Card, Button, Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import ReportCard from '../../components/Reports/ReportCard';
import ReportModal from '../../components/Reports/ReportModal';

const { Title } = Typography;

const Dashboard = () => {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const fetchReportes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3004/api/reportes');
            if (response.ok) {
                const data = await response.json();
                setReportes(data);
            }
        } catch (error) {
            console.error("Error al cargar reportes:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportes();
    }, [fetchReportes, refresh]);

    return (
        <>
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

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
            ) : reportes.length === 0 ? (
                <Empty description="No hay reportes todavía" />
            ) : (
                <Row gutter={[16, 16]}>
                    {reportes.map((item) => (
                        <Col xs={24} sm={12} lg={8} key={item._id}>
                            <ReportCard
                                title={item.titulo}
                                description={item.descripcion}
                                imageUrl={`http://localhost:3004${item.foto_url}`}
                                autor={item.autor_nombre}
                                estado={item.estado}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            <ReportModal
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSuccess={() => {
                    setIsModalOpen(false);
                    setRefresh(prev => prev + 1);
                }}
            />
        </>
    );
};

export default Dashboard;