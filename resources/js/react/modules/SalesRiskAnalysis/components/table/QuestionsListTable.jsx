import React, { useContext } from "react";
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

// Table components
import EmptyTable from "../../../../global/EmptyTable";
import SalesRiskAnalysisTablePagination from "./SalesRiskAnalysisTablePagination";

// constants
import { QuestionsTypes } from "../../constant";

// context
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";
import QuestionsListTableLoader from "../loader/QuestionsListTableLoader";

const QuestionsListTable = ({
    tableData,
    tableColumns,
    tableName,
    isLoading,
    isFetching,
    allQuestions,
    setSingleQuestion,
    setIsQuestionUpdating,
    onPageChange,
    handleOpenAddQuestionsModal,
}) => {
    const { questionsAnswerType } = useContext(SalesRiskAnalysisContext);
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData?.data || []);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // sales risk analysis rules data
    const _questionsData = React.useMemo(
        () => tableData?.data,
        [tableData?.data]
    );
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
    const [columns] = React.useState([...defaultColumns]);

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

    const handlePageChange = ({ selected }) => {
        const paginate = {
            pageIndex: selected,
            pageSize,
        };

        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };

    const handlePageSizeChange = (e) => {
        e.preventDefault();
        const paginate = {
            pageIndex,
            pageSize: e.target.value,
        };
        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };

    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnOrder,
            pagination,
            tableName,
        },
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
        paginateExpandedRows: false,
        meta: {
            editSingleQuestion: (row) => {
                setIsQuestionUpdating(true);
                handleOpenAddQuestionsModal();

                const parent_question = allQuestions.find(
                    (item) => item?.id === row?.parent_id
                );
                const payload = {
                    ...row,
                    id: row?.id,
                    title: row?.title,
                    parent_question: parent_question,
                    type: QuestionsTypes?.data.find(
                        (item) => item?.name === row?.type
                    ),
                    question_key: questionsAnswerType.data.find(
                        (item) => item?.name === row?.key
                    ),
                    policy_id: {
                        id: row?.policy_id,
                        title: row?.policy_title,
                        label: row?.policy_title,
                    },
                    parent_question_for: row?.value,
                };
                if (row?.parent_question?.type === "list") {
                    setSingleQuestion({
                        ...payload,
                        listItem:
                            allQuestions.find(
                                (question) => question?.id === row?.id
                            )?.listItem || [],
                    });
                } else {
                    setSingleQuestion(payload);
                }
            },
        },
    });

    console.log(table)
    return (
        <React.Fragment>
            <div
                className="sp1_tasks_table_wrapper w-100"
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
                        {!(isLoading || isFetching) &&
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
                            })}
                        {/* Loading Table */}
                        {(isLoading || isFetching) && (
                            <QuestionsListTableLoader
                                prevItemLength={data?.length}
                            />
                        )}
                    </tbody>
                </table>
                {!(isLoading || isFetching) &&
                    _.size(table.getRowModel().rows) === 0 && (
                        <EmptyTable height="18vh" />
                    )}
            </div>
            {/* pagination */}
            <SalesRiskAnalysisTablePagination
                tableData={tableData}
                handlePageSizeChange={handlePageSizeChange}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            />
        </React.Fragment>
    );
};

export default QuestionsListTable;

QuestionsListTable.propTypes = {
    tableData: PropTypes.object.isRequired,
    tableColumns: PropTypes.array.isRequired,
    tableName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    isFetching: PropTypes.bool,
    allQuestions: PropTypes.array,
    setSingleQuestion: PropTypes.func,
    setIsQuestionUpdating: PropTypes.func,
    onPageChange: PropTypes.func,
    handleOpenAddQuestionsModal: PropTypes.func,
};
