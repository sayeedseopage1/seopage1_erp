import React from "react";
import PropTypes from "prop-types";

// Components - Custom
import Button from "../ui/customComponents/Button/Button";

// Styles
import style from "./styles/dashboardHeaderSection.module.css";

const DashboardHeaderSection = ({ projectType = "Fixed" }) => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4">
            <div className="d-flex mb-3 mb-md-0">
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderButton} `}
                  
                >
                    Working Environment
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderForType} ml-2`}
                >
                    Project Type: {projectType}
                </Button>
            </div>
            <div className="d-flex mb-3 mb-md-0 ">
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Mark as complete
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderButton} ${style.actionButton} ml-2`}
                >
                    Action <i className="fa-solid fa-ellipsis-vertical ml-1"></i>
                </Button>
            </div>
        </div>
    );
};

export default DashboardHeaderSection;

DashboardHeaderSection.propTypes = {
    projectType: PropTypes.string,
};
