import React from "react";
import PropTypes from "prop-types";

// Ui components
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";
import { Placeholder } from "../../../../global/Placeholder";
import SaleRiskAuthorizeHeaderLoaderForUser from "../loader/SaleRiskAuthorizeHeaderLoaderForUser";

const SaleRiskAuthorizeHeaderForUser = ({ headerData, isLoading }) => {
    return (
        <div
            className="row d-flex align-items-center flex-column flex-md-row"
            style={{
                margin: "20px 0",
            }}
        >
            {isLoading ? (
                <SaleRiskAuthorizeHeaderLoaderForUser />
            ) : (
                <SaleRiskAuthorizeHeaderWrapper className="col-12 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 px-0">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            Sales Person :{" "}
                            <span className="ml-1">{headerData.person}</span>
                        </p>
                    </div>
                    <div className="col-12 col-md-3 px-0">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            {" "}
                            Authorize By :{" "}
                            <span className="ml-1">
                                {headerData.authorizer}
                            </span>
                        </p>
                    </div>
                    <div className="col-12 col-md-3 px-0">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            {" "}
                            Deadline: {headerData.deadline}
                        </p>
                    </div>
                    <div className="col-12 col-md-3 px-0">
                        <p className="singleline-ellipsis d-flex align-items-center">
                            Clients Name : {headerData.clients_name}
                        </p>
                    </div>
                </SaleRiskAuthorizeHeaderWrapper>
            )}
        </div>
    );
};

export default SaleRiskAuthorizeHeaderForUser;

SaleRiskAuthorizeHeaderForUser.propTypes = {
    headerData: PropTypes.object,
    isLoading: PropTypes.bool,
};
