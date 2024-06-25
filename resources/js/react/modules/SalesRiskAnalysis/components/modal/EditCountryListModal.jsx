import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import MultiSelect from "../MultiSelect";

// local styled components
import { ModalButton, ModalSelectContainer, ModalTitle } from "../ui/Styles/ui";

// global styled components
import { Flex } from "../../../../global/styled-component/Flex";

const EditCountryListModal = ({
    open,
    closeModal,
    handleMultiSelectChange,
    editRuleData,
    handleUpdateRules,
    isLoading,
    editRuleDataValidation,
}) => {
    const { countries } = useSelector((state) => state.filterOptions);
    let selectedCountries;
    return (
        <CustomModal
            closeModal={closeModal}
            contentLabel="Edit Rule Table"
            open={open}
            isCloseButtonShow
            width="400px"
        >
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Update {editRuleData?.title}</ModalTitle>
                </div>
                <div className="px-0 mb-4 col-12 flex-column">
                    <ModalSelectContainer className="">
                        <MultiSelect
                            data={countries}
                            multiple
                            filedName="countries"
                            selectedCountries={selectedCountries}
                            newPolicyData={editRuleData}
                            selected={editRuleData?.countries}
                            setSelected={handleMultiSelectChange}
                        />
                    </ModalSelectContainer>
                    {editRuleDataValidation?.countries && (
                        <p className="text-danger py-1">
                            Select at least one country
                        </p>
                    )}
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleUpdateRules} width="177px">
                        {isLoading ? "Loading..." : "Update Rule"}
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

export default EditCountryListModal;

EditCountryListModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    handleMultiSelectChange: PropTypes.func,
    editRuleData: PropTypes.object,
    handleUpdateRules: PropTypes.func,
    isLoading: PropTypes.bool,
    editRuleDataValidation: PropTypes.object,
};
