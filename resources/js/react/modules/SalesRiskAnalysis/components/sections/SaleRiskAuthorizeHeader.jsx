import React from "react";
import PropTypes from "prop-types";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "../ui/Styles/ui";
import Tooltip from "../Tooltip";
import { Placeholder } from "../../../../global/Placeholder";
import SaleRiskAuthorizeHeaderLoader from "../loader/SaleRiskAuthorizeHeaderLoder";

// hooks

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
                    <div className="col-12 col-md-4 col-lg-4 px-0 ">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            Project name:{" "}
                            <span className="ml-1">
                                {" "}
                                <Tooltip text={headerData?.project_name}>
                                    {headerData?.project_name}
                                </Tooltip>
                            </span>
                        </p>
                    </div>
                    <div className="col-12 col-md-4 px-0 ">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            Sales Person :{" "}
                            <span className="ml-1">{headerData.person}</span>
                        </p>
                    </div>
                    <div className="col-12 col-md-2 px-0 singleline-ellipsis">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            {" "}
                            Deadline: {headerData.deadline}
                        </p>
                    </div>
                    <div className="col-12 col-md-2 px-0 ">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            Clients Name : {headerData.clients_name}
                        </p>
                    </div>
                </SaleRiskAuthorizeHeaderWrapper>
            )}

            <div className="col-12 ol-md-2 col-lg-2 px-0 pl-md-0 pl-lg-3 pr-md-0">
                <SaleRiskAuthorizeHeaderButton>
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
