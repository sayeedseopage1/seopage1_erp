import React from "react";
import PropTypes from "prop-types";
// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import {
    ModalButton,
    ModalSelectContainer,
    ModalInput,
    ModalInputLabel,
    ModalTitle,
} from "../ui/Styles/ui";
import { Flex } from "../../../../global/styled-component/Flex";
import DepartmentSelect from "../DepartmentSelect";
import CustomDropDown from "../CustomDropDown";
// Constants
import { PolicyTypeItems } from "../../constant";
// Components
import NewPolicyModalInputsContainer from "../NewPolicyModalInputsContainer";
import NewRulesModalTable from "../table/NewRulesModalTable";
import { NewRulesModalTableColumnsData } from "../table/NewRulesModalTableColumns";

const AddNewPolicyModal = ({
    open,
    closeModal,
    departments,
    newPolicyData,
    handleChange,
    countries,
    handleMultiSelectChange,
    handleAddRuleOnPolicy,
    newPolicyDataValidation,
    newPolicyInputData,
    setNewPolicyData,
    isRuleUpdating,
    setIsRuleUpdating,
    handlePolicyAdded,
    isLoadingAddSalesRiskAnalysisRule
}) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            height={newPolicyInputData?.length > 0 ? "700px" : "fit-content"}
            maxHeight={newPolicyInputData?.length > 0 ? "700px" : "fit-content"}
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Add a New Policy</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Name <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="policyName"
                                value={newPolicyData?.policyName}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {newPolicyDataValidation?.policyName && (
                                <p className="text-danger">
                                    Policy name is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Department Name<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <DepartmentSelect
                                    data={departments}
                                    selected={newPolicyData?.department}
                                    setSelectedDept={handleChange}
                                />
                            </ModalSelectContainer>
                            {newPolicyDataValidation?.department && (
                                <p className="text-danger">
                                    Department is required
                                </p>
                            )}
                        </div>
                    </div>
                    {newPolicyInputData?.length > 0 ? (
                        <div
                            className="row px-0 py-4 px-2 mb-2"
                            style={{
                                border: "1px dotted #E5E5E5",
                                borderRadius: "5px",
                            }}
                        >
                            <NewRulesModalTable
                                newPolicyInputData={newPolicyInputData}
                                tableColumns={NewRulesModalTableColumnsData}
                                tableName={"NewRulesModalTable"}
                                setNewPolicyData={setNewPolicyData}
                                setIsRuleUpdating={setIsRuleUpdating}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Type<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="policyType"
                                    data={PolicyTypeItems}
                                    selected={newPolicyData?.policyType}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                            {newPolicyDataValidation?.policyType && (
                                <p className="text-danger">
                                    Policy type is required
                                </p>
                            )}
                        </div>
                    </div>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={newPolicyData}
                        handleChange={handleChange}
                        countries={countries}
                        handleMultiSelectChange={handleMultiSelectChange}
                        newPolicyDataValidation={newPolicyDataValidation}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            className="d-flex btn btn-success align-items-center"
                            style={{
                                fontSize: "13px",
                            }}
                            disabled={_.isEmpty(newPolicyData?.policyType)}
                            onClick={handleAddRuleOnPolicy}
                        >
                            {isRuleUpdating ? "Update rule" : "Create Rule"}
                        </button>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handlePolicyAdded} width="177px">
                        {
                            isLoadingAddSalesRiskAnalysisRule ? "Loading..." : "Add Policy"
                        }
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

export default AddNewPolicyModal;

AddNewPolicyModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    departments: PropTypes.array,
    newPolicyData: PropTypes.object,
    handleChange: PropTypes.func,
    countries: PropTypes.array,
    handleMultiSelectChange: PropTypes.func,
    handleAddRuleOnPolicy: PropTypes.func,
    newPolicyDataValidation: PropTypes.object,
    newPolicyInputData: PropTypes.array,
    setNewPolicyData: PropTypes.func,
    isRuleUpdating: PropTypes.bool,
    setIsRuleUpdating: PropTypes.func,
    handlePolicyAdded: PropTypes.func,
    isLoadingAddSalesRiskAnalysisRule: PropTypes.bool
};
