import React from 'react';
// import CustomAntdModal from '../../ui/CustomAntdModal';
import { Modal } from 'antd';

const PayNowModal = ({ isPayNowModalOpen, handlePayNowOk, handlePayNowCancel }) => {

    return (
        <>
            <Modal title="Held Incentives Disbursement" open={isPayNowModalOpen} onOk={handlePayNowOk} onCancel={handlePayNowCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default PayNowModal;