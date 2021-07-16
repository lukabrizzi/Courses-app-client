import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, Form, Input, Select, Button, Row, Col } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import AvatarDefault from "../../../../assets/img/png/avatarDefault.png"

import 'antd/dist/antd.css';
import './EditUserForm.scss';

export default function EditUserForm(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null)
    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar
    })

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar })
        }
    }, [avatar])

    const updateUser = e => {
        e.preventDefault();
        console.log(userData);
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}


function UploadAvatar(props) {
    const { avatar, setAvatar } = props;

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={AvatarDefault} />
            ) : (
                <Avatar size={150} src={avatar ? avatar.preview : AvatarDefault} />
            )}
        </div>
    )
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            defaultValue={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            defaultValue={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Mail"
                            defaultValue={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol de usuario"
                            onChange={e => setUserData({
                                ...userData, role: e
                            })}
                            defaultValue={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviwer">Lector</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            onChange={e =>
                                setUserData({ ...userData, password: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Repetir contraseña"
                            onChange={e =>
                                setUserData({ ...userData, repeatPassword: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar usuario
                </Button>
            </Form.Item>
        </Form>
    )
}