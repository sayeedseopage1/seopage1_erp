import React from "react";

import { InputItem } from "../../../DailySubmissionUI";

const SectionBuilding = () => {
    return (
        <div>
            <div>
                <h4 style={{ fontWeight: "bold" }}>section Building</h4>
                <div>
                    <div>Enter input 1</div>
                    <InputItem
                        width="100%"
                        placeHolder="input 1.."
                        // value={value}
                        // onChange={(e) =>
                        //     handleChange(id, e.target.value)
                        // }
                    />
                </div>
                <div>
                    <div>Enter input 2</div>
                    <InputItem
                        width="100%"
                        placeHolder="input 2.."
                        // value={value}
                        // onChange={(e) =>
                        //     handleChange(id, e.target.value)
                        // }
                    />
                </div>
            </div>
        </div>
    );
};

export default SectionBuilding;
