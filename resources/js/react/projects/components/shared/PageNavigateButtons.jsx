import React from "react";
import PropTypes from "prop-types";

// Components - Global
import Switch from "../../../global/Switch";

// style
import style from "../sections/styles/dashboardHeaderSection.module.css";

// ui components
import Button from "../ui/customComponents/Button/Button";

// hooks
import { useAuth } from "../../../hooks/useAuth";

const PageNavigateButtons = ({ navigateData, className = "" }) => {
    const auth = useAuth();
    return (
        <div className={`${className} ${style?.navigationFooterButtons}`}>
            <Switch>
                <Switch.Case condition={navigateData?.deal_id}>
                    <Button
                        onClick={() =>
                            window.open(
                                `/account/contracts/${navigateData?.deal_id}`,
                                "_blank"
                            )
                        }
                        className={`${style?.dashboardHeaderButton} text-nowrap`}
                    >
                        Won Deal
                    </Button>
                </Switch.Case>
                <Switch.Case condition={auth.getRoleId() === 1}>
                    <Button
                        onClick={() =>
                            window.open(
                                `/account/deals/${navigateData?.deal?.deal_stage?.id}`,
                                "_blank"
                            )
                        }
                        className={`${style?.dashboardHeaderButton} ml-2`}
                    >
                        Deal
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
                            Lead
                        </Button>
                    </Switch.Case>
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
