import React from "react";
import { ConfigProvider, Modal,  } from "antd";
import PropTypes from "prop-types";

// Styles
import "./customAntModal.css";

const CustomAntModal = ({
    isModalOpen,
    closeModal,
    title = "",
    isCentered = false,
    children,
    modalStyles,
    classNames,
    parentClassName,
    width = "75vw",
    height = "75vh",
}) => {
    return (
        <ConfigProvider
            modal={{
                classNames,
                styles: modalStyles,
            }}
        >
            <Modal
                title={title}
                open={isModalOpen}
                onCancel={closeModal}
                centered={isCentered}
                width={width}
                footer={null}
                styles={{
                    body: {
                        maxHeight: height,
                    },
                }}
                className={`${parentClassName} ${
                    title
                        ? `customAntModalTitleWithClose`
                        : "customAntModalTitleWithCloseHide"
                } custom-ant-modal `}
            >
                {children}
            </Modal>
        </ConfigProvider>
    );
};

export default CustomAntModal;

CustomAntModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalStyles: PropTypes.object,
    classNames: PropTypes.object,
    parentClassName: PropTypes.string,
    title: PropTypes.string,
    isCentered: PropTypes.bool,
    children: PropTypes.node,
    width: PropTypes.string,
    height: PropTypes.string,
};

