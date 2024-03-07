import React from "react";
import PropTypes from "prop-types";
// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import { ModalButton, ModalInput, ModalInputLabel, ModalTitle } from "../ui/Styles/ui";
import { Flex } from "../../../../global/styled-component/Flex";



const AddNewPolicyModal = ({ open, closeModal }) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
             <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Applicable Point</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3 w-100">
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5">
                            Policy Name <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            placeholder="Write here eg: 0.5,1,2 "
                        />
                    </div>
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Department Name{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            placeholder="Write here eg: 0.5,1,2 "
                        />
                    </div>
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Rules{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            placeholder="Write here eg: 0.5,1,2 "
                        />
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Current point{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            defaultValue="0.5"
                        />
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5">
                            New point<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            placeholder="Write here eg: 0.5,1,2 "
                        />
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton width="177px">Save</ModalButton>
                    <ModalButton
                        onClick={closeModal}
                        width="177px"
                        color="white"
                        border="1px solid #1492E6"
                        textColor="#1492E6"
                    >
                        Do it latter
                    </ModalButton>
                </Flex>
            </div>
        </CustomModal>
    );
};

export default AddNewPolicyModal;

AddNewPolicyModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
}
