import React from "react";
import { TableHeadItem } from "./ui";
import { flexRender } from "@tanstack/react-table";

const TableHeaderItem = ({ header, table }) => {
    return (
        <TableHeadItem>
            <button
                {...{
                    onClick: header.column.getToggleSortingHandler(),
                    className: "sp1-data-table-sort-btn",
                }}
            >
                {header.column.getIsSorted() ? (
                    {
                        asc: <span className="table_asc_dec asc"></span>,
                        desc: <span className="table_asc_dec dec"></span>,
                    }[header.column.getIsSorted()] ?? null
                ) : (
                    <span className="table_asc_dec"></span>
                )}
            </button>

            {header.isPlaceholder
                ? null
                : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                  )}
        </TableHeadItem>
    );
};

export default TableHeaderItem;
