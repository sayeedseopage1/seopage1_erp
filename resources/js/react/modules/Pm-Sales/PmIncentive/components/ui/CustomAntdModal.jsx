import { Modal } from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const CustomAntdModal = ({ title, antdModalOpen, setAntdModalOpen, children, modalWidth }) => {

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
                width={modalWidth || 545}
            >
                <div className=''>
                    {
                        children
                    }
                </div>
            </Modal>
        </div>
    );
};

export default CustomAntdModal;

CustomAntdModal.prototypes = {
    title: PropTypes.node,
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func,
    children: PropTypes.node,
    modalWidth: PropTypes.number
}