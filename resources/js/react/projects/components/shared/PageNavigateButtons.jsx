import React from "react";
import PropTypes from "prop-types";
import Button from "../ui/customComponents/Button/Button";

const PageNavigateButtons = ({ navigateData, style, className }) => {
    return (
        <div className={`${className}`}>
            <Button
                onClick={() => window.open(`/account/contracts/${navigateData?.deal_id}`, "_blank")}
                className={`${style?.dashboardHeaderButton}`}
            >
                Won Deal
            </Button>
            <Button
                onClick={() => window.open(`/account/deals/${navigateData?.deal?.deal_stage?.id}`, "_blank")}
                className={`${style?.dashboardHeaderButton} ml-2`}
            >
                Deal Page
            </Button>
            <Button
                onClick={() => window.open(`/account/deals/${navigateData?.deal?.lead_id}`, "_blank")}
                className={`${style?.dashboardHeaderButton} ml-2`}
            >
                Lead Page
            </Button>
        </div>
    );
};

export default PageNavigateButtons;

PageNavigateButtons.propTypes = {
    navigateData: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
};
