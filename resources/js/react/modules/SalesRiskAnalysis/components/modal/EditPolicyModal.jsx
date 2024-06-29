import _ from "lodash";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Custom Components
import CustomModal from "../ui/CustomModal/CustomModal";
import DepartmentSelect from "../DepartmentSelect";
import CustomDropDown from "../CustomDropDown";

// global styled components
import { Flex } from "../../../../global/styled-component/Flex";

// local styled components
import {
    ModalButton,
    ModalInputLabel,
    ModalSelectContainer,
    ModalTitle,
    ModalInput,
} from "../ui/Styles/ui";

// Table Data
import NewRulesModalTable from "../table/NewRulesModalTable";
import { NewRulesModalTableColumnsData } from "../table/NewRulesModalTableColumns";

// Constants
import { PolicyTypeItems } from "../../constant";

// Sections Components
import NewPolicyModalInputsContainer from "../sections/NewPolicyModalInputsContainer";

// Context
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";

// style
import "./style/modalStyle.css";
import Switch from "../Switch";

const EditPolicyModal = ({
    open,
    isLoading,
    closeModal,
    isRuleUpdating,
    editPolicyData,
    editPolicyInputData,
    editPolicyDataValidation,
    editPolicyDefaultData,
    editPolicyAction,
    setIsFocusedOnTitleInput,
}) => {
    const {
        setEditPolicyData,
        setEditPolicyInputData,
        setEditPolicyDeleteData,
        handleEditPolicyUpdate,
        handleCancelRuleOnPolicy,
        handleAddRuleOnPolicy,
        setIsRuleUpdating,
        handlePolicyEditChange,
    } = editPolicyAction;
    const { policyKeys } = useContext(SalesRiskAnalysisContext);
    const { settings } = useSelector((state) => state.saleRiskAnalysis);
    const isPolicyEditEnabled = settings?.find(
        (setting) => setting.name === "enable_edit_policy"
    )?.value;
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
            height="70vh"
            maxHeight="85vh"
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
                                readOnly={!isPolicyEditEnabled}
                                value={editPolicyDefaultData?.policyName}
                                onChange={handlePolicyEditChange}
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
                                    isDisabled={!isPolicyEditEnabled}
                                    selected={editPolicyDefaultData?.department}
                                    setSelectedDept={handlePolicyEditChange}
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
                            Policy Key<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="key"
                                    data={policyKeys}
                                    selected={editPolicyDefaultData?.key}
                                    setSelected={handlePolicyEditChange}
                                    isDisableUse={!isPolicyEditEnabled}
                                />
                            </ModalSelectContainer>
                            {editPolicyDataValidation?.key && (
                                <p className="text-danger">
                                    Policy key is required
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
                                readOnly={!isPolicyEditEnabled}
                                value={editPolicyDefaultData?.comment}
                                onChange={handlePolicyEditChange}
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
                                setEditPolicyDeleteData={
                                    setEditPolicyDeleteData
                                }
                            />
                        </div>
                    ) : (
                        ""
                    )}

                    <Switch>
                        <Switch.Case
                            condition={
                                isPolicyEditEnabled ||
                                editPolicyData?.key?.name === "yesNoRules"
                            }
                        >
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
                                                            editPolicyData?.key
                                                                ?.name ===
                                                            "yesNoRules";
                                                        const isItemYesNo =
                                                            item?.name.includes(
                                                                "yesNo"
                                                            );
                                                        const disabled =
                                                            isYesNoRule
                                                                ? !isItemYesNo
                                                                : false;

                                                        return {
                                                            ...item,
                                                            disabled,
                                                        };
                                                    }
                                                ),
                                            }}
                                            selected={
                                                editPolicyData?.policyType
                                            }
                                            setSelected={handlePolicyEditChange}
                                            isDisableUse={
                                                editPolicyData?.key?.name ===
                                                    "yesNoRules" &&
                                                !editPolicyInputData?.length
                                            }
                                        />
                                    </ModalSelectContainer>
                                    {editPolicyDataValidation?.policyType && (
                                        <p className="text-danger">
                                            Rule type is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Switch.Case>
                    </Switch>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={editPolicyData}
                        allPolicyData={editPolicyInputData}
                        handleChange={handlePolicyEditChange}
                        selectedCountries={allSelectedCountries.flat()}
                        handleMultiSelectChange={setEditPolicyData}
                        newPolicyDataValidation={editPolicyDataValidation}
                        setIsFocusedOnTitleInput={setIsFocusedOnTitleInput}
                    />

                    <Switch>
                        <Switch.Case
                            condition={
                                isRuleUpdating ||
                                isPolicyEditEnabled ||
                                editPolicyData?.key?.name === "yesNoRules"
                            }
                        >
                            <div className="d-flex justify-content-end">
                                <button
                                    className="d-flex btn btn-success align-items-center"
                                    style={{
                                        fontSize: "13px",
                                    }}
                                    disabled={_.isEmpty(
                                        editPolicyData?.policyType
                                    )}
                                    onClick={handleAddRuleOnPolicy}
                                >
                                    {isRuleUpdating
                                        ? "Update rule"
                                        : "Create Rule"}
                                </button>
                                <button
                                    className="d-flex btn btn-warning align-items-center text-white"
                                    style={{
                                        fontSize: "13px",
                                        marginLeft: "10px",
                                    }}
                                    disabled={_.isEmpty(
                                        editPolicyData?.policyType
                                    )}
                                    onClick={handleCancelRuleOnPolicy}
                                >
                                    {isRuleUpdating ? "Cancel Edit" : "Cancel"}
                                </button>
                            </div>
                        </Switch.Case>
                    </Switch>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton
                        onClick={handleEditPolicyUpdate}
                        width="177px"
                        disabled={isLoading}
                    >
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
    isLoading: PropTypes.bool,
    closeModal: PropTypes.func,
    isRuleUpdating: PropTypes.bool,
    editPolicyData: PropTypes.object,
    editPolicyInputData: PropTypes.array,
    editPolicyDataValidation: PropTypes.object,
    editPolicyDefaultData: PropTypes.object,
    editPolicyAction: PropTypes.object,
    setIsFocusedOnTitleInput: PropTypes.func,
};
