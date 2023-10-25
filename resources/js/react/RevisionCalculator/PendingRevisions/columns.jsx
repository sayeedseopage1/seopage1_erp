export const PendingRevisionColumns = [
    {
        id: "project_name",
        heading: "Project Name",
        moveable: true,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) =>  `${row?.project_name}`,
        row: ({row}) => <a href={`/accounts/projects/${row?.ProjectId}`} title={row?.project_name} className="singleline-ellipsis"> {row?.project_name} </a>
    },
    {
        id: "client_name",
        heading: "Client Name",
        moveable: false,
        sort: (row) =>row?.client_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.client_name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const client_name = row?.client_name;
            const isEqual = search
                ? _.includes(_.lowerCase(client_name), _.lowerCase(search))
                : "";

            return (
                <a href={`/accounts/clients/${row?.clientId}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {client_name}
                </a>
            );
        },
    },
    {
        id: "task_title",
        heading: "Task Title",
        moveable: false,
        sort: (row) => `${row?.task_title}`,
        rowSpan: 2,
        searchText: (row) => `${row?.task_title}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task_title;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <span title={task_name} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {task_name}
                </span>
            );
        },
    },
    {
        id: "revision_request_raised_by",
        heading: "Revision Requested By",
        moveable: false,
        sort: (row) => `${row?.revision_raised_by_name}`,
        rowSpan: 2,
        marge: false,
        searchText: (row) => `${row?.revision_raised_by_name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tv = row?.revision_raised_by_name;
            const isEqual = search
                ? _.includes(_.lowerCase(tv), _.lowerCase(search))
                : "";
            return (
                <a href={`/accounts/employees/${row?.revision_raised_by_id}`} title={tv} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tv}
                </a>
            );
        },
    },
    {
        id: "revision_requests_against",
        heading: "Revision Requests Against",
        moveable: false,
        sort: (row) => `${row?.developer_name}`,
        rowSpan: 2,
        marge: false,
        searchText: (row) => `${row?.developer_name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tv = row?.developer_name;
            const isEqual = search
                ? _.includes(_.lowerCase(tv), _.lowerCase(search))
                : "";
            return (
                <a href={`/accounts/employees/${row?.developer_id}`} title={tv} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tv}
                </a>
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
        row: ({row}) => <span title={row?.reason_for_revision} className="singleline-ellipsis">{row?.reason_for_revision ?? '--'}</span>
    },

    
    {
        id: 'status',
        heading: 'Status',
        moveable: false, 
        rowSpan: 2, 
        row: ({row}) => <span className="badge badge-warning">Pending</span>
    },
     

]; 