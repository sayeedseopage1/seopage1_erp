import * as React from "react";
import { TableHead, TableRow } from "./ui";
import TableHeaderItem from "./TableHeaderItem";

const TableHeader = ({ tableInstance, columns }) => {
    return (
        <TableHead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHeaderItem
                            key={header.id}
                            header={header}
                            table={tableInstance}
                        />
                    ))}
                </TableRow>
            ))}
        </TableHead>
    );
};

export default TableHeader;
