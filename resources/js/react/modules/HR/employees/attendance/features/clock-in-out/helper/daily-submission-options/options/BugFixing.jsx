import React from "react";
import { InputItem } from "../../../DailySubmissionUI";

const BugFixing = () => {
    return (
        <div>
            <div>
                <div>
                    What was the bug about? (You can copy paste from the task
                    details)
                </div>
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

export default BugFixing;
