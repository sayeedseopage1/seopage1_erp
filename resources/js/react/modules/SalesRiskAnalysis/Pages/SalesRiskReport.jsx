import React from "react";

// Ui components
import { Flex } from "../../../global/styled-component/Flex";
import RefreshButton from "../components/RefreshButton";

// table components
import SalesAnalysisReportTable from "../components/table/SalesAnalysisReportTable";
import { SalesAnalysisReportTableColumns } from "../components/table/SalesAnalysisReportTableColumns";


// sections
import SaleAnalysisReportTableFilterBar from "../components/sections/SaleAnalysisReportTableFilterBar";
import { useSaleRiskAnalysisReportTableDataQuery } from "../../../services/api/salesRiskAnalysisSlice";

const SalesRiskReport = () => {
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = React.useState({});

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const {
        data,
        isFetching,
        refetch,
        isLoading: isQuestionsListLoading,
    } = useSaleRiskAnalysisReportTableDataQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            ...filter,
        })
    );

    const saleAnalysisReportTableData = data?.data;

    // main Table page change
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    console.log(saleAnalysisReportTableData)

    return (
        <div>
            <SaleAnalysisReportTableFilterBar setFilter={setFilter} />
            <Flex justifyContent="end" className="mb-3">
                {/* refresh */}
                <RefreshButton
                    onClick={refetch}
                    isLoading={isFetching}
                    className="font-weight-normal"
                />
            </Flex>
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    <SalesAnalysisReportTable
                        tableColumns={SalesAnalysisReportTableColumns}
                        tableData={saleAnalysisReportTableData}
                        isLoading={isQuestionsListLoading}
                        tableName="Sales Analysis Report"
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesRiskReport;
