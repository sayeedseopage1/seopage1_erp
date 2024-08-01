import React from "react";
import PropTypes from "prop-types";

// style
import "./dashboardProgressStatus.css";

// constant
import { ProjectProgressStatus } from "../../../constants";

const DashboardProgressStatus = ({ title, className = "", statusType }) => {
    const getBgColor = (statusType) => {
        const bgColor = ProjectProgressStatus.find(
            (status) => status.tag === statusType
        );
        return bgColor?.color || "#00B5FF";
    };

    return (
        <div
            className={`dashboardProgressStatus ${className}`}
            style={{
                backgroundColor: getBgColor(statusType),
            }}
        >
            {title}
        </div>
    );
};

export default DashboardProgressStatus;

DashboardProgressStatus.propTypes = {
    title: PropTypes.string.isRequired,
    statusType: PropTypes.string.isRequired,
    className: PropTypes.string,
};
