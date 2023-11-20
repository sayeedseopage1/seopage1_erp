import Switch from "../global/Switch";
import { LongText } from "./LongText";
import styles from './styles.module.css';

export const DevIssuesTableColumns = [
    {
        id: "project_name",
        heading: "Project Name",
        moveable: true,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) =>  `${row?.project_name}`,
        row: ({row}) => {
            return(
                <div className={styles.project_title}>
                    <LongText render={row?.project_name}>
                        <a
                            href={`/account/projects/${row?.ProjectId}`}
                            title={row?.project_name}
                            className="multiline-ellipsis"
                        >
                            {row?.project_name}
                        </a>
                    </LongText>
                </div>
            )
        }
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
                <a href={`/account/clients/${row?.clientId}`} className={`multiline-ellipsis ${isEqual ? "highlight" : ""}`}>
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
               <div className={styles.task_title}>
                   <LongText render={task_name}>
                        <span className={`multiline-ellipsis ${isEqual ? "highlight" : ""}`}>
                            {task_name}
                        </span>
                    </LongText>
               </div>
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
                <a href={`/account/employees/${row?.revision_raised_by_id}`} title={tv} className={`multiline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tv}
                </a>
            );
        },
    },
    {
        id: "revision_requests_against",
        heading: "Responsible Person",
        moveable: false,
        sort: (row) => {
            const shortCode = row?.final_responsible_person;
            const disputed = row?.dispute_created;
            const disputeBetween = row?.dispute_between;

            const obj = {
                C: row.client_name,
                PM: row.project_manager_name,
                S: row.sales_name,
                LD: row.lead_developer_name,
                D: row.developer_name,
                UD: row.developer_name,
                GD: row.developer_name
            }

            if(!shortCode && disputed && disputeBetween==='LDR'){
                return obj.D;
            }
            return obj[`${shortCode}`]
        },
        rowSpan: 2,
        marge: false,
        row: ({ row }) => {
            if (!row) return null;
            const rPerson = row?.final_responsible_person;
            const disputed = row?.dispute_created;

            return (
                <Switch>
                    <Switch.Case
                        condition={rPerson === "LD"}
                    >
                        <a
                            href={`/account/employees/${row.lead_developer_id}`}
                            title={row.lead_developer_name}
                            className="multiline-ellipsis"
                        >
                            {row.lead_developer_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case
                        condition={_.includes (["D", "UD", "GD"], rPerson)}
                    >
                        <a
                            href={`/account/employees/${row.developer_id}`}
                            title={row.developer_name}
                            className="multiline-ellipsis"
                        >
                            {row.developer_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case
                        condition={!rPerson && row.raised_against_p }
                    >
                        <a
                            href={`/account/employees/${row.developer_id}`}
                            title={row.developer_name}
                            className="multiline-ellipsis"
                        >
                            {row.developer_name}
                        </a>
                        ({row.raised_against_p}%)
                    </Switch.Case>
                </Switch>
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
        row: ({row}) => {
            return(
                <div className={styles.reason_for_revision}>
                    <LongText render={row?.reason_for_revision}>
                        <span
                            className="multiline-ellipsis"
                        >
                            {row?.reason_for_revision ?? '--'}
                        </span>
                    </LongText>
                </div>
            )
        }
    },
    {
        id: 'disputed',
        heading: 'Disputed (Y/N)',
        moveable: true,
        sort: row => row?.dispute_created,
        rowSpan: 2,
        searchText: (row) => `${row?.dispute_created}`,
        row: ({row}) =>{
            return <span className="multiline-ellipsis">{row?.dispute_created ? 'YES' : 'NO'}</span>
        }
    },
    {
        id: 'total_comments',
        heading: 'Total comments',
        moveable: true,
        sort: row => row?.disputes_comments,
        rowSpan: 2,
        searchText: (row) => `${row?.disputes_comments}`,
        row: ({row}) => {
           return(
            <div className={styles.dispute_comment}>
                <span className="multiline-ellipsis">{row?.disputes_comments}</span>
            </div>
           )
        }
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
                     Both parties were hold partially responsible. Party <a  className="hover-underline" href={`/account/employees/${row?.dispute_raised_by_id}`}>{row?.dispute_raised_by_name}</a> ({row?.raised_by_percent}%) & Party <a className="hover-underline" href={`/account/employees/${row?.dispute_raised_against_id}`}>{row?.dispute_raised_against_name}</a> ({row?.raised_against_percent}%)
                </div>
            )
        }
    }
    return <span className="multiline-ellipsis">
        N/A
    </span>
}
