import React from "react";
import PropTypes from "prop-types";

// Components - Shared - UI
import CustomLabel from "../CustomLabel/CustomLabel";

// Style
import style from "./customInput.module.css";

const CustomInput = ({
    label,
    className,
    fieldName,
    isRequired,
    errorMessage,
    placeHolder = "",
    value,
    type = "text",
    onChange,
    ...rest
}) => {
    return (
        <div className={`d-flex flex-column ${style.custom_input_container}`}>
            <CustomLabel label={label} isRequired={isRequired} />
            <input
                className={`form-control ${className}`}
                id={fieldName}
                name={fieldName}
                value={value}
                placeHolder={placeHolder}
                onChange={onChange}
                {...rest}
                type="text"
            />
        </div>
    );
};

export default CustomInput;

CustomInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    fieldName: PropTypes.string,
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    placeHolder: PropTypes.string,
};
