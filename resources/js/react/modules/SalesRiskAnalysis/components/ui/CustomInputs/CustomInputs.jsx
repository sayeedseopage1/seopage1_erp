import React from "react";
import PropTypes from "prop-types";

// Ui components
import Switch from "../../Switch";
import {
    CustomInputsInput,
    CustomInputsTextArea,
    CustomInputsLabel,
} from "../Styles/ui";
import Tooltip from "../../Tooltip";

const CustomInputs = ({
    label,
    value,
    onChange,
    error,
    type,
    placeholder,
    name,
    disabled,
    readOnly,
    required,
    className,
    style,
    id,
    isChild,
    isSubmitting,
    ...props
}) => {
    const handleOnkeypress = (e) => {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="d-flex flex-column mb-4">
            <CustomInputsLabel color={isChild ? "#b1b1b1" : "#000000"}>
                {label}{" "}
                {props?.comment && (
                    <span className="ml-2">
                        <Tooltip text={props?.comment}>
                            {" "}
                            <i
                                className="fa-solid fa-circle-info "
                                style={{
                                    color: "#8F8F8F",
                                }}
                            ></i>
                        </Tooltip>
                    </span>
                )}
            </CustomInputsLabel>
            <Switch>
                <Switch.Case condition={type === "longText"}>
                    <CustomInputsTextArea
                        id={id}
                        name={name}
                        rows={9}
                        cols={50}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />
                </Switch.Case>
                <Switch.Case condition={type === "text"}>
                    <CustomInputsInput
                        id={id}
                        name={name}
                        value={value}
                        type="text"
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />
                </Switch.Case>
                <Switch.Case condition={type === "numeric"}>
                    <CustomInputsInput
                        id={id}
                        name={name}
                        value={value}
                        type="number"
                        onKeyDown={handleOnkeypress}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />
                </Switch.Case>
            </Switch>
            {isSubmitting && !value && (
                <span style={{ color: "red", fontSize: "14px" , marginTop: "8px" }}>
                    This field is required
                </span>
            )}
        </div>
    );
};

export default CustomInputs;

CustomInputs.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    isChild: PropTypes.bool,
    comment: PropTypes.string,
    isSubmitting: PropTypes.bool,
};
