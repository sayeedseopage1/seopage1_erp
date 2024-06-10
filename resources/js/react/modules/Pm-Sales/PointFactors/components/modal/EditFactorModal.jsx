import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "../../../../../global/styled-component/Flex";
// ui components
import CustomModal from "../Styles/ui/CustomModal/CustomModal";
import { CheckboxContainer, ModalButton, ModalInput, ModalInputLabel, ModalTitle, StyledInput, StyledLabel } from "../Styles/ui/ui";
import { LimitUnits, interpretCondition } from "../../constant";
import Spinner from "../loader/Spinner";
import { useGetSinglePmPointFactorQuery } from "../../../../../services/api/Pm-Sales/pmSalesApiSlice";
import { Divider } from "antd";

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


    useEffect(() => {
        if (singleDefaultFactor) {
            const { limit_unit } = singleDefaultFactor
            const limit_unit_obj = LimitUnits?.data?.find(unit => unit?.name == limit_unit)
            const infinite_value_up = singleDefaultFactor?.upper_limit_condition == "<" ? "<" : ""
            const infinite_value_down = singleDefaultFactor?.lower_limit_condition == ">" ? ">" : ""
            setEditFactorData({ ...singleDefaultFactor, description: singleDefaultFactor?.criteria?.description, limit_unit: limit_unit_obj, infiniteValueUp: infinite_value_up, infiniteValueDown: infinite_value_down })
        }

    }, [singleDefaultFactor]);

    const { id: factorId, title, project_type, lower_limit, upper_limit, lower_limit_condition, upper_limit_condition, limit_type, limit_unit, point_type, points, status, lower_limit_top_range_condition, upper_limit_bottom_range_condition, lower_limit_top_range, upper_limit_bottom_range, description } = editFactorData || {}

    // console.log(description)
    // console.log("u", upper_limit_condition)
    // console.log("l", lower_limit_condition)
    // console.log(limit_unit)

    const singleEqualValLimitIds = [14, 19, 25, 29, 44]
    const singleLimitIds = [8, 14, 17, 19, 25, 29, 44]
    const dualValueLimitIds = [3, 4, 5, 6]
    const limitUnitByCondition = limit_unit?.id == 1 ? "Hours" : limit_unit?.id == 2 ? "%" : limit_unit?.id == 3 ? "$" : limit_unit?.id == 4 ? "Projects" : "others"

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
                            <ModalInputLabel className="col-3">
                                Criteria:
                            </ModalInputLabel>
                            <ModalInputLabel className="col-9" color="#8F8F8F">
                                {editFactorData?.criteria?.title}
                            </ModalInputLabel>
                        </div>

                        {/* title  *****required****** */}
                        {
                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Title <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
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
                                <ModalInputLabel className="col-3">
                                    Project Type <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <ModalInputLabel className="col-9" color="#8F8F8F">
                                    {project_type == 1 ? "Fixed" : "Hourly"}
                                </ModalInputLabel>
                            </div>
                        }

                        {/* limit type  *****required****** */}
                        {
                            editFactorData?.limit_type && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Criteria Type <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <ModalInputLabel className="col-9" color="#8F8F8F">
                                    {limit_type == 1 ? "Range" : "Yes/No"}
                                </ModalInputLabel>
                            </div>
                        }

                        {/* Lower Limit  *****required****** */}
                        {
                            !dualValueLimitIds.includes(factorId) && !singleLimitIds.includes(factorId) && limit_type == 1 && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Lower Limit <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
                                    <div className="d-flex align-items-center justify-content-start w-100">
                                        <ModalInputLabel className="col-4" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                            {interpretCondition(lower_limit_condition)}
                                        </ModalInputLabel>
                                        <ModalInput
                                            type="number"
                                            className="ml-2 mr-1"
                                            name="lower_limit"
                                            value={lower_limit}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                            style={{ width: '100px' }}
                                        // disabled={(!infiniteValueUp && infiniteValueDown)}
                                        />
                                        {
                                            limitUnitByCondition
                                        }
                                    </div>
                                    {editFactorDataValidation?.lower_limit && (
                                        <p className="text-danger">
                                            Lower Limit is required
                                        </p>
                                    )}

                                    {
                                        lower_limit < 0 && <p className="text-danger">Lower limit can not less than 0</p>
                                    }
                                </div>
                            </div>
                        }


                        {/* Upper Limit  *****required****** */}
                        {
                            !dualValueLimitIds.includes(factorId) && limit_type == 1 && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    {singleLimitIds.includes(factorId) ? "Limit" : "Upper Limit"}<sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
                                    <div className="d-flex align-items-center justify-content-start">
                                        <ModalInputLabel className="col-4" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                            {interpretCondition(upper_limit_condition)}
                                        </ModalInputLabel>
                                        <ModalInput
                                            type="number"
                                            className="ml-2 mr-1"
                                            name="upper_limit"
                                            value={upper_limit}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                            style={{ width: '100px' }}
                                        />
                                        {
                                            limitUnitByCondition
                                        }
                                    </div>
                                    {editFactorDataValidation?.upper_limit && (
                                        <p className="text-danger">
                                            Upper Limit is required
                                        </p>
                                    )}

                                    {
                                        !singleEqualValLimitIds?.includes(factorId) && lower_limit && (parseFloat(upper_limit) < parseFloat(lower_limit)) && <p className="text-danger">Upper limit must be greater than lower limit</p>
                                    }
                                </div>
                            </div>
                        }

                        {/* lower limit and upper limit for dual value limit */}
                        {
                            dualValueLimitIds.includes(factorId) && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Limits <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
                                    {/* lower limits */}
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="col-6 d-flex align-items-center">
                                            <ModalInputLabel className="col-4" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                                {interpretCondition(lower_limit_condition)}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                className="ml-2 mr-1"
                                                name="lower_limit"
                                                value={lower_limit}
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                style={{ width: '100px' }}
                                            />
                                            {
                                                limitUnitByCondition
                                            }
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <ModalInputLabel className="col-3" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                                {interpretCondition(lower_limit_top_range_condition)}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                className="ml-2 mr-1"
                                                name="lower_limit_top_range"
                                                value={lower_limit_top_range}
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                style={{ width: '100px' }}
                                            />
                                            {
                                                limitUnitByCondition
                                            }
                                        </div>
                                    </div>
                                    <Divider plain>Or</Divider>
                                    {/* upper limits */}
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="col-6 d-flex align-items-center">
                                            <ModalInputLabel className="col-4" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                                {interpretCondition(upper_limit_bottom_range_condition)}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                className="ml-2 mr-1"
                                                name="upper_limit_bottom_range"
                                                value={upper_limit_bottom_range}
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                style={{ width: '100px' }}
                                            />
                                            {
                                                limitUnitByCondition
                                            }
                                        </div>
                                        <div className="col-6 d-flex align-items-center">
                                            <ModalInputLabel className="col-4" style={{ fontSize: '14px', color: '#8F8F8F' }}>
                                                {interpretCondition(upper_limit_condition)}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                className="ml-2 mr-1"
                                                name="upper_limit"
                                                value={upper_limit}
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                style={{ width: '100px' }}
                                            />
                                            {
                                                limitUnitByCondition
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* points *****required****** */}
                        {
                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Points <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
                                    <div className="d-flex align-items-center justify-content-start w-100">
                                        <ModalInput
                                            type="number"
                                            className="mr-2"
                                            name="points"
                                            value={points}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                            style={{ width: '100px' }}
                                        />
                                        {
                                            point_type == 1 ? <ModalInputLabel color="#8F8F8F">
                                                {(points == 1 || points == -1 || points == 0) ? 'Point' : 'Points'}
                                            </ModalInputLabel> : <ModalInputLabel color="#8F8F8F">
                                                % of the project budget
                                            </ModalInputLabel>
                                        }
                                    </div>
                                    {editFactorDataValidation?.points && (
                                        <p className="text-danger">
                                            Points is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        }

                        {
                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Comment:
                                </ModalInputLabel>
                                <div className="col-9 flex-column px-0">
                                    {/* <TextArea
                                        rows={4}
                                        className="w-100"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        placeholder="Write Here"
                                    /> */}
                                    <ModalInput
                                        type="text"
                                        className="w-100"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        placeholder="Write Here"
                                    />
                                </div>
                            </div>
                        }

                        {/* status *****Optional****** */}
                        {
                            editFactorData?.status != null && <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-3">
                                    Status <sup>*</sup>:{" "}
                                </ModalInputLabel>
                                <div className="col-9 px-0">
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