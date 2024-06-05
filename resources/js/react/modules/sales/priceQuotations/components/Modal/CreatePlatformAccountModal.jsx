import React from "react";

// Components - Shared - UI
import CustomModal from "../UI/CustomModal/CustomModal";
import CustomModalHeader from "../UI/CustomModalHeader/CustomModalHeader";

// Components - Local - Styled Components
import { ModalContentContainer } from "../UI/StyledComponents";
import CustomInput from "../UI/CustomInput/CustomInput";

const CreatePlatformAccountModal = ({ isModalOpen, closeModal }) => {
    return (
        <CustomModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            height="85vh"
            width="1100px"
            isCentered
        >
            <CustomModalHeader
                title="Create Platform Account"
                closeModal={closeModal}
            />
            <ModalContentContainer color="var(--primaryLightDarkBlue)">
                <CustomInput
                    label="1. Account Name"
                    fieldName="account_name"
                    isRequired
                    placeHolder="Enter Account Name"
                />
            </ModalContentContainer>
        </CustomModal>
    );
};

export default CreatePlatformAccountModal;
