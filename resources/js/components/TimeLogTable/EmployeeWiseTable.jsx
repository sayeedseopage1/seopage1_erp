import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import _, { update } from 'lodash';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop, useDragLayer } from 'react-dnd';
import { EmployeeWiseTableContext } from '.';
import './table.css'


// pivot table
const EmployeeWiseTable = ({ data, columns, subColumns }) => {

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
        setFilterColumn
    } = React.useContext(EmployeeWiseTableContext);

    React.useEffect(() => {
        setSubColumns(subColumns)
        const columnOrderFromLocalStore = localStorage.getItem('employeeWiseTableColumnOrder');
        const filterColumnFromLocalStore = localStorage.getItem('employeeWiseTableColumnFilter');

        if (columnOrderFromLocalStore) {
            setColumnOrder([...JSON.parse(columnOrderFromLocalStore)])
        } else {
            setColumnOrder([...subColumns.map((item) => item.key)])
        }

        if (filterColumnFromLocalStore) {
            setFilterColumn([...JSON.parse(filterColumnFromLocalStore)]);
        } else {
            setFilterColumn([])
        }
    }, [])

    // pagination
    const paginate = (data, currentPage, nPaginate) => {
        if (data.length <= nPaginate) return data;
        const startIndex = (currentPage - 1) * nPaginate;
        return data.slice(startIndex, startIndex + nPaginate);
    };

    // column filter
    const requestColumnFilter = (key) => {
        if (typeof key === 'string') {
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
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };
    // SORT REQUEST
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'dec';
        }
        setSortConfig({ key, direction });
    };

    /*======================== DRAG & DROP ========================*/
    // COLUMN DRAG & DROP

    /*======================== END DRAG & DROP ========================*/

    // prepare header
    const prepareHeader = () => {
        return (
            <tr style={{ borderBottom: '2px solid #AAD1FC' }}>
                {columns.map((column) => (
                    <th key={column.key} style={{ cursor: 'default' }}>
                        <div>
                            <div onClick={() => requestSort(column.key)}>

                                {
                                    sortConfig.key === column.key ? (
                                        sortConfig.direction === 'asc' ? <>
                                            <span className="table_asc_dec asc" ></span>
                                        </> : <>
                                            <span className="table_asc_dec dec" ></span>
                                        </>

                                    ) : (
                                        <>
                                            <span className="table_asc_dec"></span>
                                        </>
                                    )
                                }
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

    // prepare rows
    const prepareRows = () => {
        const rows = [];
        const sortedData = sort(data, sortConfig);
        const paginatedData = paginate(sortedData, currentPage, nPageRows);
        // if rows have same name then group all rows with same name in one row and show all project details in one row
        const groupedData = paginatedData.reduce((r, a) => {
            r[a.name] = [...(r[a.name] || []), a];
            return r;
        }, {});

        // console.log(groupedData)
        for (const [key, value] of Object.entries(groupedData)) {
            rows.push(
                <React.Fragment key={key}>
                    <tr key={key}>
                        <EmployeeProfileTd
                            rowSpan={value.length + 1}
                            style={{ borderBottom: '2px solid #AAD1FC' }}>
                            <EmployeeProfile>
                                <EmployeeProfileImage />
                                <EmployeeProfileName>
                                    <span>{key}</span>
                                    <span>{value[0].role}</span>
                                </EmployeeProfileName>
                            </EmployeeProfile>
                        </EmployeeProfileTd>
                    </tr>

                    {value.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr >
                                    {_.without(columnOrder, ...filterColumn).map((column) => (
                                        <td key={column}
                                            style={{ borderBottom: value.length - 1 === index ? '2px solid #AAD1FC' : '1px solid #E7EFFC' }}
                                        >{item[column]}</td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>,
            );
        }

        return rows;
    };

    return (
        <TableContainer>
            {/* <ColumnFilter columns={columnOrder} filterColumn={filterColumn} setFilterColumn={setFilterColumn} root={columnFilterButtonId} /> */}

            <TableWrapper>
                {/* table */}
                <table>
                    <thead>{prepareHeader()}</thead>
                    <tbody>{prepareRows()}</tbody>
                </table>
            </TableWrapper>

            {/* pagination */}
            <Pagination
                data={data}
                nPageRows={nPageRows}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setNPageRows={setNPageRows}
            />
        </TableContainer>
    );
};
export default EmployeeWiseTable;

/* ========== DRAG ABLE COLUMN ============== */
const DragAbleHeader = ({ column, sort, columns, columnOrder, setColumnOrder, requestSort }) => {
    const ref = useRef(null);

    const reOrder = (curr, target) => {
        columnOrder.splice(columnOrder.indexOf(target), 0, columnOrder.splice(columnOrder.indexOf(curr), 1)[0]);

        return [...columnOrder];
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'column',
        item: { column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // drop
    const [{ isOver }, drop] = useDrop({
        accept: 'column',
        hover(item, monitor) {
            const dragIndex = columnOrder.indexOf(item.column);
            const hoverIndex = columnOrder.indexOf(column);
        },

        drop: (item, monitor) => {
            if (item.column !== column) {
                const reOrderColumn = reOrder(item.column, column)
                setColumnOrder(reOrderColumn);
                localStorage.setItem('employeeWiseTableColumnOrder', JSON.stringify(reOrderColumn))
            }
        },

        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    drag(drop(ref));

    return (
        <th key={column} ref={ref} style={{ opacity: isDragging ? 0 : 1, background: isOver ? 'rgb(0 0 0 / 5%)' : '' }}>
            <div>
                <div onClick={() => requestSort(column)}>
                    {
                        sort.key === column ? (
                            sort.direction === 'asc' ?
                                <span className="table_asc_dec asc"></span>
                                :
                                <span className="table_asc_dec dec"></span>
                        ) : (
                            <span className="table_asc_dec"></span>
                        )
                    }

                </div>
                <div style={{ position: 'relative' }}>{columns.find((item) => item.key === column)?.label}</div>
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
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterRef]);

    // handle toggle
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // handle filter
    const handleFilter = (e) => {
        if (e.target.checked) {
            setFilterColumn(filterColumn.filter((item) => item !== e.target.value));
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

    let content =
        <ColumnFilterWrapper ref={filterRef}>
            <ColumnFilterButton onClick={handleToggle}>Column Filter</ColumnFilterButton>
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
                            <label htmlFor={column}>{_.startCase(column)}</label>
                        </ColumnFilterCheckbox>
                    ))}
                </ColumnFilterDropdown>
            )}
        </ColumnFilterWrapper>


    return content;
};

// pagination
const Pagination = ({ data, nPageRows, currentPage, setCurrentPage, setNPageRows }) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / nPageRows); i++) {
            pageNumbers.push(i);
        }
        setPageNumbers(pageNumbers);
    }, [data, nPageRows]);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSelectChange = (e) => {
        setNPageRows(e.target.value);
    };

    return (
        <PaginationContainer>
            <div>
                <label htmlFor="nPageRows">Show</label>
                <SelectParPage name="nPageRows" id="nPageRows" onChange={handleSelectChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </SelectParPage>
                <label htmlFor="nPageRows">entries</label>
            </div>
            <PaginationGroup>
                <EntriesPerPage>
                    Showing {currentPage * nPageRows - nPageRows + 1} to{' '}
                    {currentPage * nPageRows > data.length ? data.length : currentPage * nPageRows} of {data.length} entries
                </EntriesPerPage>
                <PaginationButtons>
                    <PreviousBtn disabled={currentPage === 1 ? true : false} onClick={previousPage}>
                        Previous
                    </PreviousBtn>
                    {pageNumbers.map((number) => (
                        <PaginateNumber
                            key={number}
                            id={number}
                            onClick={handleClick}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </PaginateNumber>
                    ))}
                    <NextBtn disabled={currentPage === pageNumbers.length ? true : false} onClick={nextPage}>
                        Next
                    </NextBtn>
                </PaginationButtons>
            </PaginationGroup>
        </PaginationContainer>
    );
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
      border-bottom:  2px solid #AAD1FC;
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
      border-bottom: 1px solid #E7EFFC;
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

// sort 
const SortIcon = styled.span`
//   width: 10px;
//   height: 10px;
//   color: black;
//   display: block;
//   position: relative;
//   &:before,
//   &:after{
//     border: 4px solid transparent;
//     content: "";
//     display: block;
//     height: 0;
//     right: 5px;
//     top: 50%;
//     position: absolute;
//     width: 0;
//   };
//   &:before{
//     border-bottom-color: ${props => props.sort === 'asc' ? '#666' : '#ddd'};
// 	  margin-top: -9px;
//   };
//   &:after{
//     border-top-color: ${props => props.sort === 'dec' ? '#666' : '#ddd'};
// 	  margin-top: 1px;
//   }

  &:before{
    content: "\2191"
  }

`;

const EmployeeProfileTd = styled.td`
  background: #f8f8f8;
  &:hover: {
    background: #f8f8f8;
  }
`;
const EmployeeProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmployeeProfileImage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
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
    &:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #1d82f5;
    }
  }
`;

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
`;

const SelectParPage = styled.select`
  padding: 4px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #eaf0f7;
  color: rgb(0 0 0 / 60%);
  background: #fff;
  margin: 0 6px;
  option {
    padding: 6px;
    font-size: 12px;
    border-radius: 5px;
  }

  &:focus {
    outline: none;
  }
`;

const PaginationGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const EntriesPerPage = styled.div`
  color: rgb(0 0 0 / 40%)
  margin-right: 10px;
  font-size: 14px;
  margin-right: 10px;
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 10px 0;
`;
const PreviousBtn = styled.button`
  padding: 6px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #eaf0f7;
  color: #000;
  background: #fff;
  &:hover {
    background: #eaf0f7;
    color: #1d82f5;
  }
  &:active {
    background: #1d82f5;
    color: #fff;
  }
  &:disabled {
    background: #f3f3f3;
    color: #ccc;
  }
`;

const NextBtn = styled.button`
  padding: 6px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #eaf0f7;
  color: #000;
  background: #fff;
  &:hover {
    background: #eaf0f7;
    color: #1d82f5;
  }
  &:active {
    background: #1d82f5;
    color: #fff;
  }
  &:disabled {
    background: #f3f3f3;
    color: #ccc;
  }
`;
// pagination styled
const PaginateNumber = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 0 6px;
  border: none;
  font-size: 14px;
  background: ${(props) => (props.className === 'active' ? '#1d82f5' : '#fff')};
  color: ${(props) => (props.className === 'active' ? '#fff' : '#000')};
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #eaf0f7;
  &:hover {
    background: #eaf0f7;
    color: #1d82f5;
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
    background: ${(props) => (props.isDragging ? 'red' : '#fff')};} 
`;
