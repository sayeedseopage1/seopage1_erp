import React from "react";
import ReactDOM from 'react-dom/client'
import EmployeeWiseTable from "./EmployeeWiseTable";
import data from './data.json'
import styled from 'styled-components';


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
                <Tab className="ml-md-auto" id="columnFilterId">Filter</Tab>
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
    padding: 10px;
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
    }
`



const timeLogTableContainer = document.getElementById("timeLogTable");

if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <TimeLogTable />
        </React.StrictMode>
    );
}
