
import { Layout, Typography, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderSection = () => (
    <Header style={{
        background: '#fff',
        padding: '20px 0',
        height: 'auto',
        textAlign: 'center',
        lineHeight: 'normal',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
        <Space orientation="vertical" size={0}>
            <Title level={2} style={{ margin: 0, color: '#00b96b' }}>
                🏠 Caseta Comunal
            </Title>
            <Text type="secondary">
                <EnvironmentOutlined /> Vereda Travesias, Caquetá
            </Text>
        </Space>
    </Header>
);

export default HeaderSection;
