import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

//style
import "./antdModal.css";

const AntdModal = ({
    title,
    width,
    height,
    children,
    closeModal,
    isCentered,
    isModalOpen,
    parentClassName,
}) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={closeModal}
            centered={isCentered}
            width={width}
            footer={null}
            maskClosable={false}
            styles={{
                body: {
                    maxHeight: height,
                },
            }}
            className={`${parentClassName} ${
                title
                    ? `sp1_antd_modal_title_with_close`
                    : `sp1_antd_modal_title_with_close_hide`
            } sp1_antd_Modal`}
        >
            {children}
        </Modal>
    );
};

export default AntdModal;

AntdModal.propTypes = {
    title: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node,
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    classNames: PropTypes.object,
    parentClassName: PropTypes.string,
};
