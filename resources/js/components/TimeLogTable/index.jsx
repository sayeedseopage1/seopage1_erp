import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import EmployeeWiseTable from "./EmployeeWiseTable";
import styled from "styled-components";
import ColumnFilter from "./ColumnFilterButton";
import "./table.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ProjectWiseTable from "./ProjectWiseTable";
import TaskWiseTable from "./TaskWiseTable";
import EmployeeWiseSessionTable from "./EmployeeWiseSessionModal";
import { Provider } from "react-redux";
import { store } from '../services/store'

// table context
export const EmployeeWiseTableContext = React.createContext();
export const SessionModalContext = React.createContext();

const SessionModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [projectId, setProjectId] = useState(null);

    return (
        <SessionModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                employeeId,
                setEmployeeId,
                projectId,
                setProjectId,
            }}
        >
            {children}
        </SessionModalContext.Provider>
    );
};

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
// const tabs = [ "Project Wise", "Task Wise"];
// tabs end

// project wise table columns
const projectWiseTableConfig = {
    columns: [
        { key: "project_name", label: "Project Name" },
        { key: "client_name", label: "Client" },
        { key: "pm_name", label: "Project Manager" },
    ],
    subColumns: [
        { key: "employee_name", label: "Employee Name" },
        { key: "number_of_session", label: "Number of Session" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// employee wise table config
const employeeWiseTableConfig = {
    columns: [{ key: "employee_name", label: "Employee Name" }],
    subColumns: [
        { key: "project_name", label: "Project Name" },
        { key: "client_name", label: "Client" },
        { key: "project_manager", label: "Project Manager" },
        { key: "number_of_session", label: "Number of Session" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// task wise table config
const taskWiseTableConfig = {
    columns: [
        { key: "task_name", label: "Task" },
        { key: "project_name", label: "Project Name" },
        { key: "client_name", label: "Client" },
        { key: "project_manager", label: "Project Manager" },
    ],
    subColumns: [
        { key: "employee_name", label: "Employee Name" },
        { key: "task_start", label: "Start Time" },
        { key: "task_end", label: "End Time" },
        { key: "total_minutes", label: "Total Track Time" },
    ],
};

// log table
const TimeLogTable = () => {
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState("Project Wise");
    const [employeeSessionModal, setEmployeeSessionModal] = React.useState({
        isOpen: false,
        employeeID: 0,
        projectID: 0
    })

    const openEmployeeSession = (employeeId, projectId, type="", startDate,endDate) => {
        setEmployeeSessionModal({
            isOpen: true,
            type,
            employeeID: employeeId,
            projectID: projectId,
            startDate,
            endDate
        })
    }
    const closeEmployeeSession = () => {
        setEmployeeSessionModal({
            isOpen: false,
            type: "",
            employeeID: 0,
            projectID: 0
        })
    } 

    React.useEffect(() => {
        let timeOut = setTimeout(() => {
            setLoading(false);
        }, [300])


        return () => clearTimeout(timeOut)
    }, [])

    
    const activeTableNamespace =
        activeTab === "Employee Wise"
            ? "employee"
            : activeTab === "Project Wise"
            ? "project"
            : activeTab === "Task Wise"
            ? "task"
            : "";

    // const activeTableNamespace = activeTab === "Project Wise"
    //         ? "project"
    //         : activeTab === "Task Wise"
    //         ? "task"
    //         : "";

    if(loading) return null;
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
            {
            // activeTab === "Employee Wise" ? (
            //     <EmployeeWiseTable
            //         open={openEmployeeSession}
            //         close={closeEmployeeSession}
            //         columns={employeeWiseTableConfig.columns}
            //         subColumns={employeeWiseTableConfig.subColumns}
            //     />
            // ) : 
            activeTab === "Project Wise" ? (
                <ProjectWiseTable
                    open={openEmployeeSession}
                    close={closeEmployeeSession}
                    columns={projectWiseTableConfig.columns}
                    subColumns={projectWiseTableConfig.subColumns}
                />
            ) : activeTab === "Task Wise" ? (
                <TaskWiseTable
                    columns={taskWiseTableConfig.columns}
                    subColumns={taskWiseTableConfig.subColumns}
                />
            ) : null}


            {employeeSessionModal.isOpen && 
                <EmployeeWiseSessionTable 
                    control={{employeeSessionModal, setEmployeeSessionModal}} 
                />
            }
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
            <Provider store={store}>
                <EmployeeWiseTableProvider> 
                    <TimeLogTable />
                </EmployeeWiseTableProvider>
            </Provider>
        </React.StrictMode>
    );
}
