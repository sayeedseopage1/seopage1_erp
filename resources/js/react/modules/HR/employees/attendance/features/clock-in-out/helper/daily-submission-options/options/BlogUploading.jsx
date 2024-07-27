import React from "react";
import { InputItem } from "../../../DailySubmissionUI";
const BlogUploading = () => {
    return (
        <div>
            <div>
                <div>How many blog posts did you upload today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    // value={value}
                    // onChange={(e) => handleChange(id, e.target.value)}
                />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all the blog posts in the
                    dashboards (Where all the todays uploaded blogs can be seen)
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

export default BlogUploading;
