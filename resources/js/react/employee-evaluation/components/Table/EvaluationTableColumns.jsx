import Person from "./Person";

import CommentModal from "./CommentModal";
import { User } from "../../../utils/user-details";
import FormatDate from "../../../utils/FormateDate";
import { convertTime } from "../../../utils/converTime";
import ActionEvaluationTable from "./ActionEvaluationTable";
import AverageRatingSecondaryMetrics from "./AverageRatingSecondaryMetrics";
import AverageRating from "./AverageRating";
import EvaluationRevisionModal from "../modal/EvaluationRevisionModal";

import EvaluationRoundHistoryModal from "../modal/EvaluationRoundHistoryModal";
import AssignedTasksData from "./AssignedTasksData";
import SubmittedTasksData from "./SubmittedTasksData";
import TotalMin from "./TotalMin";

const auth = new User(window.Laravel.user);

export const EvaluationTableColumns = [
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
        id: "role_name",
        header: "Role",
        accessorKey: "role_name",
        cell: ({ row }) => {
            const data = row.original;

            return data?.role_name ? (
                <span>{data?.role_name}</span>
            ) : (
                <span>Trainee</span>
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
        id: "round_requied",
        header: "Rounds Required",
        accessorKey: "round_requied",
        cell: ({ row }) => {
            const data = row.original;
            return <EvaluationRoundHistoryModal data={data} />;
        },
    },
    {
        id: "total_task_assigned",
        header: "Total Task Assigned",
        accessorKey: "total_task_assigned",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <AssignedTasksData data={data} />
                </div>
            );
        },
    },
    {
        id: "total_task_submit",
        header: "Total Task Submitted",
        accessorKey: "total_task_submit",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <SubmittedTasksData data={data} />
                </div>
            );
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
                    <TotalMin data={data} />
                </div>
            );
        },
    },
    {
        id: "total_revision",
        header: "Total Number of Revisions",
        accessorKey: "total_revision",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <EvaluationRevisionModal data={data} />
                </div>
            );
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
                    <AverageRating data={data} />
                </div>
            );
        },
    },
    {
        id: "communication",
        header: "Avg. ratings for secondary metrics",
        accessorKey: "communication",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <AverageRatingSecondaryMetrics data={data} />
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
