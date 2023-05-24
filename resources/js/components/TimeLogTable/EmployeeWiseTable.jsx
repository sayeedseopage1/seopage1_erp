import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { EmployeeWiseTableContext } from ".";
import "./table.css";
import { convertTime } from "./utils/converTime";
import Pagination from "./components/TablePagination";
import RenderWithImageAndRole from "./components/RenderCellWithImageAndRole";
import TimeLogTableFilterBar from "./components/TimeLogTableFilterBar";
import { useGetEmployeeWiseDataMutation } from "../services/api/timeLogTableApiSlice";

// pivot table
const EmployeeWiseTable = ({open,close, columns, subColumns }) => {
    
    const {
        setColumns,
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
    const [data, setData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({});
    const [loading, setLoading] = useState(true);


    const [getEmployeeWiseData, {isLoading: dataIsLoading }] = useGetEmployeeWiseDataMutation();
    

    // handle data request
    const handleDataRequest = async (filter, page, pagePageRow) => {
        
        setFilterOptions(filter);
        let data = {
            ...filter,
            page: page || currentPage,
            per_page_row: pagePageRow || nPageRows,
        }
        let res = await getEmployeeWiseData(data).unwrap();
        if(res) setData(res);            
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        handleDataRequest(filterOptions, page);
    }

    // handle per page row number change

    const handleParPageRowNumberChange = (n) => {
        setNPageRows(n);
        handleDataRequest(filterOptions, currentPage, Number(n));
    }

    useEffect(()=> {
        let timer = setTimeout(() => {
            setLoading(false);
        }, 1000)


        return () => clearTimeout(timer);
    }, []) 


    // get employee table data
    // useEffect(() => {
    //     if(data.length > 0) return;
    //     setLoading(true);
    //     const fetch = async () => {
    //         axios.get("/get-timelogs/employees").then((res) => {
    //             let data = res.data?.filter(d => d.project_status === 'in progress');
                
    //             if(data){
    //                 setData(data);
    //             }

    //             // setData(res.data);
    //             setLoading(false)
    //         });
    //     };
    //     fetch();
    //     return () => fetch();
    // }, []);

    

    // initial default 
    React.useEffect(() => {
        setSortConfig({ key: "employee_id", direction: "asc" });
        setSubColumns(subColumns);
        const columnOrderFromLocalStore = localStorage.getItem(
            "employeeWiseTableColumnOrder"
        );
        const filterColumnFromLocalStore = localStorage.getItem(
            "employeeWiseTableColumnFilter"
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
    }, []);

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
            key = "employee_id";
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
                            {/* <div onClick={() => requestSort("employee_id")}>
                                {sortConfig.key === "employee_id" ? (
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
                            </div> */}
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
        const sortedData = sort(data, sortConfig);
        const paginatedData = paginate(sortedData, currentPage, nPageRows);
        // if rows have same name then group all rows with same name in one row 
        // and show all project details in one row
        const groupedData = paginatedData.reduce((r, a) => {
            r[a.employee_id] = [...(r[a.employee_id] || []), a];
            return r;
        }, {});

        // console.log(groupedData)
        for (const [key, value] of Object.entries(groupedData)) {
            rows.push(
                <React.Fragment key={key}>
                    <tr key={key}>
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ borderBottom: "2px solid #AAD1FC" }}
                        >
                            <RenderWithImageAndRole
                                avatar={value[0].employee_image}
                                name={value[0].employee_name}
                                url={`employees/${value[0].employee_id}`}
                                role={value[0].employee_designation}
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
                                        column === "client_name" ? (
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
                                                    avatar={item['client_image']}
                                                    name={item['client_name']}
                                                    url={`clients/${item["client_id"]}`}
                                                    clientFrom={["client_from"]}
                                                />
                                            </td>

                                        ) : column === 'project_manager' ? (
                                            <td
                                                key={column}
                                                style={{ borderBottom: value.length - 1 === index ? "2px solid #AAD1FC" : "1px solid #E7EFFC" }}
                                            >
                                                <RenderWithImageAndRole
                                                    avatar={item["pm_image"]}
                                                    name={item["pm_name"]}
                                                    url={`employees/${item["pm_id"]}`}
                                                    role={item["pm_roles"]}
                                                />
                                            </td>

                                        ): column==='number_of_session' ? (
                                            <td
                                                key={column}
                                                
                                                style={{ borderBottom: value.length - 1 === index ? "2px solid #AAD1FC" : "1px solid #E7EFFC" }}
                                            >
                                                <ModalOpeningButton 
                                                    onClick={() => open(value[0].employee_id, item["project_id"])}
                                                    type="button"
                                                    aria-label="session_modal"
                                                >
                                                    {item[column]} 
                                                </ModalOpeningButton>
                                            </td>
                                        ) :  column === "total_minutes" ? (
                                            <td
                                                key={column}
                                                style={{ borderBottom: value.length - 1 === index ? "2px solid #AAD1FC" : "1px solid #E7EFFC" }}
                                            >
                                                {convertTime(item[column])}
                                            </td>
                                        ) : (
                                            <td
                                                key={column}
                                                style={{
                                                    borderBottom:
                                                        value.length - 1 ===
                                                            index ? "2px solid #AAD1FC" : "1px solid #E7EFFC"
                                                }}
                                            >
                                                <a
                                                    href={
                                                        column ===
                                                            "project_name"
                                                            ? `projects/${item["project_id"]}`
                                                            : column ===
                                                                "client_name"
                                                                ? `clients/${item["client_id"]}`
                                                                : column ===
                                                                    "project_manager"
                                                                    ? `employees/${item["pm_id"]}`
                                                                    : "#"
                                                    }
                                                >
                                                    {item[column]}
                                                </a>
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

    return (
        <TableContainer>
            <TimeLogTableFilterBar
                handleDataRequest = {handleDataRequest} 
            />
            {/* <ColumnFilter columns={columnOrder} filterColumn={filterColumn} 
            setFilterColumn={setFilterColumn} root={columnFilterButtonId} /> */}

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
                data={data}
                nPageRows={nPageRows}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                setNPageRows={handleParPageRowNumberChange}
            />
        </TableContainer>
    );
};
export default EmployeeWiseTable;


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
                    "employeeWiseTableColumnOrder",
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
            min-height: 120px;
            min-width: 250px;
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
const ModalOpeningButton = styled.button`
    background: transparent;
    padding: 10px;
    &:hover{
        color: #1d82f5;
        font-weight: 600;
    }
`

const EmployeeProfileTd = styled.td`
    background: #f8f8f8;
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



// drag and drop
// style when drag
const DragAbleTH = styled.th`
    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
    background: ${(props) => (props.isDragging ? "red" : "#fff")};} 
`;
