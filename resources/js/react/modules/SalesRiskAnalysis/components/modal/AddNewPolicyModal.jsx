import React from "react";
import PropTypes from "prop-types";
// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import {
    ModalButton,
    ModalDepartmentSelect,
    ModalInput,
    ModalInputLabel,
    ModalSelect,
    ModalTitle,
} from "../ui/Styles/ui";
import { Flex } from "../../../../global/styled-component/Flex";
import DepartmentSelect from "../DepartmentSelect";
import CustomDropDown from "../CustomDropDown";
import { PolicyTypeItems } from "../../constant";

const AddNewPolicyModal = ({
    open,
    closeModal,
    departments,
    newPolicyData,
    handleChange,
}) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Add a New Policy</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3 w-100">
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Name <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-8"
                            type="text"
                            name="policyName"
                            value={newPolicyData?.policyName}
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                    </div>

                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Type<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalDepartmentSelect className="col-8">
                            <CustomDropDown
                                filedName="policyType"
                                data={PolicyTypeItems}
                                selected={newPolicyData?.policyType}
                                setSelected={handleChange}
                            />
                        </ModalDepartmentSelect>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Department Name<sup>*</sup>
                        </ModalInputLabel>
                        <ModalDepartmentSelect className="col-8">
                            <DepartmentSelect
                                data={departments}
                                selected={newPolicyData?.department}
                                setSelectedDept={handleChange}
                            />
                        </ModalDepartmentSelect>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton width="177px">Save</ModalButton>
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
};
