import React from "react";
import PropTypes from "prop-types";

// ui components
import EmptyTable from "../../../../global/EmptyTable";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";

const NewRulesModalTable = ({
    newPolicyInputData,
    tableName,
    tableColumns,
    setNewPolicyData,
    setIsRuleUpdating,
    setNewPolicyInputData
}) => {
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(newPolicyInputData || []);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // sales risk analysis rules data
    const _newPolicyInputData = React.useMemo(
        () => newPolicyInputData,
        [newPolicyInputData]
    );
    React.useEffect(() => {
        if (_.size(_newPolicyInputData) === _.size(data)) {
            setSkipPageReset(true);
            _newPolicyInputData && setData(_newPolicyInputData);
        } else {
            _newPolicyInputData && setData(_newPolicyInputData);
        }
    }, [_newPolicyInputData]);

    // default columns
    const defaultColumns = React.useMemo(() => [...tableColumns]);

    // columns
    const [columns, setColumns] = React.useState([...defaultColumns]);

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnOrder,
            tableName,
        },
        onGlobalFilterChange: setGlobalFilter,
        autoResetPageIndex: !skipPageReset,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            editSingleRules: (row) => {
                console.log(row);
                setNewPolicyData(row);
                setIsRuleUpdating(true);
            },
            deleteSingleRules: (row) => {
                const _data = _.filter(data, (item) => item.id !== row.id);
                setData(_data);
                setNewPolicyInputData(_data);
            },
        },
    });

    return (
        <React.Fragment>
            <div
                className="sp1_tasks_table_wrapper"
                style={{
                    height: "100%",
                    maxHeight: "100%",
                    width: "100%",
                }}
            >
                <table className="sp1_tasks_table">
                    {/* table Header */}
                    <thead
                        className="sp1_tasks_thead"
                        style={{
                            zIndex: 0,
                        }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="sp1_tasks_tr">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <WithoutDraggableColumnHeader
                                            header={header}
                                            table={table}
                                            key={header.id}
                                            isNewRuleModal={true}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* table Body */}
                    <tbody className="sp1_tasks_tbody">
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    className={`sp1_tasks_tr ${
                                        row.parentId !== undefined
                                            ? "expended_row"
                                            : ""
                                    } ${
                                        row.getIsExpanded()
                                            ? "expended_parent_row"
                                            : ""
                                    }`}
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                className="px-2 sp1_tasks_td"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default NewRulesModalTable;

NewRulesModalTable.propTypes = {
    newPolicyInputData: PropTypes.array,
    tableName: PropTypes.string,
    tableColumns: PropTypes.array,
    setIsRuleUpdating: PropTypes.func,
};
