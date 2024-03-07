import ReactModal from "react-modal";
import { ModalCloseButton } from "../Styles/ui";
import { IoClose } from "react-icons/io5";

const CustomModal = ({
    open,
    closeModal,
    children,
    contentLabel,
    isCloseButtonShow = false,
    ...props
}) => {
    return (
        <ReactModal
            style={customStyles}
            isOpen={open}
            ariaHideApp={false}
            onRequestClose={closeModal}
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
    },
};
