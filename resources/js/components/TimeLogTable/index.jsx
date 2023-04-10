import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import EmployeeWiseTable from "./EmployeeWiseTable";
import data from './data.json'
import styled from 'styled-components';
import ColumnFilter from "./ColumnFilterButton";
import './table.css';

export const EmployeeWiseTableContext = React.createContext();

const EmployeeWiseTableProvider = ({ children }) => {
    const [columns, setColumns] = useState([]);
    const [subColumns, setSubColumns] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [nPageRows, setNPageRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnOrder, setColumnOrder] = useState();
    const [filterColumn, setFilterColumn] = useState([]);


    return (
        <EmployeeWiseTableContext.Provider
            value={{
                columns,
                setColumns,
                subColumns,
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
            }}

        >
            {children}
        </EmployeeWiseTableContext.Provider>
    )
}

const tabs = [
    "Employee Wise",
    "Project Wise",
    "Task Wise"
]

const TimeLogTable = () => {
    const [activeTab, setActiveTab] = React.useState('Employee Wise');


    return (
        <div>
            <Tabs>
                {tabs.map(tab => (
                    <Tab
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >{tab}</Tab>
                ))}
                <ColumnFilter />
                <Tab>Export</Tab>
            </Tabs>
            <EmployeeWiseTable data={data} columnFilterButtonId="columnFilterId" />
        </div>
    )
}


const Tabs = styled.div`
    display: flex;
    align-items: center;   
    flex-wrap: wrap; 
    gap: 8px;
    padding: 20px;
`;

const Tab = styled.button`
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
        color: #1D82F5;
    }
`



const timeLogTableContainer = document.getElementById("timeLogTable");

if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <EmployeeWiseTableProvider>
                <TimeLogTable />
            </EmployeeWiseTableProvider>
        </React.StrictMode>
    );
}
