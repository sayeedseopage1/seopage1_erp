import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import DepartmentSelect from "../DepartmentSelect";
import CustomDropDown from "../CustomDropDown";

// Local styled components
import {
    ModalButton,
    ModalSelectContainer,
    ModalInput,
    ModalInputLabel,
    ModalTitle,
} from "../ui/Styles/ui";

// Global styled components
import { Flex } from "../../../../global/styled-component/Flex";

// Constants
import { PolicyTypeItems } from "../../constant";

// Table
import NewRulesModalTable from "../table/NewRulesModalTable";
import { NewRulesModalTableColumnsData } from "../table/NewRulesModalTableColumns";

// sections components
import NewPolicyModalInputsContainer from "../sections/NewPolicyModalInputsContainer";
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";

const AddNewPolicyModal = ({
    open,
    closeModal,
    newPolicyData,
    newPolicyDataValidation,
    isPolicyUpdating,
    newPolicyInputData,
    isRuleUpdating,
    isLoadingAddSalesRiskAnalysisRule,
    handlerAction,
}) => {
    const { policyKeys } = useContext(SalesRiskAnalysisContext);

    // Destructuring handlerAction
    const {
        handleChange,
        setNewPolicyData,
        setIsRuleUpdating,
        handlePolicyAdded,
        handleAddRuleOnPolicy,
        setNewPolicyInputData,
        handleCancelRuleOnPolicy,
        setNewPolicyDeleteData
    } = handlerAction;
    const { departments } = useSelector((state) => state.filterOptions);
    let allSelectedCountries = [];

    newPolicyInputData.forEach((item) => {
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
            height="70vh"
            maxHeight="85vh"
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
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Key<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="key"
                                    data={policyKeys}
                                    selected={newPolicyData?.key}
                                    setSelected={handleChange}
                                    isDisableUse={false}
                                />
                            </ModalSelectContainer>
                            {newPolicyDataValidation?.key && (
                                <p className="text-danger">
                                    Rule key is required
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
                                value={newPolicyData?.comment}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
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
                                setNewPolicyInputData={setNewPolicyInputData}
                                setEditPolicyDeleteData={setNewPolicyDeleteData}
                            />

                        </div>
                    ) : (
                        ""
                    )}

                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Rule Type<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="policyType"
                                    data={{
                                        ...PolicyTypeItems,
                                        data: PolicyTypeItems?.data?.map(
                                            (item) => {
                                                const isYesNoRule =
                                                    newPolicyData?.key?.name ===
                                                    "yesNoRules";
                                                const isItemYesNo =
                                                    item?.name.includes(
                                                        "yesNo"
                                                    );
                                                const disabled = isYesNoRule
                                                    ? !isItemYesNo
                                                    : false;

                                                return {
                                                    ...item,
                                                    disabled,
                                                };
                                            }
                                        ),
                                    }}
                                    selected={newPolicyData?.policyType}
                                    setSelected={handleChange}
                                    isDisableUse={
                                        newPolicyData?.key?.name ===
                                            "yesNoRules" &&
                                        !newPolicyInputData?.length
                                    }
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
                        allPolicyData={newPolicyInputData}
                        selectedCountries={allSelectedCountries.flat()}
                        handleMultiSelectChange={setNewPolicyData}
                        newPolicyDataValidation={newPolicyDataValidation}
                        setIsFocusedOnTitleInput={() => {}}
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
                        <button
                            className="d-flex btn btn-warning align-items-center text-white"
                            style={{
                                fontSize: "13px",
                                marginLeft: "10px",
                            }}
                            disabled={_.isEmpty(newPolicyData?.policyType)}
                            onClick={handleCancelRuleOnPolicy}
                        >
                            {isRuleUpdating ? "Cancel Edit" : "Cancel"}
                        </button>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handlePolicyAdded} width="177px">
                        {isLoadingAddSalesRiskAnalysisRule
                            ? "Loading..."
                            : isPolicyUpdating ? "Update Policy" : "Add Policy"}
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
    newPolicyData: PropTypes.object,
    newPolicyDataValidation: PropTypes.object,
    newPolicyInputData: PropTypes.array,
    isRuleUpdating: PropTypes.bool,
    isLoadingAddSalesRiskAnalysisRule: PropTypes.bool,
    handlerAction: PropTypes.object,
    isPolicyUpdating: PropTypes.bool,
};
