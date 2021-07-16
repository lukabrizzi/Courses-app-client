import React from 'react';
import { Modal as ModalAntd } from 'antd';
import 'antd/dist/antd.css';

export default function Modal(props) {
    const { children, title, isVisible, setIsVisible } = props;

    return (
        <ModalAntd
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={false}
        >
            {children}
        </ModalAntd>
    )

}