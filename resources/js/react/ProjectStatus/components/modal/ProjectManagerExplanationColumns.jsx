import Avatar from "../../../global/Avatar";
import { User } from "../../../utils/user-details";
import { CreatedBy } from "../table/ui";
import styles from "../styles/pm-goals-table-column.module.css";
import Switch from "../Switch";
import TablePopover from "../TablePopover";

export const ProjectManagerExplanationColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row, table, column, cell }) => {
            const data = row?.original;
            return (
                <div
                    style={{
                        width: "20px",
                    }}
                >
                    {cell?.row?.index + 1}
                </div>
            );
        },
    },
    {
        id: "goal_start_date",
        header: "Goal Start Date",
        accessorKey: "goal_start_date",
    },
    {
        id: "goal_end_date",
        header: "Goal Dead Line",
        accessorKey: "goal_end_date",
    },
    {
        id: "duration",
        header: "Goal Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
            const data = row?.original;
            const handleDuration = () => {
                if (data?.duration) {
                    const duration = parseFloat(data?.duration);
                    const getDays = parseInt(duration);
                    const getHours = Math.floor((duration - getDays) * 24);
                    return `${getDays} Days${
                        getHours === 0 ? "" : ` ${getHours} Hours`
                    }`;
                } else {
                    return "--";
                }
            };
            return <span>{handleDuration()}</span>;
        },
    },
    {
        id: "goal_name",
        header: "Goal Name",
        accessorKey: "goal_name",
        cell: ({ row }) => {
            const data = row?.original;
            return <TablePopover text={data?.goal_name} />;
        },
    },
    {
        id: "expired_meet_description",
        header: "Expired Meet Description",
        accessorKey: "expired_meet_description",
        cell: ({ row }) => {
            const data = row?.original;
            return <TablePopover text={data?.expired_meet_description} />;
        },
    },
    {
        id: "client",
        header: "Client",
        accessorKey: "client",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <CreatedBy href={`/account/client/${data?.user_id}`}>
                    <Avatar
                        type="circle"
                        name={data?.user_name}
                        src={
                            data?.user_image
                                ? `/user-uploads/avatar/${data?.user_image}`
                                : null
                        }
                    />

                    <span>{data?.user_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "project_name",
        header: "Project Name",
        accessorKey: "project_name",
        cell: ({ row, table }) => {
            const data = row?.original;
            return <TablePopover text={data?.project_name} />;
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row, table }) => {
            const data = row?.original;
            const user = new User(window?.Laravel?.user);
            const handle = table?.options?.meta;
            return (
                <div className={`${styles.actionContainer}`}>
                    <Switch>
                        <Switch.Case condition={user?.roleId === 4}>
                            <Switch.Case
                                condition={
                                    data?.reason_status === 0 &&
                                    data?.expired_status === 1
                                }
                            >
                                <button
                                    onClick={() =>
                                        handle.deadlineExplainClick(data)
                                    }
                                    className={`btn btn-danger ${styles?.authorize}`}
                                >
                                    Explain Why Expired
                                </button>
                            </Switch.Case>
                            <Switch.Case condition={data.reason_status === 1}>
                                <button
                                    className={`btn  ${styles?.awaitingDeadlineExtension}`}
                                    style={{
                                        color: "gray",
                                    }}
                                >
                                    Awaiting Authorization on Deadline
                                    Explanation
                                </button>
                            </Switch.Case>
                            <Switch.Case condition={data?.reason_status === 2}>
                                <div
                                    className={`${styles?.explanationSubmitted}`}
                                    style={{
                                        color: "gray",
                                    }}
                                >
                                    Goal Expired & Explanation Submitted
                                </div>
                            </Switch.Case>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
];
