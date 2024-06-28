import React from "react";
import PropTypes from "prop-types";
import { CiCircleInfo } from "react-icons/ci";

// UI Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import SingleButton from "../ui/CustomButton/SingleButton";

// UI Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

const ConfirmationModal = ({
    isModalOpen,
    closeModal,
    handleAction,
    modalData,
    isLoading,
}) => {
    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="500px"
            isCentered
            parentClassName="confirmationModal"
        >
            <ModalContentContainer>
                <div className="confirmationModalContentWrapper">
                    <CiCircleInfo />
                    <div className="confirmationModalContent">
                        <h2>{modalData.modalTitle}</h2>
                        <p>{modalData.confirmationInfo}</p>
                    </div>
                </div>
            </ModalContentContainer>

            <ModalContentContainer>
                <div className="modalButtonContainer justify-content-center">
                    <SingleButton
                        label={modalData.confirmationButton}
                        onClick={handleAction}
                        type="primary"
                        isDisabled={isLoading}
                    />
                    <SingleButton
                        label="Close"
                        className=""
                        onClick={closeModal}
                        type="secondary"
                    />
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default ConfirmationModal;

ConfirmationModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
