import React from "react";
import PropTypes from "prop-types";

// Ui components
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";
import Popover from "../Popover";

// styles
import popoverStyle from "../popover.module.css";

const SaleRiskAuthorizeHeaderForUser = ({ headerData, isLoading }) => {
    return (
        <div
            className="row d-flex align-items-center flex-column flex-md-row"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-12 d-flex flex-column flex-md-row">
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        Sales Person :{" "}
                        <span className="ml-1">{headerData?.user?.name}</span>
                    </p>
                </div>
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        {" "}
                        Authorize By :{" "}
                        <span className="ml-1">
                            {headerData?.authorizeBy?.name ?? "-"}
                        </span>
                    </p>
                </div>
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        {" "}
                        Deadline: {headerData.deadline} Days
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
    );
};

export default SaleRiskAuthorizeHeaderForUser;

SaleRiskAuthorizeHeaderForUser.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
};
