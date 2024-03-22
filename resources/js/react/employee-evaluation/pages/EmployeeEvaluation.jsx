import React, { useState } from "react";

import { useGetEvaluationListQuery } from "../../services/api/EvaluationApiSlice";
import { DataTableColumns } from "../components/Table/DataTableColumns";
import DataTable from "../components/Table/DataTable";
import Button from "../../global/Button";

const EmployeeEvaluation = () => {
    const { data, isLoading } = useGetEvaluationListQuery();

    const Evaluations = data?.data;

    const [sorting, setSorting] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <>
            <div
                style={{
                    borderRadius: "10px",
                    padding: "20px",
                    margin: "20px",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div
                    className="d-flex flex-wrap align-items-center px-3 mb-2"
                    style={{ gap: "10px", marginBottom: "20px" }}
                >
                    <Button>Live</Button>
                    <Button variant="secondary">Evaluated</Button>
                </div>

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
