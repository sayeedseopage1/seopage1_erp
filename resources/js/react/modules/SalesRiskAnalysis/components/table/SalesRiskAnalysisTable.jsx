import _ from "lodash";
import React, { useMemo, useEffect } from "react";
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

// modal
import EditPolicyModal from "../modal/EditPolicyModal";
import AddQuestionsModal from "../modal/AddQuestionsModal";
import EditApplicableRulesModal from "../modal/EditApplicableRulesModal";
import RuleActionConfirmationModal from "../modal/RuleActionConfirmationModal";

// Api
import {
    useEditSinglePolicySalesRiskAnalysisMutation,
    useEditSingleRuleSalesRiskAnalysisMutation,
    useSingleRuleStatusUpdateMutation,
} from "../../../../services/api/salesRiskAnalysisSlice";

// constants
import { PolicyTypeItemValuesType, PolicyTypeItems } from "../../constant";

// helper function
import { formatEditPolicyData } from "../../helper/formatEditPolicyData";
import { addNewRulesValidation } from "../../helper/createFromValidation";
import { FormatJsonCountry, getYesNoValue } from "../../helper/countriesFormat";

const SalesRiskAnalysisTable = ({
    isLoading,
    filter,
    tableName,
    search,
    tableColumns,
    tableData,
    questionInputFields,
    handlePageChange,
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
    const [editPolicyModal, setEditPolicyModalOpen] = React.useState(false);

    // modal state data
    const [isRuleUpdating, setIsRuleUpdating] = React.useState(false);
    const [editRuleData, setEditRuleData] = React.useState({});
    const [addQuestionsData, setAddQuestionsData] = React.useState({});
    const [statusActionData, setStatusActionData] = React.useState({});
    const [editPolicyData, setEditPolicyData] = React.useState({});
    const [editPolicyDefaultData, setEditPolicyDefaultData] = React.useState(
        []
    );
    const [editPolicyInputData, setEditPolicyInputData] = React.useState([]);
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
    const [editPolicyDataValidation, setEditPolicyDataValidation] =
        React.useState({
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
        useEditSingleRuleSalesRiskAnalysisMutation();
    const [
        singleRuleStatusUpdate,
        { isLoading: isLoadingSingleRuleStatusUpdate },
    ] = useSingleRuleStatusUpdateMutation();

    const [
        submitPolicyData,
        { isLoading: isLoadingEditSalesRiskAnalysisPolicy },
    ] = useEditSinglePolicySalesRiskAnalysisMutation();

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
                    id: selectedRule.id,
                    policyName: row.title,
                    department: row.department,
                    policyType: PolicyTypeItems.data.find(
                        (item) => item?.name === selectedRule?.type
                    ),
                    title: selectedRule.title,
                    valueType: getVueType(selectedRule?.type),
                    comment: row?.comment,
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
                            ? getYesNoValue(selectedRule, "yes", "point")
                            : "",
                    no:
                        selectedRule?.type === "yesNo"
                            ? getYesNoValue(selectedRule, "no", "point")
                            : "",
                    value: !_.includes(
                        ["range", "yesNo", "list"],
                        selectedRule?.type
                    )
                        ? selectedRule?.value
                        : "",
                    ruleComment: selectedRule?.comment,
                    yesComment:
                        selectedRule?.type === "yesNo"
                            ? getYesNoValue(selectedRule, "yes", "comment")
                            : "",
                    noComment:
                        selectedRule?.type === "yesNo"
                            ? getYesNoValue(selectedRule, "no", "comment")
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
                // function to format data
                const updateData = formatEditPolicyData(data);
                setEditPolicyInputData(updateData);
                setEditPolicyDefaultData({
                    policyName: data.title,
                    department: {
                        id: data?.department?.id,
                        team_name: data?.department?.name,
                    },
                    comment: data.comment,
                    id: data.id,
                });
                setEditPolicyModalOpen(true);
            },
        },
    });

    // handle update rules
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
            id: editRuleData?.id,
        };
        if (editRuleData.value) payload.value = editRuleData.value;
        if (!_.isEmpty(editRuleData.valueType))
            payload.valueType = editRuleData.valueType.name;
        if (editRuleData.from) payload.from = editRuleData.from;
        if (editRuleData.to) payload.to = editRuleData.to;
        if (editRuleData.points) payload.points = editRuleData.points;
        if (editRuleData.yes && editRuleData.no) {
            payload.value = {
                yes: {
                    point: editRuleData.yes,
                    comment: editRuleData.yesComment,
                },
                no: {
                    point: editRuleData.no,
                    comment: editRuleData.noComment,
                },
            };
        }
        if (editRuleData.countries?.length > 0) {
            payload.countries = editRuleData.countries.map((country) => ({
                [country.iso]: country.niceName,
            }));
        }
        if (editRuleData.ruleComment)
            payload.comment = editRuleData.ruleComment;
        try {
            const res = await submitData(payload);
            if (res.data) {
                toast.success("Rules updated successfully");
                handleCloseEditRuleModal();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // handle status update on rule and policy action modal server call
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

    // reset form for rule on close
    const resetFormForRule = () => {
        setEditRuleData({});
        setEditRuleDataValidation({
            isSubmitting: false,
            newRule: false,
        });
    };

    // handle change on input
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

    // Edit Policy
    // handle cancel rule on policy
    const handleCancelRuleOnPolicy = () => {
        setEditPolicyData({
            ...editPolicyData,
            valueType: {},
            policyType: {},
            value: "",
            from: "",
            to: "",
            yes: "",
            no: "",
            comment: "",
            yesComment: "",
            noComment: "",
            ruleComment: "",
            countries: [],
            points: "",
        });
        setIsRuleUpdating(false);
    };

    const handlePolicyEditChange = (e) => {
        const { name, value } = e.target;
        if (
            name === "policyName" ||
            name === "department" ||
            name === "comment"
        ) {
            setEditPolicyDefaultData({
                ...editPolicyDefaultData,
                [name]: value,
            });
        } else if (name === "policyType") {
            setEditPolicyData({
                ...editPolicyData,
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
            setEditPolicyData({ ...editPolicyData, [name]: value });
        }
    };

    // reset form for policy on close
    const resetFormForPolicy = (single) => {
        if (single === "single") {
            setEditPolicyData({
                policyName: "",
                department: "",
                valueType: {},
                policyType: {},
                value: "",
                from: "",
                to: "",
                yes: "",
                no: "",
                comment: "",
                yesComment: "",
                noComment: "",
                ruleComment: "",
                countries: [],
                points: "",
                id: "",
            });
        } else {
            setEditPolicyData([]);
            setEditPolicyDefaultData([]);
            setEditPolicyDataValidation({});
        }
    };

    // handle add rule on policy
    const handleAddRuleOnPolicy = async () => {
        const validation = addNewRulesValidation(
            {
                ...editPolicyData,
                policyName: editPolicyDefaultData?.policyName,
                department: editPolicyDefaultData?.department,
            },
            editPolicyDataValidation
        );
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setEditPolicyDataValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        // check if policy rule already exist
        const isExist = editPolicyInputData.find(
            (item) => item?.id === editPolicyData?.id
        );

        if (isExist) {
            const updatedData = editPolicyInputData.map((item) => {
                if (item.id === editPolicyData.id) {
                    return {
                        ...item,
                        ...editPolicyData,
                    };
                }
                return item;
            });
            setIsRuleUpdating(false);
            setEditPolicyInputData(updatedData);
            resetFormForPolicy("single");
        } else {
            setEditPolicyInputData([
                ...editPolicyInputData,
                {
                    ...editPolicyData,
                    id: Math.random().toString(36).substring(7),
                },
            ]);
            resetFormForPolicy("single");
        }
    };

    // handle Edit Policy Update on server
    const handleEditPolicyUpdate = async () => {
        const payload = {
            id: editPolicyDefaultData?.id,
            title: editPolicyDefaultData?.policyName,
            department: editPolicyDefaultData?.department?.id,
            comment: editPolicyDefaultData?.comment,
            ruleList: editPolicyInputData.map((item) => {
                const rule = {
                    policyType: item.policyType?.name,
                    title: item.title,
                    id: item.id,
                };
                if (item.value) rule.value = item.value;
                if (!_.isEmpty(item.valueType))
                    rule.valueType = item.valueType.name;
                if (item.from) rule.from = item.from;
                if (item.to) rule.to = item.to;
                if (item.points) rule.points = item.points;
                if (item.yes && item.no) {
                    rule.value = {
                        yes: {
                            point: item.yes,
                            comment: item.yesComment,
                        },
                        no: {
                            point: item.no,
                            comment: item.noComment,
                        },
                    };
                }
                if (item.countries?.length > 0) {
                    rule.countries = item.countries.map((country) => ({
                        [country.iso]: country.niceName,
                    }));
                }
                if (item.ruleComment) rule.comment = item.ruleComment;
                return rule;
            }),
        };
        console.log("payload", payload);
        try {
            const res = await submitPolicyData(payload);
            if (res.data) {
                toast.success("Policy updated successfully");
                handleCloseEditPolicyModal();
                resetFormForPolicy();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // modal Close Handler
    const handleCloseEditRuleModal = () => {
        setEditRuleModalOpen(false);
        resetFormForRule();
    };
    const handleCloseStatusActionModal = () => {
        setRuleActionModalOpen(false);
        setStatusActionData({});
    };
    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
    };
    const handleCloseEditPolicyModal = () => {
        setEditPolicyModalOpen(false);
        resetFormForPolicy();
    };

    // auto generate title
    const autoGenerateTitle = (data) => {
        return `${data?.policyType?.label} ${
            data?.valueType?.name === "currency" ? "$" : ""
        }${data?.value}${data.from}${data?.from && data?.to ? "-" : ""}${
            data.to
        }${data?.valueType?.name === "percentage" ? "%" : ""}${
            data?.valueType?.name === "hourly" ? "hr" : ""
        }${data?.valueType?.name === "days" ? "days" : ""}`;
    };

    // add title on change for single rule
    useMemo(() => {
        setEditRuleData({
            ...editRuleData,
            title: autoGenerateTitle(editRuleData),
        });
    }, [
        editRuleData?.policyType?.name,
        editRuleData?.valueType?.name,
        editRuleData.value,
        editRuleData.from,
        editRuleData.to,
    ]);
    //
    useMemo(() => {
        setEditPolicyData({
            ...editPolicyData,
            title: autoGenerateTitle(editPolicyData),
        });
    }, [
        editPolicyData?.policyType?.name,
        editPolicyData?.valueType?.name,
        editPolicyData.value,
        editPolicyData.from,
        editPolicyData.to,
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
    useEffect(() => {
        if (editPolicyDataValidation.isSubmitting) {
            const validation = addNewRulesValidation(
                {
                    ...editPolicyData,
                    policyName: editPolicyDefaultData?.policyName,
                    department: editPolicyDefaultData?.department,
                },
                editPolicyDataValidation
            );
            setEditPolicyDataValidation(validation);
        }
    }, [editPolicyData]);

    useMemo(() => {
        handlePageChange({ pageIndex, pageSize });
    }, [pageIndex, pageSize]);

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
            <EditPolicyModal
                open={editPolicyModal}
                closeModal={handleCloseEditPolicyModal}
                editPolicyData={editPolicyData}
                editPolicyDefaultData={editPolicyDefaultData}
                setEditPolicyData={setEditPolicyData}
                editPolicyInputData={editPolicyInputData}
                handleAddRuleOnPolicy={handleAddRuleOnPolicy}
                setEditPolicyInputData={setEditPolicyInputData}
                editPolicyDataValidation={editPolicyDataValidation}
                handleMultiSelectChange={setEditPolicyData}
                handleCancelRuleOnPolicy={handleCancelRuleOnPolicy}
                isRuleUpdating={isRuleUpdating}
                setIsRuleUpdating={setIsRuleUpdating}
                handleChange={handlePolicyEditChange}
                handleEditPolicyUpdate={handleEditPolicyUpdate}
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
