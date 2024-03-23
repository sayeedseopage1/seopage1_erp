import React, { useState } from "react";

import { useGetEvaluationListQuery } from "../../services/api/EvaluationApiSlice";
import { DataTableColumns } from "../components/Table/DataTableColumns";
import DataTable from "../components/Table/DataTable";
import Button from "../../global/Button";

import EvaluationTableFilterBar from "../components/EvaluationTableFilterBar";

import { Flex } from "../components/Table/ui";
import RefreshButton from "../components/RefreshButton";
const EmployeeEvaluation = () => {
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

    const { data, isFetching, refetch } = useGetEvaluationListQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const Evaluations = data?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <>
            <EvaluationTableFilterBar setFilter={setFilter} />
            <div
                style={{
                    borderRadius: "10px",
                    padding: "20px",
                    margin: "10px",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Flex justifyContent="space-between" marginBottom="10px">
                    <Flex>
                        <Button>Live</Button>
                        <Button variant="success">Accepted</Button>
                        <Button variant="danger">Rejected</Button>
                    </Flex>

                    <Flex>
                        <RefreshButton
                            onClick={refetch}
                            isLoading={isFetching}
                            className="font-weight-normal"
                        />
                    </Flex>
                </Flex>

                <DataTable
                    data={Evaluations}
                    columns={[...DataTableColumns]}
                    isLoading={false}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Evaluation Table"
                    setSorting={setSorting}
                />
            </div>
        </>
    );
};

export default EmployeeEvaluation;
