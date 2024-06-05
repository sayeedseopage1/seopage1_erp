import { Modal } from "antd";
import PropTypes from "prop-types";


//style
import "./customModal.css";

const CustomModal = ({
    isModalOpen,
    closeModal,
    modalStyles,
    classNames,
    parentClassName,
    title,
    isCentered,
    children,
    width,
    height,
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
                    ? `customAntModalTitleWithClose`
                    : `customAntModalTitleWithCloseHide`
            } customAntModal `}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;

CustomModal.propTypes = {
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
