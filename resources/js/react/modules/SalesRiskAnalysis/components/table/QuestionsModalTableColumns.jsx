import Tooltip from "../Tooltip";
import EditIcon from "../ui/EditIcon";

export const QuestionsModalTableColumns = [
    {
        id: "title",
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={data?.title} key="title-tooltip">
                        {data?.title}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "ruleList",
        header: "Rules List",
        accessorKey: "ruleList",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="">
                    {data?.ruleList?.map((item) => item.title).join(", ")}
                </p>
            );
        },
    },
    {
        id: "parent_question",
        header: "Parent Question",
        accessorKey: "parent_question",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip
                        text={data?.parent_question?.title}
                        key="placeholder-tooltip"
                    >
                        {data?.parent_question?.title ?? "N/A"}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "placeholder",
        header: "Placeholder",
        accessorKey: "placeholder",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={data?.placeholder} key="placeholder-tooltip">
                        {data?.placeholder}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "questionType",
        header: "Type",
        accessorKey: "type",
        cell: ({ row ,table}) => {
            const data = row?.original;
            const action = table.options.meta;
            return (
                <p className="multiline-ellipsis d-flex justify-content-end align-items-end">
                    <Tooltip text={data?.type?.label} key="type-tooltip">
                        {data?.type?.label}
                    </Tooltip>
                    <div
                        onClick={() => {
                            action.editSingleQuestion(data);
                        }}
                        role="button"
                        className="ml-2"
                    >
                        <EditIcon />
                    </div>
                </p>
            );
        },
    },
];
