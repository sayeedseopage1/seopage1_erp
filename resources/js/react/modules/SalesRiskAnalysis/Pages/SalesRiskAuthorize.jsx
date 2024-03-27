import React from "react";

// Ui components
import {
    SalesRiskAnalysisQuestionContainer,
    SalesRiskAnalysisQuestionWrapper,
} from "../components/ui/Styles/ui";
import SaleRiskAuthorizeHeader from "../components/SaleRiskAuthorizeHeader";
import SalesRiskAuthorizeTable from "../components/table/SalesRiskAuthorizeTable";
import { SalesRiskAuthorizeColumns } from "../components/table/SalesRiskAuthorizeColumns";

const SalesRiskAuthorize = () => {
    return (
        <section>
            {" "}
            <SaleRiskAuthorizeHeader />
            <SalesRiskAnalysisQuestionContainer>
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
            </SalesRiskAnalysisQuestionContainer>{" "}
        </section>
    );
};

export default SalesRiskAuthorize;
