import React from "react";
import { InputItem } from "../../../DailySubmissionUI";

const FunctionalityDevelopment = () => {
    return (
        <div>
            <p style={{ fontWeight: "bold" }}>Functionality development</p>
            <div>
                <div>What is the functionality about?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>How much of it was fixed today? (In percentage)</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>Comments</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
        </div>
    );
};

export default FunctionalityDevelopment;
