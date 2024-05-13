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
import Popover from "../../Popover";
import pStyle from "../../popover.module.css";

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
    isCurrencyHave,
    ...props
}) => {
    const { currency } = isCurrencyHave;
    const handleOnkeypress = (e) => {
        const allowedKeys = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "Backspace",
            "ArrowLeft",
            "ArrowRight",
        ];
        if (!allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const getCurrencySymbol = () => {
        if (currency?.length) {
            return `${currency[2]} ${currency[0]}`;
        }
    };

    return (
        <div className="d-flex flex-column mb-4">
            <CustomInputsLabel color={isChild ? "#b1b1b1" : "#000000"}>
                {label}{" "}
                {props?.comment && (
                        <Popover
                            className={`${pStyle.questionShow} d-inline-block ml-2`}
                        >
                            <Popover.Button
                                className={`${pStyle.questionShowInfoIcon} d-inline`}
                            >
                                <div className="d-inline">
                                    <i
                                        className="fa-solid fa-circle-info "
                                        style={{
                                            color: "#8F8F8F",
                                        }}
                                    ></i>
                                </div>
                            </Popover.Button>
                            <Popover.Panel placement="bottom-start">
                                <div
                                    className={`${pStyle.questionShowInfoPanel}`}
                                >
                                    <span>{props?.comment}</span>
                                </div>
                            </Popover.Panel>
                        </Popover>
                    )}
                {isCurrencyHave.status && (
                    <span
                        className="ml-2"
                        style={{
                            color: "#000000",
                            backgroundColor: "#c4de95",
                            padding: "2px 12px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        Currency in {getCurrencySymbol()}
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
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
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
    isCurrencyHave: PropTypes.object,
};
