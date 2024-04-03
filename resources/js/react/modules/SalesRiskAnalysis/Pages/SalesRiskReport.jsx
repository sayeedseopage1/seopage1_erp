import React from "react";

// Ui components
import { Flex } from "../../../global/styled-component/Flex";
import RefreshButton from "../components/RefreshButton";

// table components
import SalesAnalysisReportTable from "../components/table/SalesAnalysisReportTable";
import { SalesAnalysisReportTableColumns } from "../components/table/SalesAnalysisReportTableColumns";

// constant
import { DummyPolicyReportData } from "../constant";

// sections
import SaleAnalysisReportTableFilterBar from "../components/sections/SaleAnalysisReportTableFilterBar";

const SalesRiskReport = () => {
    const [filter, setFilter] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <div>
            <SaleAnalysisReportTableFilterBar setFilter={setFilter} />
            <Flex justifyContent="end" className="mb-3">
                {/* refresh */}
                <RefreshButton
                    // onClick={refetch}
                    // isLoading={isFetching}
                    className="font-weight-normal"
                />
            </Flex>
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    <SalesAnalysisReportTable
                        tableColumns={SalesAnalysisReportTableColumns}
                        tableData={DummyPolicyReportData}
                        isLoading={isLoading}
                        tableName="Sales Analysis Report"
                        onPageChange={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesRiskReport;
