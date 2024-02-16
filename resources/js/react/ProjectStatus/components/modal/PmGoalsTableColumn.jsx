import { User } from "../../../utils/user-details";
import Switch from "../Switch";
import styles from "../styles/pm-goals-table-column.module.css";


export const PmGoalsTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
    },
    {
        id: "goal_start_date",
        header: "Goal Start Date",
        accessorKey: "goal_start_date",
    },
    {
        id: "goal_end_date",
        header: "Goal DeadLine",
        accessorKey: "goal_end_date",
    },
    {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
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
        cell: ({ row }) => {
            const data = row?.original;
            const user = new User(window?.Laravel?.user)
            console.log(user)
            return (
               <div className="d-flex">
                <Switch>
                    <Switch.Case condition={data?.status === "pending"}>

                    </Switch.Case>
                </Switch>
                <div className={`${styles.action} ${styles.extend} f-12`}> Extend Request </div>
               </div>
            
            )
        }
    },
];