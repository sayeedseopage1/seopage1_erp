import React from "react";
import style from "./customButtons.module.css";
import PropTypes from "prop-types";



/**
 * 
 *  SingleButton component
 *  @param {string} label - Button label
 *  @param {function} onClick - OnClick event handler
 *  @param {string} className - Additional class name
 *  @param {boolean} isDisabled - Flag to disable button
 *  @param {string} type - Type of the button
 *  @param {object} props - Additional props
 */

const SingleButton = ({
    label,
    onClick,
    className = "",
    isDisabled,
    type = "primary",
    props,
}) => {
    const handleClass = () => {
        switch (type) {
            case "primary":
                return style.customBtn_primary_active;
            case "secondary":
                return style.customBtn_secondary_active;
            default:
                return style.customBtn_primary_active;
        }
    };

    return (
        <button
            className={`btn mr-2 ${style.customBtn_outline_single} ${handleClass(
                type
            )} ${className}`}
            onClick={onClick}
            disabled={isDisabled}
            {...props}
        >
            {label}
        </button>
    );
};

export default SingleButton;

SingleButton.propTypes = {
    label: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
    props: PropTypes.object,
};
