import React from "react";
import PropTypes from "prop-types";

// Ui components
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";
import { Placeholder } from "../../../../global/Placeholder";

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
                        {isLoading ? (
                            <Placeholder
                                height="20px"
                                width="80px"
                                className="ml-1"
                            />
                        ) : (
                            <span className="ml-1">{headerData.person}</span>
                        )}
                    </p>
                </div>
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        {" "}
                        Authorize By :{" "}
                        {isLoading ? (
                            <Placeholder
                                height="20px"
                                width="80px"
                                className="ml-1"
                            />
                        ) : (
                            <span className="ml-1">
                                {headerData.authorizer}
                            </span>
                        )}
                    </p>
                </div>
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        {" "}
                        Deadline:{" "}
                        {isLoading ? (
                            <Placeholder
                                height="20px"
                                width="80px"
                                className="ml-1"
                            />
                        ) : (
                            headerData.deadline
                        )}
                    </p>
                </div>
                <div className="col-12 col-md-3 px-0">
                    <p className="singleline-ellipsis d-flex align-items-center">
                        Clients Name :{" "}
                        {isLoading ? (
                            <Placeholder
                                height="20px"
                                width="80px"
                                className="ml-1"
                            />
                        ) : (
                            headerData.clients_name
                        )}
                    </p>
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
