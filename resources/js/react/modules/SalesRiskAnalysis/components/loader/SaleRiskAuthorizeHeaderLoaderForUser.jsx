import React from "react";

// Ui components
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";
import { Placeholder } from "../../../../global/Placeholder";

const SaleRiskAuthorizeHeaderLoaderForUser = () => {
    return (
        <div
            className="row d-flex align-items-center flex-column flex-md-row"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-12 d-flex flex-column flex-md-row">
                <div className="col-12 col-md-3 px-0 ">
                    <div className="singleline-ellipsis d-flex align-items-center">
                        Project name:{" "}
                        <Placeholder
                            height="20px"
                            width="80px"
                            className="ml-1"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3 px-0 ">
                    <div className="singleline-ellipsis d-flex align-items-center">
                        Sales Person :{" "}
                        <Placeholder
                            height="20px"
                            width="50px"
                            className="ml-1"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3 px-0 singleline-ellipsis">
                    <div className="singleline-ellipsis d-flex align-items-center">
                        {" "}
                        Deadline:{" "}
                        <Placeholder
                            height="20px"
                            width="50px"
                            className="ml-1"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3 px-0 ">
                    <div className="singleline-ellipsis d-flex align-items-center">
                        <p className="singleline-ellipsis">Clients Name : </p>
                        <Placeholder
                            height="20px"
                            width="50px"
                            className="ml-1"
                        />
                    </div>
                </div>
            </SaleRiskAuthorizeHeaderWrapper>
        </div>
    );
};

export default SaleRiskAuthorizeHeaderLoaderForUser;
