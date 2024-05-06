import { Modal } from 'antd';
import React from 'react';

const CustomAntdModal = ({ title, antdModalOpen, setAntdModalOpen, children }) => {

    return (
        <div>
            <Modal
                title={title}
                centered
                footer={null}
                maskClosable={false}
                open={antdModalOpen}
                // onOk={() => setRegularPointsModalOpen(false)}
                onCancel={() => setAntdModalOpen(false)}
            >
                {
                    children
                }
            </Modal>
        </div>
    );
};

export default CustomAntdModal;