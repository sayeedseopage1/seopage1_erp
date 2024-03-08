import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
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
    const validPolicyTypes = [
        "lessThan",
        "greaterThan",
        "fixed",
        "range",
        "yesNo",
        "list",
    ];
    // get valid policy types conditionally based on policy type
    const validPolicyTypesOptions =
        newPolicyData?.policyType?.name === "yesNo"
            ? PolicyTypeItemValuesType?.data?.yesNoTypes
            : PolicyTypeItemValuesType?.data?.regularTypes;

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
                            value={newPolicyData?.title}
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                    </div>
                    <Switch.Case
                        condition={
                            !_.includes(
                                ["list", "yesNo"],
                                newPolicyData.policyType.name
                            )
                        }
                    >
                        <div className="row mb-4 align-items-center">
                            <ModalInputLabel className="col-4">
                                Write Value<sup>*</sup>{" "}
                            </ModalInputLabel>
                            <div className="col-8 d-flex px-0">
                                <div
                                    className={`d-flex flex-column px-0 ${
                                        newPolicyData?.policyType?.name ===
                                        "range"
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
                                            data={validPolicyTypesOptions}
                                            selected={newPolicyData?.rulesType}
                                            setSelected={handleChange}
                                            filedName="rulesType"
                                        />
                                    </ModalSelectContainer>
                                </div>
                                <Switch>
                                    {/* conditional for range or yes type value */}
                                    <Switch.Case
                                        condition={
                                            !_.includes(
                                                ["range"],
                                                newPolicyData.policyType.name
                                            )
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
                                                value={newPolicyData?.value}
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
                                                    value={newPolicyData?.from}
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
                                                    value={newPolicyData?.to}
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
                    </Switch.Case>
                    <Switch.Case
                        condition={_.includes(
                            ["list", "yesNo"],
                            newPolicyData.policyType.name
                        )}
                    >
                        <div className="row mb-4 align-items-center">
                            <ModalInputLabel
                                fontSize="16px"
                                className="col-4"
                            >
                                Type <sup>*</sup>{" "}
                            </ModalInputLabel>
                            <ModalSelectContainer className="px-0 col-8">
                                <CustomDropDown
                                    data={validPolicyTypesOptions}
                                    selected={newPolicyData?.rulesType}
                                    setSelected={handleChange}
                                    filedName="rulesType"
                                />
                            </ModalSelectContainer>
                        </div>
                    </Switch.Case>
                </Switch.Case>

                <Switch.Case condition={!_.isEmpty(newPolicyData?.policyType)}>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Point<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <ModalInput
                            className="col-8"
                            type="number"
                            name="points"
                            value={newPolicyData?.points}
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
