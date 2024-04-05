import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Tooltip from "../Tooltip";
import { Placeholder } from "../../../../global/Placeholder";
import SaleRiskAuthorizeHeaderLoader from "../loader/SaleRiskAuthorizeHeaderLoder";
import Popover from "../Popover";

import popoverStyle from "../popover.module.css";

const SaleRiskAuthorizeHeader = ({ headerData, isLoading }) => {
    return (
        <div
            className="row d-flex flex-column flex-md-row align-items-center"
            style={{
                margin: "20px 0",
            }}
        >
            {isLoading ? (
                <SaleRiskAuthorizeHeaderLoader />
            ) : (
                <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-10 d-flex flex-column flex-md-row mb-3 mb-md-3 mb-lg-0">
                    <div className="col-12 col-md-4 col-lg-4 px-0">
                        <Popover>
                            <Popover.Button>
                                <p
                                    className={`${popoverStyle.questionModal_popover_button} singleline-ellipsis`}
                                >
                                    Project name:{" "}
                                    <span> {headerData?.projectName} </span>
                                </p>
                            </Popover.Button>
                            <Popover.Panel placement="bottom-start">
                                <div
                                    className={`${popoverStyle.questionModal_popover_panel}`}
                                >
                                    {headerData?.projectName ?? "-"}
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
                            <span className="ml-1 ">
                                {headerData?.user?.name}
                            </span>
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
                                    Clients: {headerData?.client_name}
                                </p>
                            </Popover.Button>
                            <Popover.Panel placement="bottom-start">
                                <div
                                    className={`${popoverStyle.questionModal_popover_panel}`}
                                >
                                    {headerData.client_name ?? "-"}
                                </div>
                            </Popover.Panel>
                        </Popover>
                    </div>
                </SaleRiskAuthorizeHeaderWrapper>
            )}

            <div className="col-12 ol-md-2 col-lg-2 px-0 pl-md-0 pl-lg-3 pr-md-0">
                <SaleRiskAuthorizeHeaderButton
                    onClick={() => {
                        window.location.href = `/account/sales-risk-policies`;
                    }}
                >
                    Modify points
                </SaleRiskAuthorizeHeaderButton>
            </div>
        </div>
    );
};

export default SaleRiskAuthorizeHeader;

SaleRiskAuthorizeHeader.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
};
