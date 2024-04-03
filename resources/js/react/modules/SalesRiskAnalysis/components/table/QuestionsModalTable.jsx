import React, { forwardRef } from "react";
import _ from "lodash";
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

// ui components
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import QuestionsModalTableLoader from "../loader/QuestionsModalTableLoader";

// Table components
import EmptyTable from "../../../../global/EmptyTable";

const QuestionsModalTable = ({
    tableData,
    tableColumns,
    tableName,
    isLoading,
    isFetching,
    handleScrollToBottom,
    setAllQuestions,
    allQuestions,
    setSingleQuestion,
    setIsQuestionUpdating,
}) => {
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData || []);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // sales risk analysis rules data
    const _questionsData = React.useMemo(() => tableData, [tableData]);
    React.useEffect(() => {
        if (_.size(_questionsData) === _.size(data)) {
            setSkipPageReset(true);
            _questionsData && setData(_questionsData);
        } else {
            _questionsData && setData(_questionsData);
        }
    }, [_questionsData]);

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
        getSubRows: (row) => row.questions,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            editSingleQuestion: (row) => {
                console.log("editSingleQuestion", row);
                handleScrollToBottom();
                setAllQuestions([]);
                setIsQuestionUpdating(true);
                if (row?.parent_question?.type === "list") {
                    setSingleQuestion({
                        ...row,
                        listItem:
                            allQuestions.find(
                                (question) => question?.id === row?.id
                            )?.listItem || [],
                        parent_question_for: row?.parent_question_for,
                    });
                }
                setSingleQuestion(row);
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
                        {(isLoading || isFetching) ? (
                            <QuestionsModalTableLoader
                                prevItemLength={tableData?.length}
                            />
                        ) : (
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
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                {(!isLoading || !isFetching) &&
                    _.size(table.getRowModel().rows) === 0 && (
                        <EmptyTable height="18vh" />
                    )}
            </div>
        </React.Fragment>
    );
};
export default QuestionsModalTable;

QuestionsModalTable.propTypes = {
    tableData: PropTypes.array,
    tableColumns: PropTypes.array,
    tableName: PropTypes.string,
    isLoading: PropTypes.bool,
    handleScrollToTop: PropTypes.func,
    setSingleQuestion: PropTypes.func,
    setIsQuestionUpdating: PropTypes.func,
    handleScrollToBottom: PropTypes.func,
    allQuestions: PropTypes.array,
    setAllQuestions: PropTypes.func,
    isFetching: PropTypes.bool,
};
