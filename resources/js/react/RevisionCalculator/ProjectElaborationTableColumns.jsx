export const ProjectElaborationTableColumns = [
    {
        id: "pm_name",
        heading: "Project Name",
        moveable: false,
        sortBy: "pm_id",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.project_manager?.name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const pm_name = row?.project_manager?.name;
            const isEqual = search
                ? _.includes(_.lowerCase(pm_name), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {pm_name}
                </span>
            );
        },
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
        id: "project_budget",
        heading: "Project budget",
        moveable: false,
        sortBy: "project_budget",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.total_project_value}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tv = row?.total_project_value;
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
        id: "number_of_task",
        heading: "Number of tasks",
        moveable: false,
        sortBy: "number_of_task",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.number_of_tasks}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tt = row?.number_of_tasks;
            const isEqual = search
                ? _.includes(_.lowerCase(tt), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tt}
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
        id: "task_count",
        heading: "Revisions count",
        moveable: false,
        sortBy: "task_count",
        rowSpan: 2,
        searchText: (row) => `${row?.task?.total_number_of_revision}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const tr = row?.task?.total_number_of_revision;
            const isEqual = search
                ? _.includes(_.lowerCase(tr), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {tr}
                </span>
            );
        },
    },
    {
        id: "total_time_spent_in_revision",
        heading: "Total time spent in revision",
        moveable: false,
        sortBy: "total_time_spent_in_revision",
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.hours_spent_in_revision}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const hs = row?.hours_spent_in_revision;
            const isEqual = search
                ? _.includes(_.lowerCase(hs), _.lowerCase(search))
                : "";

            return (
                <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {hs}
                </span>
            );
        },
    },
    {
        id: "revision_breakdown",
        heading: "Revision Breakdown",
        moveable: false,
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
                searchText: (row) => `${row?.client_side_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const ci = row?.client_side_issues;
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
                searchText: (row) => `${row?.project_manager_issues}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const pmi = row?.project_manager_issues;
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
            {
                id: "disputed_not_solved",
                heading: "Disputed & not solved",
                moveable: false,
                sortBy: "disputed_not_solved",
                searchText: (row) => `${row?.unsolved_dispute}`,
                row: ({ row, table }) => {
                    const search = table.state.search;
                    const usd = row?.unsolved_dispute;
                    const isEqual = search
                        ? _.includes(_.lowerCase(usd), _.lowerCase(search))
                        : "";

                    return (
                        <span
                            className={`singleline-ellipsis ${
                                isEqual ? "highlight" : ""
                            }`}
                        >
                            {usd}
                        </span>
                    );
                },
            },
        ],
    },
];
