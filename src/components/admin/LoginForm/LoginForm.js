import React, { useState } from 'react'
import { Form, Input, Button, notification } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss'
import SingIn from '../../../pages/Admin/SignIn/SingIn';

export default function LoginForm() {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const changeForm = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const login = async event => {
        const result = await signInApi(input);

        if (result.message) {
            notification["error"]({
                message: result.message
            });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification["success"]({
                message: 'Login correcto'
            });

            window.location.href = "/admin";
        }
    }

    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Ingresar
                </Button>
            </Form.Item>
        </Form>
    )
}