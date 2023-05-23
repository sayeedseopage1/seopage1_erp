import React, { useEffect, useRef, useState, useMemo } from "react";
import _, { update } from "lodash";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import Modal from '../Insights/ui/Modal';
import "./table.css";
import { convertTime } from "./utils/converTime";
import Pagination from "./components/TablePagination";
import RenderWithImageAndRole from "./components/RenderCellWithImageAndRole";
import dayjs from "dayjs";

const cols =  [
    { key: "task_name", label: "Task Name" },
    { key: 'session_details', label: 'Session Details' }
]


const employeeWise = [
    { key: "session_duration", label: "Session Duration" },
    { key: "(TNT)_on_this_project", label: "(TTW) On This Project" },
    { key: "total_tracked_time(TD)", label: "Total Tracked Time (TD)" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "task_status", label: 'Task Status'}
]

const subColsProjectWise = [
    { key: "session_duration", label: "Session Duration" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "task_status", label: 'Task Status'}
]




// pivot table
const EmployeeWiseSessionTable = ({control}) => {
    const [columns, setColumns] = useState([...cols]);
    const [subColumns, setSubColumns] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [nPageRows, setNPageRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnOrder, setColumnOrder] = useState([]);
    const [filterColumn, setFilterColumn] = useState([]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const {isOpen, type:ModalType, projectID, employeeID} = control.employeeSessionModal;

    const close = () => control.setEmployeeSessionModal({
        isOpen: false,
        projectID: 0,
        employeeID: 0
    })


    // get employee table data
    useEffect(() => {
        if(data.length > 0) return;
        setLoading(true);
        const fetch = async () => {
            axios.get(`/account/time-log-report/${projectID}/${employeeID}`).then((res) => {
                let data = res.data;
                if(data){
                    setData(data);
                }

                // setData(res.data);
                setLoading(false)
            });
        };
        fetch();
        return () => fetch();
    }, []);

    React.useEffect(() => {
        ModalType === 'projectWise' ? setSubColumns([...subColsProjectWise]) :  setSubColumns([...employeeWise])
    }, [])

    // initial default 
    React.useEffect(() => {
        setSortConfig({ key: "task_id", direction: "asc" });
        const columnOrderFromLocalStore = localStorage.getItem(
            ModalType === 'projectWise' ? "projectWiseTableSessionColumnOrder" : "employeeWiseTableSessionColumnOrder"
        );
        const filterColumnFromLocalStore = localStorage.getItem(
            ModalType === 'projectWise' ? "projectWiseTableSessionColumnFilter" : "employeeWiseTableSessionColumnFilter"
            
        );

        if (columnOrderFromLocalStore) {
            setColumnOrder([...JSON.parse(columnOrderFromLocalStore)]);
        } else {
            console.log({subColumns})
            setColumnOrder([...subColumns.map((item) => item.key)]);
        }

        if (filterColumnFromLocalStore) {
            setFilterColumn([...JSON.parse(filterColumnFromLocalStore)]);
        } else {
            setFilterColumn([]);
        }
    }, [subColumns]);

    // pagination
    const paginate = (data, currentPage, nPaginate) => {
        if (data.length <= nPaginate) return data;
        const startIndex = (currentPage - 1) * nPaginate;
        return data.slice(startIndex, startIndex + nPaginate);
    };


    /*======================== SORT ========================*/
    const sort = (data, sortConfig) => {
        if (!sortConfig) {
            return data;
        }
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    };
    // SORT REQUEST
    const requestSort = (key) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "dec";
        } else if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "dec"
        ) {
            direction = "asc";
            key = "task_id";
        }
        setSortConfig({ key, direction });
    };

    /*======================== DRAG & DROP ========================*/
    // COLUMN DRAG & DROP

    /*======================== END DRAG & DROP ========================*/

    // prepare header
    const prepareHeader = () => {
        return (
            <tr style={{ borderBottom: "2px solid #AAD1FC" }}>
                {columns.map((column) => (
                    <th key={column.key} style={{ cursor: "default" }}>
                        <div>
                            {column.label}
                        </div>
                    </th>
                ))}


                {/* by column order */}
                {_.without(columnOrder, ...filterColumn).map((column) => (
                    <DragAbleHeader
                        key={column}
                        column={column}
                        sort={sortConfig}
                        columns={subColumns}
                        columnOrder={columnOrder}
                        setColumnOrder={setColumnOrder}
                        requestSort={requestSort}
                    />
                ))}
            </tr>
        );
    };

    // prepare rows
    const prepareRows = () => {
        const rows = [];
        let trackTime = 0;
        let tnt = 0;
        let task_id = 0;
        let rowSpan = 1;
        const sortedData = sort(data, sortConfig);
        const paginatedData = paginate(sortedData, currentPage, nPageRows);
        // if rows have same name then group all rows with same name in one row 
        // and show all project details in one row
        const groupedData = paginatedData.reduce((r, a) => {
            r[a.task_id] = [...(r[a.task_id] || []), a];
            return r;
        }, {});

        
        // get total session 
        const getSessionDetails = (id) => {
            let data = sortedData.filter(d => d['task_id'] === id)
            let len = data?.length || 0;

            return(
               <>
                    Total Session: {len < 10 ? `0${len}` : len} <br/>
                    Total Session Duration: <br />
                        {convertTime(data?.reduce((acc, curr) => 
                                acc + Number(curr['total_minutes']), 
                            0))}
                </>
            )
        }


        // console.log(groupedData)
        for (const [key, value] of Object.entries(groupedData)) {
            rows.push(
                <React.Fragment key={key}>
                    <tr key={key}>
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ 
                                borderBottom: "2px solid #AAD1FC",
                            }}
                        >
                           <span> 
                                <a href={`tasks/${value[0].task_id}`}>
                                    {value[0].task_name}
                                </a>
                            </span>
                        </EmployeeProfileTd>

                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ 
                                borderBottom: "2px solid #AAD1FC",
                                borderLeft: "2px solid #fff",
                                borderRight: "2px solid #fff"
                            }}
                        >
                           <span>  {getSessionDetails(value[0]?.task_id)} </span>
                        </EmployeeProfileTd>
                    </tr>

                    {value.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    {_.without(
                                        columnOrder,
                                        ...filterColumn
                                    ).map((column) => {
                                        if(column === 'session_duration'){
                                            return <td 
                                                 key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {convertTime(Number(item['total_minutes']))}
                                            </td>
                                        }else if(column === '(TNT)_on_this_project'){
                                            if(value[0].task_id !== task_id && tnt !== Number(item['project_total_time_log'])){
                                                task_id = value[0].task_id;
                                                rowSpan++;
                                                return <td 
                                                    key={column}
                                                    rowSpan={[...value.filter(v => v['project_total_time_log'])].length +1}
                                                    style={{
                                                            background: value.length === 1 ? "" : "#f9fbfd",
                                                            textAlign: value.length === 1 ? "" : 'center',
                                                            borderBottom:
                                                                value.length - 1 ===
                                                                    index
                                                                    ? "2px solid #AAD1FC"
                                                                    : "2px solid rgb(170, 209, 252)",
                                                        }}
                                                    >
                                                        {convertTime(Number(item['project_total_time_log']))}
                                                    </td> 
                                            } 
                                        }else if(column === 'total_tracked_time(TD)'){
                                            {trackTime += Number(item['total_minutes'])}
                                            return <td 
                                                 key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {trackTime === 0 ? convertTime(Number(item['total_minutes'])) :convertTime(trackTime)}
                                            </td>
                                        }else if(column === 'start_time'){
                                            return <td 
                                                 key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {dayjs(item['start_time']).format('hh:mm a')}
                                            </td>
                                        }else if(column === 'end_time'){
                                            return <td 
                                                 key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {dayjs(item['end_time']).format('hh:mm a')}
                                            </td>
                                        } else {
                                            return <td 
                                                 key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                <ProgressIndicator style={{background: item['tasks_color_code']}} />
                                                {item['tasks_status']}
                                            </td>
                                        }
                                    })}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            );
        }

        return rows;
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalContent>
                    <TableContainer>
                        {/* <ColumnFilter columns={columnOrder} filterColumn={filterColumn} 
                        setFilterColumn={setFilterColumn} root={columnFilterButtonId} /> */}

                        <TableWrapper>
                            {/* table */}
                            <table>
                                <thead>{prepareHeader()}</thead>
                                <tbody>
                                    {(!loading && data.length > 0) ?    
                                        prepareRows() 
                                    : null}
                                </tbody>
                            </table>
                        </TableWrapper>

                        {loading && data.length === 0 &&
                            <Loading> 
                                <div className="spinner-border" role="status"> </div>
                                Loading...
                            </Loading>
                        }

                        {!loading && data.length === 0 &&
                            <Loading> 
                                Data Not Found
                            </Loading>
                        }


                        <div className="mt-auto">
                        {/* pagination */}
                            <Pagination
                                data={data}
                                nPageRows={nPageRows}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setNPageRows={setNPageRows}
                            />

                            <CloseButton onClick={close} className="btn btn-sm btn-primary">
                                Close
                            </CloseButton>
                        </div>
                    </TableContainer>

                    
            </ModalContent>
        </Modal>
    );
};
export default EmployeeWiseSessionTable;


