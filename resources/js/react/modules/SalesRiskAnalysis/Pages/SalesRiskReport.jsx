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

//style

import styles from "../components/Styles/SalesRiskReport.module.css";

export const SalesRiskReportStatus = [
    {
        id: "all",
        name: "All",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportAllBtn}`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActiveAllBtn}`,
        count: 0,
    },
    {
        id: "pending",
        name: "Pending",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportPendingBtn} ml-2`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportPendingBtn}`,
        count: 0,
    },
    {
        id: "approved",
        name: "Authorized",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportApprovedBtn} ml-2`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActiveApprovedBtn}`,
        count: 0,
    },
    {
        id: "rejected",
        name: "Denied",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportRejectedBtn} ml-2`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActiveRejectedBtn}`,
        count: 0,
    },
];

const SalesRiskReport = () => {
    const auth = useAuth();
    const [reportStatus, setReportStatus] = React.useState("all");
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
                    {SalesRiskReportStatus.map((item) => (
                        <button
                            key={item.id}
                            className={` ${
                                reportStatus === item.id
                                    ? item.activeClass
                                    : item.className
                            } `}
                        >
                            {item.name}{" "}
                            <span className="bg-white text-dark px-1 rounded">
                                {" "}
                                {item.count}
                            </span>
                        </button>
                    ))}
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
