import React from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { ModalButton, ModalTitle } from "../Styles/ui/ui";

const AddNewItemsModal = ({
    open,
    closeModal,
    handleFactorsAdded,
    isLoadingAddPointFactors,
}) => {


    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            height="550px"
            maxHeight="550px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Add a New Item</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    input fields here
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleFactorsAdded} width="177px">
                        {isLoadingAddPointFactors
                            ? "Loading..."
                            : "Save"}
                    </ModalButton>
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

export default AddNewItemsModal;

AddNewItemsModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    departments: PropTypes.array,
    newPolicyData: PropTypes.object,
    handleChange: PropTypes.func,
    handleMultiSelectChange: PropTypes.func,
    handleAddRuleOnPolicy: PropTypes.func,
    newPolicyDataValidation: PropTypes.object,
    newPolicyInputData: PropTypes.array,
    setNewPolicyData: PropTypes.func,
    isRuleUpdating: PropTypes.bool,
    setIsRuleUpdating: PropTypes.func,
    handleFactorsAdded: PropTypes.func,
    isLoadingAddSalesRiskAnalysisRule: PropTypes.bool,
};
