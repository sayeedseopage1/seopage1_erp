import React from "react";
import { CustomInputsLabel } from "../Styles/ui";

const CustomCheckbox = () => {
    return (
        <div className="d-flex align-items-start">
            <input type="checkbox" name="" id="" />
            <CustomInputsLabel>
                I hereby confirm that all provided information is accurate. Any
                future discrepancies in the above-mentioned information will
                result in marking this deal as a 'Disqualified Deal,' and
                negative points will be added to my cumulative sales points.
            </CustomInputsLabel>
        </div>
    );
};

export default CustomCheckbox;
