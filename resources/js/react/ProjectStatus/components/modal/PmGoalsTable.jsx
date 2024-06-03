import React, { useEffect } from "react";
import _ from "lodash";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import Toaster from "../../../global/Toaster";
import DeadlineExplainModal from "./DeadlineExplainModal";
import ResolveModal from "./ResolveModal";
import { useLocalStorage } from "react-use";
import { DragableColumnHeader } from "../table/DragableColumnHeader";
import EmptyTable from "../../../global/EmptyTable";
import ExtendRequestModal from "./ExtendRequestModal";
import ReviewExtendRequestModal from "./ReviewExtendModal";
import GoalExtensionHistoryModal from "./GoalExtensionHistoryModal";
import DeadlineExplanationHistoryModal from "./DeadlineExplanationHistoryModal";
import PmGoalsTableLoader from "../loader/PmGoalsTableLoader";
import style from "../styles/pmgoaltable.module.css";
import {
    useLazyGetGoalExpiredHistoryQuery,
    useLazyGetGoalExtensionHistoryQuery,
    useLazyGetProjectExtendImagesQuery,
} from "../../../services/api/projectStatusApiSlice";
import ProjectStatusTablePagination from "../ProjectStatusTablePagination";

const PmGoalsTable = ({
    projectDetails,
    isLoading,
    pmGoal,
    PmGoalsTableColumns,
    tableName,
    refetchPmGoal,
}) => {
    const [data, setData] = React.useState(pmGoal || []);
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [projectPmGoalId, setProjectPmGoalId] = React.useState(null);
    const [projectPmGoalIdForExtension, setProjectPmGoalIdForExtension] =
        React.useState(null);
    const [projectPmGoalIdForExpired, setProjectPmGoalIdForExpired] =
        React.useState(null);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [value, setValue] = useLocalStorage(tableName ?? "");
    const [isGoalExpiredHistoryLoading, setIsGoalExpiredHistoryLoading] =
        React.useState(false);
    const [isGoalExtensionHistoryLoading, setIsGoalExtensionHistoryLoading] =
        React.useState(false);

    // modals state
    const [isOpenDeadlineExplainModal, setIsOpenDeadlineExplainModal] =
        React.useState(false);
    const [isOpenExtendRequestModal, setIsOpenExtendRequestModal] =
        React.useState(false);
    const [isOpenResolveModal, setIsOpenResolveModal] = React.useState(false);
    const [isOpenReviewExtendRequestModal, setIsOpenReviewExtendRequestModal] =
        React.useState(false);
    const [
        isOpenGoalExtensionHistoryModal,
        setIsOpenGoalExtensionHistoryModal,
    ] = React.useState(false);
    const [
        isOpenDeadlineExplanationHistoryModal,
        setIsOpenDeadlineExplanationHistoryModal,
    ] = React.useState(false);

    // modals data
    const [reviewExtendRequestData, setReviewExtendRequestData] =
        React.useState(null);
    const [extendRequestGoalId, setExtendRequestGoalId] = React.useState(null);
    const [deadlineExplanationData, setDeadlineExplanationData] =
        React.useState(null);
    const [resolveDeadlineExplanationData, setResolveDeadlineExplanationData] =
        React.useState(null);
    const [goalExtensionHistoryData, setGoalExtensionHistoryData] =
        React.useState(null);
    const [deadlineExplanationHistoryData, setDeadlineExplanationHistoryData] =
        React.useState(null);

    //pagination start
    // Number of items to display per page
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    const _pmGolas = React.useMemo(() => pmGoal, [pmGoal]);

    React.useEffect(() => {
        if (_.size(_pmGolas) === _.size(data)) {
            setSkipPageReset(true);
            _pmGolas && setData(_pmGolas);
        } else {
            _pmGolas && setData(_pmGolas);
        }
    }, [_pmGolas]);

    // clear skipPageReset
    React.useEffect(() => {
        if (skipPageReset) {
            setSkipPageReset(false);
        }
    }, [data]);

    // default columns
    const defaultColumns = React.useMemo(() => [...PmGoalsTableColumns]);

    // columns
    const [columns, setColumns] = React.useState([...defaultColumns]);

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );

    // columns orders
    React.useEffect(() => {
        if (value?.columnOrders) {
            setColumnOrder(value.columnOrders);
        }
    }, []);

    // history Api call
    const [getGoalExtensionHistory, { data: goalExtensionHistory }] =
        useLazyGetGoalExtensionHistoryQuery({
            refetchOnReconnect: true,
            refetchOnFocus: false,
        });

    const [getGoalExpiredHistory, { data: goalExpiredHistory }] =
        useLazyGetGoalExpiredHistoryQuery({
            refetchOnReconnect: true,
            refetchOnFocus: false,
        });

    // project extend images Api call
    const [getProjectExtendImages, { data: projectExtendImages }] =
        useLazyGetProjectExtendImagesQuery();

    // handle goal extension history Api call
    const handleGoalExtensionHistory = (goalExtensionHistoryId) => {
        setIsGoalExtensionHistoryLoading(true);
        getGoalExtensionHistory(goalExtensionHistoryId)
            .then(() => {
                setIsGoalExtensionHistoryLoading(false);
            })
            .catch(() => {
                setIsGoalExtensionHistoryLoading(false);
            })
            .finally(() => {
                setIsGoalExtensionHistoryLoading(false);
            });
    };

    // handle goal expired history Api call
    const handleGoalExpiredHistory = (goalExpiredHistoryId) => {
        setIsGoalExpiredHistoryLoading(true);
        getGoalExpiredHistory(goalExpiredHistoryId)
            .then(() => {
                setIsGoalExpiredHistoryLoading(false);
            })
            .catch(() => {
                setIsGoalExpiredHistoryLoading(false);
            })
            .finally(() => {
                setIsGoalExpiredHistoryLoading(false);
            });
    };

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
            extendReviewRequestClick: (row) => {
                refetchPmGoal();
                setReviewExtendRequestData(row);
                getProjectExtendImages(`?goal_id=${row.id}&uuid=${row.uuid}`);
                setIsOpenReviewExtendRequestModal(true);
            },
            extendRequestClick: (row) => {
                refetchPmGoal();
                setExtendRequestGoalId(row.id);
                setIsOpenExtendRequestModal(true);
            },
            deadlineExplainClick: (row) => {
                refetchPmGoal();
                setProjectPmGoalId(row.id);
                setDeadlineExplanationData(row);
                setIsOpenDeadlineExplainModal(true);
            },
            resolveExplainClick: (row) => {
                refetchPmGoal();
                setProjectPmGoalId(row.id);
                setIsOpenResolveModal(true);
                setResolveDeadlineExplanationData(row);
            },
            goalExtensionHistoryClick: (row) => {
                refetchPmGoal();
                setGoalExtensionHistoryData(row);
                setProjectPmGoalIdForExtension(row.id);
                setIsOpenGoalExtensionHistoryModal(true);
                handleGoalExtensionHistory(row.id);
            },
            deadlineExplanationHistoryClick: (row) => {
                refetchPmGoal();
                handleGoalExpiredHistory(row.id);
                setDeadlineExplanationHistoryData(row);
                setProjectPmGoalIdForExpired(row.id);
                setIsOpenDeadlineExplanationHistoryModal(true);
            },
        },
    });

    const handleCloseExtendReviewModal = () => {
        setIsOpenReviewExtendRequestModal(false);
        setReviewExtendRequestData(null);
    };

    const handleClosExtendRequestModal = () => {
        setIsOpenExtendRequestModal(false);
    };

    const handleCloseDeadlineExplainModal = () => {
        setIsOpenDeadlineExplainModal(false);
    };

    const handleCloseResolveModal = () => {
        setIsOpenResolveModal(false);
    };

    const handleCloseDeadlineExHistoryModal = () => {
        setIsOpenDeadlineExplanationHistoryModal(false);
    };

    const handleCloseExtensionHistoryModal = () => {
        setIsOpenGoalExtensionHistoryModal(false);
    };


    return (
        <React.Fragment>
            <div className="sp1_tasks_table_wrapper">
                <table className="sp1_tasks_table">
                    {/* Table Head */}
                    <thead className="sp1_tasks_thead">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="sp1_tasks_tr">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <DragableColumnHeader
                                            key={header.id}
                                            header={header}
                                            table={table}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* Table body */}
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
                                            }
                                ${row.original?.goal_status === 1
                                                ? style.goalMeat
                                                : row.original?.goal_status === 0 &&
                                                    new Date(
                                                        row.original?.goal_end_date
                                                    ) < new Date()
                                                    ? style.goalNotMeat
                                                    : ""
                                            }`}
                                        key={row.id}
                                    >
                                        {/* <tr
                                className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''} `}
                                    key={row.id}
                                > */}
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
                        {isLoading && (
                            <PmGoalsTableLoader prevItemLength={data?.length} />
                        )}
                    </tbody>
                </table>
                {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                    <EmptyTable />
                )}

                {/* */}
                {isOpenExtendRequestModal && (
                    <ExtendRequestModal
                        projectDetails={projectDetails}
                        extendRequestGoalId={extendRequestGoalId}
                        isOpen={isOpenExtendRequestModal}
                        refetchPmGoal={refetchPmGoal}
                        onClose={handleClosExtendRequestModal}
                    />
                )}
                {isOpenReviewExtendRequestModal && (
                    <ReviewExtendRequestModal
                        projectPmGoalId={projectPmGoalId}
                        projectDetails={projectDetails}
                        reviewExtendRequestData={reviewExtendRequestData}
                        projectExtendImages={projectExtendImages}
                        isOpen={isOpenReviewExtendRequestModal}
                        refetchPmGoal={refetchPmGoal}
                        onClose={handleCloseExtendReviewModal}
                    />
                )}
                {isOpenDeadlineExplainModal && (
                    <DeadlineExplainModal
                        projectPmGoalId={projectPmGoalId}
                        projectDetails={projectDetails}
                        refetchPmGoal={refetchPmGoal}
                        deadlineExplanationData={deadlineExplanationData}
                        isModalTwoOpen={isOpenDeadlineExplainModal}
                        closeModalTwo={handleCloseDeadlineExplainModal}
                    />
                )}
                {isOpenResolveModal && (
                    <ResolveModal
                        projectDetails={projectDetails}
                        projectPmGoalId={projectPmGoalId}
                        isModalOpen={isOpenResolveModal}
                        refetchPmGoal={refetchPmGoal}
                        resolveDeadlineExplanationData={
                            resolveDeadlineExplanationData
                        }
                        closeModal={handleCloseResolveModal}
                    />
                )}
                {isOpenGoalExtensionHistoryModal && (
                    <GoalExtensionHistoryModal
                        projectDetails={projectDetails}
                        goalExtensionHistoryData={goalExtensionHistoryData}
                        goalExtensionHistory={goalExtensionHistory}
                        isOpen={isOpenGoalExtensionHistoryModal}
                        refetchGoalExtensionHistory={() => {
                            handleGoalExtensionHistory(projectPmGoalIdForExtension);
                        }}
                        isLoading={isGoalExtensionHistoryLoading}
                        closeModal={handleCloseExtensionHistoryModal}
                    />
                )}
                {isOpenDeadlineExplanationHistoryModal && (
                    <DeadlineExplanationHistoryModal
                        projectDetails={projectDetails}
                        goalExpiredHistory={goalExpiredHistory}
                        isOpen={isOpenDeadlineExplanationHistoryModal}
                        refetchGoalExtensionHistory={() => {
                            handleGoalExpiredHistory(projectPmGoalIdForExpired);
                        }}
                        isLoading={isGoalExpiredHistoryLoading}
                        closeModal={handleCloseDeadlineExHistoryModal}
                    />
                )}
                <Toaster />
            </div>
            <ProjectStatusTablePagination
                currentPage={pageIndex + 1}
                perpageRow={pageSize}
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

export default PmGoalsTable;
