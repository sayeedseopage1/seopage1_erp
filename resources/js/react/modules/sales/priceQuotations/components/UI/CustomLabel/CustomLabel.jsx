import React from "react";

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
