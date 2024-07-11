import React, { useState, useEffect } from "react";

import { useGetEvaluationListQuery } from "../../services/api/EvaluationApiSlice";

import styles from "./EmployeeEvaluation.module.css";
import EvaluationTableFilterBar from "../components/EvaluationTableFilterBar";

import { Flex } from "../components/Table/ui";
import RefreshButton from "../components/RefreshButton";
import { Link, useSearchParams } from "react-router-dom";
import _ from "lodash";
import Card from "../../global/Card";
import EvaluationTable from "../components/Table/EvaluationTable";
import { EvaluationTableColumns } from "../components/Table/EvaluationTableColumns";
import { EvaluationTableColumnsPM } from "../project-manager/components/table/EvaluationTableColumnsPM";
import { useLocation } from "react-router-dom";
import filterEvaluationsByRole from "../../utils/filterEvaluationsByRole";
import { EvaluationTypeFilterTabs } from "../components/EvaluationTypeFilterTab";

const EmployeeEvaluation = () => {
    const location = useLocation();
    const type = new URLSearchParams(location.search).get("type");

    const [tableType, setTableType] = useState("Developer");
    useEffect(() => {
        switch (type) {
            case "pm":
                setTableType("Project Manager");
                break;
            case "ld":
                setTableType("Lead Developer");
                break;
            case "sales_executive":
                setTableType("Sales Executive");
                break;
            default:
                setTableType("Developer");
        }
    }, [type]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = React.useState({});
    const [sorting, setSorting] = useState([]);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const { data, isLoading, isFetching, refetch } = useGetEvaluationListQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const mainData = data?.data;
    const Evaluations = data?.data.data;

    const filteredEvaluations = filterEvaluationsByRole(Evaluations, tableType);

    const getData = (type) => {
        let _data = _.orderBy(
            filteredEvaluations,
            "managements_decision",
            "asc"
        );
        switch (type) {
            case "all":
                return _data;
            case "pending":
                return _.filter(_data, (d) => d.managements_decision === null);
            case "denied":
                return _.filter(
                    _data,
                    (d) => d.managements_decision === "Rejected"
                );
            case "authorized":
                return _.filter(
                    _data,
                    (d) => d.managements_decision === "Accepted"
                );
            default:
                return _data;
        }
    };

    const _data = {
        all: getData(null),
        pending: getData("pending"),
        denied: getData("denied"),
        authorized: getData("authorized"),
    };

    const tableData = (type) => {
        if (type) {
            return _.orderBy(
                _data[type],
                ["authorization_status", "updated_at"],
                ["asc", "desc"]
            );
        } else return [];
    };

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <>
            <EvaluationTableFilterBar
                tableType={tableType}
                setTableType={setTableType}
                setFilter={setFilter}
            />

            <Card className={styles.card}>
                <Flex justifyContent="space-between" marginBottom="10px">
                    <EvaluationTypeFilterTabs data={_data} />

                    <RefreshButton
                        onClick={() => {
                            refetch();
                        }}
                        isLoading={isFetching}
                        className="font-weight-normal"
                    />
                </Flex>
                {tableType === "Developer" && (
                    <EvaluationTable
                        data={tableData(searchParams.get("show"))}
                        mainData={mainData}
                        //since evaluation for pm,ld nad sales follows same pattern
                        //columns are same for all of them(EvaluationTableColumns)
                        columns={[...EvaluationTableColumns]}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Table"
                        setSorting={setSorting}
                    />
                )}
                {tableType === "Project Manager" && (
                    <EvaluationTable
                        data={tableData(searchParams.get("show"))}
                        mainData={mainData}
                        //since evaluation for pm,ld nad sales follows same pattern
                        //columns are same for all of them(pm,ld nad sales)(EvaluationTableColumnsPM)
                        columns={[...EvaluationTableColumnsPM]}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Table"
                        setSorting={setSorting}
                    />
                )}
                {tableType === "Lead Developer" && (
                    <EvaluationTable
                        data={tableData(searchParams.get("show"))}
                        mainData={mainData}
                        //since evaluation for pm,ld nad sales follows same pattern
                        //columns are same for all of them(pm,ld nad sales)(EvaluationTableColumnsPM)
                        columns={[...EvaluationTableColumnsPM]}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Table"
                        setSorting={setSorting}
                    />
                )}
                {tableType === "Sales Executive" && (
                    <EvaluationTable
                        data={tableData(searchParams.get("show"))}
                        mainData={mainData}
                        //since evaluation for pm,ld nad sales follows same pattern
                        //columns are same for all of them(pm,ld nad sales)(EvaluationTableColumnsPM)
                        columns={[...EvaluationTableColumnsPM]}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Table"
                        setSorting={setSorting}
                    />
                )}
            </Card>
        </>
    );
};

export default EmployeeEvaluation;
