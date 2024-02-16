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
import { useAuth } from "../../../hooks/useAuth";
import ResolveModal from "./ResolveModal";
import { useLocalStorage } from "react-use";
import PmGolasTableLoader from "../loader/PmGolasTableLoader";
import { DragableColumnHeader } from "../table/DragableColumnHeader";
import EmptyTable from "../../../global/EmptyTable";

const PmGoalsTableUpdate = ({ projectDetails, isLoading, isFetchingPmGoal, pmGoal, PmGoalsTableColumns, tableName }) => {
    const auth = useAuth();
    const [data, setData] = React.useState(pmGoal || []);
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [projectPmGoalId, setProjectPmGoalId] = React.useState(1);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [pmGoalExtendReason, setPmGoalExtendReason] = React.useState("");
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [value, setValue] = useLocalStorage(tableName);
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
    })

   
    
    return (
        <div className="sp1_tasks_table_wrapper">
            <table className='sp1_tasks_table'>
                    <thead className="sp1_tasks_thead">
                            {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='sp1_tasks_tr'>
                                {headerGroup.headers.map(header => {
                                return <DragableColumnHeader key={header.id} header={header} table={table} />
                                })}
                            </tr>
                            ))}
                    </thead>
                    <tbody className='sp1_tasks_tbody'>
                            {!isLoading && table.getRowModel().rows.map(row => {
                            return (
                                <tr
                                className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''}`}
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
                            {isLoading && <PmGolasTableLoader prevItemLength={data?.length} />}
                    </tbody>
                </table>
                {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}
            {/* <DeadlineExplainModal
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                isModalTwoOpen={isModalTwoOpen}
                closeModalTwo={closeModalTwo}
            />

            <ResolveModal
                pmGoalExtendReason={pmGoalExtendReason}
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                isModalThreeOpen={isModalThreeOpen}
                closeModalThree={closeModalThree}
            /> */}

            <Toaster />
        </div>
    );
};

export default PmGoalsTableUpdate;

// Table styles
const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
};

// Styles for table headers and cells
const thTdStyle = {
    textAlign: "center",

    padding: "8px",
};

// Style for table headers with background color
const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f2f2f2",
};
