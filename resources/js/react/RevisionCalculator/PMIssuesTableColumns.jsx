export const PMIssuesTableColumns = [ 
    {
        id: "project_name",
        heading: "Project Name",
        moveable: true,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) =>  `${row?.project_name}`,
        row: ({row}) => <span title={row?.project_name} className="singleline-ellipsis"> {row?.project_name} </span> 
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
        heading: "Revision request raised by",
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
                <span title={tv} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
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
        row: ({row}) => <span title={row?.reason_for_revision} className="singleline-ellipsis">{row?.reason_for_revision ?? '--'}</span>
    },
    {
        id: 'disputed',
        heading: 'Disputed (Y/N)',
        moveable: true,
        sort: row => row?.dispute_created,
        rowSpan: 2,
        searchText: (row) => `${row?.dispute_created}`,
        row: ({row}) =>{
            return <span className="singleline-ellipsis">{row?.dispute_created ? 'YES' : 'N/A'}</span>
        }
    },  
    {
        id: 'total_comments',
        heading: 'Total comments',
        moveable: true,
        sort: row => row?.disputes_comments,
        rowSpan: 2,
        searchText: (row) => `${row?.disputes_comments}`,
        row: ({row}) => <span className="singleline-ellipsis">{row?.disputes_comments}</span>
    },
    {
        id: 'verdict',
        heading: 'Verdict',
        moveable: true,
        sort: row => row?.verdict,
        rowSpan: 2,
        searchText: (row) => `${row?.verdict}`,
        row: ({row}) => <Verdict row={row} />
    },
     
];



const Verdict = ({row}) => {
    if(row?.status){
        if(row?.winner){
            return <span> Verdict given in favor of <a href={`/account/employees/${row?.winner}`}  className="hover-underline"> {row?.winner_name}  </a> </span>
        }else{
            return (
                <div>
                     Both parties were hold partially responsible. Party <a  className="hover-underline" href={`/accounts/employees/${row?.dispute_raised_by_id}`}>{row?.dispute_raised_by_name}</a> ({row?.raised_by_percent}%) & Party <a className="hover-underline" href={`/accounts/employees/${row?.dispute_raised_by_id}`}>{row?.dispute_rasied_against_name}</a> ({row?.raised_against_percent}%)
                </div>
            )
        }
    }
    return <span className="singleline-ellipsis">
        N/A
    </span>
}
