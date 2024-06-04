import styles from "../../../../react-latest/styles/revision-page.module.css";

import Popover from "../../../../react-latest/ui/Popover";
import AverageRatingRevision from "./AverageRatingRevision";

export const EvaluationRevisionTableColumnsWithTasks = [
    {
        id: "task_heading",
        header: "Tasks",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.task_heading,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Popover>
                    <Popover.Button>
                        <a
                            href={`/account/tasks/${data?.task_id}`}
                            className="multiline-ellipsis"
                        >
                            <span style={{ color: "#3366CC" }}>
                                {data?.task_heading}
                            </span>
                        </a>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <a href={`/account/tasks/${data?.task_id}`}>
                                {data?.task_heading}
                            </a>
                        </div>
                    </Popover.Panel>
                </Popover>
            );
        },
    },
    {
        id: "revision",
        header: "Revision",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.pm_comment || row.lead_comment,
        cell: ({ row }) => {
            const data = row.original;
            let text = data.pm_comment || data.lead_comment;
            text = text?.replace(/<a/g, '<a class="word-break"');

            return (
                <Popover>
                    <Popover.Button>
                        <div
                            className="multiline-ellipsis"
                            dangerouslySetInnerHTML={{
                                __html: text?.slice(0, 200),
                            }}
                        />
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: text,
                                }}
                            />
                        </div>
                    </Popover.Panel>
                </Popover>
            );
        },
    },
    {
        id: "revision_reason",
        header: "Revision Reason",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.revision_acknowledgement,
        cell: (row) => {
            const text = row.getValue();

            if (!text) return <span> -- </span>;
            return (
                <Popover>
                    <Popover.Button>
                        <div
                            className="multiline-ellipsis"
                            dangerouslySetInnerHTML={{
                                __html: text?.slice(0, 200),
                            }}
                        />
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: text,
                                }}
                            />
                        </div>
                    </Popover.Panel>
                </Popover>
            );
        },
    },
    {
        id: "revision_provided_by",
        header: "Revision Provided By",
        draggable: true,
        sortable: true,

        cell: ({ row }) => {
            const data = row.original;
            return (
                <Popover>
                    <Popover.Button>
                        <a
                            href={`/account/employees/${data?.added_by}`}
                            className="text-primary"
                        >
                            {data?.added_by_name}
                        </a>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <a href={`/account/employees/${data?.added_by}`}>
                                {data?.added_by_name}
                            </a>
                        </div>
                    </Popover.Panel>
                </Popover>
            );
        },
    },
    {
        id: "task_id",
        header: "Average Rating",
        draggable: true,
        sortable: true,

        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <AverageRatingRevision data={data} />
                </div>
            );
        },
    },
];
