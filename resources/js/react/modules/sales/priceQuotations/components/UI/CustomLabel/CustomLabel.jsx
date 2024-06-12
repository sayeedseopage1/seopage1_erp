import React from "react";
import PropTypes from "prop-types";

// Style
import style from "./customLabel.module.css";

const CustomLabel = ({
    label = "",
    className = "",
    fieldName = "",
    isRequired = false,
    ...rest
}) => {
    return (
        <label
            className={`${style.custom_label} ${className}`}
            {...rest}
            htmlFor={fieldName}
        >
            {label} {isRequired && <sup className="text-danger">*</sup>}
        </label>
    );
};

export default CustomLabel;

CustomLabel.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    fieldName: PropTypes.string,
    isRequired: PropTypes.bool,
    rest: PropTypes.any,
}
