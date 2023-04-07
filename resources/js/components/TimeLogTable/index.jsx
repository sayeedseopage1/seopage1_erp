import * as React from "react";
import ReactDOM from "react-dom/client";
import "./timelogtable.css";
import EmployeeWiseTable from "./EmployeeWiseTable";

const TableTab = ({ activeTab, onClick, title, className = "" }) => {
    const isActive = activeTab === title.toLowerCase();

    return (
        <button
            type="button"
            onClick={() => onClick(title.toLowerCase())}
            className={`btn btn-sm btn-outline-primary ${
                isActive ? "active" : ""
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
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center time-log-table__tabs">
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
                        activeTab={activeTable}
                        onClick={(v) => setActiveTable(v)}
                    />
                </div>
                <TableTab
                    title="Export"
                    activeTab={""}
                    className="ms-auto"
                    onClick={(v) => setActiveTable(v)}
                />
            </div>

            {/* table container */}
            <div className="time-log-table__container py-4">
                {activeTable === "employee wise" ? <EmployeeWiseTable /> : null}
            </div>
        </div>
    );
};

const timeLogTableContainer = document.getElementById("timeLogTable");

if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <TimeLogTable />
        </React.StrictMode>
    );
}
