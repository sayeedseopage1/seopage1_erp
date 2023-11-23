import _ from "lodash";
import Switch from "../../global/Switch";
import { LongText } from "../LongText";
import styles from '../styles.module.css';

export const PendingRevisionColumns = [
    {
        id: "project_name",
        heading: "Project Name",
        moveable: true,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) =>  `${row?.project_name}`,
        row: ({row}) => (
            <div className={styles.project_title}>
                <LongText render={row?.project_name}>
                    <a
                        href={`/account/projects/${row?.ProjectId}`}
                        className="multiline-ellipsis"
                    >
                        {row?.project_name}
                    </a>
                </LongText>
            </div>
        )
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
                        <a
                            href={`/account/tasks/${row?.taskId}`}
                            className={`multiline-ellipsis ${isEqual ? "highlight" : ""}`}
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

            return (
                <Switch>
                    <Switch.Case
                        condition={row.final_responsible_person === "PM"}
                    >
                        <a
                            href={`/account/employees/${row.project_manager_id}`}
                            title={row.project_manager_name}
                            className="multiline-ellipsis"
                        >
                            {row.project_manager_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case
                        condition={row.final_responsible_person === "S"}
                    >
                        <a
                            href={`/account/employees/${row.sales_id}`}
                            title={row.sales_name}
                            className="multiline-ellipsis"
                        >
                            {row.sales_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case
                        condition={row.final_responsible_person === "C"}
                    >
                        <a
                            href={`/account/clients/${row.clientId}`}
                            title={row.client_name}
                            className="multiline-ellipsis"
                        >
                            {row.client_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case
                        condition={row.final_responsible_person === "LD"}
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
                        condition={row.final_responsible_person === "D"}
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
                        condition={row.final_responsible_person === "UD"}
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
                        condition={row.final_responsible_person === "GD"}
                    >
                        <a
                            href={`/account/employees/${row.developer_id}`}
                            title={row.developer_name}
                            className="multiline-ellipsis"
                        >
                            {row.developer_name}
                        </a>
                    </Switch.Case>

                    <Switch.Case condition={!_.includes(["C", "S", "PM", "LD", "D", "UD", "GD"], row.final_responsible_person)}>
                        <span style={{color: '#888'}}>Not yet accepted or denied</span>
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
                        <span className="multiline-ellipsis">
                            {row?.reason_for_revision ?? '--'}
                        </span>
                    </LongText>
                </div>
            )
        }
    },


    {
        id: 'status',
        heading: 'Status',
        moveable: false,
        rowSpan: 2,
        row: ({row}) => <span className="badge badge-warning">Pending</span>
    },


];
