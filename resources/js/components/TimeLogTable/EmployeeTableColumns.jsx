import { createColumnHelper } from "@tanstack/react-table";
import * as React from "react";
const H = createColumnHelper();

export const EmployeeWiseTableColumns = [
    H.accessor("employee_name", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "employee_name",
        header: "Employee",
        rowSpan: (info) => info.task.length,
    }),

    H.accessor("project_name", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "project_name",
        header: "Project Name",
    }),

    H.accessor("client", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "client",
        header: "Client Name",
    }),
];
