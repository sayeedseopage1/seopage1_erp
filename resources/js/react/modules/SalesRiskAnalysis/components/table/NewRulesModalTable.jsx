import React from "react";
import PropTypes from "prop-types";

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
import { useSelector } from "react-redux";

const NewRulesModalTable = ({
    newPolicyInputData,
    tableName,
    tableColumns,
    setNewPolicyData,
    setIsRuleUpdating,
    setNewPolicyInputData,
    setEditPolicyDeleteData,
}) => {
    const { settings } = useSelector((state) => state.saleRiskAnalysis);
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(newPolicyInputData || []);
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
    const columns = [...defaultColumns];

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
                setNewPolicyData(row);
                setIsRuleUpdating(true);
            },
            deleteSingleRules: (row) => {
                const _data = _.filter(data, (item) => item.id !== row.id);
                setData(_data);
                setNewPolicyInputData(_data);
                setEditPolicyDeleteData((prev) => {
                    if (typeof row.id !== "number") return prev;
                    if (typeof row.id === "number") {
                        return [...prev, row.id];
                    }
                });
            },
            settingsValue: settings,
        },

    });

    return (
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
    );
};

export default NewRulesModalTable;

NewRulesModalTable.propTypes = {
    newPolicyInputData: PropTypes.array,
    tableName: PropTypes.string,
    tableColumns: PropTypes.array,
    setIsRuleUpdating: PropTypes.func,
    setNewPolicyData: PropTypes.func,
    setNewPolicyInputData: PropTypes.func,
    setEditPolicyDeleteData: PropTypes.func,
};
