import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import EmployeeWiseTable from "./EmployeeWiseTable";
import data from "./data.json";
import styled from "styled-components";
import ColumnFilter from "./ColumnFilterButton";
import "./table.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ProjectWiseTable from "./ProjectWiseTable";
import TaskWiseTable from "./TaskWiseTable";
import { useEffect } from "react";
import axios from "axios";

// table context
export const EmployeeWiseTableContext = React.createContext();

// table State/Context provider
const EmployeeWiseTableProvider = ({ children }) => {
    const [columns, setColumns] = useState([]);
    const [subColumns, setSubColumns] = useState([]);
    const [sortConfig, setSortConfig] = useState({});
    const [nPageRows, setNPageRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnOrder, setColumnOrder] = useState([]);
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
                setFilterColumn,
            }}
        >
            {children}
        </EmployeeWiseTableContext.Provider>
    );
};
// table context/state provider end

// tabs
const tabs = ["Employee Wise", "Project Wise", "Task Wise"];
// tabs end

// project wise table columns
const projectWiseTableConfig = {
    columns: [
        { key: "project_name", label: "Project Name" },
        { key: "client", label: "Client" },
        { key: "project_manager", label: "Project Manager" },
    ],
    subColumns: [
        { key: "name", label: "Employee Name" },
        { key: "number_of_session", label: "Number of Session" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// employee wise table config
const employeeWiseTableConfig = {
    columns: [{ key: "name", label: "Employee Name" }],
    subColumns: [
        { key: "project_name", label: "Project Name" },
        { key: "client", label: "Client" },
        { key: "project_manager", label: "Project Manager" },
        { key: "number_of_session", label: "Number of Session" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// task wise table config
const taskWiseTableConfig = {
    columns: [
        { key: "task", label: "Task" },
        { key: "project_name", label: "Project Name" },
        { key: "client", label: "Client" },
        { key: "project_manager", label: "Project Manager" },
    ],
    subColumns: [
        { key: "name", label: "Employee Name" },
        { key: "task_start", label: "Start Time" },
        { key: "task_end", label: "End Time" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// log table
const TimeLogTable = () => {
    const [activeTab, setActiveTab] = React.useState("Employee Wise");

    const activeTableNamespace =
        activeTab === "Employee Wise"
            ? "employee"
            : activeTab === "Project Wise"
            ? "project"
            : activeTab === "Task Wise"
            ? "task"
            : "";

    useEffect(() => {
        const fetch = async () => {
            axios.get("/get-timelogs").then((res) => {
                console.log(res.data);
            });
        };

        fetch();

        return () => fetch();
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs>
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </Tab>
                ))}
                <ColumnFilter table={activeTableNamespace} />
                <Tab>Export</Tab>
            </Tabs>
            {activeTab === "Employee Wise" ? (
                <EmployeeWiseTable
                    data={data}
                    columns={employeeWiseTableConfig.columns}
                    subColumns={employeeWiseTableConfig.subColumns}
                />
            ) : activeTab === "Project Wise" ? (
                <ProjectWiseTable
                    data={data}
                    columns={projectWiseTableConfig.columns}
                    subColumns={projectWiseTableConfig.subColumns}
                />
            ) : activeTab === "Task Wise" ? (
                <TaskWiseTable
                    data={data}
                    columns={taskWiseTableConfig.columns}
                    subColumns={taskWiseTableConfig.subColumns}
                />
            ) : null}
        </DndProvider>
    );
};

const Tabs = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px;
`;

const Tab = styled.button`
    padding: 6px 12px;
    border: 1.5px solid #1d82f5;
    color: #1d82f5;
    border-radius: 6px;
    background: #fff;
    &.active {
        background: #1d82f5;
        color: #ffffff;
    }
    &:hover {
        background: #ecf0f4;
        color: #1d82f5;
    }
`;

// get time log table container
const timeLogTableContainer = document.getElementById("timeLogTable");

// if container exist, render time log table
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
