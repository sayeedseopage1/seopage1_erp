import React, {useState, useEffect, useCallback} from "react";
import TableFooter from "./TableFooter";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import ReportResolvePreviewModal from "./ReportResolvePreviewModal";
import TableDragAbleHeader from "./DragHeader";
import { useLazyGetTimeLogHistoryDetailsQuery } from "../../services/api/timeLogTableApiSlice";
import dayjs from "dayjs";
import { User } from "../../utils/user-details";

import { useSelector } from "react-redux";
import EmptyTable from "./EmptyTable";
import { Placeholder } from "../../global/Placeholder";
import { useLocalStorage } from "react-use";


const columns = [
    {
        id: 'serial_number',
        header: 'SL. No.',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) =>{
            let rendom = Math.random(8).toString(36).substring(7);
            return <span>{rendom.toUpperCase()}-{row?.id}</span> 
        } 
    },
    {
        id: 'date',
        header: 'Date',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>{dayjs(row?.created_at).format('MMM DD, YYYY')}</span> 
    },
    {
        id: 'duration',
        header: 'Duration',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => {
            const duration = row?.durations ? JSON.parse(row?.durations) : null;
            return(
                <div style={{minWidth: '150px'}}>
                    {duration && 
                        <table>
                            <thead>
                                <tr>
                                    <th className="pr-2">From</th>
                                    <th className="pr-2">To</th>
                                </tr>
                            </thead> 
                            <tbody> 
                                {duration && _.map(duration, item => (
                                    <tr key={item?.id}>
                                        <td className="pr-2">{item?.start}</td>
                                        <td className="pr-2">{item?.end}</td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    }

                    {
                        (row?.transition_hours || row?.transition_minutes) && 
                        <div>
                            {row?.transition_hours} Hours {row?.transition_minutes} Minutes
                        </div> 
                    }
                </div>
            )
        } 
    },
    {
        id: 'task',
        header: 'Task',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>{row?.forgot_to_track_task_id ? 
            <a href={`/account/tasks/${row?.forgot_to_track_task_id}`}>{row?.forget_task_heading}</a>
            : <span className="text-danger">Not Applicable</span>}</span> 
    },
    {
        id: 'client',
        header: 'Client',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) =>{ 
            const client = row?.client;
            return(
                <span>{client ? 
                    <a href={client?.getUserLink()}>{client?.getName()}</a>
                    : <span className="text-danger">Not Applicable</span>}</span> 
            )
        } 
    },
    {
        id: 'project',
        header: 'Project',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>{row?.related_to_any_project ? 
            <a href={`/account/projects/${row?.related_to_any_project}`}>{row?.project_name}</a>
            : <span className="text-danger">Not Applicable</span>}</span> 
    },
    {
        id: 'reason',
        header: 'Reason',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <div>{row?.reason_for_less_tracked_hours_a_day_task}</div> 
    },
    {
        id: 'explanation_from_employee',
        header: 'Explanation From Employee',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => {
            return(
                <div>
                   {row?.child_reason && <div><strong>Reason </strong>{row?.child_reason}</div>}
                   <div dangerouslySetInnerHTML={{__html: row?.comment}}/>
                </div>
            )
        } 
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
    },
    {
        id: 'managements_comment',
        header: "Top Management Comment",
        sorted: false,
        cell: () => {
            return (
                <quote>No commnet yet!</quote>
            )
        }
    }
]



const TimeLogHIstoryModalTable = ({ row, filter, tableName }) => {
    const [data, setData] = useState([]);
    const { users, usersObject } = useSelector(s => s.users);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([]);
    const [sortConfig, setSortConfig] = useState([]);
    const [columnOrder, setColumnOrder] = useState([]);

    const [value, setValue] = useLocalStorage(tableName);
    

    const [
        getTimeLogHistoryDetails,
        {isFetching}
    ] = useLazyGetTimeLogHistoryDetailsQuery();

    // handle data
    const handleData = useCallback((data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        setRenderData([...paginated]);
    }, [data, currentPage, perPageData]);


    useEffect(() => {
        getTimeLogHistoryDetails(`${row?.employee_id}?start_date=${filter?.start_date}&end_data=${filter?.end_date}`)
        .unwrap()
        .then(res => {
            const sortedData = _.orderBy(res, ["id"], ["desc"]);
            handleData(sortedData, currentPage, perPageData);
            setData(sortedData);
            setCurrentPage(1); 
        })
        .catch(err => console.log(err))
    }, [])


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
        if(value?.columnOrders){
            setColumnOrder(value?.columnOrders);
        }else{
            const column_ids = _.map(columns, "id");
            setColumnOrder([...column_ids]);
        }
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
                                            tableName={tableName}
                                            storeOnLocalStore={(columns) => setValue({...value, columnOrders: columns})}
                                        />
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="sp1_tlr_tbody">
                            {isFetching && _.times(10, item => (
                                <tr key={item} className="sp1_tlr_tr">
                                {_.map(_columns, (col) => (
                                    <td key={col.id} className="sp1_tlr_td">
                                        <Placeholder height={14} />
                                    </td>
                                ))}
                            </tr>
                            ))}

                            {!isFetching && _.size(renderData) > 0 &&
                                _.map(renderData, (row) => {
                                    let data = {
                                        ...row,
                                        client: usersObject && row?.client_id && new User(usersObject[row?.client_id]),
                                        responsiblePerson: usersObject && row?.responsible_person_id && new User(usersObject[row?.responsible_person_id]),
                                        user: usersObject && new User(usersObject[row?.user_id]),
                                    }
                                    return (
                                        <tr key={row.id} className="sp1_tlr_tr">
                                            {_.map(_columns, (col) => (
                                                <td key={col.id} className="sp1_tlr_td">
                                                    {col.cell(data)}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>

                {!isFetching && _.size(data) === 0 && (
                    <EmptyTable colSpan={_.size(_columns)} />
                )}

                {!isFetching && _.size(data) > 0 && 
                    <TableFooter
                        onPaginate={handlePagination}
                        perpageData={perPageData}
                        totalEntry={_.size(data)}
                        currentPage={currentPage}
                        handlePerPageData={handlePerPageData}
                    />
                }
            </div>
        </React.Fragment>
    );
};

export default TimeLogHIstoryModalTable;
