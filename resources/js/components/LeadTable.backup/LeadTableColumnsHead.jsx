import { createColumnHelper } from "@tanstack/react-table";
import * as React from "react";
const header = createColumnHelper();

export const LeadTableColumnsHead = [
    header.accessor("id", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "id",
        header: "#",
    }),

    header.accessor("client_name", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "client_name",
        header: "Name",
    }),

    header.accessor("project_link", {
        cell: (info) => (
            <a href={info.getValue()} target="_blank" rel="noreferrer">
                {info.getValue()}
            </a>
        ),
        id: "project_link",
        header: "Project Link",
    }),

    // get two accessors from the same column
    header.accessor((row) => `${row.bid_value}$-${row.bid_value2}$`, {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "bid_value",
        header: "Project Budget",
    }),

    // get two accessors from the same column
    header.accessor("actual_value", {
        cell: (info) => <span>{info.getValue()}$</span>,
        id: "actual_value",
        header: "Bid Value",
    }),

    header.accessor((row) => `${row.bidding_minutes}:${row.bidding_seconds}`, {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "bidding_time",
        header: "Created",
    }),

    // status
    header.accessor("status_id", {
        cell: (info) =>
            info.getValue() === "1" ? (
                <span className="badge bg-success">Converted to Deal</span>
            ) : (
                <span className="badge bg-danger">Not Converted to Deal</span>
            ),
        id: "status_id",
        header: "Status",
    }),
];
