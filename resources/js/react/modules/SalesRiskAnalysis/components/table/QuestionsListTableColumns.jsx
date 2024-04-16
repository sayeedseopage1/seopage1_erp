// table columns
import { ExpandQuestion } from "../ExpandTable";

// ui components
import Tooltip from "../Tooltip";
import EditIcon from "../ui/EditIcon";
import Popover from "../Popover";
import Switch from "../Switch";

// styles
import popoverStyle from "../popover.module.css";
import { camelToFlat } from "../../../../utils/utils";
import { QuestionsTypes } from "../../constant";

export const QuestionsListTableColumns = [
    {
        id: "expend",
        header: "",
        cell: ({ row, table }) => {
            const { pageIndex } = table.getState();
            return (
                <ExpandQuestion row={row} table={table} pageIndex={pageIndex} />
            );
        },
    },
    {
        id: "question_list_title",
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
            const formatQuestionType = QuestionsTypes?.data.find(
                (item) => item?.name === data?.type
            );
            const action = table.options.meta;
            return (
                <div className="multiline-ellipsis d-flex justify-content-end align-items-end">
                    <Switch>
                        <Switch.Case
                            condition={formatQuestionType?.name !== "list"}
                        >
                            <Tooltip
                                text={formatQuestionType?.label}
                                key="type-tooltip"
                            >
                                {formatQuestionType?.label}
                            </Tooltip>
                        </Switch.Case>
                        <Switch.Case
                            condition={formatQuestionType?.name === "list"}
                        >
                            <Popover>
                                <Popover.Button>
                                    <div
                                        className={`${popoverStyle.questionModal_popover_button}`}
                                    >
                                        <p>{formatQuestionType?.label}</p>
                                    </div>
                                </Popover.Button>
                                {(data.type === "list" && data?.value?.length) >
                                    0 && (
                                    <Popover.Panel placement="bottom-start">
                                        <div
                                            className={`${popoverStyle.questionModal_popover_panel}`}
                                        >
                                            <ol className="d-flex flex-column justify-content-start align-items-start">
                                                {data?.value?.map(
                                                    (item, index) => (
                                                        <li
                                                            key={item.id}
                                                            className="py-1"
                                                        >
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
                    <div
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
                    </div>
                </div>
            );
        },
    },
];
