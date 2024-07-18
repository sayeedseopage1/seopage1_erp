import React from "react";
import { InputItem } from "../../DailySubmissionUI";

const SubmissionForSinglePage = ({ id, handleChange, value }) => {
    return (
        <div>
            <div>Enter the page URL for Page #{id}</div>
            <InputItem
                width="100%"
                placeHolder="Provide URL Link.."
                value={value}
                onChange={(e) => handleChange(id, e.target.value)}
            />
        </div>
    );
};

export default SubmissionForSinglePage;
