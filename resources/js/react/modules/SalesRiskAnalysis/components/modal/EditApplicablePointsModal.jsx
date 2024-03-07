import React from "react";
import CustomModal from "../ui/CustomModal/CustomModal";
import { ModalButton, ModalInputLabel, ModalTitle } from "../ui/Styles/ui";
import { Flex } from "../../../../global/styled-component/Flex";

const EditApplicablePointsModal = ({ open, closeModal,  ...props }) => {
    return (
        <CustomModal
            closeModal={closeModal}
            contentLabel="Edit Applicable Point Table"
            open={open}
            isCloseButtonShow
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
              
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Applicable Point</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4">
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">Policy Name :</ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F"> 1-4. Hourly rates: </ModalInputLabel>
                    </div>
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">Department Name : </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">1-4. Hourly rates: </ModalInputLabel>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton width="177px">
                        Save
                    </ModalButton>
                    <ModalButton width="177px" color="white" border="1px solid #1492E6" textColor="#1492E6">
                        Do it latter
                    </ModalButton>
                </Flex>
            </div>
        </CustomModal>
    );
};

export default EditApplicablePointsModal;
