import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './app.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <Layout>
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/show1">显示菜单1</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/show2">显示菜单2</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/show3">显示菜单3</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/show4">显示菜单4</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 0' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
