import React from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { CheckboxContainer, ModalButton, ModalInput, ModalInputLabel, ModalSelectContainer, ModalTitle, StyledInput, StyledLabel } from "../Styles/ui/ui";
import CustomDropDown from "../CustomDropdown";
import { LimitConditions, LimitUnits } from "../../constant";
import { useGetSinglePmPointFactorQuery } from "../../../../../services/api/pmSalesApiSlice";
import useCriteriaList from "../../hooks/useCriteriaList";

const EditFactorModal = ({
    open,
    closeModal,
    editFactorData,
    newFactorData,
    handleChange,
    setNewFactorData,
    handleFactorsAdded,
    isLoadingAddPointFactors,
}) => {
    const { data: singleFactorData, isLoading: isLoadingSingleFactorData } =
        useGetSinglePmPointFactorQuery(editFactorData?.id, {
            skip: !editFactorData?.id,
            staleTime: 0,
            refetchOnMountOrArgChange: true,
        });

    const singleDefaultFactor = singleFactorData?.data

    const { title, project_type, lower_limit, upper_limit, limit_type, limit_unit, lower_limit_condition, upper_limit_condition, point_type, points, point_depend_on_model, point_depend_on_field, status } = editFactorData || {}


    // criteria list data from api start
    // const { CriteriaConstList } = useCriteriaList()


    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Edit Point Table"
            width="800px"
            height="650px"
            maxHeight="650px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Point Table</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    {/* criteria  *****required****** */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Criteria:
                        </ModalInputLabel>
                        <ModalInputLabel className="col-8" color="#8F8F8F">
                            {singleDefaultFactor?.criteria?.title}
                        </ModalInputLabel>
                    </div>

                    {/* title  *****required****** */}
                    {
                        singleDefaultFactor?.title && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Title <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="text"
                                    className="w-100"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }

                    {/* Project Type  *****required****** */}
                    {
                        project_type && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Project Type <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 px-0">
                                <CheckboxContainer className="mr-3">
                                    <StyledInput
                                        type="checkbox"
                                        id="fixedType"
                                        name="project_type"
                                        onChange={handleChange}
                                        checked={project_type == 1}
                                        value={1}
                                    />
                                    <StyledLabel htmlFor="fixedType">Fixed</StyledLabel>
                                </CheckboxContainer>
                                <CheckboxContainer>
                                    <StyledInput
                                        type="checkbox"
                                        id="hourlyType"
                                        name="project_type"
                                        onChange={handleChange}
                                        checked={project_type == 2}
                                        value={2}
                                    />
                                    <StyledLabel htmlFor="hourlyType">Hourly</StyledLabel>
                                </CheckboxContainer>
                            </div>
                        </div>
                    }

                    {/* Lower Limit  *****required****** */}
                    {
                        singleDefaultFactor?.lower_limit && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Lower Limit <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="number"
                                    className="w-100"
                                    name="lower_limit"
                                    value={lower_limit}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }


                    {/* Upper Limit  *****required****** */}
                    {
                        singleDefaultFactor?.upper_limit && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Upper Limit <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="number"
                                    className="w-100"
                                    name="upper_limit"
                                    value={upper_limit}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }

                    {/* limit type  *****required****** */}
                    {
                        singleDefaultFactor?.limit_type && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Limit Type <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 px-0">
                                <CheckboxContainer className="mr-3">
                                    <StyledInput
                                        type="checkbox"
                                        id="staticType"
                                        name="limit_type"
                                        onChange={handleChange}
                                        checked={limit_type == 1}
                                        value={1}
                                    />
                                    <StyledLabel htmlFor="staticType">Static</StyledLabel>
                                </CheckboxContainer>
                                <CheckboxContainer>
                                    <StyledInput
                                        type="checkbox"
                                        id="percentageType"
                                        name="limit_type"
                                        onChange={handleChange}
                                        checked={limit_type == 2}
                                        value={2}
                                    />
                                    <StyledLabel htmlFor="percentageType">Percentage</StyledLabel>
                                </CheckboxContainer>
                            </div>
                        </div>
                    }

                    {/* TODO: */}
                    {/* limit unit  *****required****** */}
                    {
                        singleDefaultFactor?.limit_unit && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Limit Unit<sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 px-0 flex-column">
                                <ModalSelectContainer>
                                    <CustomDropDown
                                        filedName="limit_unit"
                                        data={LimitUnits}
                                        selected={limit_unit}
                                        setSelected={handleChange}
                                    />
                                </ModalSelectContainer>
                            </div>
                        </div>
                    }

                    {/* TODO: */}
                    {/* Upper limit condition  *****required****** */}
                    <div className="row mb-4 align-items-center">
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

                    {/* TODO: */}
                    {/* Lower limit condition  *****required****** */}
                    <div className="row mb-4 align-items-center">
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

                    {/* point type  *****required****** */}
                    {
                        singleDefaultFactor?.point_type && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Point Type <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 px-0">
                                <CheckboxContainer className="mr-3">
                                    <StyledInput
                                        type="checkbox"
                                        id="staticType"
                                        name="point_type"
                                        onChange={handleChange}
                                        checked={point_type == 1}
                                        value={1}
                                    />
                                    <StyledLabel htmlFor="staticType">Static</StyledLabel>
                                </CheckboxContainer>
                                <CheckboxContainer>
                                    <StyledInput
                                        type="checkbox"
                                        id="percentageType"
                                        name="point_type"
                                        onChange={handleChange}
                                        checked={point_type == 2}
                                        value={2}
                                    />
                                    <StyledLabel htmlFor="percentageType">Percentage</StyledLabel>
                                </CheckboxContainer>
                            </div>
                        </div>
                    }

                    {/* points *****required****** */}
                    {
                        singleDefaultFactor?.points && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Points <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="number"
                                    className="w-100"
                                    name="points"
                                    value={points}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }

                    {/* point depend on model *****Optional******  */}
                    {
                        singleDefaultFactor?.point_depend_on_model && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Point Depend on Model:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="text"
                                    className="w-100"
                                    name="point_depend_on_model"
                                    value={point_depend_on_model}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }

                    {/* point depend on field *****Optional****** */}
                    {
                        singleDefaultFactor?.point_depend_on_field && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Point Depend on Field:{" "}
                            </ModalInputLabel>
                            <div className="col-8 flex-column px-0">
                                <ModalInput
                                    type="text"
                                    className="w-100"
                                    name="point_depend_on_field"
                                    value={point_depend_on_field}
                                    onChange={handleChange}
                                    placeholder="Write Here"
                                />
                            </div>
                        </div>
                    }

                    {/* status *****Optional****** */}
                    {
                        singleDefaultFactor?.status && <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Status <sup>*</sup>:{" "}
                            </ModalInputLabel>
                            <div className="col-8 px-0">
                                <CheckboxContainer className="mr-3">
                                    <StyledInput
                                        type="checkbox"
                                        id="activeType"
                                        name="status"
                                        onChange={handleChange}
                                        checked={status == 1}
                                        value={1}
                                    />
                                    <StyledLabel htmlFor="activeType">Active</StyledLabel>
                                </CheckboxContainer>
                                <CheckboxContainer>
                                    <StyledInput
                                        type="checkbox"
                                        id="deactiveType"
                                        name="status"
                                        onChange={handleChange}
                                        checked={status == 0}
                                        value={0}
                                    />
                                    <StyledLabel htmlFor="deactiveType">Deactive</StyledLabel>
                                </CheckboxContainer>
                            </div>
                        </div>
                    }
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

export default EditFactorModal;

EditFactorModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    newFactorData: PropTypes.object,
    handleChange: PropTypes.func,
    setNewFactorData: PropTypes.func,
    handleFactorsAdded: PropTypes.func,
    isLoadingAddPointFactors: PropTypes.bool,
};