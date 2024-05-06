import { Modal } from 'antd';
import React from 'react';

const CustomAntdModal = ({ title, antdModalOpen, setAntdModalOpen, children }) => {

    return (
        <div>
            <Modal
                title={title || null}
                centered
                footer={null}
                maskClosable={false}
                open={antdModalOpen}
                // onOk={() => setRegularPointsModalOpen(false)}
                onCancel={() => setAntdModalOpen(false)}
            >
                <div className={`mt-3 ${!title && 'pt-4'}`}>
                    {
                        children
                    }
                </div>
            </Modal>
        </div>
    );
};

export default CustomAntdModal;