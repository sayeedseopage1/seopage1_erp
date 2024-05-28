import CommentModal from "./CommentModal";

import { convertTime } from "../../../utils/converTime";
import ActionEvaluationTable from "./ActionEvaluationTable";
import AverageRatingSecondaryMetrics from "./AverageRatingSecondaryMetrics";
import AverageRating from "./AverageRating";
import EvaluationRevisionModal from "../modal/EvaluationRevisionModal";
import AssignedTasksData from "./AssignedTasksData";
import SubmittedTasksData from "./SubmittedTasksData";
import { User } from "../../../utils/user-details";
import ActionEvaluationRequiredRoundTable from "./ActionEvaluationRequiredRoundTable";
import AssignedTasksDataRequiredRound from "./AssignedTasksDataRequiredRound";
import SubmittedTasksDataRequiredRound from "./SubmittedTasksDataRequiredRound";
import TotalMinRequiredRound from "./TotalMinRequiredRound";
const auth = new User(window.Laravel.user);
export const EvaluationRoundHistoryTableColumns = [
    {
        id: "id",
        header: "Extended Round",
        accessorKey: "id",
        cell: ({ row }) => {
            return <div>Round-{row.index + 1}</div>;
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
                    <AssignedTasksDataRequiredRound
                        data={data}
                        round={row.index + 1}
                    />
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
                    <SubmittedTasksDataRequiredRound
                        data={data}
                        round={row.index + 1}
                    />
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
                    <TotalMinRequiredRound data={data} round={row.index + 1} />
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
                    <EvaluationRevisionModal
                        data={data}
                        round={row.index + 1}
                    />
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
        header: "Extended Date",
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

            return (
                <ActionEvaluationRequiredRoundTable
                    data={data}
                    round={row.index + 1}
                />
            );
        },
    },
];
