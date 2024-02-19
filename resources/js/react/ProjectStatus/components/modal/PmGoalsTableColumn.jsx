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
                <span > 
                    {data?.description ?? "--"}
                </span>
            )
        }
    },
    {
        id: "reason",
        header: "Reason",
        accessorKey: "reason",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span 
                dangerouslySetInnerHTML={{ __html: data?.reason ?? "--",}}
            />
            )
        }
    },
    {
        id: "suggestion",
        header: "Suggestion",
        accessorKey: "suggestion",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span 
                dangerouslySetInnerHTML={{ __html: data?.suggestion ?? "--",}}
            />
            )
        }
    },
    {
        id: "admin_comment",
        header: "Comment",
        accessorKey: "admin_comment",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span 
                dangerouslySetInnerHTML={{ __html: data?.admin_comment ?? "--",}}
            />
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

               <div className={`${styles.actionContainer}`} >
                    <Switch>
                        <Switch.Case condition={user?.roleId === 4}>
                            <Switch>
                                    <Switch.Case condition={!data.reason}>
                                            <Switch>
                                                <Switch.Case condition={new Date(data.goal_end_date) < new Date()}>
                                                    <div 
                                                        onClick={() => handle.deadlineExplainClick(data)} className={`${styles.action} ${styles.deadlineExplained} f-12`}
                                                    > 
                                                        Deadline Explanation 
                                                    </div>
                                                </Switch.Case>
                                            </Switch>
                                    </Switch.Case>
                                </Switch> 
                        </Switch.Case>
                        <Switch.Case condition={user?.roleId === 1 && data.reason}>
                            <Switch>
                                <Switch.Case condition={data.admin_comment && data.suggestion}>
                                    <div  className={`${styles.action} f-12`}> Resolved </div>
                                </Switch.Case>
                                <Switch.Case condition={!data.admin_comment && !data.suggestion}>
                                    <div onClick={() => handle.resolveExplainClick(data)} className={`${styles.action} ${styles.resolve} f-12`}> Resolve </div>
                                </Switch.Case>
                            </Switch>
                        </Switch.Case>
                    </Switch>
                    <Switch>
                            <Switch.Case condition={user.roleId === 4}>
                                <div onClick={() => handle.extendRequestClick(data)} className={`${styles.action} ${styles.extend} `}>
                                    Extend Request
                                </div>
                                {/* <Dropdown.Item
                                    className={styles.dropdownItem}
                                    onClick={handleExtendRequestClick}
                                >
                                    Extend Request
                                </Dropdown.Item> */}
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.extended_request_status === 1 &&
                                    (user.roleId === 1 || user.roleId === 8)
                                }
                            >
                                <div onClick={() => handle.extendReviewRequestClick(data)} className={`${styles.action} ${styles.extend} `}>
                                Review Extend Time
                                </div>
                    </Switch.Case>
                    </Switch>
                    <Switch>
                        <Switch.Case condition={data?.extended_request_status !== 1 &&
                                    (user.roleId === 1 || user.roleId === 8)}>
                            <span>--</span>
                        </Switch.Case>
                    </Switch>
               </div>
            
            )
        }
    },
];