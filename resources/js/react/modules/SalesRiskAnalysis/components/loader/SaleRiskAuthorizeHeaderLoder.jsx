import React from "react";
// Ui components
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";
import { Placeholder } from "../../../../global/Placeholder";

const SaleRiskAuthorizeHeaderLoader = () => {
    return (
        <SaleRiskAuthorizeHeaderWrapper className="col-12 col-md-12 col-lg-10 d-flex flex-column flex-md-row mb-3 mb-md-3 mb-lg-0">
            <div className="col-12 col-md-4 col-lg-4 px-0 ">
                <p className="singleline-ellipsis d-flex align-items-center">
                    Project name:{" "}
                    <Placeholder height="20px" width="80px" className="ml-1" />
                </p>
            </div>
            <div className="col-12 col-md-4 px-0 ">
                <p className="singleline-ellipsis d-flex align-items-center">
                    Sales Person :{" "}
                    <Placeholder height="20px" width="50px" className="ml-1" />
                </p>
            </div>
            <div className="col-12 col-md-2 px-0 singleline-ellipsis">
                <p className="singleline-ellipsis d-flex align-items-center">
                    {" "}
                    Deadline:{" "}
                    <Placeholder height="20px" width="50px" className="ml-1" />
                </p>
            </div>
            <div className="col-12 col-md-2 px-0 ">
                <p className="singleline-ellipsis d-flex align-items-center">
                    <p className="singleline-ellipsis">Clients Name : </p>
                    <Placeholder height="20px" width="50px" className="ml-1" />
                </p>
            </div>
        </SaleRiskAuthorizeHeaderWrapper>
    );
};

export default SaleRiskAuthorizeHeaderLoader;
