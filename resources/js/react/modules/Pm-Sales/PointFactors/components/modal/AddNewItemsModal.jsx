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
    newFactorDataValidation,
    isLoadingAddPmFactors,
    activeFactorFields
}) => {

    // criteria list data from api
    const { CriteriaConstList } = useCriteriaList()
    // get acticve factor fields from api 


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
                                        {newFactorDataValidation?.title && (
                                            <p className="text-danger">
                                                Title is required
                                            </p>
                                        )}
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
                                                name="project_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.project_type === '1'}
                                                value="1"
                                            />
                                            <StyledLabel htmlFor="fixedType">Fixed</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="hourlyType"
                                                name="project_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.project_type === '2'}
                                                value="2"
                                            />
                                            <StyledLabel htmlFor="hourlyType">Hourly</StyledLabel>
                                        </CheckboxContainer>
                                        {newFactorDataValidation?.project_type && (
                                            <p className="text-danger">
                                                Project Type is required
                                            </p>
                                        )}
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
                                            name="lower_limit"
                                            value={newFactorData?.lower_limit}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                        {newFactorDataValidation?.lower_limit && (
                                            <p className="text-danger">
                                                Lower Limit is required
                                            </p>
                                        )}
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
                                            name="upper_limit"
                                            value={newFactorData?.upper_limit}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                        {newFactorDataValidation?.upper_limit && (
                                            <p className="text-danger">
                                                Upper Limit is required
                                            </p>
                                        )}
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
                                                id="staticType"
                                                name="limit_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.limit_type === '1'}
                                                value="1"
                                            />
                                            <StyledLabel htmlFor="staticType">Static</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="percentageType"
                                                name="limit_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.limit_type === '2'}
                                                value="2"
                                            />
                                            <StyledLabel htmlFor="percentageType">Percentage</StyledLabel>
                                        </CheckboxContainer>
                                        {newFactorDataValidation?.limit_type && (
                                            <p className="text-danger">
                                                Limit type is required
                                            </p>
                                        )}
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
                                                filedName="limit_unit"
                                                data={LimitUnits}
                                                selected={newFactorData?.limit_unit}
                                                setSelected={handleChange}
                                            />
                                        </ModalSelectContainer>
                                        {newFactorDataValidation?.limit_unit && (
                                            <p className="text-danger">
                                                Limit unit is required
                                            </p>
                                        )}
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
                                                filedName="lower_limit_condition"
                                                data={LimitConditions}
                                                selected={newFactorData?.lower_limit_condition}
                                                setSelected={handleChange}
                                            />
                                        </ModalSelectContainer>
                                        {newFactorDataValidation?.lower_limit_condition && (
                                            <p className="text-danger">
                                                Lower Limit Condition is required
                                            </p>
                                        )}
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
                                                filedName="upper_limit_condition"
                                                data={LimitConditions}
                                                selected={newFactorData?.upper_limit_condition}
                                                setSelected={handleChange}
                                            />
                                        </ModalSelectContainer>
                                        {newFactorDataValidation?.upper_limit_condition && (
                                            <p className="text-danger">
                                                Upper Limit Condition is required
                                            </p>
                                        )}
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
                                                id="staticType"
                                                name="point_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.point_type === '1'}
                                                value="1"
                                            />
                                            <StyledLabel htmlFor="staticType">Static</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="percentageType"
                                                name="point_type"
                                                onChange={handleChange}
                                                checked={newFactorData?.point_type === '2'}
                                                value="2"
                                            />
                                            <StyledLabel htmlFor="percentageType">Percentage</StyledLabel>
                                        </CheckboxContainer>
                                        {newFactorDataValidation?.point_type && (
                                            <p className="text-danger">
                                                Point type is required
                                            </p>
                                        )}
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
                                        {newFactorDataValidation?.points && (
                                            <p className="text-danger">
                                                Points is required
                                            </p>
                                        )}
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
                                            name="point_depend_on_model"
                                            value={newFactorData?.point_depend_on_model}
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
                                            name="point_depend_on_field"
                                            value={newFactorData?.point_depend_on_field}
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
                                        Status <sup>*</sup>:{" "}
                                    </ModalInputLabel>
                                    <div className="col-8 px-0">
                                        <CheckboxContainer className="mr-3">
                                            <StyledInput
                                                type="checkbox"
                                                id="activeType"
                                                name="status"
                                                onChange={handleChange}
                                                checked={newFactorData?.status === '1'}
                                                value="1"
                                            />
                                            <StyledLabel htmlFor="activeType">Active</StyledLabel>
                                        </CheckboxContainer>
                                        <CheckboxContainer>
                                            <StyledInput
                                                type="checkbox"
                                                id="deactiveType"
                                                name="status"
                                                onChange={handleChange}
                                                checked={newFactorData?.status === '0'}
                                                value="0"
                                            />
                                            <StyledLabel htmlFor="deactiveType">Deactive</StyledLabel>
                                        </CheckboxContainer>
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