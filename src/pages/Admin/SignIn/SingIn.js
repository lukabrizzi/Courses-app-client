import React from 'react';
import { Layout, Tabs } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/img/png/logoSignIn.png';
import RegisterForm from '../../../components/admin/RegisterForm';
import LoginForm from '../../../components/admin/LoginForm';
import { getAccessTokenApi } from '../../../api/auth'

import './SignIn.scss';

export default function SingIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if (getAccessTokenApi()) {
        return <Redirect to="/admin" />;
    }
    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Luka Brizzi" />
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}