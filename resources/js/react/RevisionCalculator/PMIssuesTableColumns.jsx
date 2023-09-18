export const PMIssuesTableColumns = [ 
    {
        id: "pm_name",
        heading: "Project Manager Name",
        moveable: true,
        sort: row => row?.project_manager?.name,
        rowSpan: 2,
        marge: true,
        searchText: (row) =>  `${row?.project_manager?.name}`,
        row: ({row}) => <span className="singleline-ellipsis"> {row?.project_manager?.name} </span> 
    },
    {
        id: "client_name",
        heading: "Client Name",
        moveable: false,
        sortBy: "client_id",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.client?.name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const client_name = row?.client?.name;
            const isEqual = search
                ? _.includes(_.lowerCase(client_name), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {client_name}
                </span>
            );
        },
    },
    {
        id: "task_title",
        heading: "Task Title",
        moveable: false,
        sortBy: "task_id",
        rowSpan: 2,
        searchText: (row) => `${row?.task?.name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task?.name;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {task_name}
                </span>
            );
        },
    },  
    {
        id: "revision_request_raised_by",
        heading: "Revision request raised by",
        moveable: false,
        sortBy: "project_budget",
        rowSpan: 2,
        marge: false,
        searchText: (row) => `${row?.revision_request_raised_by}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tv = row?.revision_request_raised_by?.name;
            const isEqual = search
                ? _.includes(_.lowerCase(tv), _.lowerCase(search))
                : "";
            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tv}
                </span>
            );
        },
    },  
    {
        id: 'reason_for_revision',
        heading: 'Reason for revision',
        moveable: true,
        sort: row => row?.reason_for_revision,
        rowSpan: 2,
        searchText: (row) => `${row?.reason_for_revision}`,
        row: ({row}) => <span className="singleline-ellipsis">{row?.reason_for_revision}</span>
    },
    {
        id: 'disputed',
        heading: 'Disputed (Y/N)',
        moveable: true,
        sort: row => row?.disputed,
        rowSpan: 2,
        searchText: (row) => `${row?.disputed}`,
        row: ({row}) => <span className="singleline-ellipsis">{row?.disputed ? 'YES' : 'N/A'}</span>
    },  
    {
        id: 'total_comments',
        heading: 'Total comments',
        moveable: true,
        sort: row => row?.total_comments,
        rowSpan: 2,
        searchText: (row) => `${row?.total_comments}`,
        row: ({row}) => <span className="singleline-ellipsis">{row?.total_comments}</span>
    },
    {
        id: 'verdict',
        heading: 'Verdict',
        moveable: true,
        sort: row => row?.verdict,
        rowSpan: 2,
        searchText: (row) => `${row?.verdict}`,
        row: ({row}) => <span className="singleline-ellipsis">{row?.verdict}</span>
    },
     
];
