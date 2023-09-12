import { Link } from "react-router-dom";



export const revisionColumns = [
    {
        id: "pm_name",
        heading: "Project Manager Name",
        moveable: true,
        sort: row => row?.project_manager?.name,
        rowSpan: 2,
        searchText: (row) =>  `${row?.project_manager?.name}`,
        row: ({row}) => <span className="singleline-ellipsis"> {row?.project_manager?.name} </span> 
    },

    {
        id: 'assigned_projects_count',
        heading: 'Assigned projects count',
        moveable: true,
        sort: (row) => row.number_of_project,
        rowSpan: 2,
        searchText: (row) => `${row?.number_of_project}`,
        row: ({row}) => {

            return(
                <Link 
                    to={`project-elaboration?pm=${row?.project_manager?.id}`} 
                    className="singleline-ellipsis"
                >
                    {row?.number_of_project}
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
        row: ({row}) => <span className="singleline-ellipsis"> ${row?.total_project_value} </span>
    },
    {
        id: 'number_of_task',
        heading: 'Number of tasks',
        moveable: true,
        sort: row => row?.number_of_tasks,
        rowSpan: 2,
        searchText: (row) => `${row?.number_of_tasks}`,
        row: ({row}) => {
            return(
                <Link 
                    to={`number-of-project-table?pm=${row?.project_manager?.id}`} 
                    className="singleline-ellipsis"
                >
                    {row?.number_of_tasks}
                </Link>
            )
        }
    },
    {
        id: 'total_number_of_revision',
        heading: 'Total no of revisions',
        moveable: true,
        sort: row => row?.total_number_of_revision,
        rowSpan: 2,
        searchText: (row) => `${row?.total_number_of_revision}`,
        row: ({row}) => {
            return(
                <Link 
                    to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
                    className="singleline-ellipsis"
                >
                    {row?.total_number_of_revision}
                </Link>
            )
        }
    },
    {
        id: 'total_time_spent_in_revision',
        heading: 'Hours spent in revisions (On developers end)',
        moveable: true,
        sort: row => row?.hours_spent_in_revision,
        rowSpan: 2,
        searchText: (row) => `${row?.hours_spent_in_revision}`,
        row: ({row}) => <span>{row?.hours_spent_in_revision}</span>
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
                            to={`sales-issues-table?pm=${row?.project_manager?.id}`} 
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
                sort: row => row?.client_side_issues,
                searchText: (row) => `${row?.client_side_issues}`,
                row: ({row}) =>{
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.client_side_issues}
                        </Link>
                    )
                } 
            },
            {
                id: 'project_manager_issues',
                heading: 'Project Manager Issues',
                moveable: false,
                sort: row => row?.project_manager_issues,
                searchText: (row) => `${row?.project_manager_issues}`,
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.project_manager_issues}
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
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
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
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
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
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
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
                sort: row => row?.unsolved_dispute,
                searchText: (row) => `${row?.unsolved_dispute}`,
                row: ({row}) => {
                    return(
                        <Link 
                            to={`number-of-revision-table?pm=${row?.project_manager?.id}`} 
                            className="singleline-ellipsis"
                        >
                            {row?.unsolved_dispute}
                        </Link>
                    )
                } 
            }
        ]
    }
] 