import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ReportCard = ({ title, description, imageUrl, status = 'pendiente' }) => (
    <Card
        hoverable
        cover={<img alt={title} src={imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
        style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        actions={[
            <Space>
                <ClockCircleOutlined />
                <Tag color={status === 'pendiente' ? 'gold' : 'green'}>
                    {status.toUpperCase()}
                </Tag>
            </Space>
        ]}
    >
        <Card.Meta
            title={title}
            description={description}
        />
    </Card>
);

export default ReportCard;