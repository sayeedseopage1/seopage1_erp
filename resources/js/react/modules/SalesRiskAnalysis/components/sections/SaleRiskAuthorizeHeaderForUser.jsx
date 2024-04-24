import React from "react";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Popover from "../Popover";

// styles
import popoverStyle from "../popover.module.css";

const SaleRiskAuthorizeHeaderForUser = ({
    headerData,
    handleOpenAuthorizeModal,
}) => {
    console.log(headerData.deal.sale_analysis_status === "auto-authorized");
    return (
        <div
            className="row d-flex align-items-center flex-column flex-md-row"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-10 d-flex flex-column flex-md-row">
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
                            {headerData.deal.sale_analysis_status ===
                            "auto-authorized"
                                ? "System (Auto)"
                                : headerData?.authorizeBy?.name}
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
            <div className="col-12 ol-md-2 col-lg-2 d-flex">
                <div className="col-12 px-0 pl-md-0 pl-lg-3 pr-md-0">
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

export default SaleRiskAuthorizeHeaderForUser;

SaleRiskAuthorizeHeaderForUser.propTypes = {
    headerData: PropTypes.object,
    handleOpenAuthorizeModal: PropTypes.func,
};
