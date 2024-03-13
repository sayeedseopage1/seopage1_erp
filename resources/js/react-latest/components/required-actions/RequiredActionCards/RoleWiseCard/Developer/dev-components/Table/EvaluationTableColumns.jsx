import { ColumnContent } from "./ui";
import { IoIosSend } from "react-icons/io";
import "./index.css";
export const EvaluationTableColumns = [
    // {
    //     header: "#",
    //     accessorKey: "id",
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return <ColumnContent>{data?.id}</ColumnContent>;
    //     },
    // },
    {
        header: "Individual Task Name",
        accessorKey: "individualTaskName",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.individualTaskName}</div>;
        },
    },
    {
        header: "Assign Date",
        accessorKey: "assignDate",
        cell: ({ row }) => {
            const data = row.original;
            return <ColumnContent>{data?.assignDate}</ColumnContent>;
        },
    },
    {
        header: "Submission Date",
        accessorKey: "submissionDate",
        cell: ({ row }) => {
            const data = row.original;
            return <ColumnContent>{data?.submissionDate}</ColumnContent>;
        },
    },
    {
        header: "Total Hours Tracked",
        accessorKey: "totalHoursTracked",
        cell: ({ row }) => {
            const data = row.original;
            return <ColumnContent>{data?.totalHoursTracked}</ColumnContent>;
        },
    },
    {
        header: "Link to the Completed Work",
        accessorKey: "linkToTheCompletedWork",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a href={data.linkToTheCompletedWork}>
                    {data?.linkToTheCompletedWork}
                </a>
            );
        },
    },
    {
        header: "Number of Revision Needed",
        accessorKey: "numberOfRevisionsNeeded",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <ColumnContent>{data?.numberOfRevisionsNeeded}</ColumnContent>
            );
        },
    },

    {
        header: "Action",
        accessorKey: "action",

        cell: ({ row }) => {
            return (
                <ColumnContent>
                    <div className="btn">
                        <IoIosSend className="send" color="#fff" />
                        <IoIosSend className="send2" color="#696666" />
                        <p>Evaluate</p>
                    </div>
                </ColumnContent>
            );
        },
    },
];
