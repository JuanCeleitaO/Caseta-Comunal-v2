import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Spin, Empty, Card, Button, Typography, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import ReportCard from '../../components/Reports/ReportCard';
import ReportModal from '../../components/Reports/ReportModal';
import { obtenerReportes, eliminarReporte } from '../../services/reportes.service';

const { Title } = Typography;

const Dashboard = () => {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const fetchReportes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await obtenerReportes();
            let arregloReportes = [];

            if (Array.isArray(data)) {
                arregloReportes = data;
            } else if (data && Array.isArray(data.reportes)) {
                arregloReportes = data.reportes;
            } else if (data && Array.isArray(data.data)) {
                arregloReportes = data.data;
            }

            if (arregloReportes.length === 0) {
                setReportes([
                    {
                        _id: 'info-1',
                        titulo: '📢 ¡Bienvenidos al tablero digital!',
                        descripcion: 'Este espacio es para reportar daños o problemas en la vereda. Los reportes nuevos aparecerán aquí para que todos los veamos.',
                        foto_url: '',
                        autor_nombre: 'Junta de Acción Comunal',
                        estado: 'solucionado'
                    },
                    {
                        _id: 'info-2',
                        titulo: 'ℹ️ ¿Cómo funciona?',
                        descripcion: 'Solo dale al botón verde "TOMAR FOTO Y REPORTAR", pon tu nombre, qué pasa, sube la foto y listo. No necesitas crear una cuenta.',
                        foto_url: '',
                        autor_nombre: 'Administración',
                        estado: 'en_revision'
                    }
                ]);
            } else {
                setReportes(arregloReportes);
            }
        } catch (error) {
            console.error("Error al cargar reportes:", error);
            setReportes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportes();
    }, [fetchReportes, refresh]);

    const handleDelete = async (id) => {
        try {
            await eliminarReporte(id);
            message.success('Reporte eliminado correctamente');
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error("Error al eliminar:", error);
            message.error('No se pudo eliminar el reporte');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
            <Card
                style={{
                    marginBottom: 32,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%)',
                    borderRadius: 16,
                    border: '1px solid #b7eb8f',
                    boxShadow: '0 4px 12px rgba(92, 219, 149, 0.15)'
                }}
            >
                <Title level={2} style={{ color: '#1f1f1f', marginBottom: 24 }}>
                    ¿Viste algún problema en la vereda?
                </Title>
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    icon={<CameraOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        height: 60,
                        padding: '0 40px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        backgroundColor: '#00b96b',
                        boxShadow: '0 4px 14px rgba(0, 185, 107, 0.4)'
                    }}
                >
                    TOMAR FOTO Y REPORTAR
                </Button>
            </Card>

            <Title level={4} style={{ marginBottom: 24, paddingLeft: 8, borderLeft: '4px solid #00b96b' }}>
                Reportes Recientes
            </Title>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
            ) : reportes.length === 0 ? (
                <Empty description="No hay reportes todavía" />
            ) : (
                <Row gutter={[16, 16]}>
                    {reportes.map((item) => {
                        const imageBase = import.meta.env.VITE_API_URL || 'http://localhost:3004';
                        const fotoCompleta = item.foto_url ? `${imageBase}${item.foto_url}` : '';

                        return (
                            <Col xs={24} sm={12} lg={8} key={item._id}>
                                <ReportCard
                                    id={item._id}
                                    title={item.titulo}
                                    description={item.descripcion}
                                    imageUrl={fotoCompleta}
                                    autor={item.autor_nombre}
                                    estado={item.estado}
                                    onDelete={() => handleDelete(item._id)}
                                />
                            </Col>
                        );
                    })}
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
        </div>
    );
};

export default Dashboard;