import _ from "lodash";
import React, { useMemo, useEffect } from "react";

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// ui components
// import SalesRiskAnalysisTableLoader from "../loader/SalesRiskAnalysisTableLoader";
import EmptyTable from "../../../../../global/EmptyTable";

// table header
import WithoutDraggableColumnHeader from "./WithoutColumnHeader";

// modal
// Api
// import {
//     useEditSinglePolicySalesRiskAnalysisMutation,
//     useEditSingleRuleSalesRiskAnalysisMutation,
//     useSingleRuleStatusUpdateMutation,
// } from "../../../../services/api/pointFactorsSlice";

// constants
// import { PolicyTypeItemValuesType, PolicyTypeItems } from "../../constant";

// helper function
import PointFactorsTablePagination from "./PointFactorsTablePagination";
import { useState } from "react";
import PmPointFactorsTableLoader from "../loader/PmPointFactorsTableLoader";
import EditFactorModal from "../modal/EditFactorModal";
import { LimitUnits } from "../../constant";
import { validationFormator } from "../../utils/validationFormator";
import { useGetSinglePmPointFactorQuery, useUpdatePmPointfactorMutation } from "../../../../../services/api/Pm-Sales/pmSalesApiSlice";

const PointFactorsTable = ({
    isLoading,
    filter,
    tableName,
    search,
    tableColumns,
    tableData,
    onPageChange,
    refetch,
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
    const [editFactorModalOpen, setEditFactorModalOpen] = React.useState(false);
    // modal state data
    const [editFactorData, setEditFactorData] = React.useState({});

    // point factors data
    const _pointFactors = React.useMemo(
        () => tableData,
        [tableData]
    );
    React.useEffect(() => {
        if (_.size(_pointFactors) === _.size(data)) {
            setSkipPageReset(true);
            _pointFactors && setData(_pointFactors);
        } else {
            _pointFactors && setData(_pointFactors);
        }
    }, [_pointFactors]);

    // clear skipPageReset
    useEffect(() => {
        if (skipPageReset) {
            setSkipPageReset(false);
        }
    }, [data]);

    // default columns
    const defaultColumns = useMemo(() => [...tableColumns]);

    // columns
    const [columns, setColumns] = useState([...defaultColumns]);

    const [columnOrder, setColumnOrder] = useState(_.map(columns, "id"));

    // on pagination
    const handlePageChange = ({ selected }) => {
        const paginate = {
            pageIndex: selected,
            pageSize,
        };

        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };





    // handle page size change
    const handlePageSizeChange = (e) => {
        e.preventDefault();
        const paginate = {
            pageIndex,
            pageSize: e.target.value,
        };
        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };

    // pagination
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
            filter,
            globalFilter: _.trim(search)
        },
        onGlobalFilterChange: setGlobalFilter,
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
            handleEditFactor: (factorData) => {
                // find default value for dropdown options 
                const limit_unit = LimitUnits?.data?.find(unit => unit?.name == factorData?.limit_unit)

                // set editor data
                setEditFactorData({
                    ...factorData, limit_unit
                });
                setEditFactorModalOpen(true);
            },
        }
    })

    const [editFactorDataValidation, setEditFactorDataValidation] =
        useState({
            title: false,
            project_type: false,
            lower_limit: false,
            upper_limit: false,
            limit_type: false,
            limit_unit: false,
            point_type: false,
            points: false,
            isSubmitting: false,
        });

    // handle change on input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // setEditFactorData({ ...editFactorData, [name]: value });
        if (editFactorData[name] === value) {
            // If yes, clear the value from the state
            setEditFactorData({ ...editFactorData, [name]: "" });
        } else {
            // Otherwise, set the clicked checkbox's value in the state
            setEditFactorData({ ...editFactorData, [name]: value });
        }
    }

    // modal Close Handler
    const handleCloseEditFactorModal = () => {
        setEditFactorModalOpen(false);
        // resetFormForRule();
    };

    // submit 
    const [updatePmPointfactor, { isLoading: isUpdatePmPointfactorLoading }] = useUpdatePmPointfactorMutation()

    const handleUpdateFactor = async () => {
        const validation = validationFormator(editFactorData, editFactorDataValidation)
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setEditFactorDataValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        try {
            const lowerLimitCondition = editFactorData?.infiniteValueDown ? editFactorData?.infiniteValueDown : editFactorData?.limit_type == 2 ? "==" : "<"
            const upperLimitCondition = editFactorData?.infiniteValueUp ? editFactorData?.infiniteValueUp : editFactorData?.limit_type == 2 ? "==" : ">="

            const payload = {
                criteria_id: parseInt(editFactorData?.criteria_id),
                title: editFactorData?.title ?? null,
                project_type: parseInt(editFactorData?.project_type) ?? null,
                lower_limit: parseInt(editFactorData?.lower_limit) ?? null,
                upper_limit: parseInt(editFactorData?.upper_limit) ?? null,
                limit_type: parseInt(editFactorData?.limit_type) ?? null,
                limit_unit: parseInt(editFactorData?.limit_unit?.name) ?? null,
                lower_limit_condition: lowerLimitCondition ?? null,
                upper_limit_condition: upperLimitCondition ?? null,
                point_type: parseInt(editFactorData?.point_type) ?? null,
                points: parseFloat(editFactorData?.points) ?? null,
                status: parseInt(editFactorData?.status) ?? null,
            }

            // console.log("payload: ", payload)

            const response = await updatePmPointfactor({ id: editFactorData?.id, payload }).unwrap();

            if (response?.status == 200) {
                toast.success(response.message);
                handleCloseEditFactorModal();
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    // add new factor validation on change
    useEffect(() => {
        if (editFactorDataValidation?.isSubmitting) {
            const validation = validationFormator(editFactorData, editFactorData, editFactorDataValidation)
            setEditFactorDataValidation(validation);
        }
    }, [editFactorData]);

    // useEffect(() => {
    //     if (editFactorData?.infiniteValueDown) {
    //         if (editFactorData?.lower_limit && !editFactorData?.infiniteValueUp && !editFactorData?.upper_limit) {
    //             setEditFactorData(prev => ({ ...prev, lower_limit: editFactorData.lower_limit }));
    //         }
    //         if (editFactorData?.upper_limit && !editFactorData?.infiniteValueUp) {
    //             setEditFactorData(prev => ({ ...prev, lower_limit: editFactorData.upper_limit }));
    //         }
    //     }
    //     if (editFactorData?.infiniteValueUp && editFactorData?.lower_limit && !editFactorData?.infiniteValueDown) {
    //         setEditFactorData(prev => ({ ...prev, upper_limit: editFactorData.lower_limit }));
    //     }
    // }, [editFactorData?.infiniteValueUp, editFactorData?.infiniteValueDown, editFactorData?.lower_limit, editFactorData?.upper_limit]);

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
                                        className={`sp1_tasks_tr ${row.parentId !== undefined
                                            ? "expended_row"
                                            : ""
                                            } ${row.getIsExpanded()
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
                            <PmPointFactorsTableLoader
                            // prevItemLength={data?.length}
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
            {editFactorModalOpen && (
                <EditFactorModal
                    open={editFactorModalOpen}
                    closeModal={handleCloseEditFactorModal}
                    editFactorData={editFactorData}
                    setEditFactorData={setEditFactorData}
                    handleChange={handleChange}
                    handleUpdateFactor={handleUpdateFactor}
                    editFactorDataValidation={editFactorDataValidation}
                    isUpdatePmPointfactorLoading={isUpdatePmPointfactorLoading}
                />
            )}

            {/* pagination */}
            {/* <PointFactorsTablePagination
                tableData={tableData}
                handlePageSizeChange={handlePageSizeChange}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            /> */}

        </React.Fragment>
    );
};

export default PointFactorsTable;

PointFactorsTable.propTypes = {
    isLoading: PropTypes.bool,
    filter: PropTypes.func,
    tableName: PropTypes.string,
    search: PropTypes.string,
    tableColumns: PropTypes.array,
    tableData: PropTypes.array,
    onPageChange: PropTypes.func,
    refetch: PropTypes.func,
};
