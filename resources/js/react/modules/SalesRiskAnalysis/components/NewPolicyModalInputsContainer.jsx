import React from "react";
import PropTypes from "prop-types";

// ui components
import {
    ModalSelectContainer,
    ModalInput,
    ModalInputLabel,
} from "./ui/Styles/ui";
import CustomDropDown from "./CustomDropDown";
import Switch from "./Switch";

// Constants
import { PolicyTypeItemValuesType } from "../constant";

const NewPolicyModalInputsContainer = ({ newPolicyData, handleChange }) => {
    // Constants
    const validPolicyTypes = ["lessThan", "greaterThan", "fixed", "range"];
    return (
        <React.Fragment>
            <Switch>
                {/* conditional showing Fields */}
                <Switch.Case
                    condition={
                        newPolicyData?.policyType &&
                        validPolicyTypes.includes(
                            newPolicyData?.policyType?.name
                        )
                    }
                >
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Title<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-8"
                            type="text"
                            name="title"
                            value={newPolicyData?.policyName}
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Write Value<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 d-flex px-0">
                            <div
                                className={`d-flex flex-column px-0 ${
                                    newPolicyData?.policyType?.name === "range"
                                        ? "col-4"
                                        : "col-8"
                                }`}
                            >
                                <ModalInputLabel
                                    fontSize="16px"
                                    className="mb-2"
                                    color="#8F8F8F"
                                >
                                    Type <sup>*</sup>{" "}
                                </ModalInputLabel>
                                <ModalSelectContainer className="px-0">
                                    <CustomDropDown
                                        data={PolicyTypeItemValuesType}
                                        selected={newPolicyData?.policyType}
                                        setSelected={handleChange}
                                        filedName="valueType"
                                    />
                                </ModalSelectContainer>
                            </div>
                            
                            <Switch>
                                {/* conditional for range type value */}
                                <Switch.Case
                                    condition={
                                        newPolicyData?.policyType?.name !==
                                        "range"
                                    }
                                >
                                    <div className="d-flex flex-column col-4 pr-0">
                                        <ModalInputLabel
                                            fontSize="16px"
                                            className="mb-2"
                                            color="#8F8F8F"
                                        >
                                            Value <sup>*</sup>{" "}
                                        </ModalInputLabel>
                                        <ModalInput
                                            type="number"
                                            name="value"
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                    </div>
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        newPolicyData?.policyType?.name ==
                                        "range"
                                    }
                                >
                                    <div className="d-flex col-8 pr-0">
                                        <div className="col-6 flex-column px-0">
                                            <ModalInputLabel
                                                fontSize="16px"
                                                className="mb-2"
                                                color="#8F8F8F"
                                            >
                                                From <sup>*</sup>{" "}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                name="from"
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                className="w-100"
                                            />
                                        </div>
                                        <div className="col-6 flex-column pr-0">
                                            <ModalInputLabel
                                                fontSize="16px"
                                                className="mb-2"
                                                color="#8F8F8F"
                                            >
                                                To <sup>*</sup>{" "}
                                            </ModalInputLabel>
                                            <ModalInput
                                                type="number"
                                                name="to"
                                                onChange={handleChange}
                                                placeholder="Write Here"
                                                className="w-100"
                                            />
                                        </div>
                                    </div>
                                </Switch.Case>
                            </Switch>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Point<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-8"
                            type="number"
                            name="title"
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                    </div>
                </Switch.Case>
            </Switch>
        </React.Fragment>
    );
};

export default NewPolicyModalInputsContainer;

NewPolicyModalInputsContainer.propTypes = {
    newPolicyData: PropTypes.object,
    handleChange: PropTypes.func,
};
