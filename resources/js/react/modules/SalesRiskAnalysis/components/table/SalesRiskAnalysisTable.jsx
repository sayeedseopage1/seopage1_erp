import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// ui components
import EmptyTable from "../../../../global/EmptyTable";
import SalesRiskAnalysisTableLoader from "../loader/SalesRiskAnalysisTableLoader";

// table header
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import SalesRiskAnalysisTablePagination from "./SalesRiskAnalysisTablePagination";
import EditApplicablePointsModal from "../modal/EditApplicablePointsModal";
import RuleActionConfirmationModal from "../modal/RuleActionConfirmationModal";
import AddQuestionsModal from "../modal/AddQuestionsModal";

// Api
import { useEditSalesRiskAnalysisPointsMutation } from "../../../../services/api/salesRiskAnalysisSlice";
import { useEffect } from "react";

const SalesRiskAnalysisTable = ({
    isLoading,
    filter,
    tableName,
    search,
    tableColumns,
    tableData,
    questionInputFields,
}) => {
    // Table State
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData || []);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // modal open close state
    const [editPointModalOpen, setEditPointModalOpen] = React.useState(false);
    const [ruleActionModalOpen, setRuleActionModalOpen] = React.useState(false);
    const [addQuestionsModalOpen, setAddQuestionsModalOpen] =
        React.useState(false);

    // modal state data
    const [editPointData, setEditPointData] = React.useState({});
    const [addQuestionsData, setAddQuestionsData] = React.useState({});
    const [editPointDataValidation, setEditPointDataValidation] =
        React.useState({
            newPoint: false,
            isSubmitting: false,
        });

    // sales risk analysis rules data
    const _salesRiskAnalysis = React.useMemo(() => tableData, [tableData]);
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

    // mutation
    const [submitData, { isLoading: isLoadingEditSalesRiskAnalysisPoint }] =
        useEditSalesRiskAnalysisPointsMutation();

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
            filter,
            globalFilter: _.trim(search),
        },
        onGlobalFilterChange: setGlobalFilter,
        autoResetPageIndex: !skipPageReset,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        paginateExpandedRows: false,
        meta: {
            handleEditApplicablePoint: (row, selectedRule, ruleType) => {
                setEditPointModalOpen(true);
                setEditPointData({
                    ...row,
                    selectedRule: selectedRule,
                    ruleType: ruleType
                });
            },
            handleRuleActions: (rule, data) => {
                setAddQuestionsData(data);
                setRuleActionModalOpen(true);
            },
            handleAddQuestions: (data) => {
                setAddQuestionsData(data);
                setAddQuestionsModalOpen(true);
            },
        },
    });

    const handleUpdatePoints = async (data) => {
        if (!editPointData.newPoint) {
            setEditPointDataValidation({
                isSubmitting: true,
                newPoint: true,
            });
            return;
        }

        try {
            const payload = {
                id: editPointData?.id,
                newPoint: editPointData?.newPoint,
                ruleType: editPointData?.ruleType
            }
            const res = await submitData(payload);
            if (res.data) {
                toast.success("Points updated successfully");
                handleCloseEditPointModal()
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const resetFormSate = () => {
        setEditPointData({})
        setEditPointDataValidation({
            isSubmitting: false,
            newPoint: false
        })
    }


    const handleChange = (e) => {
        setEditPointData({
            ...editPointData,
            newPoint: e.target.value,
        });
    };

    // modal Close Handler
    const handleCloseEditPointModal = () => {
        setEditPointModalOpen(false);
        resetFormSate()
    };

    const handleCloseRuleActionModal = () => {
        setRuleActionModalOpen(false);
    };

    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
    };

    // Validation Update
    useEffect(() => {
        if (editPointDataValidation.isSubmitting) {
            setEditPointDataValidation({
                ...editPointDataValidation,
                newPoint: editPointData?.newPoint ? false : true,
            });
        }
    }, [editPointData?.newPoint]);

    console.log(editPointData)

    return (
        <React.Fragment>
            <div
                className="sp1_tasks_table_wrapper"
                style={{
                    height: "100%",
                    maxHeight: "100%",
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

            {/* Modals */}
            <EditApplicablePointsModal
                open={editPointModalOpen}
                closeModal={handleCloseEditPointModal}
                editPointData={editPointData}
                handleChange={handleChange}
                handleUpdatePoints={handleUpdatePoints}
                editPointDataValidation={editPointDataValidation}
                isLoadingEditSalesRiskAnalysisPoint={
                    isLoadingEditSalesRiskAnalysisPoint
                }
            />

            <RuleActionConfirmationModal
                open={ruleActionModalOpen}
                closeModal={handleCloseRuleActionModal}
                actionType={"Disable"}
            />

            <AddQuestionsModal
                open={addQuestionsModalOpen}
                closeModal={handleCloseAddQuestionsModal}
                addQuestionsData={addQuestionsData}
                questionInputFields={questionInputFields}
            />

            {/* pagination */}
            <SalesRiskAnalysisTablePagination
                currentPage={pageIndex + 1}
                perPageRow={pageSize}
                onPageSize={(size) => table?.setPageSize(size)}
                onPaginate={(page) => table?.setPageIndex(page - 1)}
                totalEntry={_.size(data)}
                onNext={() => table.getCanNextPage() && table.nextPage()}
                disableNext={!table?.getCanNextPage()}
                onPrevious={() =>
                    table?.getCanPreviousPage() && table?.previousPage()
                }
                disablePrevious={!table?.getCanPreviousPage()}
                totalPages={table?.getPageCount()}
            />
        </React.Fragment>
    );
};

export default SalesRiskAnalysisTable;

SalesRiskAnalysisTable.propTypes = {
    isLoading: PropTypes.bool,
    filter: PropTypes.func,
    tableName: PropTypes.string,
    search: PropTypes.string,
    tableColumns: PropTypes.array,
    tableData: PropTypes.array,
    questionInputFields: PropTypes.array,
};
