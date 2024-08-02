import React from "react";
import { ConfigProvider, Modal } from "antd";
import PropTypes from "prop-types";

// Styles
import "./customAntModal.css";

/**
 *
 *  CustomAntModal component
 *  @param {boolean} isModalOpen - Flag to open modal
 *  @param {function} closeModal - Close modal event handler
 *  @param {string} title - Title of the modal
 *  @param {boolean} isCentered - Flag to center modal
 *  @param {node} children - Child components
 *  @param {object} modalStyles - Styles for modal
 *  @param {object} classNames - Class names for modal
 *  @param {string} parentClassName - Parent class name
 *  @param {string} width - Width of the modal
 *  @param {string} height - Height of the modal
 *  @param {string} data_testid - Data-testid for testing
 *  @returns {JSX.Element}
 *  @description CustomAntModal component to render custom modal
 */

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
    data_testid,
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
                maskClosable={false}
                data-testid={data_testid}
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
    data_testid: PropTypes.string,
};
