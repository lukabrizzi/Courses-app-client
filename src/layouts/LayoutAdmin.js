import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import useAuth from '../hooks/useAuth';
import 'antd/dist/antd.css';
import MenuTop from '../components/admin/MenuTop'
import MenuSider from '../components/admin/MenuSider'
import AdminSignIn from '../pages/Admin/SignIn/SingIn';



import './LayoutAdmin.scss'

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    if (user && !isLoading) {
        return (
            <Layout>
                <MenuSider />
                <Layout className="layoutAdmin">
                    <Header className="layoutAdmin__header">
                        <MenuTop></MenuTop>
                    </Header>
                    <Content className="layoutAdmin__content" style={{ margin: '0 16px' }}>
                        <LoadRoutes routes={routes} style={{ padding: 24, minHeight: 360 }} />
                    </Content>
                    <Footer className="layoutAdmin__footer" style={{ textAlign: 'center' }}>Web personal ©2021 Created by Luka Brizzi
                    </Footer>
                </Layout>
            </Layout>
        )
    }

    return null;
}


function LoadRoutes({ routes }) {

    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}