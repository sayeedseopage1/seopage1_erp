import React, {useState, useEffect, useCallback} from "react";
import TableFooter from "./TableFooter";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import ReportResolvePreviewModal from "./ReportResolvePreviewModal";
import TableDragAbleHeader from "./DragHeader";


const columns = [
    {
        id: 'serial_number',
        header: 'SL. No.',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Serial Number</span> 
    },
    {
        id: 'date',
        header: 'Date',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Date</span> 
    },
    {
        id: 'duration',
        header: 'Duration',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Duration</span> 
    },
    {
        id: 'task',
        header: 'Task',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Task</span> 
    },
    {
        id: 'client',
        header: 'Client',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Client</span> 
    },
    {
        id: 'project',
        header: 'Project',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Project</span> 
    },
    {
        id: 'reason',
        header: 'Reason',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Reason</span> 
    },
    {
        id: 'explanation_from_employee',
        header: 'Explanation From Employee',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Explanation From Employee</span> 
    },
    {
        id: 'action',
        header: 'Action',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => (
            <ReportResolvePreviewModal row={row} />
        ) 
    }
]



const TimeLogHIstoryModalTable = ({ row, isOpen, close }) => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([{id:'demo'}, {id:'demo2'}]);
    const [sortConfig, setSortConfig] = useState([]);
    const [columnOrder, setColumnOrder] = useState([]);


    // handle data
    const handleData = useCallback((data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        setRenderData([...paginated]);
    }, [data, currentPage, perPageData]);

    // data sort handle 
    const handleSorting = (sort) => {
        const sortData = orderBy(data, ...sort);
        handleData(sortData, currentPage, perPageData);
    }

    // handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page);
        handleData(data, page, perPageData);
    }

    // handle par page data change
    const handlePerPageData=(number)=>{
        setParPageData(number);
        handleData(data, currentPage, number);
    }


    // get columns keys
    useEffect(() => {
        const column_ids = _.map(columns, "id");
        setColumnOrder([...column_ids]);
    }, []);

    const _columns = _.sortBy(columns, (item) =>
        _.indexOf(columnOrder, item.id)
    );



    return (
        <React.Fragment>
            <div className="p-3">
                <div className="position-relative sp1_tlr_tbl_wrapper" style={{maxHeight: '80vh'}}>
                    <table className="sp1_tlr_table">
                        <thead className="sp1_tlr_thead">
                            <tr className="sp1_tlr_tr">
                                {_.map(_columns, (column) => {
                                    return ( 
                                        <TableDragAbleHeader
                                            key={column.id}
                                            className="sp1_tlr_th"
                                            column={column}
                                            columns = {_columns}
                                            onSort={() => {}}
                                            onDrop={setColumnOrder}
                                            order={columnOrder}
                                            tableName="time_log_history_modal"
                                        />
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="sp1_tlr_tbody">
                            {(_.size(renderData) > 0) &&
                                _.map(renderData, (row) => (
                                    <tr key={row.id} className="sp1_tlr_tr">
                                        {_.map(_columns, (col) => (
                                            <td key={col.id} className="sp1_tlr_td">
                                                {col.cell(row)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <TableFooter
                    onPaginate={handlePagination}
                    perpageData={perPageData}
                    totalEntry={_.size(data)}
                    currentPage={currentPage}
                    handlePerPageData={handlePerPageData}
                />
            </div>
        </React.Fragment>
    );
};

export default TimeLogHIstoryModalTable;
