import Popover from "../../../../react-latest/ui/Popover";
import { convertTime } from "../../../utils/converTime";
import ActionDropdown from "./ActionDropdown";

export const EvaluationTableColumns = [
    {
        id: "task_name",
        header: "Task Name",
        accessorKey: "task_name",

        cell: ({ row: { original }, className }) => {
            return original?.task_name ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className=" singleline-ellipsis link_color">
                                <span className="link_color">
                                    {original?.task_name}
                                </span>
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                <a href={`/account/tasks/${original?.task_id}`}>
                                    <span className="link_color hover-underline">
                                        {original?.task_name}
                                    </span>
                                </a>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
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
            return <div>{data?.submission_date ?? "Not Submitted yet"}</div>;
        },
    },
    {
        id: "completed_work",
        header: "Completed Work Link",
        accessorKey: "completed_work",

        cell: ({ row: { original }, className }) => {
            return original?.completed_work ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className=" singleline-ellipsis link_color hover-underline">
                                {JSON.parse(original?.completed_work).map(
                                    (data) => (
                                        <div>
                                            <a
                                                className="link_color"
                                                href={data}
                                            >
                                                {data}
                                            </a>
                                            <br />
                                        </div>
                                    )
                                )}
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                {JSON.parse(original.completed_work).map(
                                    (data) => (
                                        <div>
                                            <a
                                                className="hover-underline"
                                                href={data}
                                            >
                                                {data}
                                            </a>
                                            <br />
                                        </div>
                                    )
                                )}
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
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
                <div style={{ marginLeft: "30%" }}>
                    {data?.revision_number ?? "0"}
                </div>
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
