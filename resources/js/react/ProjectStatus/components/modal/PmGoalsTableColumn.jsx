import { getWidth } from "../../../utils/conditionalWidthReduse";
import { User } from "../../../utils/user-details";
import Switch from "../Switch";
import styles from "../styles/pm-goals-table-column.module.css";


export const PmGoalsTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row, table ,column,cell }) => {
            const data = row?.original;
            return (
                <div className={`${styles.idContainer}`}> 
                    {cell?.row?.index +1}
                </div>
            )
        }
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
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span > 
                    {`${data?.duration} Days` ?? "--"} 
                </span>
            )
        }
    },
    {
        id: "description",
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span title={data?.description} className="multine-ellipsis"> 
                    {data?.description ?? "--"}
                </span>
            )
        }
    },
    {
        id: "goal_status",
        header: "Goal Status",
        accessorKey: "goal_status",
        cell: ({ row }) => {
            const data = row?.goal_status;
            return (
                <div className="d-flex align-items-center" > 
                    <i class="fa fa-circle mr-1 f-10" style={{
                        color: data?.status === "In progress" ? "#3F9C35" : "#00b5ff",
                    }}></i>  

                    {data?.status === 0 ? "In progress" : "Completed" } 
                </div>
            )
        }
    },
    {
        id: "goal_extension_history",
        header: "Goal Extension History",
        accessorKey: "goal_extension_history",
        cell: ({ row, table }) => {
            const handle = table.options.meta
            const data = row?.original;
            return (
                <span role="button" onClick={() => handle.goalExtensionHistoryClick(data)}>6</span>
            )
        }
    },
    {
        id: "deadline_explanation_history",
        header: "Goal Expired History",
        accessorKey: "deadline_explanation_history",
        cell: ({ row, table }) => {
            const handle = table.options.meta
            const data = row?.original;
            return (
                <span role="button" onClick={() => handle.deadlineExplanationHistoryClick(data)} >5</span>
            )
        }
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row , table}) => {
            const data = row?.original;
            const user = new User(window?.Laravel?.user)
            const handle = table.options.meta
            return (
               <div className={`${styles.actionContainer}`}  >
                    <Switch>
                        <Switch.Case condition={user?.roleId === 4}>
                            <Switch>
                                    <Switch.Case condition={!data.reason}>
                                            <Switch>
                                                <Switch.Case condition={new Date(data.goal_end_date) < new Date()}>
                                                    <button 
                                                        onClick={() => handle.deadlineExplainClick(data)} className={`btn btn-danger ${styles?.deadlineExplained}`}
                                                    > 
                                                        Explain Why Expired 
                                                    </button>
                                                </Switch.Case>
                                            </Switch>
                                    </Switch.Case>
                                </Switch> 
                        </Switch.Case>
                        <Switch.Case condition={user?.roleId === 1 && data.reason}>
                            <Switch>
                                <Switch.Case condition={data.reason_status == 2}>
                                    <button  className={`btn ${styles?.resolved}`}> Resolved  </button>
                                </Switch.Case>
                                <Switch.Case condition={data.reason_status === 1}>
                                    <button 
                                        onClick={() => handle.resolveExplainClick(data)} 
                                        className={`btn btn-warning ${styles?.authorize}`}
                                    > 
                                         Authorize Explanation 
                                    </button>
                                </Switch.Case>
                            </Switch>
                        </Switch.Case>
                    </Switch>
                    <Switch>
                            <Switch.Case condition={user.roleId === 4}>
                                <button onClick={() => handle.extendRequestClick(data)} className={`btn btn-success ${styles?.extend}`}>
                                    Request Deadline Extension
                                </button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.extended_request_status === 1 &&
                                    (user.roleId === 1 || user.roleId === 8)
                                }
                            >
                                <button onClick={() => handle.extendReviewRequestClick(data)} className={`btn btn-success ${styles?.extendReview}`}>
                                    Extend Time
                                </button>
                            </Switch.Case>
                    </Switch>
                    <Switch>
                        {/* <Switch.Case condition={data?.extended_request_status !== 1 &&
                                    (user.roleId === 1 || user.roleId === 8)}>
                            <span>--</span>
                        </Switch.Case> */}
                    </Switch>
               </div>
            
            )
        }
    },
];