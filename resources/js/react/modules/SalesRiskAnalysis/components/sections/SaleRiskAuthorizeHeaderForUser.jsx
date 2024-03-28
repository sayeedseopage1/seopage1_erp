import React from "react";
import { SaleRiskAuthorizeHeaderWrapper } from "../ui/Styles/ui";

// Ui components


const SaleRiskAuthorizeHeaderForUser = () => {
    return (
        <div
            className="row d-flex align-items-center"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-12 d-flex">
                <div className="col-3 px-0">
                    Sales Person :{" "}
                    <span className="ml-1">Shah Waliullah Shanto</span>
                </div>
                <div className="col-3 px-0">
                    Authorize By :{" "}
                    <span className="ml-1">A.Khalid</span>
                </div>
                <div className="col-3 px-0">Deadline: 05 days</div>
                <div className="col-3 px-0">Clients Name : Patricia F.</div>
            </SaleRiskAuthorizeHeaderWrapper>
        </div>
    );
};

export default SaleRiskAuthorizeHeaderForUser;
