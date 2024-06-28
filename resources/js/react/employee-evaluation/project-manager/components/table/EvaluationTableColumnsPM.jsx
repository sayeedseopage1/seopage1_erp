import CommentModal from "../../../components/Table/CommentModal";
import TotalMin from "../../../components/Table/TotalMin";
import EvaluationRoundHistoryModal from "../../../components/modal/EvaluationRoundHistoryModal";
import EvaluationRevisionModal from "../../../components/modal/EvaluationRevisionModal";
import AverageRating from "../../../components/Table/AverageRating";
import AverageRatingSecondaryMetrics from "../../../components/Table/AverageRatingSecondaryMetrics";

import FormatDate from "../../../../utils/FormateDate";
import Person from "../../../components/Table/Person";
import ActionEvaluationTablePM from "./ActionEvaluationTablePM";
import AssignedTasksData from "../../../components/Table/AssignedTasksData";
import SubmittedTasksData from "../../../components/Table/SubmittedTasksData";
import EvaluationRoundHistoryModalPM from "../modal/EvaluationRoundHistoryModalPM";
import EvaluationRevisionModalPM from "../modal/EvaluationRevisionModalPM";

export const EvaluationTableColumnsPM = [
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
            return <div>{FormatDate(data?.firstTaskAssignOn)}</div>;
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
        header: "Previous Round",
        accessorKey: "round_requied",
        cell: ({ row }) => {
            const data = row.original;
            return <EvaluationRoundHistoryModalPM data={data} />;
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
                    <EvaluationRevisionModalPM data={data} />
                </div>
            );
        },
    },
    {
        id: "team_lead_avg_rating",
        header: "Team Lead Average Rating",
        accessorKey: "team_lead_avg_rating",
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

            return <ActionEvaluationTablePM data={data} />;
        },
    },
];
