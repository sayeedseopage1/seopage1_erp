import { User } from "../../../utils/user-details";
import Switch from "../Switch";
import TablePopover from "../TablePopover";
import styles from "../styles/pm-goals-table-column.module.css";

export const PmGoalsTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row, table, column, cell }) => {
            const data = row?.original;
            return (
                <div className={`${styles.idContainer}`}>
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
        cell: ({ row }) => {
            const data = row?.original;
            return <span>{data.goal_end_date}</span>;
        },
    },
    {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
            const data = row?.original;
            const handleDuration = () => {
                if(data?.duration) {
                    const duration = parseFloat(data?.duration);
                    const getDays = parseInt(duration);
                    const getHours = Math.floor((duration - getDays) * 24);
                    return `${getDays} Days${getHours === 0 ? '' : ` ${getHours} Hours`}`
                }  else {
                    return "--"

                }
            }
            return (
                <span >
                    {handleDuration()}
                </span>
            )
        }
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
        id: "description",
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover
                    text={data?.expired_meet_description}
                    isDangerHtml={true}
                />
            );
        },
    },
    {
        id: "goal_status",
        header: "Goal Status",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex align-items-center">
                    <i
                        className="fa fa-circle mr-1 f-10"
                        style={{
                            color:
                                data?.goal_status === 0
                                    ? "#1492d2 "
                                    : "#218838",
                        }}
                    ></i>
                    {data?.goal_status === 0 ? "Incomplete" : "Completed"}
                </div>
            );
        },
    },
    {
        id: "goal_extension_history",
        header: "Goal Extension History",
        accessorKey: "goal_extension_history",
        cell: ({ row, table }) => {
            const handle = table.options.meta;
            const data = row?.original;
            return (
                <span
                    role="button"
                    className={`${
                        data?.goal_extension_history &&
                        data.goal_status === 0 &&
                        new Date(row.original?.goal_end_date) > new Date()
                            ? styles?.tableAnchor
                            : ""
                    } d-flex justify-content-center align-items-center`}
                    style={{
                        textDecoration: data?.goal_extension_history
                            ? "underline"
                            : "none",
                    }}
                    onClick={() => {
                        // condition to check if the goal extension history is available
                        data?.goal_extension_history &&
                            handle.goalExtensionHistoryClick(data);
                    }}
                >
                    {data?.goal_extension_history ?? "--"}
                </span>
            );
        },
    },
    {
        id: "deadline_explanation_history",
        header: "Goal Expired History",
        accessorKey: "deadline_explanation_history",
        cell: ({ row, table }) => {
            const handle = table.options.meta;
            const data = row?.original;
            return (
                <span
                    role="button"
                    className={`${
                        data.goal_expired_history &&
                        data.goal_status === 0 &&
                        new Date(row.original?.goal_end_date) > new Date()
                            ? styles?.tableAnchor
                            : ""
                    } d-flex justify-content-center align-items-center`}
                    style={{
                        textDecoration: data?.goal_expired_history
                            ? "underline"
                            : "none",
                    }}
                    onClick={() => {
                        // condition to check if the deadline explanation history is available
                        data.goal_expired_history &&
                            handle.deadlineExplanationHistoryClick(data);
                    }}
                    
                >
                    {data.goal_expired_history}
                </span>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row, table }) => {
            const data = row?.original;
            const user = new User(window?.Laravel?.user);
            const handle = table.options.meta;
            return (
                <div className={`${styles.actionContainer}`}>
                    <Switch>
                        <Switch.Case condition={user?.roleId === 4}>
                            <Switch.Case
                                condition={
                                    data.reason_status === 0 &&
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
                                >
                                    Awaiting Authorization on Deadline
                                    Explanation
                                </button>
                            </Switch.Case>
                            <Switch.Case condition={data?.reason_status === 2}>
                                <div
                                    className={`${styles?.explanationSubmitted}`}
                                >
                                    Goal Expired & Explanation Submitted
                                </div>
                            </Switch.Case>
                        </Switch.Case>
                        <Switch.Case
                            condition={user?.roleId === 1 || user?.roleId === 8}
                        >
                            <Switch.Case condition={data.reason_status === 1}>
                                <button
                                    onClick={() =>
                                        handle.resolveExplainClick(data)
                                    }
                                    className={`btn btn-warning ${styles?.authorize}`}
                                >
                                    Authorize Explanation
                                </button>
                            </Switch.Case>
                            <Switch.Case condition={data.reason_status === 2}>
                                <button className={`btn ${styles?.resolved}`}>
                                    {" "}
                                    Resolved{" "}
                                </button>
                            </Switch.Case>
                        </Switch.Case>
                    </Switch>
                    <Switch>
                        <Switch.Case
                            condition={
                                user.roleId === 4 &&
                                data?.extension_status === 0 &&
                                new Date(data.goal_end_date) > new Date() &&
                                data.goal_status !== 1
                            }
                        >
                            <button
                                onClick={() => handle.extendRequestClick(data)}
                                className={`btn btn-success ${styles?.extend}`}
                            >
                                Request Deadline Extension
                            </button>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                user.roleId === 4 &&
                                data?.extension_status !== 1 &&
                                new Date(data.goal_end_date) > new Date() &&
                                data.goal_status === 1
                            }
                        >
                            <span>--</span>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                user.roleId === 4 &&
                                data?.extension_status === 1
                            }
                        >
                            <button
                                disabled
                                className={`btn ${styles?.awaitingDeadlineExtension}`}
                                style={{
                                    color: "gray",
                                }}
                            >
                                Awaiting Deadline Extension Request
                                Authorization
                            </button>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                data?.extension_status === 1 &&
                                (user.roleId === 1 || user.roleId === 8)
                            }
                        >
                            <button
                                onClick={() =>
                                    handle.extendReviewRequestClick(data)
                                }
                                className={`btn btn-success ${styles?.extendReview}`}
                            >
                                Extend Time
                            </button>
                        </Switch.Case>
                    </Switch>
               </div>
            
            )
        }
    }
]
