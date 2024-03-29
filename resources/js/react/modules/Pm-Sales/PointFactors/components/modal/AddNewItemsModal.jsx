import React from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { CheckboxContainer, ModalButton, ModalInput, ModalInputLabel, ModalSelectContainer, ModalTitle, StyledInput, StyledLabel } from "../Styles/ui/ui";
import CustomDropDown from "../CustomDropdown";
import { Categories } from "../../constant";

const AddNewItemsModal = ({
    open,
    closeModal,
    newFactorData,
    handleChange,
    setNewFactorData,
    handleFactorsAdded,
    isLoadingAddPointFactors,
}) => {


    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="800px"
            height="650px"
            maxHeight="650px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Add a New Item</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    {/* Project Type  */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-3">
                            Project Type <sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <>
                            <div className="col-3 px-0">
                                <CheckboxContainer className="mr-3">
                                    <StyledInput
                                        type="checkbox"
                                        id="fixedType"
                                        name="projectType"
                                        onChange={handleChange}
                                        checked={newFactorData?.projectType === 'fixed'}
                                        value="fixed"
                                    />
                                    <StyledLabel htmlFor="fixedType">Fixed</StyledLabel>
                                </CheckboxContainer>
                                <CheckboxContainer>
                                    <StyledInput
                                        type="checkbox"
                                        id="hourlyType"
                                        name="projectType"
                                        onChange={handleChange}
                                        checked={newFactorData?.projectType === 'hourly'}
                                        value="hourly"
                                    />
                                    <StyledLabel htmlFor="hourlyType">Hourly</StyledLabel>
                                </CheckboxContainer>

                            </div>
                            <span className="col-1 px-0">Or</span>
                            <div className="col-5 flex-column px-0">
                                <ModalInput
                                    type="text"
                                    className="w-100"
                                    name="projectTypeText"
                                    value={newFactorData?.projectTypeText}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                    disabled={newFactorData?.projectType === 'fixed' || newFactorData?.projectType === 'hourly'}
                                />
                                {/* {newPolicyDataValidation?.policyName && (
                                <p className="text-danger">
                                    Policy name is required
                                </p>
                            )} */}
                            </div>
                        </>
                    </div>
                    {/* criteria  */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-3">
                            Criteria <sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <div className="col-9 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="criteria"
                                value={newFactorData?.criteria}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {/* {newPolicyDataValidation?.policyName && (
                                <p className="text-danger">
                                    Policy name is required
                                </p>
                            )} */}
                        </div>
                    </div>
                    {/* factors  */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-3">
                            Factors <sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <div className="col-9 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="factors"
                                value={newFactorData?.factors}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {/* {newPolicyDataValidation?.policyName && (
                                <p className="text-danger">
                                    Policy name is required
                                </p>
                            )} */}
                        </div>
                    </div>
                    {/* Categories */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-3">
                            Categories<sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <div className="col-9 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="categories"
                                    data={Categories}
                                    selected={newFactorData?.categories}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                            {/* {newPolicyDataValidation?.policyType && (
                                <p className="text-danger">
                                    Policy type is required
                                </p>
                            )} */}
                        </div>
                    </div>
                    {/* points  */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-3">
                            Points <sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <div className="col-9 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="points"
                                value={newFactorData?.points}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {/* {newPolicyDataValidation?.policyName && (
                                <p className="text-danger">
                                    Policy name is required
                                </p>
                            )} */}
                        </div>
                    </div>
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
    newFactorData: PropTypes.object,
    handleChange: PropTypes.func,
    setNewFactorData: PropTypes.func,
    handleFactorsAdded: PropTypes.func,
    isLoadingAddPointFactors: PropTypes.bool,
};