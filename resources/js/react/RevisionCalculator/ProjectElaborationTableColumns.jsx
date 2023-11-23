import _ from "lodash";
import { convertTime } from "../utils/converTime";
import { LongText } from './LongText';
import styles from './styles.module.css';

export const ProjectElaborationTableColumns = [
    {
        id: "project_id",
        heading: "Project Name",
        moveable: true,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row['ProjectId']} ${row['project_name']}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const text = row?.project_name
            const isEqual = search
                ? _.includes(_.lowerCase(text), _.lowerCase(search))
                : "";

            return (
                <div className={styles.project_title}>
                   <LongText render={text}>
                        <a href={`/account/projects/${row?.ProjectId}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                            {text}
                        </a>
                   </LongText>
                </div>
            );
        },
    },
    {
        id: "client_name",
        heading: "Client Name",
        moveable: true,
        sort: row => `${row.client_name}`,
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
                <a href={`/account/clients/${row?.clientId}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {client_name}
                </a>
            );
        },
    },
    {
        id: "project_budget",
        heading: "Project budget",
        moveable: true,
        sort: row => row?.project_budget,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.project_budget}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const project_budget = row?.project_budget;
            const isEqual = search
                ? _.includes(_.lowerCase(project_budget), _.lowerCase(search))
                : "";
            return (
                <span className={`singleline-ellipsis text-right ${isEqual ? "highlight" : ""}`}>
                    $ {Number(project_budget).toFixed(2)}
                </span>
            );
        },
    },
    {
        id: "number_of_task",
        heading: "Number of tasks",
        moveable: true,
        sortBy: "number_of_task",
        rowSpan: 2,
        marge: true,
        row: ({ row, table}) => {
            const search = table.state.search;
            const tt = row?.total_tasks;
            const isEqual = search
                ? _.includes(_.lowerCase(tt), _.lowerCase(search))
                : "";

            return (
                <span className={`multiline-ellipsis ${isEqual ? "highlight" : ""}`}>
                  {tt}
                </span>
            );
        },
    },

    {
        id: "task_title",
        heading: "Task Title",
        moveable: true,
        sort: row => row?.task_title,
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
                        <a href={`/account/tasks/${row?.id}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                            {task_name}
                        </a>
                    </LongText>
                </div>
            );
        },
    },

    {
        id: "task_count",
        heading: "Revisions count",
        moveable: true,
        sort:(row) => row?.total_revisions,
        rowSpan: 2,
        searchText: (row) => `${row?.total_revisions}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const total_revisions = row?.total_revisions;
            const isEqual = search
                ? _.includes(_.lowerCase(total_revisions), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {total_revisions}
                </span>
            );
        },
    },
    {
        id: "total_time_spent_in_revision",
        heading: "Total time spent in revision",
        moveable: true,
        sortBy: "total_time_spent_in_revision",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.total_time_spent}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const hs = row?.total_time_spent;
            const isEqual = search
                ? _.includes(_.lowerCase(hs), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {convertTime(hs)}
                </span>
            );
        },
    },
    {
        id: "revision_breakdown",
        heading: "Revision Breakdown",
        moveable: true,
        subHeading: [
            {
                id: "sales_issues",
                heading: "Sales Issues",
                moveable: false,
                sortBy: "sales_issues",
                searchText: (row) => `${row?.sales_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const si = row?.sales_issues;
                    const isEqual = search
                        ? _.includes(_.lowerCase(si), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {si}
                        </span>
                    );
                },
            },
            {
                id: "client_side_issues",
                heading: "Client Side Issues",
                moveable: false,
                sortBy: "client_side_issues",
                searchText: (row) => `${row?.client_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const ci = row?.client_issues;
                    const isEqual = search
                        ? _.includes(_.lowerCase(ci), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {ci}
                        </span>
                    );
                },
            },
            {
                id: "project_manager_issues",
                heading: "Project Manager Issues",
                moveable: false,
                sortBy: "project_manager_issues",
                searchText: (row) => `${row?.pm_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const pmi = row?.pm_issues;
                    const isEqual = search
                        ? _.includes(_.lowerCase(pmi), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {pmi}
                        </span>
                    );
                },
            },
            {
                id: "lead_developer",
                heading: "Lead Developer Issues",
                moveable: false,
                sortBy: "lead_develoepr_issue",
                searchText: (row) => `${row?.lead_developer_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const ldi = row?.lead_developer_issues;
                    const isEqual = search
                        ? _.includes(_.lowerCase(ldi), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {ldi}
                        </span>
                    );
                },
            },
            {
                id: "developer",
                heading: "Developers Issues",
                moveable: false,
                sortBy: "develoepr_issue",
                searchText: (row) => `${row?.developer_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const di = row?.developer_issues;
                    const isEqual = search
                        ? _.includes(_.lowerCase(di), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {di}
                        </span>
                    );
                },
            },
            {
                id: "disputed_total",
                heading: "Total Disputed",
                moveable: false,
                sortBy: "disputed_total",
                searchText: (row) => `${row?.total_disputes}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const td = row?.total_disputes;
                    const isEqual = search
                        ? _.includes(_.lowerCase(td), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {td}
                        </span>
                    );
                },
            },
        ],
    },
];
