import React from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { Modal } from 'antd';

const RemoveRatioItemsModal = ({ antdModalOpen, setAntdModalOpen }) => {
    const handleCancel = () => {
        setAntdModalOpen(false)
    }

    return (
        <div>
            <Modal
                closable={false}
                maskClosable={false}
                title={
                    <div className='add_new_axis_item_modal_header'>
                        <h4 className="" >Remove Items</h4>
                    </div>
                }
                open={antdModalOpen}
                footer={null}
                modalWidth={445}
                className='add_new_axis_item_modal'
                centered={true}
            >
                <div className='add_new_axis_item_modal_body'>


                    <div className='pay_now_modal_footer'>
                        <ButtonComponent color='#F66' border='1px solid #F66' textColor='#fff' font='14px'>Remove</ButtonComponent>
                        <ButtonComponent onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default RemoveRatioItemsModal;

RemoveRatioItemsModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};