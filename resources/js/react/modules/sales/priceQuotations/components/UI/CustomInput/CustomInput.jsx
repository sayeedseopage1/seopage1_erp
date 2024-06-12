import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";

// Components - Shared - UI
import CustomLabel from "../CustomLabel/CustomLabel";

// Style
import "./customInput.css";
import Switch from "../../../../../../global/Switch";
import Button from "../../Shared/Button";

const CustomInput = ({
    label,
    className,
    fieldName,
    isRequired,
    placeholder = "",
    value,
    type = "text",
    onChange,
    isError,
    isChild = false,
    errorText,
    onClick,
    ...rest
}) => {
    const notInputTypeUsed = ["date", "button", "percentage", "extra"];

    return (
        <div
            className={`d-flex flex-column custom_input_container ${
                isChild ? "mt-3" : ""
            }`}
        >
            <CustomLabel
                className={`mb-3 ${isChild ? "custom_label_child" : ""}`}
                label={label}
                isRequired={isRequired}
            />
            <Switch>
                <Switch.Case condition={type === "date"}>
                    <DatePicker
                        className="custom_date_picker"
                        type="date"
                        id={fieldName}
                        name={fieldName}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        defaultValue={value}
                        onChange={(e) => {
                            onChange({
                                target: {
                                    name: fieldName,
                                    value: e,
                                },
                            });
                        }}
                    />
                </Switch.Case>
                <Switch.Case condition={type === "button"}>
                    <div className="d-flex custom_input_button_container">
                        <Button
                            onClick={() => {
                                onChange({
                                    target: {
                                        name: fieldName,
                                        value: "Yes",
                                    },
                                });
                            }}
                            className={`price_quotation_custom_button custom_input_btn_yes py-2 ${
                                value === "Yes" ? "yes_active" : ""
                            }`}
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={() => {
                                onChange({
                                    target: {
                                        name: fieldName,
                                        value: "No",
                                    },
                                });
                            }}
                            className={`price_quotation_custom_button custom_input_btn_no py-2 ${
                                value === "No" ? "no_active" : ""
                            }`}
                        >
                            No
                        </Button>
                    </div>
                </Switch.Case>
                <Switch.Case condition={type === "percentage"}>
                    <div className="d-flex align-items-center">
                        <input
                            className={`form-control w-75 ${className}`}
                            id={fieldName}
                            name={fieldName}
                            value={value}
                            placeholder={placeholder}
                            onChange={(e) => {
                                onChange({
                                    target: {
                                        name: fieldName,
                                        value: e.target.value,
                                    },
                                });
                            }}
                            {...rest}
                            type="number"
                        />
                        <p className="w-25 ml-4 custom_label_child">
                            Percentage(%)
                        </p>
                    </div>
                </Switch.Case>
                <Switch.Case condition={type === "extra"}>
                    <form
                        onSubmit={onClick}
                        className="d-flex align-items-center"
                    >
                        <input
                            className={`form-control w-75 ${className}`}
                            id={fieldName}
                            name={fieldName}
                            value={value}
                            placeholder={placeholder}
                            {...rest}
                            type="number"
                        />
                        <button
                            className="price_quotation_custom_button price_quotation_custom_button_primary ml-3 d-flex align-items-center"
                        >
                            <span>+</span> Add
                        </button>
                    </form>
                </Switch.Case>
                <Switch.Case condition={!notInputTypeUsed.includes(type)}>
                    <input
                        className={`form-control ${className}`}
                        id={fieldName}
                        name={fieldName}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => {
                            onChange({
                                target: {
                                    name: fieldName,
                                    value: e.target.value,
                                },
                            });
                        }}
                        {...rest}
                        type={type}
                    />
                </Switch.Case>
            </Switch>
            {isError && (
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default CustomInput;

CustomInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    fieldName: PropTypes.string,
    isRequired: PropTypes.bool,
    value: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    errorText: PropTypes.string,
    isChild: PropTypes.bool,
    onClick: PropTypes.func,
};
