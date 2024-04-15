import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// ui components
import {
    ModalSelectContainer,
    ModalInput,
    ModalInputLabel,
} from "../ui/Styles/ui";
import CustomDropDown from "../CustomDropDown";
import Switch from "../Switch";
import MultiSelect from "../MultiSelect";

// Constants
import { PolicyTypeItemValuesType } from "../../constant";

const NewPolicyModalInputsContainer = ({
    newPolicyData,
    handleChange,
    selectedCountries,
    handleMultiSelectChange,
    newPolicyDataValidation,
    allPolicyData,
}) => {
    const { countries } = useSelector((state) => state?.filterOptions);

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
    const validPolicyTypesOptions = () => {
        if (newPolicyData?.policyType?.name === "yesNo") {
            return PolicyTypeItemValuesType?.data?.yesNoTypes;
        } else if (newPolicyData?.policyType?.name === "list") {
            return PolicyTypeItemValuesType?.data?.listTypes;
        } else {
            return PolicyTypeItemValuesType?.data?.regularTypes;
        }
    };

    const handleOnkeypress = (e) => {
        const { key, target } = e;
        let { value } = target;

        // Allow backspace
        if (key === "Backspace") {
            return true;
        }

        // Define regular expressions
        const digitRegex = /[0-9]/;
        const minusRegex = /-/;
        const decimalRegex = /\./;

        if (
            !(
                digitRegex.test(key) ||
                minusRegex.test(key) ||
                decimalRegex.test(key)
            )
        ) {
            e.preventDefault();
            return false;
        }

        if (key === "-" && value.length > 0) {
            e.preventDefault();
            return false;
        }

        if (key === "." && value.includes(".")) {
            e.preventDefault();
            return false;
        }
        return true;
    };

    const handleTernary = () => {
        if (!allPolicyData?.length) {
            return false;
        }
        if (newPolicyData?.index === 0) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <Switch>
            {/* conditional showing Fields */}
            <Switch.Case
                condition={
                    newPolicyData?.policyType &&
                    validPolicyTypes.includes(newPolicyData?.policyType?.name)
                }
            >
                <Switch.Case
                    condition={
                        !_.includes(
                            ["list", "yesNo"],
                            newPolicyData?.policyType?.name
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
                                    newPolicyData?.policyType?.name === "range"
                                        ? "col-7"
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
                                        data={validPolicyTypesOptions()}
                                        selected={newPolicyData?.valueType}
                                        setSelected={handleChange}
                                        filedName="valueType"
                                        isDisableUse={handleTernary()}
                                    />
                                </ModalSelectContainer>
                                {newPolicyDataValidation?.valueType && (
                                    <p className="text-danger py-1">
                                        Type is required
                                    </p>
                                )}
                            </div>
                            <Switch>
                                {/* conditional for range or yes type value */}
                                <Switch.Case
                                    condition={
                                        !_.includes(
                                            ["range"],
                                            newPolicyData?.policyType?.name
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
                                            onKeyPress={handleOnkeypress}
                                            value={newPolicyData?.value}
                                            onChange={handleChange}
                                            placeholder="Write Here"
                                        />
                                        {newPolicyDataValidation?.value && (
                                            <p className="text-danger py-1">
                                                Value is required
                                            </p>
                                        )}
                                    </div>
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        newPolicyData?.policyType?.name ==
                                        "range"
                                    }
                                >
                                    <div className="d-flex flex-column col-5 px-0">
                                        <div
                                            className="d-flex col-12 px-0"
                                            style={{
                                                height: "70px",
                                                maxHeight: "70px",
                                            }}
                                        >
                                            <div className="col-6 flex-column pl-1 px-0">
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
                                                    onKeyPress={
                                                        handleOnkeypress
                                                    }
                                                    value={newPolicyData?.from}
                                                    onChange={handleChange}
                                                    placeholder="Write ..."
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="col-6 flex-column pl-1 pr-0">
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
                                                    onKeyPress={
                                                        handleOnkeypress
                                                    }
                                                    value={newPolicyData?.to}
                                                    onChange={handleChange}
                                                    placeholder="Write ..."
                                                    className="w-100"
                                                />
                                            </div>
                                        </div>
                                        {(newPolicyDataValidation?.from ||
                                            newPolicyDataValidation?.to) && (
                                            <p className="text-danger py-2">
                                                {`${
                                                    newPolicyDataValidation?.from
                                                        ? "From"
                                                        : ""
                                                } ${
                                                    newPolicyDataValidation?.from &&
                                                    newPolicyDataValidation?.to
                                                        ? " and "
                                                        : ""
                                                } ${
                                                    newPolicyDataValidation?.to
                                                        ? "To"
                                                        : ""
                                                } are required`}
                                            </p>
                                        )}
                                    </div>
                                </Switch.Case>
                            </Switch>
                        </div>
                    </div>
                </Switch.Case>
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
                {/* conditionally show only  "lessThan", "greaterThan", "fixed", "range", */}

                {/* conditionally show only  "yes/No",*/}
                <Switch.Case
                    condition={_.includes(
                        ["yesNo"],
                        newPolicyData?.policyType?.name
                    )}
                >
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Point<sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="d-flex col-8 flex-column px-0">
                            <div className="col-12 d-flex px-0 mb-4">
                                <div className="col-6 flex-column px-0">
                                    <ModalInputLabel
                                        fontSize="16px"
                                        className="mb-2"
                                        color="#8F8F8F"
                                    >
                                        Yes <sup>*</sup>{" "}
                                    </ModalInputLabel>
                                    <ModalInput
                                        type="number"
                                        name="yes"
                                        value={newPolicyData?.yes}
                                        onChange={handleChange}
                                        onKeyPress={handleOnkeypress}
                                        placeholder="Write Here"
                                        className="w-100"
                                    />
                                    {newPolicyDataValidation?.yes && (
                                        <p className="text-danger py-1">
                                            Yes is required
                                        </p>
                                    )}
                                </div>
                                <div className="col-6 flex-column pr-0">
                                    <ModalInputLabel
                                        fontSize="16px"
                                        className="mb-2"
                                        color="#8F8F8F"
                                    >
                                        Note
                                    </ModalInputLabel>
                                    <ModalInput
                                        type="text"
                                        name="yesComment"
                                        value={newPolicyData?.yesComment}
                                        onChange={handleChange}
                                        placeholder="Write Here"
                                        className="w-100"
                                    />
                                    {newPolicyDataValidation?.no && (
                                        <p className="text-danger py-1">
                                            No is required
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 d-flex px-0">
                                <div className="col-6 flex-column px-0">
                                    <ModalInputLabel
                                        fontSize="16px"
                                        className="mb-2"
                                        color="#8F8F8F"
                                    >
                                        No <sup>*</sup>{" "}
                                    </ModalInputLabel>
                                    <ModalInput
                                        type="number"
                                        name="no"
                                        value={newPolicyData?.no}
                                        onChange={handleChange}
                                        onKeyPress={handleOnkeypress}
                                        placeholder="Write Here"
                                        className="w-100"
                                    />
                                    {newPolicyDataValidation?.no && (
                                        <p className="text-danger py-1">
                                            Yes is required
                                        </p>
                                    )}
                                </div>
                                <div className="col-6 flex-column pr-0">
                                    <ModalInputLabel
                                        fontSize="16px"
                                        className="mb-2"
                                        color="#8F8F8F"
                                    >
                                        Note
                                    </ModalInputLabel>
                                    <ModalInput
                                        type="text"
                                        name="noComment"
                                        value={newPolicyData?.noComment}
                                        onChange={handleChange}
                                        placeholder="Write Here"
                                        className="w-100"
                                    />
                                    {newPolicyDataValidation?.no && (
                                        <p className="text-danger py-1">
                                            No is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Switch.Case>
                {/* conditionally show only  "list",*/}
                <Switch.Case
                    condition={_.includes(
                        ["list"],
                        newPolicyData?.policyType?.name
                    )}
                >
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel fontSize="16px" className="col-4">
                            Type <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="px-0 col-8 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    data={validPolicyTypesOptions()}
                                    selected={newPolicyData?.valueType}
                                    setSelected={handleChange}
                                    filedName="valueType"
                                    isDisableUse={false}
                                />
                            </ModalSelectContainer>
                            {newPolicyDataValidation?.valueType && (
                                <p className="text-danger py-1">
                                    Type is required
                                </p>
                            )}
                        </div>
                    </div>
                    <Switch.Case
                        condition={
                            newPolicyData?.valueType?.name === "countries"
                        }
                    >
                        <div className="row mb-4 align-items-center">
                            <ModalInputLabel fontSize="16px" className="col-4">
                                Countries <sup>*</sup>{" "}
                            </ModalInputLabel>
                            <div className="px-0 col-8 flex-column">
                                <ModalSelectContainer className="">
                                    <MultiSelect
                                        data={countries}
                                        multiple
                                        filedName="countries"
                                        selectedCountries={selectedCountries}
                                        newPolicyData={newPolicyData}
                                        selected={newPolicyData?.countries}
                                        setSelected={handleMultiSelectChange}
                                    />
                                </ModalSelectContainer>
                                {newPolicyDataValidation?.countries && (
                                    <p className="text-danger py-1">
                                        Select at least one country
                                    </p>
                                )}
                            </div>
                        </div>
                    </Switch.Case>
                </Switch.Case>
            </Switch.Case>

            <Switch.Case
                condition={
                    !_.isEmpty(newPolicyData?.policyType) &&
                    newPolicyData?.policyType?.name !== "yesNo"
                }
            >
                <div className="row mb-4 align-items-center">
                    <ModalInputLabel className="col-4">
                        Point<sup>*</sup>{" "}
                    </ModalInputLabel>
                    <div className="col-8 px-0 flex-column">
                        <ModalInput
                            type="number"
                            name="points"
                            className="w-100"
                            value={newPolicyData?.points}
                            onKeyPress={handleOnkeypress}
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                        {newPolicyDataValidation?.points && (
                            <p className="text-danger">Points is required</p>
                        )}
                    </div>
                </div>
            </Switch.Case>
            <Switch.Case condition={!_.isEmpty(newPolicyData?.policyType)}>
                <div className="row mb-4 align-items-center">
                    <ModalInputLabel className="col-4">Comment</ModalInputLabel>
                    <div className="col-8 px-0 flex-column">
                        <ModalInput
                            type="text"
                            name="ruleComment"
                            className="w-100"
                            value={newPolicyData?.ruleComment}
                            onChange={handleChange}
                            placeholder="Write Here"
                        />
                    </div>
                </div>
            </Switch.Case>
        </Switch>
    );
};

export default NewPolicyModalInputsContainer;

NewPolicyModalInputsContainer.propTypes = {
    newPolicyData: PropTypes.object,
    handleChange: PropTypes.func,
    countries: PropTypes.array,
    newPolicyDataValidation: PropTypes.object,
    selectedCountries: PropTypes.array,
    handleMultiSelectChange: PropTypes.func,
    allPolicyData: PropTypes.array,
};
