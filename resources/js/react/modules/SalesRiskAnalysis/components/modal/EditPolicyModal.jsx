import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Custom Components
import CustomModal from "../ui/CustomModal/CustomModal";
import { Flex } from "../../../../global/styled-component/Flex";
import {
    ModalButton,
    ModalInputLabel,
    ModalSelectContainer,
    ModalTitle,
    ModalInput,
} from "../ui/Styles/ui";
import DepartmentSelect from "../DepartmentSelect";
import CustomDropDown from "../CustomDropDown";

// Table Data
import NewRulesModalTable from "../table/NewRulesModalTable";
import { NewRulesModalTableColumnsData } from "../table/NewRulesModalTableColumns";
// Constants
import { PolicyTypeItems } from "../../constant";

// Sections
import NewPolicyModalInputsContainer from "../sections/NewPolicyModalInputsContainer";




const EditPolicyModal = ({
    open,
    isLoading,
    closeModal,
    handleChange,
    isRuleUpdating,
    editPolicyData,
    setEditPolicyData,
    setIsRuleUpdating,
    editPolicyInputData,
    handleAddRuleOnPolicy,
    setEditPolicyInputData,
    editPolicyDataValidation,
    handleMultiSelectChange,
    handleCancelRuleOnPolicy,
    editPolicyDefaultData,
    handleEditPolicyUpdate,
    setEditPolicyDeleteData
}) => {
    const { departments } = useSelector((state) => state.filterOptions);
    let allSelectedCountries = [];

    editPolicyInputData.forEach((item) => {
        if (item?.policyType?.name === "list") {
            allSelectedCountries.push(item?.countries);
        }
    });

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
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Edit Policy</ModalTitle>
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
                                value={editPolicyDefaultData?.policyName}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {editPolicyDataValidation?.policyName && (
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
                                    selected={editPolicyDefaultData?.department}
                                    setSelectedDept={handleChange}
                                />
                            </ModalSelectContainer>
                            {editPolicyDataValidation?.department && (
                                <p className="text-danger">
                                    Department is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Comment
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="comment"
                                value={editPolicyDefaultData?.comment}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                        </div>
                    </div>
                    {editPolicyInputData?.length > 0 ? (
                        <div
                            className="row px-0 py-4 px-2 mb-2"
                            style={{
                                border: "1px dotted #E5E5E5",
                                borderRadius: "5px",
                            }}
                        >
                            <NewRulesModalTable
                                newPolicyInputData={editPolicyInputData}
                                tableColumns={NewRulesModalTableColumnsData}
                                tableName={"NewRulesModalTable"}
                                setNewPolicyData={setEditPolicyData}
                                setIsRuleUpdating={setIsRuleUpdating}
                                setNewPolicyInputData={setEditPolicyInputData}
                                setEditPolicyDeleteData={setEditPolicyDeleteData}
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
                                    selected={editPolicyData?.policyType}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                            {editPolicyDataValidation?.policyType && (
                                <p className="text-danger">
                                    Policy type is required
                                </p>
                            )}
                        </div>
                    </div>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={editPolicyData}
                        handleChange={handleChange}
                        selectedCountries={allSelectedCountries.flat()}
                        handleMultiSelectChange={handleMultiSelectChange}
                        newPolicyDataValidation={editPolicyDataValidation}
                    />

                    <div className="d-flex justify-content-end">
                        <button
                            className="d-flex btn btn-success align-items-center"
                            style={{
                                fontSize: "13px",
                            }}
                            disabled={_.isEmpty(editPolicyData?.policyType)}
                            onClick={handleAddRuleOnPolicy}
                        >
                            {isRuleUpdating ? "Update rule" : "Create Rule"}
                        </button>
                        <button
                            className="d-flex btn btn-warning align-items-center text-white"
                            style={{
                                fontSize: "13px",
                                marginLeft: "10px",
                            }}
                            disabled={_.isEmpty(editPolicyData?.policyType)}
                            onClick={handleCancelRuleOnPolicy}
                        >
                            {isRuleUpdating ? "Cancel Edit" : "Cancel"}
                        </button>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleEditPolicyUpdate} width="177px">
                        {isLoading ? "Loading..." : "Update Policy"}
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

export default EditPolicyModal;

EditPolicyModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    isLoading: PropTypes.bool,
    handleChange: PropTypes.func,
    isRuleUpdating: PropTypes.bool,
    editPolicyData: PropTypes.object,
    setEditPolicyData: PropTypes.func,
    editPolicyInputData: PropTypes.array,
    handleAddRuleOnPolicy: PropTypes.func,
    setEditPolicyInputData: PropTypes.func,
    editPolicyDataValidation: PropTypes.object,
    handleMultiSelectChange: PropTypes.func,
    handleCancelRuleOnPolicy: PropTypes.func,
};
