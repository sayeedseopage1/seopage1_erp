import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { CheckboxContainer, ModalButton, ModalInput, ModalInputLabel, ModalSelectContainer, ModalTitle, StyledInput, StyledLabel } from "../Styles/ui/ui";
import CustomDropDown from "../CustomDropdown";
import { LimitConditions, LimitUnits } from "../../constant";
import useCriteriaList from "../../hooks/useCriteriaList";
import useActiveFactorFields from "../../hooks/useActiveFactorFields";
import _ from "lodash";
import Switch from "../../../../../global/Switch";

const AddNewItemsModal = ({
    open,
    closeModal,
    newFactorData,
    handleChange,
    setNewFactorData,
    handleFactorsAdded,
    isLoadingAddPmFactors,
}) => {

    // criteria list data from api
    const { CriteriaConstList } = useCriteriaList()
    // get acticve factor fields from api 
    const { activeFactorFields } = useActiveFactorFields({ newFactorData })

    // console.log("CriteriaConstList", newFactorData?.criteria)

    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Item"
            width="800px"
            // height="650px"
            maxHeight="650px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Add a New Item</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    {/* criteria  *****required****** */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Criteria<sup>*</sup>:{" "}
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="criteria"
                                    data={CriteriaConstList}
                                    selected={newFactorData?.criteria}
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
                    <Switch>
                        <Switch.Case condition={!_.isEmpty(newFactorData?.criteria)}>
                            {/* title  *****required****** */}
                            {
                                activeFactorFields?.title && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Title <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="text"
                                            className="w-100"
                                            name="title"
                                            value={newFactorData?.title}
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
                            }

                            {/* Project Type  *****required****** */}
                            {
                                activeFactorFields?.project_type && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Project Type <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0">
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
                                </div>
                            }

                            {/* Upper Limit  *****required****** */}
                            {
                                activeFactorFields?.upper_limit && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Upper Limit <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="number"
                                            className="w-100"
                                            name="upperLimit"
                                            value={newFactorData?.upperLimit}
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
                            }

                            {/* Lower Limit  *****required****** */}
                            {
                                activeFactorFields?.lower_limit && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Lower Limit <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="number"
                                            className="w-100"
                                            name="lowerLimit"
                                            value={newFactorData?.lowerLimit}
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
                            }

                            {/* limit type  *****required****** */}
                            {
                                activeFactorFields?.limit_type && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Limit Type <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0">
                                        <CheckboxContainer className="mr-3">
                                            <StyledInput
                                                type="checkbox"
                                                id="inclusiveType"
                                                name="limitType"
                                                onChange={handleChange}
                                                checked={newFactorData?.limitType === 'inclusive'}
                                                value="inclusive"
                                            />
                                            <StyledLabel htmlFor="inclusiveType">Inclusive</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="exclusiveType"
                                                name="limitType"
                                                onChange={handleChange}
                                                checked={newFactorData?.limitType === 'exclusive'}
                                                value="exclusive"
                                            />
                                            <StyledLabel htmlFor="exclusiveType">Exclusive</StyledLabel>
                                        </CheckboxContainer>
                                    </div>
                                </div>
                            }

                            {/* limit unit  *****required****** */}
                            {
                                activeFactorFields?.limit_unit && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Limit Unit<sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0 flex-column">
                                        <ModalSelectContainer>
                                            <CustomDropDown
                                                filedName="limitUnit"
                                                data={LimitUnits}
                                                selected={newFactorData?.limitUnit}
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
                            }

                            {/* Upper limit condition  *****required****** */}
                            {
                                activeFactorFields?.upper_limit_condition && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Upper Limit Condition<sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0 flex-column">
                                        <ModalSelectContainer>
                                            <CustomDropDown
                                                filedName="upperLimitCondition"
                                                data={LimitConditions}
                                                selected={newFactorData?.upperLimitCondition}
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
                            }

                            {/* Lower limit condition  *****required****** */}
                            {
                                activeFactorFields?.lower_limit_condition && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Lower Limit Condition<sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0 flex-column">
                                        <ModalSelectContainer>
                                            <CustomDropDown
                                                filedName="lowerLimitCondition"
                                                data={LimitConditions}
                                                selected={newFactorData?.lowerLimitCondition}
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
                            }

                            {/* point type  *****required****** */}
                            {
                                activeFactorFields?.point_type && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Point Type <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0">
                                        <CheckboxContainer className="mr-3">
                                            <StyledInput
                                                type="checkbox"
                                                id="fixedType"
                                                name="pointType"
                                                onChange={handleChange}
                                                checked={newFactorData?.pointType === 'fixed'}
                                                value="fixed"
                                            />
                                            <StyledLabel htmlFor="fixedType">Fixed</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="percentageType"
                                                name="pointType"
                                                onChange={handleChange}
                                                checked={newFactorData?.pointType === 'percentage'}
                                                value="percentage"
                                            />
                                            <StyledLabel htmlFor="percentageType">Percentage</StyledLabel>
                                        </CheckboxContainer>
                                    </div>
                                </div>
                            }

                            {/* points *****required****** */}
                            {
                                activeFactorFields?.points && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Points <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="number"
                                            className="w-100"
                                            pattern="[0-9]*"
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
                            }

                            {/* point depend on model *****Optional******  */}
                            {
                                activeFactorFields?.point_depend_on_model && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Point Depend on Model:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="text"
                                            className="w-100"
                                            name="pointDependOnModel"
                                            value={newFactorData?.pointDependOnModel}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                    </div>
                                </div>
                            }

                            {/* point depend on field *****Optional****** */}
                            {
                                activeFactorFields?.point_depend_on_field && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Point Depend on Field:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="text"
                                            className="w-100"
                                            name="pointDependOnField"
                                            value={newFactorData?.pointDependOnField}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                    </div>
                                </div>
                            }

                            {/* status *****Optional****** */}
                            {
                                activeFactorFields?.status && <div className="row mb-4 align-items-center">
                                    <ModalInputLabel className="col-4">
                                        Status:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <ModalInput
                                            type="number"
                                            className="w-100"
                                            name="status"
                                            value={newFactorData?.status}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                    </div>
                                </div>
                            }
                        </Switch.Case>
                    </Switch>
                </div>

                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleFactorsAdded} width="177px">
                        {isLoadingAddPmFactors
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