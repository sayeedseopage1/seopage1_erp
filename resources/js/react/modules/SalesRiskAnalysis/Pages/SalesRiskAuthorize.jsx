import React from "react";

// Section component
import SaleRiskAuthorizeHeader from "../components/sections/SaleRiskAuthorizeHeader";
import SaleRiskAuthorizeHeaderForUser from "../components/sections/SaleRiskAuthorizeHeaderForUser";

// table components
import SalesRiskAuthorizeTable from "../components/table/SalesRiskAuthorizeTable";
import { SalesRiskAuthorizeColumns } from "../components/table/SalesRiskAuthorizeColumns";

// hooks
import { useAuth } from "../../../hooks/useAuth";

// ui components
import Switch from "../components/Switch";


const SalesRiskAuthorize = () => {
    const auth = useAuth();
    return (
        <section>
            //
            <Switch>
                <Switch.Case condition={auth.getRoleId() === 1}>
                    <SaleRiskAuthorizeHeader />
                </Switch.Case>
                <Switch.Case condition={auth.getRoleId() === 7}>
                    <SaleRiskAuthorizeHeaderForUser />
                </Switch.Case>
            </Switch>
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* sales risk analysis table */}
                    <SalesRiskAuthorizeTable
                        tableColumns={SalesRiskAuthorizeColumns}
                        tableName="SalesRiskAuthorizeTable"
                        tableData={[]}
                    />
                </div>
            </div>
        </section>
    );
};

export default SalesRiskAuthorize;
