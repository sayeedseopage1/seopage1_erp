import Switch from "../global/Switch";
import { LongText } from "./LongText";
import { point } from './point';
import styles from './styles.module.css';

export const ClientIssuesTableColumns = [
    {
        id: "project_name",
        heading: "Project Name",
        moveable: true,
        sort: (row) => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.project_name}`,
        row: ({ row }) => (
            <LongText render={row?.project_name}>
                <a
                    href={`/account/projects/${row?.ProjectId}`}
                    title={row?.project_name}
                    className="multiline-ellipsis"
                >
                    {row?.project_name}
                </a>
            </LongText>
       ),
    },
    {
        id: "client_name",
        heading: "Client Name",
        moveable: false,
        sort: (row) => row?.client_name,
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
                <a
                    href={`/account/clients/${row?.clientId}`}
                    className={`multiline-ellipsis ${
                        isEqual ? "highlight" : ""
                    }`}
                >
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
                    <a
                        href={`/account/tasks/${row?.taskId}`}
                        className={`multiline-ellipsis ${
                            isEqual ? "highlight" : ""
                        }`}
                    >
                        {task_name}
                    </a>
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
            const between = row.dispute_between;
            const tv = between === 'CPR' ? row?.client_name : row?.revision_raised_by_name;
            const id = between === 'CPR' ? row?.clientId : row?.revision_raised_by_id;
            const isEqual = search
                ? _.includes(_.lowerCase(tv), _.lowerCase(search))
                : "";
            return (
                <a
                    href={`/account/${between === 'CPR' ? 'clients': 'employees'}/${id}`}
                    title={tv}
                    className={`multiline-ellipsis ${
                        isEqual ? "highlight" : ""
                    }`}
                >
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
            const obj = {
                C: row.client_name,
                PM: row.project_manager_name,
                S: row.sales_name,
                LD: row.lead_developer_name,
                D: row.developer_name,
                UD: row.developer_name,
                GD: row.developer_name
            }
            return obj[`${shortCode}`]
        },
        rowSpan: 2,
        marge: false,
        row: ({ row }) => {
            if (!row) return null;
            const rPerson = row?.final_responsible_person;
            const disputed = row?.dispute_created;
            const between = row?.dispute_between;

            return (
                <Switch>
                    <a
                        href={`/account/employees/${row.clientId}`}
                        title={row.client_name}
                        className="multiline-ellipsis"
                    >
                        {row.client_name}
                    </a>
                    <Switch.Case condition={!rPerson && disputed }>
                        <span>({point(row.raised_by_p)})</span>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "reason_for_revision",
        heading: "Reason for revision",
        moveable: true,
        sort: (row) => row?.reason_for_revision,
        rowSpan: 2,
        searchText: (row) => `${row?.reason_for_revision}`,
        row: ({ row }) => (
            <div className={styles.reason_for_revision}>
               <LongText render={row?.reason_for_revision}>
                    <span
                        title={row?.reason_for_revision}
                        className="multiline-ellipsis"
                    >
                        {row?.reason_for_revision ?? "--"}
                    </span>
                </LongText>
            </div>
        ),
    },
    {
        id: "disputed",
        heading: "Disputed (Y/N)",
        moveable: true,
        sort: (row) => row?.dispute_created,
        rowSpan: 2,
        searchText: (row) => `${row?.dispute_created}`,
        row: ({ row }) => {
            return (
                <span className="multiline-ellipsis">
                    {row?.dispute_created ? "YES" : "NO"}
                </span>
            );
        },
    },
    {
        id: "total_comments",
        heading: "Total comments",
        moveable: true,
        sort: (row) => row?.disputes_comments,
        rowSpan: 2,
        searchText: (row) => `${row?.disputes_comments}`,
        row: ({ row }) => (
            <span className="multiline-ellipsis">
                {row?.disputes_comments}
            </span>
        ),
    },
    {
        id: "verdict",
        heading: "Verdict",
        moveable: true,
        sort: (row) => row?.verdict,
        rowSpan: 2,
        searchText: (row) => `${row?.verdict}`,
        row: ({ row }) => <Verdict row={row} />,
    },
];

const Verdict = ({ row }) => {

    if (row?.status) {
        if (row?.winner) {
            return <span> Verdict given in favor of <a href={`/account/employees/${row?.winner}`}  className="hover-underline"> {row?.winner_name}  </a> </span>
        } else {
            return (
                <div>
                     Both parties were hold partially responsible. Party <a  className="hover-underline" href={`/account/employees/${row?.dispute_raised_by_id}`}>{row?.dispute_raised_by_name}</a> ({point(row?.raised_by_percent)}) & Party <a className="hover-underline" href={`/account/employees/${row?.dispute_raised_against_id}`}>{row?.dispute_raised_against_name}</a> ({point(row?.raised_against_percent)})
                </div>
            );
        }
    }
    return <span className="multiline-ellipsis">N/A</span>;
};
