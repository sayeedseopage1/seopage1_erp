import React from "react";
import PropTypes from "prop-types";

// Ui components
import { CustomInputCheckbox, CustomInputsLabel } from "../Styles/ui";

const CustomCheckbox = ({ isChecked, setIsChecked }) => {
    return (
        <div className="d-flex align-items-start my-3">
            <CustomInputCheckbox
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <CustomInputsLabel>
                I hereby confirm that all provided information is accurate. Any
                future discrepancies in the above-mentioned information will
                result in marking this deal as a 'Disqualified Deal' and
                negative points will be added to my cumulative sales points.
            </CustomInputsLabel>
        </div>
    );
};

export default CustomCheckbox;

CustomCheckbox.propTypes = {
    isChecked: PropTypes.bool,
    setIsChecked: PropTypes.func,
}
