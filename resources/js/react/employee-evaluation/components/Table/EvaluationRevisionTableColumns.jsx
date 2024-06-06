import SaleActionButton from "../../../../react-latest/components/revision-page/SaleActionButton";
import styles from "../../../../react-latest/styles/revision-page.module.css";
import PersonColumn from "../../../../react-latest/ui/PersonColumn";
import Popover from "../../../../react-latest/ui/Popover";
import Switch from "../../../global/Switch";

export const EvaluationRevisionTableColumns = [
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
                            {/* {console.log("data in task revision table", data)} */}
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
];
