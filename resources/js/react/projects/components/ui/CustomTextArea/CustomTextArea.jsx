import React from "react";
import PropTypes from "prop-types";

// style
import "./customTextArea.css";

// Components - Global
import Switch from "../../../../global/Switch";

// Helper
import { formatHttp } from "../../../helper";

const CustomTextArea = ({
    label,
    value,
    onChange,
    name,
    placeholder,
    rows = 4,
    cols = 50,
    parentClass = "",
    isDisabled = false,
    isDangerHtml = false,
    isRequired = false,
    isLabelDangerHtml = false,
    className = "",
}) => {
    return (
        <div className={`customTextArea ${className}`}>
            <Switch>
                <Switch.Case condition={isLabelDangerHtml}>
                    <label
                        htmlFor={name}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                </Switch.Case>
                <Switch.Case condition={!isLabelDangerHtml}>
                    <label htmlFor={name}>
                        {label} {isRequired && <sup>*</sup>}
                    </label>
                </Switch.Case>

                <Switch.Case condition={isDangerHtml}>
                    <div
                        className={`dangerHtml ${parentClass} ${
                            isDisabled ? "customTextAreaActive" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: formatHttp(value) }}
                    />
                </Switch.Case>
                <Switch.Case condition={!isDangerHtml}>
                    <textarea
                        name={name}
                        id={name}
                        cols={cols}
                        rows={rows}
                        className={`${
                            isDisabled ? "customTextAreaActive" : ""
                        }`}
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                        disabled={isDisabled}
                    />
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default CustomTextArea;

CustomTextArea.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    isRequired: PropTypes.bool,
    parentClass: PropTypes.string,
    isDisabled: PropTypes.bool,
    isDangerHtml: PropTypes.bool,
    className: PropTypes.string,
};
