import { Link } from "react-router-dom";



export const revisionColumns = [
    {
        id: "pm_name",
        heading: "Project Manager Name",
        moveable: true,
        sort: row => row?.project_manager_name,
        rowSpan: 2,
        searchText: (row) =>  `${row?.project_manager_name}`,
        row: ({row}) => {
            return(
                <abbr title={row?.project_manager_name} >
                    <span className="singleline-ellipsis"> 
                        {row?.project_manager_name} 
                    </span> 
                </abbr>
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
        row: ({row}) => {

            return(
                <Link 
                    to={`project-elaboration?pm=${row?.project_manager_id}`} 
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
        row: ({row}) => <span className="singleline-ellipsis"> ${Number(row.total_project_value).toFixed(2)} </span>
    },
    {
        id: 'number_of_task',
        heading: 'Number of tasks',
        moveable: true,
        sort: row => row?.total_tasks,
        rowSpan: 2,
        searchText: (row) => `${row?.total_tasks}`,
        row: ({row}) => {
            return(
                <Link 
                    to={`number-of-project-table?pm=${row?.project_manager_id}`} 
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
        row: ({row}) => {
            return(
                <Link 
                    to={`number-of-revision-table?pm=${row?.project_manager_id}`} 
                    className="singleline-ellipsis"
                >
                    {row?.total_revisions}
                </Link>
            )
        }
    },
    {
        id: 'total_time_spent_in_revision',
        heading: 'Hours spent in revisions (On developers end)',
        moveable: true,
        sort: row => row?.minutes_spent,
        rowSpan: 2,
        searchText: (row) => `${row?.minutes_spent}`,
        row: ({row}) => <span>{row?.minutes_spent}</span>
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
                row: ({row}) => {
                    return(
                        <Link 
                            to={`sales-issues-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.sales_issues}
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
                row: ({row}) =>{
                    return(
                        <Link 
                            to={`client-issues-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.client_issues}
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
                row: ({row}) => {
                    return(
                        <Link 
                            to={`project-manager-issues-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.pm_issues}
                        </Link>
                    )
                } 
            },
            {
                id: 'lead_developer',
                heading: 'Lead Developer Issues',
                moveable: false,
                sort: row => row?.lead_developer_issues,
                searchText: (row) => `${row?.lead_developer_issues}`,
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.lead_developer_issues}
                        </Link>
                    )
                } 
            },
            {
                id: 'developer',
                heading: 'Developers Issues',
                moveable: false,
                sort: row => row?.developer_issues,
                searchText: (row) => `${row?.developer_issues}`,
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.developer_issues}
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
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.total_disputes}
                        </Link>
                    )
                } 
            },
            {
                id: 'disputed_not_solved',
                heading: 'Disputed & not solved',
                moveable: false,
                sort: row => row?.total_disputes_not_solved,
                searchText: (row) => `${row?.total_disputes_not_solved}`,
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager_id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.total_disputes_not_solved}
                        </Link>
                    )
                } 
            }
        ]
    }
] 