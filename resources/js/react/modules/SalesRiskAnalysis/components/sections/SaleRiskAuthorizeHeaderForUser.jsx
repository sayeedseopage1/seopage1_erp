import React from "react";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Popover from "../Popover";

// styles
import popoverStyle from "../popover.module.css";
import Switch from "../Switch";

// loader components
import SaleRiskAuthorizeHeaderLoaderForUser from "../loader/SaleRiskAuthorizeHeaderLoaderForUser";

const SaleRiskAuthorizeHeaderForUser = ({ headerData, isLoading }) => {
    const getDealStatus = (status, shouldExcludePendingAndAnalysis = false) => {
        return shouldExcludePendingAndAnalysis
            ? !["pending", "analysis"].includes(status)
            : ["pending", "analysis"].includes(status);
    };

    console.log("headerData", headerData);

    return (
        <Switch>
            <Switch.Case condition={isLoading}>
                <SaleRiskAuthorizeHeaderLoaderForUser/>
            </Switch.Case>
            <Switch.Case condition={!isLoading}>
                <div
                    className="row d-flex align-items-center flex-column flex-md-row"
                    style={{
                        margin: "20px 0",
                    }}
                >
                    <SaleRiskAuthorizeHeaderWrapper className="col-12 d-flex flex-column flex-md-row">
                        <Switch.Case
                            condition={getDealStatus(
                                headerData?.deal?.sale_analysis_status
                            )}
                        f>
                            <div className="col-12 col-md-3 col-lg-3 px-0">
                                <Popover>
                                    <Popover.Button>
                                        <p
                                            className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                                        >
                                            Project name:{" "}
                                            <span>
                                                {" "}
                                                {
                                                    headerData?.deal
                                                        ?.project_name
                                                }{" "}
                                            </span>
                                        </p>
                                    </Popover.Button>
                                    <Popover.Panel placement="bottom-start">
                                        <div
                                            className={`${popoverStyle.questionModal_popover_panel}`}
                                        >
                                            {headerData?.deal?.project_name ??
                                                "-"}
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        </Switch.Case>
                        <div className="col-12 col-md-3 px-0">
                            <p className="singleline-ellipsis d-flex align-items-center">
                                Sales Person :{" "}
                                <span className="ml-1">
                                    {headerData?.user?.name}
                                </span>
                            </p>
                        </div>
                        <Switch.Case
                            condition={getDealStatus(
                                headerData?.deal?.sale_analysis_status,
                                true
                            )}
                        >
                            <div className="col-12 col-md-3 px-0">
                                <p className="singleline-ellipsis d-flex align-items-center">
                                    {" "}
                                    Authorize By :{" "}
                                    <span className="ml-1">
                                        {headerData?.deal
                                            ?.sale_analysis_status ===
                                        "auto-authorized"
                                            ? "System (Auto)"
                                            : headerData?.authorizeBy?.name}
                                    </span>
                                </p>
                            </div>
                        </Switch.Case>
                        <div className="col-12 col-md-3 px-0">
                            <p className="singleline-ellipsis d-flex align-items-center">
                                {" "}
                                Deadline: {headerData?.deadline} Days
                            </p>
                        </div>
                        <div className="col-12 col-md-3 px-0">
                            <Popover>
                                <Popover.Button>
                                    <p
                                        className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                                    >
                                        Clients: {headerData?.deal?.client_name}
                                    </p>
                                </Popover.Button>
                                <Popover.Panel placement="bottom-start">
                                    <div
                                        className={`${popoverStyle.questionModal_popover_panel}`}
                                    >
                                        {headerData?.deal?.client_name ?? "-"}
                                    </div>
                                </Popover.Panel>
                            </Popover>
                        </div>
                    </SaleRiskAuthorizeHeaderWrapper>
                </div>
            </Switch.Case>
        </Switch>
    );
};

export default SaleRiskAuthorizeHeaderForUser;

SaleRiskAuthorizeHeaderForUser.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
};
