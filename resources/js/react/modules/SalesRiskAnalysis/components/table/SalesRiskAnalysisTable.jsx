import React, { useMemo } from "react";
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
import RuleActionConfirmationModal from "../modal/RuleActionConfirmationModal";
import AddQuestionsModal from "../modal/AddQuestionsModal";

// Api
import {
    useEditSalesRiskAnalysisPointsMutation,
    useSingleRuleStatusUpdateMutation,
} from "../../../../services/api/salesRiskAnalysisSlice";
import { useEffect } from "react";
import { PolicyTypeItemValuesType, PolicyTypeItems } from "../../constant";
import { FormatJsonCountry } from "../../helper/countriesFormat";
import { addNewRulesValidation } from "../../helper/createFromValidation";
import EditApplicableRulesModal from "../modal/EditApplicableRulesModal";
import _ from "lodash";

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
    const [editRuleModalOpen, setEditRuleModalOpen] = React.useState(false);
    const [ruleActionModalOpen, setRuleActionModalOpen] = React.useState(false);
    const [addQuestionsModalOpen, setAddQuestionsModalOpen] =
        React.useState(false);
    const [EditPolicyModalOpen, setEditPolicyModalOpen] = React.useState(false);

    // modal state data
    const [editRuleData, setEditRuleData] = React.useState({});
    const [addQuestionsData, setAddQuestionsData] = React.useState({});
    const [statusActionData, setStatusActionData] = React.useState({});
    const [editPolicyData, setEditPolicyData] = React.useState([]);
    const [editRuleDataValidation, setEditRuleDataValidation] = React.useState({
        isSubmitting: false,
        policyName: false,
        department: false,
        policyType: false,
        valueType: false,
        value: false,
        from: false,
        to: false,
        yes: false,
        no: false,
        countries: false,
        points: false,
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
    const [submitData, { isLoading: isLoadingEditSalesRiskAnalysisRule }] =
        useEditSalesRiskAnalysisPointsMutation();

    const [
        singleRuleStatusUpdate,
        { isLoading: isLoadingSingleRuleStatusUpdate },
    ] = useSingleRuleStatusUpdateMutation();

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
            handleEditApplicableRule: (row, selectedRule, ruleType) => {
                const valueTypeConst =
                    PolicyTypeItemValuesType?.data?.regularTypes?.data;

                const getVueType = (type) => {
                    if (!_.includes(["yesNo", "list"], type)) {
                        return valueTypeConst.find(
                            (item) => item?.name === selectedRule?.value_type
                        );
                    } else if (type === "list") {
                        return {
                            id: 1,
                            label: "Countries",
                            name: "countries",
                        };
                    } else {
                        return "";
                    }
                };

                const payload = {
                    id: row.id,
                    policyName: row.title,
                    department: row.department,
                    policyType: PolicyTypeItems.data.find(
                        (item) => item?.name === selectedRule?.type
                    ),
                    title: selectedRule.title,
                    valueType: getVueType(selectedRule?.type),
                    from:
                        selectedRule?.type === "range"
                            ? selectedRule?.value?.split(",")[0]
                            : "",
                    to:
                        selectedRule?.type === "range"
                            ? selectedRule?.value?.split(", ")[1]?.trim()
                            : "",
                    yes:
                        selectedRule?.type === "yesNo"
                            ? selectedRule?.value?.split(",")[0]
                            : "",
                    no:
                        selectedRule?.type === "yesNo"
                            ? selectedRule?.value?.split(", ")[1]?.trim()
                            : "",
                    value: !_.includes(
                        ["range", "yesNo", "list"],
                        selectedRule?.type
                    )
                        ? selectedRule?.value
                        : "",
                    countries:
                        selectedRule?.type === "list"
                            ? FormatJsonCountry(selectedRule?.value)
                            : "",
                    points: selectedRule?.point,
                };
                
                setEditRuleData(payload);
                setEditRuleModalOpen(true);
            },
            handleAddQuestions: (data) => {
                setAddQuestionsData(data);
                setAddQuestionsModalOpen(true);
            },
            handlePolicyStatus: (data) => {
                setStatusActionData({
                    ...data,
                    modalType: "Policy",
                });
                setRuleActionModalOpen(true);
            },
            handleRuleStatus: (rule) => {
                setStatusActionData({
                    ...rule,
                    modalType: "Rule",
                });
                setRuleActionModalOpen(true);
            },
            handleEditPolicy: (data) => {

                console.log("data", data);
                setEditPolicyData(data)
                setEditPolicyModalOpen(true)
            }
        },
    });

    const handleUpdateRules = async () => {
        const validation = addNewRulesValidation(
            editRuleData,
            editRuleDataValidation
        );
        
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            
            setEditRuleDataValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        

        const payload = {
            title: editRuleData?.title,
            policyType: editRuleData?.policyType?.name,
        };
        if (editRuleData?.value) payload.value = editRuleData?.value;
        if (!_.isEmpty(editRuleData.valueType))
        payload.valueType = editRuleData.valueType?.name;
        if (editRuleData?.from) payload.from = editRuleData?.from;
        if (editRuleData?.to) payload.to = editRuleData?.to;
        if (editRuleData?.points) payload.points = editRuleData?.points;
        if (editRuleData?.yes) payload.yes = editRuleData?.yes;
        if (editRuleData?.no) payload.no = editRuleData?.no;
        if (editRuleData?.countries?.length > 0) {
            payload.countries = editRuleData?.countries.map((country) => ({
                [country.iso]: country.niceName,
            }));
        }

        console.log("payload", payload);


        try {
            // const res = await submitData(editRuleData);
            if (res.data) {
                toast.success("Rules updated successfully");
                handleCloseEditRuleModal();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleStatusUpdate = async () => {
        try {
            const payload = {
                id: statusActionData.id,
                status: statusActionData.status === "1" ? "0" : "1",
            };
            const res = await singleRuleStatusUpdate(payload);
            if (res.data) {
                toast.success(
                    `${statusActionData?.modalType} Status updated successfully`
                );
                handleCloseStatusActionModal();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const resetFormSate = () => {
        setEditRuleData({});
        setEditRuleDataValidation({
            isSubmitting: false,
            newRule: false,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "policyType") {
            setEditRuleData({
                ...editRuleData,
                valueType: {},
                value: "",
                from: "",
                to: "",
                yes: "",
                no: "",
                countries: [],
                points: "",
                [name]: value,
            });
        } else {
            setEditRuleData({ ...editRuleData, [name]: value });
        }
    };

    // modal Close Handler
    const handleCloseEditRuleModal = () => {
        setEditRuleModalOpen(false);
        resetFormSate();
    };

    const handleCloseStatusActionModal = () => {
        setRuleActionModalOpen(false);
        setStatusActionData({});
    };
    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
    };

      

    // add title on change
    useMemo(() => {
        setEditRuleData({
            ...editRuleData,
            title: `${editRuleData?.policyType?.label} ${
                editRuleData?.valueType?.name === "currency" ? "$" : ""
            }${editRuleData?.value}${editRuleData.from}${
                editRuleData?.from && editRuleData?.to ? "-" : ""
            }${editRuleData.to}${
                editRuleData?.valueType?.name === "percentage" ? "%" : ""
            }${editRuleData?.valueType?.name === "hourly" ? "hr" : ""}${
                editRuleData?.valueType?.name === "days" ? "days" : ""
            }`,
        });
    }, [
        editRuleData?.policyType?.name,
        editRuleData?.valueType?.name,
        editRuleData.value,
        editRuleData.from,
        editRuleData.to,
    ]);

    // Validation Update
    useEffect(() => {
        if (editRuleDataValidation.isSubmitting) {
            const validation = addNewRulesValidation(
                editRuleData,
                editRuleDataValidation
            );
            setEditRuleDataValidation(validation);
        }
    }, [editRuleData]);


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
            <EditApplicableRulesModal
                open={editRuleModalOpen}
                closeModal={handleCloseEditRuleModal}
                editRuleData={editRuleData}
                handleChange={handleChange}
                handleUpdateRules={handleUpdateRules}
                editRuleDataValidation={editRuleDataValidation}
                handleMultiSelectChange={setEditRuleData}
                isLoadingEditSalesRiskAnalysisRule={
                    isLoadingEditSalesRiskAnalysisRule
                }
            />

            <RuleActionConfirmationModal
                open={ruleActionModalOpen}
                closeModal={handleCloseStatusActionModal}
                statusActionData={statusActionData}
                handleStatusUpdate={handleStatusUpdate}
                isLoading={isLoadingSingleRuleStatusUpdate}
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
