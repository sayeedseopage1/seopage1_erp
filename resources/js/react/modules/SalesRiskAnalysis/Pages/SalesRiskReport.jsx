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
import { useAuth } from "../../../hooks/useAuth";

const SalesRiskReport = () => {
    const auth = useAuth();
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

    // filter table columns by role
    const filterTableColumnsByRole = () => {
        if (auth.getRoleId() === 1) {
            return SalesAnalysisReportTableColumns;
        }
        return SalesAnalysisReportTableColumns.filter(
            (column) => column.id !== "gained_points"
        );
    };

    return (
        <div>
            <SaleAnalysisReportTableFilterBar setFilter={setFilter} />
            <Flex
                justifyContent="space-between"
                alignItem="center"
                className="mb-3"
            >
                <div className="d-flex">
                    <button className="btn btn-primary py-1">All</button>
                    <button className="btn btn-warning ml-2 py-1">
                        In Analysis
                    </button>
                    <button className="btn btn-success ml-2 py-1">
                        Authorized
                    </button>
                    <button className="btn btn-info ml-2 py-1">
                        Auto Authorized
                    </button>
                    <button className="btn btn-danger ml-2 py-1">Denied</button>
                </div>
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
                        tableColumns={filterTableColumnsByRole()}
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
