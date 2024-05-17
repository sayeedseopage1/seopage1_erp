import { Button, ConfigProvider, Modal, Space } from "antd";
import { createStyles, useTheme } from "antd-style";
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
                footer={null}
                className={`${parentClassName} ${title ?`customAntModalTitleWithClose` : "customAntModalTitleWithCloseHide" } custom-ant-modal `}
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
}
