import { convertTime } from "../../../utils/converTime";
import ActionDropdown from "./ActionDropdown";
export const EvaluationTableColumns = [
    // {
    //     header: "#",
    //     accessorKey: "id",
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return <ColumnContent>{data?.id}</ColumnContent>;
    //     },
    // },
    {
        id: "task_name",
        header: "Task Name",
        accessorKey: "task_name",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <abbr
                    title={data?.task_name}
                    style={{ textDecoration: "none" }}
                >
                    <div
                        className="d-flex align-items-center"
                        style={{ gap: "10px" }}
                    >
                        <a
                            href={`/account/tasks/${data?.task_id}`}
                            className="hover-underline multine-ellipsis "
                        >
                            <span className="link_color">
                                {data?.task_name}
                            </span>
                        </a>
                    </div>
                </abbr>
            );
        },
    },
    {
        id: "assign_date",
        header: "Assign Date",
        accessorKey: "assign_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.assign_date}</div>;
        },
    },
    {
        id: "submission_date",
        header: "Submission Date",
        accessorKey: "submission_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.submission_date}</div>;
        },
    },
    {
        id: "completed_work",
        header: "Completed Work Link",
        accessorKey: "completed_work",
        cell: ({ row }) => {
            const data = row.original;
            if (data?.completed_work) {
                return JSON.parse(data.completed_work).map((data) => (
                    <div>
                        <a href={data}>{data}</a>
                        <br />
                    </div>
                ));
            } else {
                return "--";
            }
        },
    },
    {
        id: "total_hours",
        header: "Total Hours Tracked",
        accessorKey: "total_hours",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    {convertTime(data?.total_min)}
                </div>
            );
        },
    },

    {
        id: "revision_number",
        header: "Revisions Needed",
        accessorKey: "revision_number",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div style={{ marginLeft: "30%" }}>{data?.revision_number}</div>
            );
        },
    },

    {
        header: "Ratings",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionDropdown data={data} />;
        },
    },
];
