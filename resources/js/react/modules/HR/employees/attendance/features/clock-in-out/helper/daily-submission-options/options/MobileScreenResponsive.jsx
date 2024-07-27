import React from "react";
import { InputItem } from "../../../DailySubmissionUI";

const MobileScreenResponsive = () => {
    return (
        <div>
            <div>
                <div>Name</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>
                    Enter screenshot/screen record for section 1 on mobile
                    device
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

export default MobileScreenResponsive;
