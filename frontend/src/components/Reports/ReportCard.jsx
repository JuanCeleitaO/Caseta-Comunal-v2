import React, { useState } from 'react';
import { Card, Tag, Typography, Button, Popconfirm } from 'antd';
import { PictureOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ReportCard = ({ id, title, description, imageUrl, autor, estado, onDelete }) => {
    const [imgError, setImgError] = useState(false);

    const coloresEstado = {
        pendiente: 'red',
        en_revision: 'orange',
        solucionado: 'green'
    };

    const estadoFormateado = estado ? estado.replace('_', ' ').toUpperCase() : 'DESCONOCIDO';
    const esInformativo = id === 'info-1' || id === 'info-2';

    return (
        <Card
            hoverable
            cover={
                imgError || !imageUrl || imageUrl.endsWith('undefined') || imageUrl === 'http://localhost:3004' ? (
                    <div style={{
                        height: 220,
                        backgroundColor: '#f0f2f5',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#bfbfbf',
                        borderBottom: '1px solid #e8e8e8'
                    }}>
                        <PictureOutlined style={{ fontSize: '48px', marginBottom: '8px' }} />
                        <Text type="secondary" style={{ color: '#bfbfbf' }}>Sin Foto</Text>
                    </div>
                ) : (
                    <img
                        alt={title}
                        src={imageUrl}
                        style={{ height: 220, objectFit: 'cover' }}
                        onError={() => setImgError(true)}
                    />
                )
            }
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: 'none'
            }}
            styles={{ body: { padding: '20px' } }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Tag
                    color={coloresEstado[estado] || 'default'}
                    style={{ borderRadius: '12px', padding: '2px 10px', fontWeight: 'bold' }}
                >
                    {estadoFormateado}
                </Tag>

                {!esInformativo && onDelete && (
                    <Popconfirm
                        title="Eliminar reporte"
                        description="¿Estás seguro de borrar este reporte?"
                        onConfirm={onDelete}
                        okText="Sí, borrar"
                        cancelText="Cancelar"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                )}
            </div>

            <Title level={4} style={{ marginTop: 0, marginBottom: 8, color: '#262626' }}>
                {title}
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: '14px' }}>
                Reportado por: <strong style={{ color: '#595959' }}>{autor}</strong>
            </Text>
            {description && (
                <Text style={{ color: '#595959', display: 'block', lineHeight: '1.5' }}>
                    {description}
                </Text>
            )}
        </Card>
    );
};

export default ReportCard;