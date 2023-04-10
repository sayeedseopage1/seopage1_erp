import { createColumnHelper } from "@tanstack/react-table";
import * as React from "react";
const H = createColumnHelper();

export const EmployeeWiseTableColumns = [
    H.accessor("name", {
        cell: (info) => {
            return (
                <div className="d-flex align-items-center">
                    <div>
                        <span className="d-block font-weight-bold">{info.getValue()}</span>
                        <span className="d-block" style={{ fontSize: '10px', marginTop: '-0.25rem' }}>UI/UX Designer</span>
                    </div>
                </div>
            )
        },
        id: "employee_name",
        header: "Name",
        rowSpan: (info) => info.task.length,
    }),

    H.accessor("project_name", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "project_name",
        header: "Project Name",
    }),

    H.accessor("client", {
        cell: (info) => <span>{info.getValue()}</span>,
        id: "client",
        header: "Client Name",
    }),

    H.accessor("project_manager", {
        cell: info => <span>{info.getValue()}</span>,
        id: 'project_manager',
        header: "Project Manager"
    }),

    H.accessor("time_logs_count", {
        cell: info => <span>{info.getValue()}</span>,
        id: 'time_logs_count',
        header: "Number of sessions"
    }),

    H.accessor('total_minutes', {
        id: 'total_minutes',
        header: 'Total Tracked Time',
        cell: info => {
            const totalMinutes = info.getValue() || 0;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60) || 0;

            const h = hours > 0 ? `${hours} hours ` : '';
            const m = `${minutes} min `


            return <span>{`${h}${m}`}</span>
        }
    })
];
