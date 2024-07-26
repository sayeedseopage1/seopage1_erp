import AverageRatingSecondaryMetrics from "../../../components/Table/AverageRatingSecondaryMetrics";
import { User } from "../../../../utils/user-details";
import AssignedTasksDataRequiredRound from "../../../components/Table/AssignedTasksDataRequiredRound";
import SubmittedTasksDataRequiredRound from "../../../components/Table/SubmittedTasksDataRequiredRound";
import TotalMinRequiredRound from "../../../components/Table/TotalMinRequiredRound";
// import EvaluationRevisionModalRequiredRound from "../../../components/modal/EvaluationRevisionModalRequiredRound";
import AverageRatingRequiredRound from "../../../components/Table/AverageRatingRequiredRound";
import CommentModal from "../../../components/Table/CommentModal";
import ActionEvaluationRequiredRoundTablePM from "./ActionEvaluationRequiredRoundTableLD";
import EvaluationRevisionModal from "../../../components/modal/EvaluationRevisionModal";
import ActionEvaluationRequiredRoundTableLD from "./ActionEvaluationRequiredRoundTableLD";
const auth = new User(window.Laravel.user);
export const EvaluationRoundHistoryTableColumnsLD = [
    {
        id: "id",
        header: "Round No.",
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
        id: "team_lead_avg_rating",
        header: "Team Lead Average Rating",
        accessorKey: "team_lead_avg_rating",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    <AverageRatingRequiredRound
                        data={data}
                        round={row.index + 1}
                    />
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
                <ActionEvaluationRequiredRoundTableLD
                    data={data}
                    round={row.index + 1}
                />
            );
        },
    },
];
