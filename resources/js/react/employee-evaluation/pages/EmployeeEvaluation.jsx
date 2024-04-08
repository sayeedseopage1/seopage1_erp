import React, { useState, useEffect } from "react";

import { useGetEvaluationListQuery } from "../../services/api/EvaluationApiSlice";
import { DataTableColumns } from "../components/Table/DataTableColumns";
import DataTable from "../components/Table/DataTable";
import Button from "../../global/Button";
import styles from "./EmployeeEvaluation.module.css";
import EvaluationTableFilterBar from "../components/EvaluationTableFilterBar";

import { Flex } from "../components/Table/ui";
import RefreshButton from "../components/RefreshButton";
import { Link, useSearchParams } from "react-router-dom";
import _ from "lodash";
import Card from "../../global/Card";

const EmployeeEvaluation = () => {
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

    const Evaluations = data?.data.data;

    // console.log("evaluations", Evaluations);
    // filter data
    const getData = (type) => {
        let _data = _.orderBy(Evaluations, "managements_decision", "asc");
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
            <EvaluationTableFilterBar setFilter={setFilter} />

            <Card className={styles.card}>
                <Flex justifyContent="space-between" marginBottom="10px">
                    <Tabs data={_data} />

                    <RefreshButton
                        onClick={() => {
                            refetch();
                        }}
                        isLoading={isFetching}
                        className="font-weight-normal"
                    />
                </Flex>

                <DataTable
                    data={tableData(searchParams.get("show"))}
                    columns={[...DataTableColumns]}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Evaluation Table"
                    setSorting={setSorting}
                />
            </Card>
        </>
    );
};

export default EmployeeEvaluation;

const Tabs = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = props.data;

    // useEffect(() => {
    //     setSearchParams({ show: "pending" });
    // }, []);

    const handleRouteChange = (e, params) => {
        e.preventDefault();
        for (const [key, value] of Object.entries(params)) {
            searchParams.set(key, value);
        }
        setSearchParams(searchParams);
    };

    const badge = (type) => {
        return _.size(data[type]);
    };
    return (
        <ul className={styles.tabs}>
            <li>
                <Link
                    to="#"
                    data-type="pending"
                    onClick={(e) => handleRouteChange(e, { show: "pending" })}
                    data-active={searchParams.get("show") === "pending"}
                >
                    Pending{" "}
                    <span className="badge badge-light">
                        {badge("pending")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="authorized"
                    onClick={(e) =>
                        handleRouteChange(e, { show: "authorized" })
                    }
                    data-active={searchParams.get("show") === "authorized"}
                >
                    Accepted{" "}
                    <span className="badge badge-light">
                        {badge("authorized")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="denied"
                    onClick={(e) => handleRouteChange(e, { show: "denied" })}
                    data-active={searchParams.get("show") === "denied"}
                >
                    Denied{" "}
                    <span className="badge badge-light">{badge("denied")}</span>
                </Link>
            </li>
            <li>
                <Link
                    to="#"
                    data-type="all"
                    onClick={(e) => handleRouteChange(e, { show: "all" })}
                    data-active={searchParams.get("show") === "all"}
                >
                    All{" "}
                    <span className="badge badge-light">{badge("all")}</span>
                </Link>
            </li>
        </ul>
    );
};
