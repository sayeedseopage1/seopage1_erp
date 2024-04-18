import React from "react";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Popover from "../Popover";

import popoverStyle from "../popover.module.css";

const SaleRiskAuthorizeHeader = ({
    headerData,
    isLoading,
    handleOpenAuthorizeModal,
}) => {
    return (
        <div
            className="row d-flex flex-column flex-md-row align-items-center"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-8 d-flex flex-column flex-md-row mb-3 mb-md-3 mb-lg-0">
                <div className="col-12 col-md-4 col-lg-4 px-0">
                    <Popover>
                        <Popover.Button>
                            <p
                                className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                            >
                                Project name:{" "}
                                <span> {headerData?.deal?.project_name} </span>
                            </p>
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                            <div
                                className={`${popoverStyle.questionModal_popover_panel}`}
                            >
                                {headerData?.deal?.project_name ?? "-"}
                            </div>
                        </Popover.Panel>
                    </Popover>
                    {/* <div className="d-flex align-items-center ">
                            Project name:{" "}
                            <Popover>
                                <Popover.Button>
                                    <div
                                        className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                                    >
                                        {headerData?.projectName}
                                    </div>
                                </Popover.Button>
                                <Popover.Panel placement="bottom-start">
                                    <div
                                        className={`${popoverStyle.questionModal_popover_panel}`}
                                    >
                                        {headerData?.projectName}
                                    </div>
                                </Popover.Panel>
                            </Popover>
                        </div> */}
                </div>
                <div className="col-12 col-md-4 px-0 ">
                    <p className=" singleline-ellipsis">
                        Sales Person :{" "}
                        <span className="ml-1 ">{headerData?.user?.name}</span>
                    </p>
                </div>
                <div className="col-12 col-md-2 px-0">
                    <p className="singleline-ellipsis">
                        {" "}
                        Deadline: {headerData.deadline} Days
                    </p>
                </div>
                <div className="col-12 col-md-2 px-0">
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
        </div>
    );
};

export default SaleRiskAuthorizeHeader;

SaleRiskAuthorizeHeader.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
    handleOpenAuthorizeModal: PropTypes.func,
};
