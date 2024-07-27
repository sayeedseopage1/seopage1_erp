import React from "react";
import { InputItem } from "../../../DailySubmissionUI";
const ProductUploading = () => {
    return (
        <div>
            <div>
                <div>How many products did you upload today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all products page from the
                    dashboard (Where all the todays uploaded products can be
                    seen)
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

export default ProductUploading;
