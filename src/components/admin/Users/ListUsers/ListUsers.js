import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import avatarDefault from '../../../../../src/assets/img/png/avatarDefault.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi, activateUserApi, deleteUserApi, signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from "../../../../api/auth";
import AddUserForm from "../AddUserForm/AddUserForm";

import './ListUsers.scss';

const { confirm } = ModalAntd;

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Crear nuevo usuario");
        setModalContent(
            <AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        )
    }

    function deleteUser(user) {
        const accessToken = getAccessTokenApi();
        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que deseas eliminar ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id).then(response => {
                    notification['success']({
                        message: response
                    })
                    setReloadUsers(true)
                }).catch(err => {
                    notification['error']({
                        message: err
                    })
                })
            }
        })
    }


    return (
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <span>
                        {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
                    </span>
                </div>
                <Button type="primary" onClick={addUserModal}>
                    Nuevo usuario
                </Button>
            </div>
            {viewUsersActives ? (
                <UsersActive usersActive={usersActive} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} deleteUser={deleteUser} />
            ) : (
                <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} deleteUser={deleteUser} />
            )}

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div >
    );
}

function UsersActive(props) {
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers, deleteUser } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    };

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} deleteUser={deleteUser} />}
        />
    )
}

function UserActive(props) {
    const { user, editUser, setReloadUsers, deleteUser } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false).then(response => {
            notification['success']({
                message: response
            })
            setReloadUsers(true)
        }).catch(err => {
            notification['error']({
                message: err
            })
        })
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => editUser(user)}
                >
                    <EditOutlined />
                </Button>,

                <Button
                    type="danger"
                    onClick={desactivateUser}
                >
                    <StopOutlined />
                </Button>,

                <Button
                    type="danger"
                    onClick={() => deleteUser(user)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : avatarDefault} />}
                title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastname ? user.lastname : '...'}
                        `}
                description={user.email}
            />
        </List.Item>
    )
}

function UsersInactive(props) {
    const { usersInactive, setReloadUsers, deleteUser } = props;

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} deleteUser={deleteUser} />}
        />
    )
}

function UserInactive(props) {
    const { user, setReloadUsers, deleteUser } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null);
        }
    }, [user]);

    const activateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, true).then(response => {
            notification['success']({
                message: response
            })
            setReloadUsers(true)
        }).catch(err => {
            notification['error']({
                message: err
            })
        })
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={activateUser}
                >
                    <CheckOutlined />
                </Button>,

                <Button
                    type="danger"
                    onClick={() => deleteUser(user)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : avatarDefault} />}
                title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastname ? user.lastname : '...'}
                        `}
                description={user.email}
            />
        </List.Item>
    )
}