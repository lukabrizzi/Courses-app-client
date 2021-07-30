import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { UserOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import './MenuSider.scss';

function MenuSider(props) {
    const { menuCollapsed, location } = props;

    const { Sider } = Layout;
    return (
        <Sider collapsible style={{ top: '65px' }}>
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                <Menu.Item key="/admin">
                    <Link to="/admin">
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to="/admin/users">
                        <UserOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/menu">
                    <Link to="/admin/menu">
                        <MenuOutlined />
                        <span className="nav-text">Menu</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);