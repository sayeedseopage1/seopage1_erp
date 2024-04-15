// table columns
import { ExpandQuestion } from "../ExpandTable";

// ui components
import Tooltip from "../Tooltip";
import EditIcon from "../ui/EditIcon";
import Popover from "../Popover";
import Switch from "../Switch";

// styles
import style from "../styles/questionModalTableColumns.module.css";
import popoverStyle from "../popover.module.css";
import { camelToFlat } from "../../../../utils/utils";

export const QuestionsModalTableColumns = [
    {
        id: "expend",
        header: "",
        cell: ({ row, table }) => {
            const { pageIndex } = table.getState();
            return <ExpandQuestion row={row} table={table} pageIndex={pageIndex} />;
        },
    },
    {
        id: "question_title",
        header: "Question Title",
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
        id: "question_type",
        header: "Question Key",
        accessorKey: "question_type",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={camelToFlat(data?.key)} key="title-tooltip">
                        {camelToFlat(data?.key)}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "policy_name",
        header: "Policy Name",
        accessorKey: "policy_name",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={data?.policy_title} key="title-tooltip">
                        {data?.policy_title}
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
        cell: ({ row, table }) => {
            const data = row?.original;
            const action = table.options.meta;
            return (
                <div className="multiline-ellipsis d-flex justify-content-end align-items-end">
                    <Switch>
                        <Switch.Case condition={data?.type?.name !== "list"}>
                            <Tooltip
                                text={data?.type?.label}
                                key="type-tooltip"
                            >
                                {data?.type?.label}
                            </Tooltip>
                        </Switch.Case>
                        <Switch.Case condition={data?.type?.name === "list"}>
                            <Popover>
                                <Popover.Button>
                                    <div
                                        className={`${popoverStyle.questionModal_popover_button}`}
                                    >
                                        <p>{data?.type?.label}</p>
                                    </div>
                                </Popover.Button>
                                {data?.listItem?.length > 0 && (
                                    <Popover.Panel placement="bottom-start">
                                        <div
                                            className={`${popoverStyle.questionModal_popover_panel}`}
                                        >
                                            <ol className="d-flex flex-column justify-content-start align-items-start">
                                                {data?.listItem?.map(
                                                    (item, index) => (
                                                        <li key={item.id}>
                                                            {index + 1}.{" "}
                                                            {item?.title}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    </Popover.Panel>
                                )}
                            </Popover>
                        </Switch.Case>
                    </Switch>
                    {/* <div
                        onClick={() => {
                            action.editSingleQuestion(data);
                        }}
                        role="button"
                        tabIndex="0"
                        className="ml-2"
                        onKeyDown={() => {
                            action.editSingleQuestion(data);
                        }}
                    >
                        <EditIcon />
                    </div> */}
                </div>
            );
        },
    },
];

