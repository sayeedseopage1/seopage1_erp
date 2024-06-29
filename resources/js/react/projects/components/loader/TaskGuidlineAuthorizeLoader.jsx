import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// UI Components - Custom
import { Placeholder } from "../../../global/Placeholder";

// UI Components - Custom
import CustomButton from "../ui/CustomButton/CustomButton";

const TaskGuidelineAuthorizeLoader = () => {
    return _.times(4, (index) => {
        return (
            <div className="row m-0 dashboardModalTableItem" key={index}>
                <div className="col-6 align-items-center d-flex">
                    <Placeholder width="100%" height="13px" />
                </div>
                <div className="col-2 d-flex align-items-center">
                    <Placeholder width="100%" height="13px" />
                </div>
                <div className="col-4">
                    <CustomButton value={index} isDisabled />
                </div>
            </div>
        );
    });
};

export default TaskGuidelineAuthorizeLoader;

TaskGuidelineAuthorizeLoader.propTypes = {};
