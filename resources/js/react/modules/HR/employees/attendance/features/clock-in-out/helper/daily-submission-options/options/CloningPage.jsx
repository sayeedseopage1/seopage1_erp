import React from "react";
import { InputItem } from "../../../DailySubmissionUI";
const CloningPage = () => {
    return (
        <div>
            <div>
                <div>
                    How many pages did you create today by cloning a main page
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>Did you change content & Images on those cloned pages</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all the pages from the
                    dashboard (Where all the todays uploaded pages can be seen)
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

export default CloningPage;
