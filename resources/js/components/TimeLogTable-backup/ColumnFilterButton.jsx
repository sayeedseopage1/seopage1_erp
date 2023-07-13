import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { EmployeeWiseTableContext } from ".";

// column filter dropdown
const ColumnFilter = ({ table }) => {
    const {
        columnOrder, filterColumn, setFilterColumn
    } = React.useContext(EmployeeWiseTableContext)

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
            const newFilterColumn = filterColumn.filter((item) => item !== e.target.value);
            setFilterColumn(newFilterColumn);
            localStorage.setItem(`${table}WiseTableColumnFilter`, JSON.stringify(newFilterColumn))
        } else {

            const newFilterColumn = [...filterColumn, e.target.value];
            setFilterColumn(newFilterColumn);
            localStorage.setItem(`${table}WiseTableColumnFilter`, JSON.stringify(newFilterColumn))
        }
    };

    // handle all filter
    const handleAllFilter = (e) => {
        if (e.target.checked) {
            setFilterColumn([]);
            localStorage.removeItem(`${table}WiseTableColumnFilter`);
        } else {
            setFilterColumn(columnOrder);
            localStorage.setItem(`${table}WiseTableColumnFilter`, JSON.stringify(columnOrder))
        }
    };

    let content =
        <ColumnFilterWrapper className="ml-md-auto" ref={filterRef}>
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

                    {columnOrder.map((column) => (
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


export default ColumnFilter;



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
    padding: 6px 12px;
    border: 1.5px solid #1D82F5;
    color: #1D82F5;
    border-radius: 6px;
    background: #fff;
    &.active{
        background: #1D82F5;
        color: #FFFFFF;
    }
    &:hover{
        background: #ECF0F4;
    }
`;

const ColumnFilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: fit-content;
  background: #fff;
  border: 1px solid #eaf0f7;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
`;

const ColumnFilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  input {
    cursor: pointer;
    margin-bottom: 10px;
  }
  label {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
  }
`;