/* ========== DRAG ABLE COLUMN ============== */
const DragAbleHeader = ({
    column,
    sort,
    columns,
    columnOrder,
    setColumnOrder,
    requestSort,
}) => {
    const ref = useRef(null);

    const reOrder = (curr, target) => {
        columnOrder.splice(
            columnOrder.indexOf(target),
            0,
            columnOrder.splice(columnOrder.indexOf(curr), 1)[0]
        );

        return [...columnOrder];
    };

    const [{ isDragging }, drag] = useDrag({
        type: "column",
        item: { column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // drop
    const [{ isOver }, drop] = useDrop({
        accept: "column",
        hover(item, monitor) {
            const dragIndex = columnOrder.indexOf(item.column);
            const hoverIndex = columnOrder.indexOf(column);
        },

        drop: (item, monitor) => {
            if (item.column !== column) {
                const reOrderColumn = reOrder(item.column, column);
                setColumnOrder(reOrderColumn);
                localStorage.setItem(
                     ModalType === 'projectWise' ? "projectWiseTableSessionColumnOrder" : "employeeWiseTableSessionColumnOrder",
                    JSON.stringify(reOrderColumn)
                );
            }
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    drag(drop(ref));

    return (
        <th
            key={column}
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1,
                background: isOver ? "rgb(0 0 0 / 5%)" : "",
            }}
        >
            <div>
                <div onClick={() => requestSort(column)}>
                    {sort.key === column ? (
                        sort.direction === "asc" ? (
                            <span className="table_asc_dec asc"></span>
                        ) : (
                            <span className="table_asc_dec dec"></span>
                        )
                    ) : (
                        <span className="table_asc_dec"></span>
                    )}
                </div>
                <div style={{ position: "relative" }}>
                    {columns.find((item) => item.key === column)?.label}
                </div>
            </div>
        </th>
    );
};

// column filter dropdown
const ColumnFilter = ({ columns, filterColumn, setFilterColumn, root }) => {
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef(null);

    // outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef]);

    // handle toggle
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // handle filter
    const handleFilter = (e) => {
        if (e.target.checked) {
            setFilterColumn(
                filterColumn.filter((item) => item !== e.target.value)
            );
        } else {
            setFilterColumn([...filterColumn, e.target.value]);
        }
    };

    // handle all filter
    const handleAllFilter = (e) => {
        if (e.target.checked) {
            setFilterColumn([]);
        } else {
            setFilterColumn(columns);
        }
    };

    let content = (
        <ColumnFilterWrapper ref={filterRef}>
            <ColumnFilterButton onClick={handleToggle}>
                Column Filter
            </ColumnFilterButton>
            {isOpen && (
                <ColumnFilterDropdown>
                    {/* select all */}
                    <ColumnFilterCheckbox>
                        <input
                            type="checkbox"
                            id="all"
                            checked={filterColumn.length === 0}
                            value="all"
                            onChange={handleAllFilter}
                        />
                        <label htmlFor="all">Select All</label>
                    </ColumnFilterCheckbox>

                    {columns.map((column) => (
                        <ColumnFilterCheckbox key={column}>
                            <input
                                type="checkbox"
                                checked={!filterColumn.includes(column)}
                                id={column}
                                value={column}
                                onChange={handleFilter}
                            />
                            <label htmlFor={column}>
                                {_.startCase(column)}
                            </label>
                        </ColumnFilterCheckbox>
                    ))}
                </ColumnFilterDropdown>
            )}
        </ColumnFilterWrapper>
    );

    return content;
};





// ========= styled ============
const ModalContent = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const TableContainer = styled.div`
    width: 90%;
    height: 90%;
    overflow: hidden;
    border-radius: 20px;
    background: #fff;
    padding: 16px;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: space-between;
`;

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    max-width: 100%;
    max-height: 80%;
    overflow: auto;
    border-radius: 16px;
    table {
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 14px;
        color: #1d82f5;
        tr {
            &:hover {
                background-color: #f9fbfd;
            }
        }
        th {
            background-color: #fff;
            padding: 16px 10px;
            text-align: left;
            font-weight: 500;
            white-space: nowrap;
            min-width: 120px;
            cursor: move;
            border-bottom: 2px solid #aad1fc;
            color: #444;
            text-align: center;
            div {
                display: flex;
                align-items: center;
                gap: 5px;
                white-space: nowrap;
            }
        }
        td {
            text-align: left;
            padding: 16px 10px;
            min-height: 120px;
            min-width: 200px;
            max-width: 350px;
            border-bottom: 1px solid #e7effc;
        }
    }
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        button {
            padding: 10px;
            margin: 0 10px;
            border: none;
            background-color: #f2f2f2;
            cursor: pointer;
        }
    }
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    font-size: 16px;
    & > div.spinner-border{
        width: 16px;
        height: 16px;
        border-width: .16em;
        margin-right: 10px;
    }
`


const EmployeeProfileTd = styled.td`
    background: #f9fbfd;
    text-align: left;
    &:hover: {
        background: #f8f8f8;
    }
`;

// column Filter
const ColumnFilterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    position: relative;
`;

const ColumnFilterButton = styled.button`
    padding: 6px;
    font-size: 12px;
    border-radius: 5px;
    border: 1px solid #eaf0f7;
    color: #000;
    background: #fff;
    position: relative;
    cursor: pointer;
`;

const ColumnFilterDropdown = styled.div`
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    min-width: fit-content;
    background: #fff;
    border: 1px solid #eaf0f7;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
`;

const ColumnFilterCheckbox = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 10px 0;
    input {
        cursor: pointer;
    }
    label {
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
    }
`;

const CloseButton = styled.button`
    float: right;
    margin: 10px;
    margin-top: auto;
`;


// drag and drop
// style when drag
const DragAbleTH = styled.th`
    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
    background: ${(props) => (props.isDragging ? "red" : "#fff")};} 
`;


const ProgressIndicator = styled.span`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
`