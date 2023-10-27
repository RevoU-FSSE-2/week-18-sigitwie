import React from 'react';
import { Sidebar } from '../../components';
import { Header } from '../../components';
import { TaskSection } from '../../components';
import { ProjectSection } from '../../containers';
import { Layout, Row, Col } from 'antd';


const { Sider, Content } = Layout;

const Home: React.FC = () => {
  

  return (
    <Layout style={{ minHeight: '100vh', background: '#1E1F21' }}>
      <Sider width={250} style={{ background: '#1E1F21', padding: '8px', position: 'fixed', height: '100vh' }}>
        <Sidebar />
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Header />
        <Content style={{ background: '#1E1F21', padding: '40px 50px' }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col span={12}>
              <ProjectSection />
            </Col>
            <Col span={12}>
              <TaskSection />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
