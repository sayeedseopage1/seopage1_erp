import React from "react";
import PropTypes from "prop-types";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";

// local styled components
import { ModalInputLabel, ModalTitle } from "../ui/Styles/ui";

const RuleActionConfirmationModal = ({
    open,
    closeModal,
    statusActionData,
    handleStatusUpdate,
    isLoading,
    modalContent,
}) => {
    const handleTernaryForStatus = () => {
        if (statusActionData.status === "0") {
            return modalContent[0];
        } else {
            return modalContent[1];
        }
    };

    const handleColorForStatus = () => {
        if (statusActionData.modalType === "Deal") {
            return statusActionData.status == "0"
                ? "text-danger"
                : "text-success";
        } else {
            return statusActionData.status == "0"
                ? "text-success"
                : "text-danger";
        }
    };

    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="500px"
            height="fit-content"
            maxHeight="fit-content"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Confirmation</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    <div className="row mb-5 align-items-center">
                        <ModalInputLabel className="col-12 text-center">
                            Are you sure you want to{" "}
                            <span className={`${handleColorForStatus()}`}>
                                {" "}
                                {handleTernaryForStatus()}
                            </span>{" "}
                            this {statusActionData.modalType}?
                        </ModalInputLabel>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                handleStatusUpdate();
                            }}
                        >
                            {isLoading
                                ? "Updating..."
                                : `Yes,
                            ${handleTernaryForStatus()}`}
                        </button>
                        <button
                            className="btn btn-warning ml-2 text-white"
                            onClick={closeModal}
                        >
                            No, Cancel
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};

export default RuleActionConfirmationModal;

RuleActionConfirmationModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    statusActionData: PropTypes.object,
    handleStatusUpdate: PropTypes.func,
    isLoading: PropTypes.bool,
    modalContent: PropTypes.object,
};
