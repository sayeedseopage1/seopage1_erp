import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { ModalCloseButton } from "../Styles/ui";
import { IoClose } from "react-icons/io5";


const CustomModal = ({
    open,
    closeModal,
    children,
    contentLabel,
    width,
    isCloseButtonShow = false,
    scroLlBottom = false,
    ...props
}) => {
    
    return (
        <ReactModal
            style={{
                customStyles,
                content: {
                    ...customStyles.content,
                    // width: width || "600px",
                    maxWidth: width || "600px",
                    height: props.height || "fit-content",
                    maxHeight: props.maxHeight || "600px",
                },
            }}
            isOpen={open}
            ariaHideApp={false}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            contentLabel={contentLabel}
            {...props}
        >
            {/* Close Button */}
            {isCloseButtonShow && (
                <div className="d-flex justify-content-end align-items-center mb-2">
                    <ModalCloseButton onClick={closeModal}>
                        <IoClose />
                    </ModalCloseButton>
                </div>
            )}
            {/* Modal Content */}
            {children}
        </ReactModal>
    );
};

export default CustomModal;

const customStyles = {
    overlay: {
        zIndex: 99999998,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 99999999,
        maxWidth: "600px",
        height: "fit-content",
        maxHeight: "fit-content",
        margin: "auto auto",
        padding: "20px",
        borderRadius: "20px",
        border: "none",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        blur: "5px",
    },
};

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    contentLabel: PropTypes.string.isRequired,
    width: PropTypes.string,
    isCloseButtonShow: PropTypes.bool,
    height: PropTypes.string,
    maxHeight: PropTypes.string,
};
