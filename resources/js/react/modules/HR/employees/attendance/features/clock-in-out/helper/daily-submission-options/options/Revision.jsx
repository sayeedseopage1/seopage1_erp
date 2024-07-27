import React from "react";
import { InputItem } from "../../../DailySubmissionUI";
const Revision = () => {
    return (
        <div>
            <div>
                <div>Share the list of revisions assigned to you</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>Which ones of them did you complete today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>
                    Quantity Wise, what's the percentage of revisions you
                    completed today
                </div>
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

export default Revision;
