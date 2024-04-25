import React from "react";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Popover from "../Popover";

import popoverStyle from "../popover.module.css";
import Switch from "../Switch";

// loader
import SaleRiskAuthorizeHeaderLoader from "../loader/SaleRiskAuthorizeHeaderLoader";

const SaleRiskAuthorizeHeader = ({
    headerData,
    isLoading,
    handleOpenAuthorizeModal,
}) => {
    const getDealStatus = (status, shouldExcludePendingAndAnalysis = false) => {
        return shouldExcludePendingAndAnalysis
            ? !["pending", "analysis"].includes(status)
            : ["pending", "analysis"].includes(status);
    };
    return (
        <div
            className="row d-flex flex-column flex-md-row align-items-center"
            style={{
                margin: "20px 0",
            }}
        >
            <Switch>
                <Switch.Case condition={isLoading}>
                    <SaleRiskAuthorizeHeaderLoader />
                </Switch.Case>
                <Switch.Case condition={!isLoading}>
                    {/* 
                    
                        This Header will Show only for admin before the deal is authorized or auto-authorized or Denied
                    */}

                    <Switch.Case
                        condition={getDealStatus(
                            headerData?.deal?.sale_analysis_status
                        )}
                    >
                        <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-8 d-flex flex-column flex-md-row mb-3 mb-md-3 mb-lg-0">
                            <div className="col-12 col-md-4 col-lg-4 px-0">
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
                            <div className="col-12 col-md-4 px-0 ">
                                <p className=" singleline-ellipsis">
                                    Sales Person :{" "}
                                    <span className="ml-1 ">
                                        {headerData?.user?.name}
                                    </span>
                                </p>
                            </div>
                            <div className="col-12 col-md-2 px-0">
                                <p className="singleline-ellipsis">
                                    {" "}
                                    Deadline: {headerData?.deadline} Days
                                </p>
                            </div>
                            <div className="col-12 col-md-2 px-0">
                                <Popover>
                                    <Popover.Button>
                                        <p
                                            className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                                        >
                                            Clients:{" "}
                                            {headerData?.deal?.client_name}
                                        </p>
                                    </Popover.Button>
                                    <Popover.Panel placement="bottom-start">
                                        <div
                                            className={`${popoverStyle.questionModal_popover_panel}`}
                                        >
                                            {headerData?.deal?.client_name ??
                                                "-"}
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        </SaleRiskAuthorizeHeaderWrapper>
                        <div className="col-12 ol-md-4 col-lg-4 d-flex">
                            <div className="col-6 px-0 pl-md-0 pl-lg-3 pr-md-0">
                                <SaleRiskAuthorizeHeaderButton
                                    onClick={() => {
                                        window.location.href = `/account/sales-risk-policies`;
                                    }}
                                >
                                    Modify points
                                </SaleRiskAuthorizeHeaderButton>
                            </div>
                            <div className="col-6 px-0 pl-md-0 pl-lg-3 pr-md-0">
                                <SaleRiskAuthorizeHeaderButton
                                    onClick={handleOpenAuthorizeModal}
                                >
                                    Polices History
                                </SaleRiskAuthorizeHeaderButton>
                            </div>
                        </div>
                    </Switch.Case>

                    {/*
                        This Header will show only for admin After the deal is authorized or auto-authorized or Denied
                    */}
                    <Switch.Case
                        condition={getDealStatus(
                            headerData?.deal?.sale_analysis_status,
                            true
                        )}
                    >
                        <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-10 d-flex flex-column flex-md-row">
                            <div className="col-12 col-md-3 px-0">
                                <p className="singleline-ellipsis d-flex align-items-center">
                                    Sales Person :{" "}
                                    <span className="ml-1">
                                        {headerData?.user?.name}
                                    </span>
                                </p>
                            </div>
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
                                            Clients:{" "}
                                            {headerData?.deal?.client_name}
                                        </p>
                                    </Popover.Button>
                                    <Popover.Panel placement="bottom-start">
                                        <div
                                            className={`${popoverStyle.questionModal_popover_panel}`}
                                        >
                                            {headerData?.deal?.client_name ??
                                                "-"}
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        </SaleRiskAuthorizeHeaderWrapper>
                        <div className="col-12 ol-md-2 col-lg-2 d-flex">
                            <div className="col-12 px-0 pl-md-0 pl-lg-3 pr-md-0">
                                <SaleRiskAuthorizeHeaderButton
                                    onClick={handleOpenAuthorizeModal}
                                >
                                    Polices History
                                </SaleRiskAuthorizeHeaderButton>
                            </div>
                        </div>
                    </Switch.Case>
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default SaleRiskAuthorizeHeader;

SaleRiskAuthorizeHeader.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
    handleOpenAuthorizeModal: PropTypes.func,
};
