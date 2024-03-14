import React from "react";
import PropTypes from "prop-types";

// ui components
import {
    ModalButton,
    ModalInput,
    ModalInputLabel,
    ModalSelectContainer,
    ModalTitle,
} from "../ui/Styles/ui";
import CustomModal from "../ui/CustomModal/CustomModal";
import { Flex } from "../../../../global/styled-component/Flex";
import _ from "lodash";
import CustomDropDown from "../CustomDropDown";
import { PolicyTypeItems } from "../../constant";
import NewPolicyModalInputsContainer from "../NewPolicyModalInputsContainer";
import { useSelector } from "react-redux";

const EditApplicablePointsModal = ({
    open,
    closeModal,
    editPointData,
    handleChange,
    handleUpdatePoints,
    handleMultiSelectChange,
    isLoadingEditSalesRiskAnalysisPoint,
    editPointDataValidation,
    ...props
}) => {
    const {countries} = useSelector((state) => state?.filterOptions);



    return (
        <CustomModal
            closeModal={closeModal}
            contentLabel="Edit Applicable Point Table"
            open={open}
            isCloseButtonShow
            width="700px"
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Applicable Point</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3 w-100">
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Name
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {" "}
                            {editPointData?.policyName}
                        </ModalInputLabel>
                    </div>
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Department Name{" "}
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {editPointData?.department?.name}
                        </ModalInputLabel>
                    </div>
                    {/* <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Rules{" "}
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {editPointData?.selectedRule?.title}{" "}
                            {`${
                                editPointData?.ruleType
                                    ? `(${_.startCase(
                                          editPointData?.ruleType
                                      )})`
                                    : ""
                            }`}
                        </ModalInputLabel>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Current point{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            defaultValue={editPointData?.selectedRule?.point}
                            disabled
                        />
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5">
                            New point<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-7 px-0">
                            <ModalInput
                                className="w-100"
                                type="number"
                                name="newPoint"
                                onChange={handleChange}
                                value={editPointData?.newPoint}
                                placeholder="Write here eg: 0.5,1,2 "
                            />

                            {editPointDataValidation?.newPoint && (
                                <p className="text-danger">
                                    New Point is required
                                </p>
                            )}
                        </div>
                    </div> */}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Type<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="policyType"
                                    data={PolicyTypeItems}
                                    selected={editPointData?.policyType}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>

                        </div>
                    </div>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={editPointData}
                        handleChange={handleChange}
                        countries={countries}
                        handleMultiSelectChange={handleMultiSelectChange}
                        newPolicyDataValidation={editPointDataValidation}
                    />
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleUpdatePoints} width="177px">
                        {isLoadingEditSalesRiskAnalysisPoint
                            ? "Saving"
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

export default EditApplicablePointsModal;

EditApplicablePointsModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    editPointData: PropTypes.object,
    props: PropTypes.object,
    handleChange: PropTypes.func,
};
