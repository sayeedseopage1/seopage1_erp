export const NumberOfRevisionTableColumns = [
    {
        id: "sales_issues",
        heading: "Sales Issues",
        moveable: false,
        marge: true,
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
        marge: true,
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
        marge: true,
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
        heading: "Lead Developers/Designers Issues",
        moveable: false,
        marge: true,
        sortBy: "lead_developer_issues",
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
        heading: "Developers/Designers Issues",
        moveable: false,
        marge: true,
        sortBy: "developer_issues",
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
    // {
    //     id: "disputed_not_solved",
    //     heading: "Disputed & not solved",
    //     moveable: false,
    //     sortBy: "disputed_not_solved",
    //     searchText: (row) => `${row?.total_disputes_not_solved}`,
    //     row: ({ row, table }) => {
    //         const search = table.state.search;
    //         const usd = row?.total_disputes_not_solved;
    //         const isEqual = search
    //             ? _.includes(_.lowerCase(usd), _.lowerCase(search))
    //             : "";

    //         return (
    //             <span
    //                 className={`singleline-ellipsis ${
    //                     isEqual ? "highlight" : ""
    //                 }`}
    //             >
    //                 {usd}
    //             </span>
    //         );
    //     },
    // },
];
