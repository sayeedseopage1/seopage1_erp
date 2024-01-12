import { Link } from "react-router-dom";
import { Placeholder } from '../global/Placeholder';
import { convertTime } from "../utils/converTime";



export const revisionColumns = [
    {
        id: "pm_name",
        heading: "Project Manager Name",
        moveable: true,
        sort: row => row?.project_manager_name,
        rowSpan: 2,
        searchText: (row) =>  `${row?.project_manager_name}`,
        loader: () => <Placeholder />,
        row: ({row}) => {
            return(
                <a href={`/account/employees/${row.project_manager_id}`} title={row?.project_manager_name} >
                    <span className="singleline-ellipsis">
                        {row?.project_manager_name}
                    </span>
                </a>
            )
        }
    },

    {
        id: 'assigned_projects_count',
        heading: 'Assigned projects count',
        moveable: true,
        sort: (row) => row.total_projects,
        rowSpan: 2,
        searchText: (row) => `${row?.total_projects}`,
        loader: () => <Placeholder />,
        row: ({row, table}) => {
            const { startDate, endDate } = table.state;

            return(
                <Link
                    to={`project-elaboration?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                    className="singleline-ellipsis"
                >
                    {row?.total_projects}
                </Link>
            )
        }
    },
    {
        id: 'project_budget',
        heading: 'Project budget',
        moveable: true,
        sort: (d) => d.total_project_value,
        rowSpan: 2,
        searchText: (row) => `${row?.total_project_value}`,
        loader: () => <Placeholder />,
        row: ({row}) => <span className="singleline-ellipsis"> ${Number(row.total_project_value).toFixed(2)} </span>
    },
    {
        id: 'number_of_task',
        heading: 'Number of tasks',
        moveable: true,
        sort: row => row?.total_tasks,
        rowSpan: 2,
        searchText: (row) => `${row?.total_tasks}`,
        loader: () => <Placeholder />,
        row: ({row, table}) => {
            const { startDate, endDate } = table.state;
            return(
                <Link
                    to={`number-of-project-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                    className="singleline-ellipsis"
                >
                    {row?.total_tasks}
                </Link>
            )
        }
    },
    {
        id: 'total_number_of_revision',
        heading: 'Total no of revisions',
        moveable: true,
        sort: row => row?.total_revisions,
        rowSpan: 2,
        searchText: (row) => `${row?.total_revisions}`,
        loader: () => <Placeholder />,
        row: ({row, table}) => {
            const { startDate, endDate } = table.state;
            return(
                <Link
                    to={`number-of-revision-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                    className="singleline-ellipsis"
                >
                    {row?.total_revisions}
                </Link>
            )
        }
    },
    {
        id: 'total_time_spent_in_revision',
        heading: 'Hours spent in revisions (On developers/designers end)',
        moveable: true,
        sort: row => row?.minutes_spent,
        rowSpan: 2,
        searchText: (row) => `${row?.minutes_spent}`,
        loader: () => <Placeholder />,
        row: ({row}) => <span>{convertTime(row?.minutes_spent)}</span>
    },
    {
        id: 'revision_breakdown',
        heading: 'Revision Breakdown',
        moveable: true,
        subHeading: [
            {
                id: 'sales_issues',
                heading: 'Sales Issues',
                moveable: true,
                sort: row => row?.sales_issues,
                searchText: (row) => `${row?.sales_issues}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`sales-issues-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.sales_issues)?.toFixed(2)}
                        </Link>
                    )
                }
            },
            {
                id: 'client_side_issues',
                heading: 'Client Side Issues',
                moveable: false,
                sort: row => row?.client_issues,
                searchText: (row) => `${row?.client_issues}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`client-issues-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.client_issues)?.toFixed(2)}
                        </Link>
                    )
                }
            },
            {
                id: 'project_manager_issues',
                heading: 'Project Manager Issues',
                moveable: false,
                sort: row => row?.pm_issues,
                searchText: (row) => `${row?.pm_issues}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`project-manager-issues-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.pm_issues)?.toFixed(2)}
                        </Link>
                    )
                }
            },
            {
                id: 'lead_developer',
                heading: 'Lead Developers/Designers Issues',
                moveable: false,
                sort: row => row?.lead_developer_issues,
                searchText: (row) => `${row?.lead_developer_issues}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`lead-developer-issues-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.lead_developer_issues)?.toFixed(2)}
                        </Link>
                    )
                }
            },
            {
                id: 'developer',
                heading: 'Developers/Designers Issues',
                moveable: false,
                sort: row => row?.developer_issues,
                searchText: (row) => `${row?.developer_issues}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`developer-issues-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.developer_issues)?.toFixed(2)}
                        </Link>
                    )
                }
            },

            {
                id: "rev_accept_deny_pending",
                heading: 'Rev. Accept/Deny Pending',
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const count = row?.pending_issues || 0;
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`pending-revisions?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {count}
                        </Link>
                    )
                }
            },
            {
                id: 'disputed_total',
                heading: 'Total Disputed',
                moveable: false,
                sort: row => row?.total_disputes,
                searchText: (row) => `${row?.total_disputes}`,
                loader: () => <Placeholder />,
                row: ({row, table}) => {
                    const { startDate, endDate } = table.state;
                    return(
                        <Link
                            to={`total-dispute-table?pm=${row?.project_manager_id}&start_date=${startDate}&end_date=${endDate}`}
                            className="singleline-ellipsis"
                        >
                            {Number(row?.total_disputes)?.toFixed(2)}
                        </Link>
                    )
                }
            },
        ]
    }
]
