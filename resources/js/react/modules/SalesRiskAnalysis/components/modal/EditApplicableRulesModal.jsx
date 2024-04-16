import React, { useContext } from "react";
import PropTypes from "prop-types";

// ui components
import CustomDropDown from "../CustomDropDown";
import CustomModal from "../ui/CustomModal/CustomModal";

// local styled components
import {
    ModalButton,
    ModalInputLabel,
    ModalSelectContainer,
    ModalTitle,
} from "../ui/Styles/ui";

// global styled components
import { Flex } from "../../../../global/styled-component/Flex";

// constants
import { PolicyTypeItems } from "../../constant";

// Api services
import { useGetSinglePolicySalesRiskAnalysisQuery } from "../../../../services/api/salesRiskAnalysisSlice";

// helper
import { formatSingleRuleData } from "../../helper/formatEditPolicyData";

// sections components
import NewPolicyModalInputsContainer from "../sections/NewPolicyModalInputsContainer";

// context
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";

const EditApplicableRulesModal = ({
    open,
    closeModal,
    editRuleData,
    setEditRuleData,
    handleChange,
    handleUpdateRules,
    handleMultiSelectChange,
    isLoadingEditSalesRiskAnalysisRule,
    editRuleDataValidation,
    ...props
}) => {
    const { policyKeys } = useContext(SalesRiskAnalysisContext);
    const { data: singlePolicyData} =
        useGetSinglePolicySalesRiskAnalysisQuery(editRuleData?.policyId, {
            skip: !editRuleData?.policyId,
            staleTime: 0,
            refetchOnMountOrArgChange: true,
        });

    React.useEffect(() => {
        if (singlePolicyData?.data?.length) {
            const getSingleRule = singlePolicyData?.data[0].ruleList.find(
                (item) => item.id === editRuleData?.id
            );
            setEditRuleData(
                formatSingleRuleData(
                    singlePolicyData?.data[0],
                    getSingleRule,
                    policyKeys
                )
            );
        }
    }, [singlePolicyData]);
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
                    <div className="row mb-4">
                        <ModalInputLabel className="col-5" color="#8F8F8F">
                            Policy Key{" "}
                        </ModalInputLabel>
                        <ModalInputLabel className="col-7" color="#8F8F8F">
                            {editRuleData?.key?.label}
                        </ModalInputLabel>
                    </div>

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
                                    isDisableUse={false}
                                />
                            </ModalSelectContainer>
                        </div>
                    </div>
                    {/* All Rules Inputs */}
                    <NewPolicyModalInputsContainer
                        newPolicyData={editRuleData}
                        handleChange={handleChange}
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
    handleUpdateRules: PropTypes.func,
    handleMultiSelectChange: PropTypes.func,
    isLoadingEditSalesRiskAnalysisRule: PropTypes.bool,
    editRuleDataValidation: PropTypes.object,
    setEditRuleData: PropTypes.func,
};
