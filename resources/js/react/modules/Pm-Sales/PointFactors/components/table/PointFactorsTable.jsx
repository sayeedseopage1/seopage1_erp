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

    // console.log(tableData)

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
    // console.log("80", defaultColumns)

    // columns
    const [columns, setColumns] = useState([...defaultColumns]);
    // console.log("84", columns)

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
                // const valueTypeConst =
                //     PolicyTypeItemValuesType?.data?.regularTypes?.data;

                // const getVueType = (type) => {
                //     if (!_.includes(["yesNo", "list"], type)) {
                //         return valueTypeConst.find(
                //             (item) => item?.name === selectedRule?.value_type
                //         );
                //     } else if (type === "list") {
                //         return {
                //             id: 1,
                //             label: "Countries",
                //             name: "countries",
                //         };
                //     } else {
                //         return "";
                //     }
                // };
                // const payload = formatSingleRuleData(row, selectedRule)
                setEditFactorData(factorData);
                setEditFactorModalOpen(true);

                console.log(factorData)
            },
        }
    })


    // handle update rules

    // handle status update on rule and policy action modal server call

    // reset form for rule on close

    // handle change on input

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editFactorData[name] === value) {
            // If yes, clear the value from the state
            setEditFactorData({ ...editFactorData, [name]: "" });
        } else {
            // Otherwise, set the clicked checkbox's value in the state
            setEditFactorData({ ...editFactorData, [name]: value });
        }
    }

    // Edit Policy
    // handle cancel rule on policy

    // modal Close Handler
    const handleCloseEditFactorModal = () => {
        setEditFactorModalOpen(false);
        // resetFormForRule();
    };

    // auto generate title
    // const autoGenerateTitle = (data) => {
    //     return `${data?.policyType?.label} ${data?.valueType?.name === "currency" ? "$" : ""
    //         }${data?.value}${data.from}${data?.from && data?.to ? "-" : ""}${data.to
    //         }${data?.valueType?.name === "percentage" ? "%" : ""}${data?.valueType?.name === "hourly" ? "hr" : ""
    //         }${data?.valueType?.name === "days" ? "days" : ""}`;
    // };


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


            {/* <AddNewItemsModal
                handleChange={handleChange}
                open={addNewItemModalOpen}
                newFactorData={newFactorData}
                setNewFactorData={setNewFactorData}
                closeModal={handleAddNewItemModal}
                handleFactorsAdded={handleFactorsAdded}
                // newPolicyInputData={newPolicyInputData}
                // newPolicyDataValidation={newPolicyDataValidation}
                // TODO: loading will come from api 
                isLoadingAddPointFactors={
                    false
                }
            /> */}

            {/* Modals */}
            {editFactorModalOpen && (
                <EditFactorModal
                    open={editFactorModalOpen}
                    closeModal={handleCloseEditFactorModal}
                    editFactorData={editFactorData}
                    setEditFactorData={setEditFactorData}
                    handleChange={handleChange}
                // handleUpdateRules={handleUpdateRules}
                // editRuleDataValidation={editRuleDataValidation}
                // handleMultiSelectChange={setEditRuleData}
                // isLoadingEditSalesRiskAnalysisRule={
                //     isLoadingEditSalesRiskAnalysisRule
                // }
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
