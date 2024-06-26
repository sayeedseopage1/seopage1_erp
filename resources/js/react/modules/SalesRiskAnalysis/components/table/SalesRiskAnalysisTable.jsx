import _ from "lodash";
import React, { useMemo, useEffect, useContext } from "react";

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
import EditCountryListModal from "../modal/EditCountryListModal";

// Api
import {
    useEditSinglePolicySalesRiskAnalysisMutation,
    useEditSingleRuleSalesRiskAnalysisMutation,
    useSingleRuleStatusUpdateMutation,
} from "../../../../services/api/salesRiskAnalysisSlice";

// helper function
import {
    formatEditPolicyData,
    formatEditPolicyDataPayload,
    formatEditRuleData,
    formatEditRuleDataPayload,
    formatSingleRuleData,
} from "../../helper/formatEditPolicyData";
import { addNewRulesValidation } from "../../helper/createFromValidation";
import { generateUniqueString } from "../../../../utils/customUidGenerate";

// context
import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";
import { PolicyTypeItems } from "../../constant";

const inputSateData = {
    inputState: {
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
    },
    inputValidation: {
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
        key: false,
        points: false,
    },
};

const SalesRiskAnalysisTable = ({
    isLoading,
    filter,
    tableName,
    search,
    tableColumns,
    tableData,
    onPageChange,
    refetch,
}) => {
    // context (for Policy key Add )
    const { isSalesRiskInputsLoading, policyKeys } = useContext(
        SalesRiskAnalysisContext
    );

    // Table State
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData?.data || []);
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
    const [editPolicyModalOpen, setEditPolicyModalOpen] = React.useState(false);
    const [editCountryListModalOpen, setEditCountryListModalOpen] =
        React.useState(false);
    const [isFocusedOnTitleInput, setIsFocusedOnTitleInput] =
        React.useState(false);

    // modal state data
    const [isRuleUpdating, setIsRuleUpdating] = React.useState(false);
    const [editRuleData, setEditRuleData] = React.useState({});
    const [addQuestionsData, setAddQuestionsData] = React.useState({});
    const [statusActionData, setStatusActionData] = React.useState({});
    const [editPolicyData, setEditPolicyData] = React.useState({});
    const [editPolicyDefaultData, setEditPolicyDefaultData] = React.useState(
        []
    );
    const [editPolicyDeleteData, setEditPolicyDeleteData] = React.useState([]);
    const [editPolicyInputData, setEditPolicyInputData] = React.useState([]);
    const [editRuleDataValidation, setEditRuleDataValidation] = React.useState(
        inputSateData?.inputValidation
    );
    const [editPolicyDataValidation, setEditPolicyDataValidation] =
        React.useState(inputSateData?.inputValidation);

    // sales risk analysis rules data
    const _salesRiskAnalysis = React.useMemo(
        () => tableData?.data,
        [tableData?.data]
    );
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
    const columns = [...defaultColumns];

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

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
            globalFilter: _.trim(search),
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
            handleEditApplicableRule: (row, selectedRule) => {
                const payload = formatSingleRuleData(
                    row,
                    selectedRule,
                    policyKeys
                );
                setIsRuleUpdating(true);
                setEditRuleData(payload);
                setEditRuleModalOpen(true);
            },
            handleAddQuestions: (data) => {
                setAddQuestionsData(data);
                setAddQuestionsModalOpen(true);
            },
            handlePolicyStatus: (row) => {
                
                setStatusActionData({
                    ...row,
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
                if (data.key === "yesNoRules") {
                    setEditPolicyData({
                        ...inputSateData.inputState,
                        key: policyKeys?.data?.find(
                            (item) => item.name === data.key
                        ),
                    });
                }

                setEditPolicyDefaultData({
                    policyName: data.title,
                    department: {
                        id: data?.department?.id,
                        team_name: data?.department?.name,
                    },
                    comment: data.comment,
                    id: data.id,
                    key: policyKeys?.data?.find(
                        (item) => item.name === data.key
                    ),
                });

                setEditPolicyModalOpen(true);
            },
            handleEditCountryList: (data, selectedRule) => {
                const payload = formatEditRuleData(data, selectedRule);
                setEditRuleData(payload);
                setEditCountryListModalOpen(true);
            },
            handleSendPolicyType: () => {
                return policyKeys;
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
        const payload = formatEditRuleDataPayload(editRuleData);
        try {
            const res = await submitData(payload);
            if (res.data) {
                toast.success("Rules updated successfully");
                handleCloseEditRuleModal();
                handleCloseEditCountryListModal();
                setIsFocusedOnTitleInput(false);
                setEditRuleData({});
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
                setStatusActionData({});
                setIsFocusedOnTitleInput(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
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
            ...inputSateData.inputState,
        });
        setIsRuleUpdating(false);
        setIsFocusedOnTitleInput(false);
    };

    const handlePolicyEditChange = (e) => {
        const { name, value } = e.target;
        if (
            name === "policyName" ||
            name === "department" ||
            name === "comment" ||
            name === "key"
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
            setIsFocusedOnTitleInput(true);
        } else {
            setEditPolicyData({ ...editPolicyData, [name]: value });
            setIsFocusedOnTitleInput(true);
        }
    };

    // reset form for policy and rule
    const resetFormForPolicy = (type) => {
        if (["single", "all"].includes(type)) {
            setEditPolicyData(inputSateData.inputState);
            setEditPolicyDataValidation(inputSateData.inputValidation);
            setIsFocusedOnTitleInput(false);
        }
        switch (type) {
            case "all":
                setEditPolicyDeleteData([]);
                setEditPolicyDefaultData([]);
                setIsFocusedOnTitleInput(false);
                break;
            case "specialRules":
                setEditPolicyData({
                    ...inputSateData.inputState,
                    key: policyKeys?.data?.find(
                        (item) => item.name === editPolicyData.key.name
                    ),
                });
                setEditPolicyDataValidation(inputSateData.inputValidation);
                setIsFocusedOnTitleInput(false);
                break;
            case "ruleInputs":
                setEditRuleData({});
                setEditRuleDataValidation(inputSateData.inputValidation);
                setIsFocusedOnTitleInput(false);
                break;
            case "rolePolicy":
                setEditRuleData({});
                setEditPolicyDataValidation(inputSateData.inputValidation);
                setIsFocusedOnTitleInput(false);
                break;
            default:
                break;
        }
    };

    // handle add rule on policy
    const handleAddRuleOnPolicy = async () => {
        const validation = addNewRulesValidation(
            {
                ...editPolicyData,
                policyName: editPolicyDefaultData?.policyName,
                department: editPolicyDefaultData?.department,
                key: editPolicyDefaultData?.key,
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
            if (editPolicyData?.key?.name === "yesNoRules") {
                resetFormForPolicy("specialRules");
            } else {
                resetFormForPolicy("single");
            }
        } else {
            setEditPolicyInputData([
                ...editPolicyInputData,
                {
                    ...editPolicyData,
                    id: generateUniqueString(15),
                },
            ]);

            if (editPolicyData?.key?.name === "yesNoRules") {
                resetFormForPolicy("specialRules");
            } else {
                resetFormForPolicy("single");
            }
        }
    };

    // handle Edit Policy Update on server
    const handleEditPolicyUpdate = async () => {
        const payloadForMainDataValidation = {
            ...editPolicyDefaultData,
            policyType: {
                name: "mainDetails",
            },
        };
        const validation = addNewRulesValidation(
            payloadForMainDataValidation,
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

        const payload = formatEditPolicyDataPayload(
            editPolicyDefaultData,
            editPolicyInputData,
            editPolicyDeleteData
        );
        try {
            const res = await submitPolicyData(payload);
            if (res.data) {
                toast.success("Policy updated successfully");
                handleCloseEditPolicyModal();
                resetFormForPolicy("all");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // modal Close Handler
    const handleCloseEditRuleModal = () => {
        setEditRuleModalOpen(false);
        resetFormForPolicy("ruleInputs");
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
        resetFormForPolicy("all");
    };
    const handleCloseEditCountryListModal = () => {
        setEditCountryListModalOpen(false);
        resetFormForPolicy("rolePolicy");
    };

    // auto generate title
    const autoGenerateTitle = (data) => {
        if (isRuleUpdating && !isFocusedOnTitleInput) {
            return data.title;
        } else {
            return `${data?.policyType?.label} ${
                data?.valueType?.name === "currency" ? "$" : ""
            }${data?.value}${data.from}${data?.from && data?.to ? "-" : ""}${
                data.to
            }${data?.valueType?.name === "percentage" ? "%" : ""}${
                data?.valueType?.name === "hourly" ? "hr" : ""
            }${data?.valueType?.name === "days" ? "days" : ""}`;
        }
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
        if (editPolicyData?.policyType?.label) {
            setEditPolicyData({
                ...editPolicyData,
                title: autoGenerateTitle(editPolicyData),
            });
        }
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
        if (editPolicyDataValidation?.isSubmitting) {
            const payloadForMainDataValidation = {
                ...editPolicyDefaultData,
                policyType: {
                    name: "mainDetails",
                },
            };
            const validation = addNewRulesValidation(
                payloadForMainDataValidation,
                editPolicyDataValidation
            );
            setEditPolicyDataValidation(validation);
        }
    }, [editPolicyDefaultData]);

    useEffect(() => {
        if (editPolicyDataValidation?.isSubmitting) {
            const validation = addNewRulesValidation(
                {
                    ...editPolicyData,
                    policyName: editPolicyDefaultData?.policyName,
                    department: editPolicyDefaultData?.department,
                    key: editPolicyDefaultData?.key,
                },
                editPolicyDataValidation
            );
            setEditPolicyDataValidation(validation);
        }
    }, [editPolicyData]);



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
                            !isSalesRiskInputsLoading &&
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
                        {(isLoading || isSalesRiskInputsLoading) && (
                            <SalesRiskAnalysisTableLoader
                                prevItemLength={data?.length}
                            />
                        )}
                    </tbody>
                </table>
                {/* Table for empty */}
                {!isLoading &&
                    !isSalesRiskInputsLoading &&
                    _.size(table.getRowModel().rows) === 0 && <EmptyTable />}
            </div>

            {/* Modals */}
            {editRuleModalOpen && (
                <EditApplicableRulesModal
                    open={editRuleModalOpen}
                    closeModal={handleCloseEditRuleModal}
                    editRuleData={editRuleData}
                    setEditRuleData={setEditRuleData}
                    handleChange={handleChange}
                    handleUpdateRules={handleUpdateRules}
                    editRuleDataValidation={editRuleDataValidation}
                    handleMultiSelectChange={setEditRuleData}
                    isLoadingEditSalesRiskAnalysisRule={
                        isLoadingEditSalesRiskAnalysisRule
                    }
                />
            )}
            {ruleActionModalOpen && (
                <RuleActionConfirmationModal
                    open={ruleActionModalOpen}
                    closeModal={handleCloseStatusActionModal}
                    statusActionData={statusActionData}
                    handleStatusUpdate={handleStatusUpdate}
                    isLoading={isLoadingSingleRuleStatusUpdate}
                    modalContent={{
                        0: "Enable",
                        1: "Disable",
                    }}
                />
            )}
            {addQuestionsModalOpen && (
                <AddQuestionsModal
                    open={addQuestionsModalOpen}
                    closeModal={handleCloseAddQuestionsModal}
                    addQuestionsData={addQuestionsData}
                    setAddQuestionsData={setAddQuestionsData}
                    refetchSaleRiskAnalysis={refetch}
                />
            )}
            {editPolicyModalOpen && (
                <EditPolicyModal
                    open={editPolicyModalOpen}
                    closeModal={handleCloseEditPolicyModal}
                    editPolicyData={editPolicyData}
                    editPolicyDefaultData={editPolicyDefaultData}
                    editPolicyInputData={editPolicyInputData}
                    editPolicyDataValidation={editPolicyDataValidation}
                    setIsFocusedOnTitleInput={setIsFocusedOnTitleInput}
                    isRuleUpdating={isRuleUpdating}
                    isLoading={isLoadingEditSalesRiskAnalysisPolicy}
                    editPolicyAction={{
                        setEditPolicyData,
                        handleAddRuleOnPolicy,
                        setEditPolicyInputData,
                        handleCancelRuleOnPolicy,
                        setIsRuleUpdating,
                        handlePolicyEditChange,
                        handleEditPolicyUpdate,
                        setEditPolicyDeleteData,
                    }}
                />
            )}
            {editCountryListModalOpen && (
                <EditCountryListModal
                    open={editCountryListModalOpen}
                    closeModal={handleCloseEditCountryListModal}
                    handleMultiSelectChange={setEditRuleData}
                    editRuleData={editRuleData}
                    handleUpdateRules={handleUpdateRules}
                    editRuleDataValidation={editRuleDataValidation}
                    isLoading={isLoadingEditSalesRiskAnalysisRule}
                />
            )}

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

export default SalesRiskAnalysisTable;

SalesRiskAnalysisTable.propTypes = {
    isLoading: PropTypes.bool,
    filter: PropTypes.func,
    tableName: PropTypes.string,
    search: PropTypes.string,
    tableColumns: PropTypes.array,
    tableData: PropTypes.object,
    onPageChange: PropTypes.func,
    refetch: PropTypes.func,
};
