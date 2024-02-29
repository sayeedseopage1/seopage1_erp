import React from "react";
import { 
  flexRender,
  getCoreRowModel, 
  getExpandedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useReactTable} 
from "@tanstack/react-table";
import { DragableColumnHeader } from "../table/DragableColumnHeader";
import PercentageofGoalsMetTableLoader from "../loader/PercentageofGoalsMetTableLoader";
import EmptyTable from "../../../global/EmptyTable";
import { useLocalStorage } from "react-use";
import Toaster from "../../../global/Toaster";

const PercentageofGoalsMetTable = ({percentageOfGoalsMet,tableColumns, projectDetails,closeModal, tableName, isLoading}) => {
  const [data, setData] = React.useState(percentageOfGoalsMet || []);
  const [value, setValue] = useLocalStorage(tableName);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [expanded, setExpanded] = React.useState({});
  const _percentageOfGoalsMet = React.useMemo(()=> percentageOfGoalsMet, [percentageOfGoalsMet]);

  React.useEffect(() => {
        if(_.size(_percentageOfGoalsMet) === _.size(data)){
          setSkipPageReset(true);
          _percentageOfGoalsMet && setData(_percentageOfGoalsMet)
        }else{
            _percentageOfGoalsMet && setData(_percentageOfGoalsMet);
        }
      }, [_percentageOfGoalsMet])

    // clear skipPageReset
    React.useEffect(() => {
        if(skipPageReset){
        setSkipPageReset(false);
        }
    }, [data])

    // default columns
    const defaultColumns = React.useMemo(() => [...tableColumns])

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
                            {isLoading && <PercentageofGoalsMetTableLoader prevItemLength={data?.length} />}
                    </tbody>
                </table>
                {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}
            <Toaster />
    </div>
  )
}

export default PercentageofGoalsMetTable