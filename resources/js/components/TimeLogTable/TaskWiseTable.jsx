import React, { useEffect, useRef, useState, useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { EmployeeWiseTableContext } from ".";
import "./table.css";
import { convertTime } from "./utils/converTime";
import dayjs from "dayjs";
import Pagination from "./components/TablePagination";
import RenderWithImageAndRole from "./components/RenderCellWithImageAndRole";
import TimeLogTableFilterBar from "./components/TimeLogTableFilterBar";
import { useGetTaskWiseDataMutation } from "../services/api/timeLogTableApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTaskWiseTableData } from "../services/features/taskWiseTableDataSlice";

// pivot table
const TaskWiseTable = ({ columns, subColumns }) => {
    const { data: preFetchData} = useSelector(s => s.taskWiseDataTable);
    const dispatch = useDispatch();

    const {
        setSubColumns,
        sortConfig,
        setSortConfig,
        nPageRows,
        setNPageRows,
        currentPage,
        setCurrentPage,
        columnOrder,
        setColumnOrder,
        filterColumn,
        setFilterColumn,
    } = React.useContext(EmployeeWiseTableContext);

    const [data, setData] = useState([...preFetchData]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState({});
    const [totalRows, setTotalRows] = useState(0);

    const [getTaskWiseData, {isLoading: dataIsLoading}] = useGetTaskWiseDataMutation();

   // handle data request
   const handleDataRequest = async (filter) => {
    setFilterOptions(filter); 
    const {
        client_id,
        employee_id,
        end_date,
        start_date,
        pm_id
    } =  filter;

    let filteredData = [...preFetchData];

    if(employee_id){ filteredData = filteredData.filter(d => Number(d.employee_id) === Number(employee_id))}
    if(pm_id){  filteredData = filteredData.filter(d => Number(d.pm_id) === Number(pm_id))}
    if(client_id){ filteredData = filteredData.filter(d => Number(d.client_id) === Number(client_id))}

    setData([...filteredData]);
    setTotalRows(filteredData.length);
}

    // useEffect(()=> { 
    //     if(!preFetchData.length && !dataIsLoading){
    //         (async () => {
    //             let res = await getTaskWiseData({}).unwrap();
    //             if(res) {
    //                 dispatch(setTaskWiseTableData(res?.data))
    //                 // setAllData(res?.data); 
    //                 setData(res?.data);
    //                 setTotalRows(res?.data?.length);
    //             }  
    //         })();
    //     }
    // }, [])

    const handleTimeFilter = async(d) => {  
        let res = await getTaskWiseData(d).unwrap();
  
        if(res) {
            dispatch(setTaskWiseTableData(res?.data || []))
            setData(res?.data);
            setTotalRows(res?.data?.length);
        }  
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
        // handleDataRequest(filterOptions, page);
    }

    // handle per page row number change

    const handleParPageRowNumberChange = (n) => {
        setNPageRows(n);
        // handleDataRequest(filterOptions, currentPage, Number(n));
    }

    useEffect(()=> {
        let timer = setTimeout(() => {
            setLoading(false);
        }, 1000)
 
        return () => clearTimeout(timer);
    }, []) 


    // // get employee table data
    // useEffect(() => {
    //     if(data.length > 0) return;
    //     setLoading(true);
    //     const fetch = async () => {
    //         axios.get("/get-timelogs/tasks").then((res) => {
    //             let data = res.data.filter(d => d.project_status === 'in progress');
    //             if(data){
    //                 setData(data.sort((a, b) => a["project_id"] < b["project-id"]));
    //             }
    //             setLoading(false)
    //         });
    //     };

    //     fetch();

    //     return () => fetch();
    // }, []);

    /* ================ Initial State ==================== */
    React.useEffect(() => {
        setSubColumns(subColumns);
        setCurrentPage(1);
        setSortConfig({ key: "task_id", direction: "dec" });
        const columnOrderFromLocalStore = localStorage.getItem(
            "taskWiseTableColumnOrder"
        );
        const filterColumnFromLocalStore = localStorage.getItem(
            "taskWiseTableColumnFilter"
        );

        if (columnOrderFromLocalStore) {
            setColumnOrder([...JSON.parse(columnOrderFromLocalStore)]);
        } else {
            setColumnOrder([...subColumns.map((item) => item.key)]);
        }

        if (filterColumnFromLocalStore) {
            setFilterColumn([...JSON.parse(filterColumnFromLocalStore)]);
        } else {
            setFilterColumn([]);
        }
    }, [columns, subColumns]);
    /* ================ End Initial State ==================== */

    /*================== Pagination =====================*/
    const paginate = (data, currentPage, nPaginate) => {
        if (data.length <= nPaginate) return data;
        const startIndex = (currentPage - 1) * nPaginate;
        return data.slice(startIndex, startIndex + nPaginate);
    };
    /*================== End Pagination =====================*/

    // column filter
    const requestColumnFilter = (key) => {
        if (typeof key === "string") {
            const index = columnOrder.indexOf(key);
            if (index > -1) {
                columnOrder.splice(index, 1);
            } else {
                columnOrder.push(key);
            }
            setColumnOrder([...columnOrder]);
        } else {
            setColumnOrder(key);
        }
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

    /*======================== End SORT ========================*/

    // prepare header
    const prepareHeader = () => {
        return (
            <tr style={{ borderBottom: "2px solid #AAD1FC" }}>
                {columns.map((column) => (
                    <th key={column.key} style={{ cursor: "default" }}>
                        <div>
                            <div onClick={() => requestSort(column.key)}>
                                {sortConfig.key === column.key ? (
                                    sortConfig.direction === "asc" ? (
                                        <>
                                            <span className="table_asc_dec asc"></span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="table_asc_dec dec"></span>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <span className="table_asc_dec"></span>
                                    </>
                                )}
                            </div>
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

    /* =============== PREPARE ROWS =================== */
    const prepareRows = () => {
        const rows = [];
        const sortedData = sort(data, sortConfig);
        const paginatedData = paginate(sortedData, currentPage, nPageRows);

        /* =============== Data group by Project ID =================== */
        const groupedData = paginatedData.reduce((r, a) => {
            r[a.task_id] = [...(r[a.task_id] || []), a];
            return r;
        }, {});
        /* ================ End Data Grouping ================== */

        for (const [key, value] of Object.entries(groupedData)) {
            rows.push(
                <React.Fragment key={key}>
                    <tr key={key}>
                        {/* task name */}
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ borderBottom: "2px solid #AAD1FC", minWidth:'300px' }}
                        >
                            <EmployeeProfile>
                                <EmployeeProfileName>
                                    <span>
                                        <a href={`tasks/${value[0].task_id}`}>
                                            {value[0].task_name}
                                        </a>
                                    </span>
                                </EmployeeProfileName>
                            </EmployeeProfile>
                        </EmployeeProfileTd>
                        {/* project name */}
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{
                                borderBottom: "2px solid #AAD1FC",
                                borderLeft: "2px solid #fff",
                                borderRight: "2px solid #fff",
                                minWidth: '300px'
                            }}
                        >
                            <EmployeeProfile>
                                <EmployeeProfileName>
                                    <span>
                                        <a href={`projects/${value[0].project_id}`}>
                                            {value[0].project_name}
                                        </a>
                                    </span>
                                </EmployeeProfileName>
                            </EmployeeProfile>
                        </EmployeeProfileTd>

                        {/* client */}
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{
                                borderBottom: "2px solid #AAD1FC",
                                borderLeft: "2px solid #fff",
                                borderRight: "2px solid #fff",
                                minWidth: '200px'
                            }}
                        >
                            <RenderWithImageAndRole
                                avatar={value[0].client_image}
                                name={value[0].client_name}
                                url={`clients/${value[0].client_id}`}
                                clientFrom={value[0].client_from}
                            />

                        </EmployeeProfileTd>

                        {/* Project Manager */}
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ borderBottom: "2px solid #AAD1FC", 
                            minWidth: '200px'}}
                        >
                            <RenderWithImageAndRole
                                avatar={value[0].pm_image}
                                name={value[0].pm_name}
                                url={`employees/${value[0].pm_id}`}
                                role={value[0].pm_roles}
                            />
                        </EmployeeProfileTd>
                    </tr>

                    {value.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    {_.without(
                                        columnOrder,
                                        ...filterColumn
                                    ).map((column) =>
                                        column === "employee_name" ? (
                                            <td
                                                key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index
                                                            ? "2px solid #AAD1FC"
                                                            : "1px solid #E7EFFC",
                                                }}
                                            >
                                                <RenderWithImageAndRole
                                                    avatar={item["employee_image"]}
                                                    name={item[column]}
                                                    url={`employees/${item["employee_id"]}`}
                                                    role={item["employee_roles"]}
                                                />
                                                
                                            </td>
                                        ) : column === "total_minutes" ? (
                                            <td
                                                key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 === index ? "2px solid #AAD1FC" : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {convertTime(item[column])}
                                            </td>
                                        ) : column === "task_start" ? (
                                            <td
                                                key={column}
                                                style={{ borderBottom: 
                                                    value.length - 1 ===  index? "2px solid #AAD1FC" : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {item['start_time'] ? dayjs(
                                                    item["start_time"]
                                                ).format("hh:mm A"): <span>No start date</span>}
                                            </td>
                                        ) : column === "task_end" ? (
                                            <td
                                                key={column}
                                                style={{
                                                    borderBottom: value.length - 1 ===
                                                            index ? "2px solid #AAD1FC" : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {item["end_time"] ? dayjs(item["end_time"]).format(
                                                    "hh:mm A"
                                                ):<span>No end date</span>}
                                            </td>
                                        ) : (
                                            <td
                                                key={column}
                                                style={{
                                                    borderBottom:  value.length - 1 ===  index  
                                                        ? "2px solid #AAD1FC" : "1px solid #E7EFFC",
                                                }}
                                            >
                                                {item[column]}
                                            </td>
                                        )
                                    )}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            );
        }

        return rows;
    };
    /* =============== END PREPARE ROWS =================== */

    return (
        <TableContainer>
            <TimeLogTableFilterBar
                handleDataRequest = {handleDataRequest} 
                handleTimeFilter={handleTimeFilter}
            /> 
            <TableWrapper>
                {/* table */}
                <table>
                    <thead>{prepareHeader()}</thead>
                    <tbody>
                        {(!loading && !dataIsLoading && data.length > 0) ?    
                            prepareRows() 
                        : null}
                    </tbody>
                </table>
            </TableWrapper>

            {(loading || dataIsLoading) &&
                <Loading> 
                    <div className="spinner-border" role="status"> </div>
                    Loading...
                </Loading>
            }
            
            {!loading && !dataIsLoading && !data.length &&
                <Loading> 
                    Data Not Found
                </Loading>
            }

            {/* pagination */}
            <Pagination
                totalRows={totalRows}
                nPageRows={nPageRows}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                setNPageRows={handleParPageRowNumberChange}
            />
        </TableContainer>
    );
};
export default TaskWiseTable;

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
                    "taskWiseTableColumnOrder",
                    JSON.stringify(reOrderColumn)
                );
            }
        },
    });

    drag(drop(ref));

    return (
        <th key={column} ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
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
const TableContainer = styled.div`
    max-width: 100%;
    overflow: hidden;
`;

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    overflow-x: auto;
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
            font-weight: normal;
            white-space: nowrap;
            min-width: 120px;
            cursor: move;
            border-bottom: 2px solid #aad1fc;
            div {
                display: flex;
                align-items: center;
                gap: 5px;
                white-space: nowrap;
            }
        }
        td {
            padding: 16px 10px;
            text-align: left;
            min-height: 100%;
            min-width: 100px;
            height: 100%;
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
    background: #f8f8f8;
    &:hover: {
        background: #f8f8f8;
    }
`;
const EmployeeProfile = styled.div`
    display: flex;
    align-items: center;
`;

const EmployeeProfileName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
    span {
        font-size: 12px;
        font-weight: 500;
        color: #000;
        &.white-space {
            white-space: nowrap;
        }
        &:first-child {
            font-size: 14px;
            font-weight: 600;
            color: #1d82f5;
        }
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

const LoadingCell = styled.td`
    min-height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #000;
`

// drag and drop
// style when drag
const DragAbleTH = styled.th`
    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
    background: ${(props) => (props.isDragging ? "red" : "#fff")};} 
`;
