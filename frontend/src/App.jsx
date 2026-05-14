import React from 'react';
import { ConfigProvider, Layout, App as AntdApp } from 'antd'; 
import HeaderSection from './components/Layout/Header';
import Dashboard from './pages/dashboard/Dashboard';

const { Content } = Layout;

const App = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b', borderRadius: 12 } }}>
      <AntdApp>

        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>

          <HeaderSection />

          <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <Dashboard />
          </Content>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;