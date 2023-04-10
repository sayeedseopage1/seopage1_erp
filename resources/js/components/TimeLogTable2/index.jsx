import * as React from "react";
import ReactDOM from "react-dom/client";
import "./timelogtable.css";
import EmployeeWiseTable from "./EmployeeWiseTable";
import { TableStateProvider } from './Table/TableContext'
import ColumnsVisibleFilter from "./Table/ColumnsVisibleFilter";

const TableTab = ({ activeTab, onClick, title, className = "" }) => {
    const isActive = activeTab === title.toLowerCase();

    return (
        <button
            type="button"
            onClick={() => onClick(title.toLowerCase())}
            className={`btn btn-sm btn-outline-primary mr-2 mb-2 ${isActive ? "active" : ""
                } ${className}`}
        >
            {title}
        </button>
    );
};

export const TimeLogTable = () => {
    const [activeTable, setActiveTable] = React.useState("employee wise");



    return (
        <div className="p-4 w-100">
            <div className="d-flex align-items-center flex-wrap bg-red-500">

                <TableTab
                    title="Employee Wise"
                    activeTab={activeTable}
                    onClick={(v) => setActiveTable(v)}
                />

                <TableTab
                    title="Project Wise"
                    activeTab={activeTable}
                    onClick={(v) => setActiveTable(v)}
                />

                <TableTab
                    title="Task Wise"
                    className="mr-md-auto"
                    activeTab={activeTable}
                    onClick={(v) => setActiveTable(v)}
                />

                <ColumnsVisibleFilter />
                <TableTab
                    title="Export"
                    activeTab={""}
                    onClick={(v) => setActiveTable(v)}
                />

            </div>

            {/* table container */}
            <div className="time-log-table__container py-4">
                {activeTable === "employee wise" ? <EmployeeWiseTable tableName="employeeWiseTimeLog" subRows={row => row.tasks} /> : null}
            </div>
        </div>
    );
};


const timeLogTableContainer = document.getElementById("timeLogTable");

if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <TableStateProvider>
                <TimeLogTable />
            </TableStateProvider>
        </React.StrictMode>
    );
}
