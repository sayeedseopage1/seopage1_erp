import React, { useEffect, useMemo } from "react";

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
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActivePendingBtn} ml-2`,
        count: 0,
    },
    {
        id: "authorized",
        name: "Authorized",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportApprovedBtn} ml-2 mt-2 mt-md-0`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActiveApprovedBtn} ml-2 mt-2 mt-md-0`,
        count: 0,
    },
    {
        id: "denied",
        name: "Denied",
        className: `${styles.saleRiskReportBtn} ${styles.saleRiskReportRejectedBtn} ml-2 mt-2 mt-md-0`,
        activeClass: `${styles.saleRiskReportBtn} ${styles.saleRiskReportActiveRejectedBtn} ml-2 mt-2 mt-md-0`,
        count: 0,
    },
];

const SalesRiskReport = () => {
    const auth = useAuth();
    const [salesRiskReportStatus, setSalesRiskReportStatus] = React.useState(
        SalesRiskReportStatus
    );
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
            status: reportStatus === "all" ? undefined : reportStatus,
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
    // when satatus change then refetch data
    React.useEffect(() => {
        refetch();
    }, [reportStatus]);

    useEffect(() => {
        if (
            saleAnalysisReportTableData &&
            !isFetching &&
            !isQuestionsListLoading
        ) {
            const statusCount = saleAnalysisReportTableData?.counts;
            SalesRiskReportStatus.forEach((item) => {
                item.count = statusCount[item.id] || 0;
            });
            setSalesRiskReportStatus([...salesRiskReportStatus]);
        }
    }, [data]);

    return (
        <div>
            <SaleAnalysisReportTableFilterBar setFilter={setFilter} />

            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    <Flex
                        justifyContent="space-between"
                        alignItem="center"
                        className="mb-3"
                    >
                        <div className="d-flex flex-wrap flex-md-nowrap">
                            {salesRiskReportStatus.map((item) => (
                                <button
                                    key={item.id}
                                    className={` ${
                                        reportStatus === item.id
                                            ? item.activeClass
                                            : item.className
                                    } `}
                                    onClick={() => {
                                        setReportStatus(item.id);
                                        setPagination({
                                            pageIndex: 0,
                                            pageSize: 10,
                                        });
                                    }}
                                >
                                    {item.name}{" "}
                                    <span className="badge badge-light ml-0">
                                        {" "}
                                        {item.count ?? 0}
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
                    <SalesAnalysisReportTable
                        tableColumns={filterTableColumnsByRole()}
                        tableData={saleAnalysisReportTableData}
                        isLoading={isQuestionsListLoading}
                        tableName="Sales Analysis Report"
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                        reportStatus={reportStatus}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesRiskReport;
