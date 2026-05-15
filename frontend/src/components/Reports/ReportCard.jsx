import React from 'react';
import { Card, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const ReportCard = ({ title, description, imageUrl, autor, estado }) => {
    // Configuración de colores según estado
    const coloresEstado = {
        pendiente: 'red',
        en_revision: 'orange',
        solucionado: 'green'
    };

    const estadoFormateado = estado ? estado.replace('_', ' ').toUpperCase() : 'DESCONOCIDO';

    return (
        <Card
            hoverable
            cover={<img alt={title} src={imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
            style={{ borderRadius: 12, overflow: 'hidden' }}
        >
            <div style={{ marginBottom: 8 }}>
                <Tag color={coloresEstado[estado] || 'default'}>{estadoFormateado}</Tag>
            </div>
            <Title level={5} style={{ margin: 0 }}>{title}</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Reportado por: <strong>{autor}</strong>
            </Text>
            {description && <Text>{description}</Text>}
        </Card>
    );
};

export default ReportCard;