import React from "react";
import _ from "lodash";
import {
    useReactTable, getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender
  } from '@tanstack/react-table';
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
import style from "../styles/pmgoaltable.module.css"

const PmGoalsTable = ({ projectDetails, isLoading, isFetchingPmGoal, pmGoal, PmGoalsTableColumns, tableName, refetchPmGoal }) => {
    const [data, setData] = React.useState(pmGoal || []);
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [projectPmGoalId, setProjectPmGoalId] = React.useState(null);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [pmGoalExtendReason, setPmGoalExtendReason] = React.useState("");
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [value, setValue] = useLocalStorage(tableName);
    // modals state
    const [ isOpenDeadlineExplainModal,setIsOpenDeadlineExplainModal] = React.useState(false);
    const [isOpenExtendRequestModal, setIsOpenExtendRequestModal] = React.useState(false);
    const [isOpenResolveModal, setIsOpenResolveModal] = React.useState(false);
    const [isOpenReviewExtendRequestModal, setIsOpenReviewExtendRequestModal] = React.useState(false);
    const [isOpenGoalExtensionHistoryModal, setIsOpenGoalExtensionHistoryModal] = React.useState(false);
    const [isOpenDeadlineExplanationHistoryModal, setIsOpenDeadlineExplanationHistoryModal] = React.useState(false);

    // modals data
    const [reviewExtendRequestData, setReviewExtendRequestData] = React.useState(null);
    const [extendRequestGoalId, setExtendRequestGoalId] = React.useState(null);
    const [goalExtensionHistoryData, setGoalExtensionHistoryData] = React.useState(null)
    const [deadlineExplanationHistoryData, setDeadlineExplanationHistoryData] = React.useState(null)

    //pagination start
    // Number of items to display per page
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    const _pmGolas = React.useMemo(()=> pmGoal, [pmGoal]);

    React.useEffect(() => {
        if(_.size(_pmGolas) === _.size(data)){
          setSkipPageReset(true);
          _pmGolas && setData(_pmGolas)
        }else{
            _pmGolas && setData(_pmGolas);
        }
      }, [_pmGolas])

    // clear skipPageReset
    React.useEffect(() => {
        if(skipPageReset){
        setSkipPageReset(false);
        }
    }, [data])

    // default columns
    const defaultColumns = React.useMemo(() => [...PmGoalsTableColumns])

    // columns
    const [columns, setColumns] = React.useState([...defaultColumns]);  


    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id'));


    const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);


    // columns orders
    React.useEffect(() => {
        if(value?.columnOrders){
        setColumnOrder(value.columnOrders);
        }
    }, [])

     
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
        getSubRows: row => row.subtasks,
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
                setIsOpenReviewExtendRequestModal(true);
            },
            extendRequestClick: (row) => {
                refetchPmGoal();
                setExtendRequestGoalId(row.id)
                setIsOpenExtendRequestModal(true);
            },
            deadlineExplainClick: (row) => {
                refetchPmGoal();
                setProjectPmGoalId(row.id)
                setIsOpenDeadlineExplainModal(true);
            },
            resolveExplainClick: (row) => {
                refetchPmGoal();
                setProjectPmGoalId(row.id)
                setIsOpenResolveModal(true);
                setPmGoalExtendReason(row.reason);
            },
            goalExtensionHistoryClick: (row) => {
                refetchPmGoal();
                setGoalExtensionHistoryData(row);
                setIsOpenGoalExtensionHistoryModal(true);
            },
            deadlineExplanationHistoryClick: (row) => {
                refetchPmGoal();
                setDeadlineExplanationHistoryData(row);
                setIsOpenDeadlineExplanationHistoryModal(true);
            }
        }
    })


    const handleCloseExtendReviewModal = () => {
        setIsOpenReviewExtendRequestModal(false);
    };


    const handleClosExtendRequestModal = () => {
        setIsOpenExtendRequestModal(false);
    };

    const handleCloseDeadlineExplainModal = () => {
        setIsOpenDeadlineExplainModal(false);
    }

    const handleCloseResolveModal = () => {
        setIsOpenResolveModal(false);
    }

    const handleCloseDeadlineExHistoryModal = () => {
        setIsOpenDeadlineExplanationHistoryModal(false);
    }


    return (
        <div className="sp1_tasks_table_wrapper">
            <table className='sp1_tasks_table'>
                    {/* Table Head */}
                    <thead className="sp1_tasks_thead">
                            {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='sp1_tasks_tr'>
                                {headerGroup.headers.map(header => {
                                return <DragableColumnHeader key={header.id} header={header} table={table} />
                                })}
                            </tr>
                            ))}
                    </thead>
                    {/* Table body */}
                    <tbody className='sp1_tasks_tbody'>
                            {!isLoading && table.getRowModel().rows.map(row => {
                            return (
                                // <tr
                                // className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''} ${row.original?.goal_status === 0 ? style.goalMeat : ''}`}
                                //     key={row.id}
                                // >
                                <tr
                                className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''} `}
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                        <td key={cell.id} className='px-2 sp1_tasks_td'>
                                            
                                            { flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                                )
                                            }
                                        </td>
                                        )
                                    })}
                                </tr>
                            )
                            })}
                            {isLoading && <PmGoalsTableLoader prevItemLength={data?.length} />}
                    </tbody>
                </table>
                {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}


               {/* */}
                <ExtendRequestModal
                    projectDetails={projectDetails}
                    extendRequestGoalId={extendRequestGoalId}
                    isOpen={isOpenExtendRequestModal}
                    onClose={handleClosExtendRequestModal}
                />
                <ReviewExtendRequestModal
                     projectPmGoalId={projectPmGoalId}
                    projectDetails={projectDetails}
                    reviewExtendRequestData={reviewExtendRequestData}
                    isOpen={isOpenReviewExtendRequestModal}
                    refetchPmGoal={refetchPmGoal}
                    onClose={handleCloseExtendReviewModal}
                />
                <DeadlineExplainModal
                    projectPmGoalId={projectPmGoalId}
                    projectDetails={projectDetails}
                    refetchPmGoal={refetchPmGoal}
                    isModalTwoOpen={isOpenDeadlineExplainModal}
                    closeModalTwo={handleCloseDeadlineExplainModal}
                />
                <ResolveModal
                    projectDetails={projectDetails}
                    pmGoalExtendReason={pmGoalExtendReason}
                    projectPmGoalId={projectPmGoalId}
                    isModalOpen={isOpenResolveModal}
                    refetchPmGoal={refetchPmGoal}
                    closeModal={handleCloseResolveModal}
                />
                 <GoalExtensionHistoryModal 
                    projectDetails={projectDetails}
                    goalExtensionHistoryData={goalExtensionHistoryData}
                    isOpen={isOpenGoalExtensionHistoryModal}
                    refetchPmGoal={refetchPmGoal}
                    isLoading={isLoading}
                    closeModal={() => setIsOpenGoalExtensionHistoryModal(false)}
                 />   
                <DeadlineExplanationHistoryModal
                    projectDetails={projectDetails}
                    deadlineExplanationHistoryData={deadlineExplanationHistoryData}
                    isOpen={isOpenDeadlineExplanationHistoryModal}
                    refetchPmGoal={refetchPmGoal}
                    isLoading={isLoading}
                    closeModal={handleCloseDeadlineExHistoryModal}
                />
            <Toaster />
        </div>
    );
};

export default PmGoalsTable;


