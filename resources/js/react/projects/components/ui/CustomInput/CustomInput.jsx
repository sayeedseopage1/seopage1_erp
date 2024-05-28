import React from "react";
import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";

// Components - Global
import Switch from "../../../../global/Switch";

// Components - custom
import Popover from "../../Popover";

// style
import style from "../../popover.module.css";
import styles from "./customInput.module.css";

/**
 *  CustomInput component
 *  @param {string} label - Label of the input field
 *  @param {string} placeholder - Placeholder of the input field
 *  @param {string} value - Value of the input field
 *  @param {function} onChange - OnChange event handler
 *  @param {string} type - Type of the input field
 *  @param {string} infoText - Information text to be displayed
 *  @param {string} errorText - Error text to be displayed
 *  @param {boolean} isError - Flag to display error text
 *  @param {boolean} isRequired - Flag to show if input field is required
 *  @param {string} className - Additional class name
 *  @param {string} fieldName - Name of the input field
 *  @returns {JSX.Element}
 *  @description CustomInput component to render input fields
 *
 */

const CustomInput = ({
    label,
    placeholder = "Enter text",
    value,
    onChange,
    type = "text",
    infoText,
    errorText,
    isError,
    isRequired = false,
    className,
    fieldName,
    ...rest
}) => {
    return (
        <div className="d-flex flex-column">
            <label className={`${styles.customInputLabel}`} htmlFor={fieldName}>
                {label}
                {/* 
                    Conditional rendering of info icon and required field based on props
                */}
                <Switch>
                    <Switch.Case condition={isRequired}>
                        <sup>*</sup>
                    </Switch.Case>
                    <Switch.Case condition={infoText}>
                        <Popover className="d-inline">
                            <Popover.Button className="infoPopoverButton d-inline ml-1">
                                <div className="d-inline">
                                    <BsInfoCircle />
                                </div>
                            </Popover.Button>
                            <Popover.Panel placement="bottom-start">
                                <div className={`${style.infoPopoverPanel}`}>
                                    <p>{infoText}</p>
                                </div>
                            </Popover.Panel>
                        </Popover>
                    </Switch.Case>
                </Switch>
            </label>
            {/* 
                Conditional rendering of input field based on type prop
            */}
            <Switch>
                <Switch.Case condition={type === "textarea"}>
                    <input
                        type="textarea"
                        className={`${styles.customInputTextArea} ${className}`}
                        placeholder={placeholder}
                        value={value}
                        name={fieldName}
                        onChange={onChange}
                        cols="30"
                        rows="4"
                        {...rest}
                    />
                </Switch.Case>
                <Switch.Case condition={type !== "textarea"}>
                    <input
                        type={type}
                        className={`${styles.customInput} ${className}`}
                        placeholder={placeholder}
                        value={value}
                        name={fieldName}
                        required={isRequired}
                        onChange={onChange}
                        {...rest}
                    />
                </Switch.Case>
            </Switch>
            {isError && <p className="mt-1 text-danger">{errorText}</p>}
        </div>
    );
};

export default CustomInput;

CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    infoText: PropTypes.string,
    errorText: PropTypes.string,
    isError: PropTypes.bool,
    isRequired: PropTypes.bool,
    className: PropTypes.string,
    fieldName: PropTypes.string,
};
