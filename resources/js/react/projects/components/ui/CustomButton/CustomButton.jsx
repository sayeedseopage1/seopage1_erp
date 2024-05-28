import React from "react";
import PropTypes from "prop-types";

// styles
import style from "./customButtons.module.css";

/**
 * 
 *  CustomButton component
 *  @param {number} value - Value of the button
 *  @param {function} onChange - OnChange event handler
 *  @returns {JSX.Element}
 * 
 *  @description CustomButton component to render custom buttons
 */


const CustomButton = ({ value, onChange }) => {
    return (
        <div className="d-flex">
            <button
                className={`btn mr-3 ${style.customBtn_outline} ${
                    value === 1
                        ? style.customBtn_primary_active
                        : style.customBtn_primary
                } `}
                onClick={() => onChange(1)}
                value={value}
            >
                Yes
            </button>
            <button
                className={`btn ${style.customBtn_outline} ${
                    value === 0
                        ? style.customBtn_secondary_active
                        : style.customBtn_secondary
                } `}
                onClick={() => onChange(0)}
                value={value}
            >
                No
            </button>
        </div>
    );
};

export default CustomButton;

CustomButton.propTypes = {
    value: PropTypes.number || null,
    onChange: PropTypes.func,
};
