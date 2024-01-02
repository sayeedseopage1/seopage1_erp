import styles from "../../styles/revision-page.module.css";
import PersonColumn from "../../ui/PersonColumn";
import Popover from "../../ui/Popover";
import Switch from "../../ui/Switch";
import SaleActionButton from "./SaleActionButton";

export const RevisionTableColumns = [
    {
        id: "id",
        header: "Id",
        sortable: true,
        accessorFn: (row) => row.id,
        cell: (row) => {
            return <span>{row.getValue()}</span>;
        },
    },
    {
        id: "project",
        header: "Project",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.project_name,
        cell: (row) => {
            const data = row.row.original;

            return (
                <Popover>
                    <Popover.Button>
                        <a href={`/account/projects/${data?.project_id}`}>
                            <span className="multiline-ellipsis">
                                {row.getValue()}
                            </span>
                        </a>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <a href={`/account/projects/${data?.project_id}`}>
                                {row.getValue()}
                            </a>
                        </div>
                    </Popover.Panel>
                </Popover>
            );
        },
    },
    {
        id: "client",
        header: "Client",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.client.name,
        cell: ({ row }) => {
            const d = row.original;

            const person = d?.client;

            if (person) {
                return (
                    <PersonColumn
                        name={person.name}
                        avatar={person.image}
                        slug=""
                        profileLink={`/account/employees/${person.id}`}
                    />
                );
            } else return <span> -- </span>;
        },
    },
    {
        id: "task",
        header: "Task",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.heading,
        cell: ({row}) => {
            const data = row.original;
            return (
                <Popover>
                    <Popover.Button>
                        <a href={`/account/tasks/${data.task_id}`} className="multiline-ellipsis">
                            {data.heading}
                        </a>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <a href={`/account/tasks/${data.task_id}`} >
                                {data.heading}
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

            if(!text) return <span> -- </span>
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
        accessorFn: (row) => row?.project_manager?.name,
        cell: ({ row }) => {
            const d = row.original;

            if (d?.project_manager) {
                return (
                    <PersonColumn
                        name={d.project_manager.name}
                        avatar={d.project_manager.image}
                        slug={d.project_manager.designation}
                        profileLink={`/account/employees/${d.project_manager.id}`}
                    />
                );
            } else return <span> -- </span>;
            // return (
            //     <abbr title={row.getValue()}>
            //         <span className="multiline-ellipsis">{row.getValue()}</span>
            //     </abbr>
            // );
        },
    },
    {
        id: "revision_due_to",
        header: "Revision Due To",
        draggable: true,
        sortable: true,
        accessorFn: (row) =>
            row?.sale_person ? row.sale_person.name : row?.task_assign_to.name,
        cell: ({ row }) => {
            const d = row.original;

            const person = d.dispute_between ? (d?.sale_person ? d?.sale_person : d?.task_assign_to) : null

            if (person) {
                return (
                    <PersonColumn
                        name={person.name}
                        avatar={person.image}
                        slug={person.designation}
                        profileLink={`/account/employees/${person.id}`}
                    />
                );
            } else return <span> -- </span>;
        },
    },
    {
        id: "project_manager",
        header: "Project Manager",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row?.project_manager?.name,
        cell: ({ row }) => {
            const d = row.original;

            const person = d?.project_manager;

            if (person) {
                return (
                    <PersonColumn
                        name={person.name}
                        avatar={person.image}
                        slug={person.designation}
                        profileLink={`/account/employees/${person.id}`}
                    />
                );
            } else return <span> -- </span>;
        },
    },
    {
        id: "lead_developer",
        header: "Lead Developer",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row?.lead_developer.name,
        cell: ({ row }) => {
            const d = row.original;

            const person = d?.lead_developer;

            if (person) {
                return (
                    <PersonColumn
                        name={person.name}
                        avatar={person.image}
                        slug={person.designation}
                        profileLink={`/account/employees/${person.id}`}
                    />
                );
            } else return <span> -- </span>;
        },
    },
    {
        id: "sales_executive",
        header: "Sales Executive",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.deal_added_by.name,
        cell: ({ row }) => {
            const d = row.original;

            const person = d?.deal_added_by;

            if (person) {
                return (
                    <PersonColumn
                        name={person.name}
                        avatar={person.image}
                        slug={person.designation}
                        profileLink={`/account/employees/${person.id}`}
                    />
                );
            } else return <span> -- </span>;
        },
    },
    {
        id: "status",
        header: "Action/Status",
        draggable: true,
        cell: ({ row, table }) => {
            const data = row.original;
            const user = window?.Laravel?.user;

            const actionAlreadyTaken = data.dispute_between === "SPR" ?
                                (data.sale_accept || data.sale_deny) :
                                (data.is_accept || data.is_deny);

            const hasPermissionToTakeAction =
                Number(user.id) === Number(data?.deal_added_by.id);

            return (
                <Switch>
                    <Switch.Case condition={!hasPermissionToTakeAction || actionAlreadyTaken}>
                       <Switch>
                            {/* if sales accept */}
                            <Switch.Case condition={data.dispute_between === 'SPR' && data.sale_accept}>
                                <Popover>
                                    <Popover.Button>
                                        <div className={`${styles.status} f-12`}>
                                            {`Accepted by ${data?.deal_added_by?.name}`}
                                        </div>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <div className={styles.revision_popover_panel}>
                                            <div className={`f-12`}>
                                                Accepted by <a href={`/account/employees/${data?.deal_added_by?.id}`}>{data?.deal_added_by?.name}</a>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </Switch.Case>

                            {/* if sales deny */}
                            <Switch.Case condition={data.dispute_between === 'SPR' && data.sale_deny}>
                                <Popover>
                                    <Popover.Button>
                                        <div className={`${styles.status} ${styles.deny} f-12`}>
                                            {`Denied by ${data?.deal_added_by?.name}`}
                                        </div>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <div className={styles.revision_popover_panel}>
                                            <div className={`f-12`}>
                                                Denied by <a href={`/account/employees/${data?.deal_added_by?.id}`}>{data?.deal_added_by?.name}</a>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </Switch.Case>

                            {/* if revision accept by assignee */}
                            <Switch.Case condition={data.dispute_between !== 'SPR' && data.is_accept}>
                                <Popover>
                                    <Popover.Button>
                                        <div className={`${styles.status} f-12`}>
                                            {`Accepted by ${data?.task_assign_to?.name}`}
                                        </div>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <div className={styles.revision_popover_panel}>
                                            <div className={`f-12`}>
                                            Accepted by <a href={`/account/employees/${data?.task_assign_to?.id}`}>{data?.task_assign_to?.name}</a>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </Switch.Case>

                            {/* if revision accept by assignee */}
                            <Switch.Case condition={data.dispute_between !== 'SPR' && data.is_deny}>
                                <Popover>
                                    <Popover.Button>
                                        <div className={`${styles.status} ${styles.deny} f-12`}>
                                            {`Denied by ${data?.task_assign_to?.name}`}
                                        </div>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <div className={styles.revision_popover_panel}>
                                            <div className={`f-12`}>
                                                Denied by <a href={`/account/employees/${data?.task_assign_to?.id}`}>{data?.task_assign_to?.name}</a>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </Switch.Case>

                            {/* Pending */}
                            <Switch.Case condition={data.dispute_between !== 'SPR' ? data?.approval_status === "pending": !actionAlreadyTaken}>
                                <div className={`${styles.status} ${styles.pending} f-12`}> Pending </div>
                            </Switch.Case>
                       </Switch>
                    </Switch.Case>

                    <Switch.Case
                        condition={
                            data.dispute_between === 'SPR' &&
                            !actionAlreadyTaken &&
                            hasPermissionToTakeAction
                        }
                    >
                        <SaleActionButton row={data} table={table} />
                    </Switch.Case>
                </Switch>
            );
        },
    },
];
