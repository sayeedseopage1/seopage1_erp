import React, { useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
// ui components
// import {
//     ModalSelectContainer,
//     ModalInput,
//     ModalInputLabel,
// } from "./ui/Styles/ui";

// import CustomDropDown from "./CustomDropDown";
import Switch from "./Switch";

// Constants
import { PolicyTypeItemValuesType } from "../constant";
import MultiSelect from "./MultiSelect";
import { useSelector } from "react-redux";
import { ModalInput, ModalInputLabel } from "./Styles/ui/ui";

const NewFactorsModalInputsContainer = ({
    newPolicyData,
    handleChange,
    selectedCountries,
    handleMultiSelectChange,
    newPolicyDataValidation,
}) => {

    // // Constants
    // const validPolicyTypes = [
    //     "lessThan",
    //     "greaterThan",
    //     "fixed",
    //     "range",
    //     "yesNo",
    //     "list",
    // ];
    // get valid policy types conditionally based on policy type
    // const validPolicyTypesOptions =
    //     newPolicyData?.policyType?.name === "yesNo"
    //         ? PolicyTypeItemValuesType?.data?.yesNoTypes
    //         : newPolicyData?.policyType?.name === "list"
    //             ? PolicyTypeItemValuesType?.data?.listTypes
    //             : PolicyTypeItemValuesType?.data?.regularTypes;

    return (
        <div>
            <div className="row mb-4 align-items-center">
                <ModalInputLabel className="col-4">
                    Title<sup>*</sup>{" "}
                </ModalInputLabel>
                <div className="col-8 px-0">
                    <ModalInput
                        type="text"
                        name="title"
                        className="w-100"
                        value={newPolicyData?.title}
                        onChange={handleChange}
                        placeholder="Write Here"
                    />
                    {newPolicyDataValidation?.title && (
                        <p className="text-danger py-1">
                            Title is required
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewFactorsModalInputsContainer;

NewFactorsModalInputsContainer.propTypes = {
    newPolicyData: PropTypes.object,
    handleChange: PropTypes.func,
    countries: PropTypes.array,
    newPolicyDataValidation: PropTypes.object,
};
