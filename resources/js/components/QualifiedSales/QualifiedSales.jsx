import React from "react";
import { useUsers } from "../hooks/useUsers";
import { useLazyGetQualifiedSalesQuery } from "../services/api/qualifiedSalesApiSlice";
import QualifiedSalesFilterbar from "./components/QualifiedSalesFilterbar";
import QualifiedSalesTable from "./table/QualifiedSalesTable";

const QualifiedSales = () => {
    const { users, usersObject, usersIsFetching } = useUsers();

    const [getQualifiedSales, { data, isFetching }] =
        useLazyGetQualifiedSalesQuery();

    const handleOnFilter = (filter) => {
        if (!filter?.start_date || !filter?.end_date) return;
        // Filter null and undefined value
        let f = Object.entries(filter).reduce(
            (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
            {}
        );

        let query = new URLSearchParams(f).toString();
        getQualifiedSales(query);
    };

    return (
        <div className="d-flex flex-column position-relative">
            {usersIsFetching ? (
                <div
                    className="d-flex w-100 align-items-center justify-content-center position-absolute bg-white"
                    style={{ height: "100vh", zIndex: "1" }}
                >
                    loading...
                </div>
            ) : null}
            <QualifiedSalesFilterbar onFilter={handleOnFilter} />

            {/*table section */}
            <div className="p-4">
                <QualifiedSalesTable
                    data={data || []}
                    users={users || []}
                    usersObject={usersObject}
                    isLoading={isFetching}
                />
            </div>
        </div>
    );
};

export default QualifiedSales;
