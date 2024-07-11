import Popover from "../../../../react-latest/ui/Popover";
import { convertTime } from "../../../utils/converTime";
import EvaluationTaskRevisionModal from "../modal/EvaluationTaskRevisionModal";
import ActionEvaluationTaskTable from "./ActionEvaluationTaskTable";

export const EvaluationTaskTableColumns = [
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
                                <a
                                    href={`/account/tasks/${original?.task_id}`}
                                    className="hover-underline"
                                    target="_blank"
                                >
                                    <span className="link_color ">
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
        id: "status",
        header: "Task Status",
        accessorKey: "task_board_column_name",
        cell: ({ row }) => {
            const data = row?.original;
            // console.log('from independent task table column',data?.column_name);
            return (
                <span
                    className="badge text-white"
                    style={{ background: data?.task_board_column_color }}
                >
                    {data?.task_board_column_name ?? "--"}
                </span>
            );
        },
    },
    {
        id: "submission_date",
        header: "Submission Date",
        accessorKey: "submission_date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.submission_date ? (
                        <span>{data?.submission_date}</span>
                    ) : (
                        <span style={{ color: "red" }}>Not Submitted yet </span>
                    )}
                </div>
            );
        },
    },
    {
        id: "completed_work",
        header: () => {
            return (
                <span>
                    Completed
                    <br />
                    Work URL
                </span>
            );
        },
        accessorKey: "completed_work",

        cell: ({ row: { original }, className }) => {
            return original?.completed_work ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className=" singleline-ellipsis link_color hover-underline">
                                {JSON.parse(original?.completed_work).map(
                                    (data, index) => (
                                        <div key={index}>
                                            <a
                                                className="link_color hover-underline"
                                                target="_blank"
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
                                    (data, index) => (
                                        <div key={index}>
                                            <span>{index + 1}.</span>
                                            <a
                                                className="link_color hover-underline mb-2"
                                                target="_blank"
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
                <span style={{ color: "red" }}>Not Available</span>
            );
        },
    },
    {
        id: "screen_record_links",
        header: "Screen recording URL of all submitted work",
        header: () => {
            return (
                <span>
                    Screen recording URL
                    <br />
                    of all submitted work
                </span>
            );
        },
        accessorKey: "screen_record_links",

        cell: ({ row: { original }, className }) => {
            const Links = original?.screen_record_links;
            return Links ? (
                <div style={{ minWidth: "10rem", width: "100px" }}>
                    <Popover>
                        <Popover.Button>
                            <span className=" singleline-ellipsis link_color hover-underline">
                                {Links?.map((data, index) => (
                                    <div key={index}>
                                        <a
                                            className="link_color hover-underline"
                                            target="_blank"
                                            href={data}
                                        >
                                            {data}
                                        </a>
                                        <br />
                                    </div>
                                ))}
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                {Links?.map((data, index) => (
                                    <div key={index}>
                                        <span>
                                            {index === 0
                                                ? "Latest Submission"
                                                : `Submission: ${
                                                      Links.length - index
                                                  }`}
                                            .
                                        </span>
                                        <a
                                            className="link_color hover-underline mb-2"
                                            target="_blank"
                                            href={data}
                                        >
                                            {data}
                                        </a>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span style={{ color: "red" }}>Not Available</span>
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
                    <EvaluationTaskRevisionModal data={data} />
                </div>
            );
        },
    },

    {
        header: "Ratings",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionEvaluationTaskTable data={data} />;
        },
    },
];
