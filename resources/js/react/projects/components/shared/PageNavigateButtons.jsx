import React from "react";
import PropTypes from "prop-types";

// Components - Global
import Switch from "../../../global/Switch";

// style
import style from "../sections/styles/dashboardHeaderSection.module.css";

// ui components
import Button from "../ui/customComponents/Button/Button";

const PageNavigateButtons = ({ navigateData, className = "" }) => {
    return (
        <div className={`${className}`}>
            <Switch>
                <Button
                    onClick={() =>
                        window.open(
                            `/account/contracts/${navigateData?.deal_id}`,
                            "_blank"
                        )
                    }
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Won Deal
                </Button>
                <Button
                    onClick={() =>
                        window.open(
                            `/account/deals/${navigateData?.deal?.deal_stage?.id}`,
                            "_blank"
                        )
                    }
                    className={`${style?.dashboardHeaderButton} ml-2`}
                >
                    Deal Page
                </Button>
                <Switch.Case condition={navigateData?.deal?.lead_id}>
                    <Button
                        onClick={() =>
                            window.open(
                                `/account/leads/${navigateData?.deal?.lead_id}`,
                                "_blank"
                            )
                        }
                        className={`${style?.dashboardHeaderButton} ml-2`}
                    >
                        Lead Page
                    </Button>
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default PageNavigateButtons;

PageNavigateButtons.propTypes = {
    navigateData: PropTypes.object,
    className: PropTypes.string,
};
