import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { CheckboxContainer, ModalButton, ModalInput, ModalInputLabel, ModalSelectContainer, ModalTitle, StyledInput, StyledLabel } from "../Styles/ui/ui";
import CustomDropDown from "../CustomDropdown";
import { LimitUnits } from "../../constant";
import { useGetSinglePmPointFactorQuery } from "../../../../../services/api/pmSalesApiSlice";
import Spinner from "../loader/Spinner";

const EditFactorModal = ({
    open,
    closeModal,
    editFactorData,
    handleChange,
    handleUpdateFactor,
    isUpdatePmPointfactorLoading,
    editFactorDataValidation,
    setEditFactorData
}) => {
    const { data: singleFactorData, isLoading: isLoadingSingleFactorData } =
        useGetSinglePmPointFactorQuery(editFactorData?.id, {
            skip: !editFactorData?.id,
            staleTime: 0,
            refetchOnMountOrArgChange: true,
        });

    const singleDefaultFactor = singleFactorData?.data

    const { title, project_type, lower_limit, upper_limit, lower_limit_condition, upper_limit_condition, limit_type, limit_unit, point_type, points, status, infiniteValueDown, infiniteValueUp } = editFactorData || {}


    useEffect(() => {
        if ((infiniteValueUp && !infiniteValueDown)) {
            setEditFactorData({ ...editFactorData, upper_limit: lower_limit })
        }
    }, [infiniteValueUp])

    useEffect(() => {
        if ((!infiniteValueUp && infiniteValueDown)) {
            setEditFactorData({ ...editFactorData, lower_limit: upper_limit })
        }
    }, [infiniteValueDown])

    // console.log("lower limit disable", !infiniteValueUp && infiniteValueDown)
    // console.log("upper limit disable", infiniteValueUp && !infiniteValueDown)

    // console.log("lower_limit_condition", lower_limit_condition)
    // console.log("upper_limit_condition", upper_limit_condition)

    // const lowerLimitConditionVal = editFactorData?.infiniteValueDown ? editFactorData?.infiniteValueDown : editFactorData?.limit_type == 2 ? "==" : "<"
    // const upperLimitConditionVal = editFactorData?.infiniteValueUp ? editFactorData?.infiniteValueUp : editFactorData?.limit_type == 2 ? "==" : ">="

    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Edit Point Table"
            width="800px"
            height="550px"
            maxHeight="550px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Point Table</ModalTitle>
                </div>

                {
                    isLoadingSingleFactorData ? <Spinner /> : <div className="d-flex flex-column mb-4 px-3  w-100">
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
                                    {editFactorDataValidation?.title && (
                                        <p className="text-danger">
                                            Title is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        }

                        {/* Project Type  *****required****** */}
                        {
                            project_type && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Project Type <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <ModalInputLabel className="col-8" color="#8F8F8F">
                                    {project_type == 1 ? "Fixed" : "Hourly"}
                                </ModalInputLabel>
                            </div>
                        }

                        {/* limit type  *****required****** */}
                        {
                            singleDefaultFactor?.limit_type && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Limit Type <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <ModalInputLabel className="col-8" color="#8F8F8F">
                                    {limit_type == 1 ? "Range" : "Boolean"}
                                </ModalInputLabel>
                            </div>
                        }

                        {/* Lower Limit  *****required****** */}
                        {
                            limit_type == 1 && <div className="row mb-4 align-items-start">
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
                                    // disabled={(!infiniteValueUp && infiniteValueDown)}
                                    />
                                    {editFactorDataValidation?.lower_limit && (
                                        <p className="text-danger">
                                            Lower Limit is required
                                        </p>
                                    )}

                                    {
                                        lower_limit < 0 && <p className="text-danger">Lower limit can not less than 0</p>
                                    }

                                    <CheckboxContainer className="mt-2">
                                        <StyledInput
                                            type="checkbox"
                                            id="infiniteValueDown"
                                            name="infiniteValueDown"
                                            onChange={handleChange}
                                            defaultChecked={lower_limit_condition == '>'}
                                            value={">"}
                                        />
                                        <StyledLabel htmlFor="infiniteValueDown"><small style={{ fontSize: '12px', fontWeight: "500" }}>Smaller than lower limit</small></StyledLabel>
                                    </CheckboxContainer>
                                </div>
                            </div>
                        }


                        {/* Upper Limit  *****required****** */}
                        {
                            limit_type == 1 && <div className="row mb-4 align-items-start">
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
                                    // disabled={(infiniteValueUp && !infiniteValueDown)}
                                    />
                                    {editFactorDataValidation?.upper_limit && (
                                        <p className="text-danger">
                                            Upper Limit is required
                                        </p>
                                    )}

                                    {
                                        lower_limit && (parseFloat(upper_limit) < parseFloat(lower_limit)) && <p className="text-danger">Upper limit must be greater than lower limit</p>
                                    }

                                    <CheckboxContainer className="mt-2">
                                        <StyledInput
                                            type="checkbox"
                                            id="infiniteValueUp"
                                            name="infiniteValueUp"
                                            onChange={handleChange}
                                            defaultChecked={upper_limit_condition == '<'}
                                            value={"<"}
                                        />
                                        <StyledLabel htmlFor="infiniteValueUp"><small style={{ fontSize: '12px', fontWeight: "500" }}>Mark as infinity</small></StyledLabel>
                                    </CheckboxContainer>
                                </div>
                            </div>
                        }

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
                                    {editFactorDataValidation?.limit_unit && (
                                        <p className="text-danger">
                                            Limit unit is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        }

                        {/* point type  *****required****** */}
                        {
                            singleDefaultFactor?.point_type && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Point Type <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <ModalInputLabel className="col-8" color="#8F8F8F">
                                    {point_type == 1 ? "Static" : "Percentage"}
                                </ModalInputLabel>
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
                                    {editFactorDataValidation?.points && (
                                        <p className="text-danger">
                                            Points is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        }

                        {/* status *****Optional****** */}
                        {
                            singleDefaultFactor?.status != null && <div className="row mb-4 align-items-center">
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
                }

                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleUpdateFactor} width="177px">
                        {isUpdatePmPointfactorLoading
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