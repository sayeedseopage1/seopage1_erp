import _ from "lodash";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";

// loader component
import SalesRiskAnalysisTableLoader from "../loader/SalesRiskAnalysisTableLoader";

// empty table component
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import EmptyTable from "../../../../global/EmptyTable";
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";

const SaleRiskAuthorizePolicesModalTable = ({
    tableData,
    tableColumns,
    tableName,
    isLoading,
}) => {
    const { policyKeys } = useContext(SalesRiskAnalysisContext);
    // Table State
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData.policyHistory || []);
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // sales risk analysis rules data
    const _salesRiskAnalysis = React.useMemo(() => tableData.policyHistory, [tableData.policyHistory]);
    React.useEffect(() => {
        if (_.size(_salesRiskAnalysis) === _.size(data)) {
            setSkipPageReset(true);
            _salesRiskAnalysis && setData(_salesRiskAnalysis);
        } else {
            _salesRiskAnalysis && setData(_salesRiskAnalysis);
        }
    }, [_salesRiskAnalysis]);

    // clear skipPageReset
    React.useEffect(() => {
        if (skipPageReset) {
            setSkipPageReset(false);
        }
    }, [data]);

    // default columns
    const defaultColumns = React.useMemo(() => [...tableColumns]);

    // columns
    const [columns] = React.useState([...defaultColumns]);

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
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            handleSendPolicyType: () => {
                return policyKeys;
            },
            handlerSendActiveRuleOnThisRecord: () => {
                const activeRule = tableData?.activeRule;
                return activeRule;
            }
        },
    });

    return (
        <div className="sp1_tasks_table_wrapper w-100">
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
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                {/* table Body */}
                <tbody className="sp1_tasks_tbody">
                    {!isLoading &&
                        table.getRowModel().rows.map((row) => {
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
                    {/* Loading Table */}
                    {isLoading && (
                        <SalesRiskAnalysisTableLoader
                            prevItemLength={data?.length}
                        />
                    )}
                </tbody>
            </table>
            {/* Table for empty */}
            {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                <EmptyTable />
            )}
        </div>
    );
};

export default SaleRiskAuthorizePolicesModalTable;

SaleRiskAuthorizePolicesModalTable.PropTypes = {
    tableData: PropTypes.object,
    tableColumns: PropTypes.array,
    tableName: PropTypes.string,
    isLoading: PropTypes.bool,
};
