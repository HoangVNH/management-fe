import "./styles.scss";

import { Layout } from "antd";
import { Switch } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import Sider from './Sider';
import mappedRoutes from "routes";
import React from "react";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout
      hasSider
    >
      <Sider />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          background: '#fff'
        }}
      >
        <Header />
        <Content
          style={{
            margin: '24px auto 0',
            overflow: 'initial',
          }}
        >
          <Switch>
            {mappedRoutes}
          </Switch>
        </Content> 
        <Footer />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
