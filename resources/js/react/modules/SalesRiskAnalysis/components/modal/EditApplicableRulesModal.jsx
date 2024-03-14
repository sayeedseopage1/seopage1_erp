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

const EditApplicableRulesModal = ({
    open,
    closeModal,
    editRuleData,
    handleChange,
    handleUpdateRules,
    handleMultiSelectChange,
    isLoadingEditSalesRiskAnalysisRule,
    editRuleDataValidation,
    ...props
}) => {
    const { countries } = useSelector((state) => state?.filterOptions);

    return (
        <CustomModal
            closeModal={closeModal}
            contentLabel="Edit Rule Table"
            open={open}
            isCloseButtonShow
            width="700px"
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Rule</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3 w-100">
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Name
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {" "}
                            {editRuleData?.policyName}
                        </ModalInputLabel>
                    </div>
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Department Name{" "}
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {editRuleData?.department?.name}
                        </ModalInputLabel>
                    </div>
                    {/* <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Rules{" "}
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {editRuleData?.selectedRule?.title}{" "}
                            {`${
                                editRuleData?.ruleType
                                    ? `(${_.startCase(
                                          editRuleData?.ruleType
                                      )})`
                                    : ""
                            }`}
                        </ModalInputLabel>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Current Rule{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-7"
                            type="number"
                            defaultValue={editRuleData?.selectedRule?.Rule}
                            disabled
                        />
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-5">
                            New Rule<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-7 px-0">
                            <ModalInput
                                className="w-100"
                                type="number"
                                name="newRule"
                                onChange={handleChange}
                                value={editRuleData?.newRule}
                                placeholder="Write here eg: 0.5,1,2 "
                            />

                            {editRuleDataValidation?.newRule && (
                                <p className="text-danger">
                                    New Rule is required
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
                                    selected={editRuleData?.policyType}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                        </div>
                    </div>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={editRuleData}
                        handleChange={handleChange}
                        countries={countries}
                        handleMultiSelectChange={handleMultiSelectChange}
                        newPolicyDataValidation={editRuleDataValidation}
                    />
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleUpdateRules} width="177px">
                        {isLoadingEditSalesRiskAnalysisRule
                            ? "Saving"
                            : "Update"}
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

export default EditApplicableRulesModal;

EditApplicableRulesModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    editRuleData: PropTypes.object,
    props: PropTypes.object,
    handleChange: PropTypes.func,
};
