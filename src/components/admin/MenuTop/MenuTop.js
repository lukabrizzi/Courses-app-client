import React from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Logo from '../../../assets/img/png/flecaPunto.png'
import { logout } from '../../../api/auth'

import './MenuTop.scss';


export default function MenuTop() {
    const logoutUser = () => {
        logout();
        window.location.reload();
    };
    return (
        <div className="menuTop">
            <div className="menuTop__left">
                <img
                    className="menuTop__left-logo"
                    src={Logo}
                    alt="Luka Brizzi"
                />
            </div>
            <div className="menuTop__right">
                <Button type="link" >
                    <PoweroffOutlined onClick={logoutUser} />
                </Button>
            </div>
        </div >
    )
}