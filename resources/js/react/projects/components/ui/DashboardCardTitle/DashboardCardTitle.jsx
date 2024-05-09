import React from "react";
import PropTypes from "prop-types";

// Components - custom
import { CardTitle } from "../styledComponents";

const DashboardCardTitle = ({
    title,
    isBorderUse = false,
    rightText,
    rightTextColor,
}) => {
    return (
        <CardTitle
            border={isBorderUse ? "1px solid #D8D8D8" : "none"}
            className="d-flex justify-content-between align-items-center"
        >
            <p>{title}</p>
            {rightText && (
                <span
                    style={{
                        color: rightTextColor,
                    }}
                >
                    {rightText}
                </span>
            )}
        </CardTitle>
    );
};

export default DashboardCardTitle;

DashboardCardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isBorderUse: PropTypes.bool,
    rightText: PropTypes.string,
    rightTextColor: PropTypes.string,
};
