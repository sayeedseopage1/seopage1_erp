import React from "react";

// Ui components
import {
    SaleRiskAuthorizeHeaderButton,
    SaleRiskAuthorizeHeaderWrapper,
} from "./ui/Styles/ui";

const SaleRiskAuthorizeHeader = () => {
    return (
        <div
            className="row d-flex align-items-center"
            style={{
                margin: "20px 0",
            }}
        >
            <SaleRiskAuthorizeHeaderWrapper className="col-10 d-flex">
                <div className="col-4 px-0 ">
                    <p className="singleline-ellipsis">
                        Project name:{" "}
                        <span className="ml-1">
                            {" "}
                            Design a website for a digital printing company
                            sdffdfjl;ksfdkjl fejilksdflklkfdslhk
                            lhsdfljkdsflfsdklhfsdhlk
                        </span>
                    </p>
                </div>
                <div className="col-4 px-0">
                    Sales Person :{" "}
                    <span className="ml-1">Shah Waliullah Shanto</span>
                </div>
                <div className="col-2 px-0">Deadline: 05 days</div>
                <div className="col-2 px-0">Clients Name : Patricia F.</div>
            </SaleRiskAuthorizeHeaderWrapper>
            <div className="col-2">
                <SaleRiskAuthorizeHeaderButton>
                    Modify points
                </SaleRiskAuthorizeHeaderButton>
            </div>
        </div>
    );
};

export default SaleRiskAuthorizeHeader;
