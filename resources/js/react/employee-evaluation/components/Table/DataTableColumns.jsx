import Person from "./Person";

import CommentModal from "./CommentModal";
import { User } from "../../../utils/user-details";
import FormatDate from "../../../utils/FormateDate";
import { convertTime } from "../../../utils/converTime";
import ActionEvaluationTable from "./ActionEvaluationTable";
const auth = new User(window.Laravel.user);
export const DataTableColumns = [
    {
        id: "user_name",
        header: "Employee Name",
        accessorKey: "user_name",
        cell: ({ row }) => {
            const data = row.original;

            return data?.user_name ? (
                <Person
                    url={`/account/employees/${data?.user_id}`}
                    name={data?.user_name}
                    avatar={null}
                />
            ) : (
                <span style={{ fontWeight: "bold", color: "gray" }}>N/A</span>
            );
        },
    },
    {
        id: "join_date",
        header: "Joining Date",
        accessorKey: "join_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.join_date)}</div>;
        },
    },
    {
        id: "first_task_assign_on",
        header: "First Task Assigned On",
        accessorKey: "first_task_assign_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.first_task_assign_on)}</div>;
        },
    },
    {
        id: "started_working_on",
        header: "Started Working On",
        accessorKey: "started_working_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.started_working_on)}</div>;
        },
    },
    {
        id: "total_task_assigned",
        header: "Total Task Assigned",
        accessorKey: "total_task_assigned",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.total_task_assigned}</div>;
        },
    },
    {
        id: "total_task_submit",
        header: "Total Task Submitted",
        accessorKey: "total_task_submit",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.total_task_submit}</div>;
        },
    },
    {
        id: "total_minutes",
        header: "Total Hours Tracked",
        accessorKey: "total_minutes",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    {convertTime(data?.total_minutes)}
                </div>
            );
        },
    },
    {
        id: "totalNoOfRevision",
        header: "Total Number of Revisions",
        accessorKey: "totalNoOfRevision",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalNoOfRevision}</div>;
        },
    },
    {
        id: "lead_dev_avg_rating",
        header: "Lead Developer Average Rating",
        accessorKey: "lead_dev_avg_rating",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    {data?.lead_dev_avg_rating}
                </div>
            );
        },
    },
    {
        id: "team_lead_cmnt",
        header: "Team Lead Comment",
        accessorKey: "team_lead_cmnt",
        cell: ({ row }) => {
            const data = row.original;

            if (auth.roleId !== 6) {
                return <CommentModal comment={data?.team_lead_cmnt} />;
            } else {
                return <div style={{ marginLeft: "50px" }}>N/A</div>;
            }
        },
    },

    {
        id: "managements_cmnt",
        header: "Managements Comment",
        accessorKey: "managements_cmnt",
        cell: ({ row }) => {
            const data = row.original;

            return <CommentModal comment={data?.managements_cmnt} />;
        },
    },
    {
        id: "accept_rejected",
        header: "Accepted/Rejected Date",
        accessorKey: "accept_rejected",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.accept_rejected === ""
                        ? "--"
                        : data?.accept_rejected}
                </div>
            );
        },
    },

    {
        id: "action",
        header: "Status",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionEvaluationTable data={data} />;
        },
    },
];
