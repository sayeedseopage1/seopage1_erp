// table columns
import { ExpandTask } from "../ExpandTable";

// ui components
import Tooltip from "../Tooltip";
import EditIcon from "../ui/EditIcon";
import Popover from "../Popover";
import Switch from "../Switch";

// styles
import style from "../styles/questionModalTableColumns.module.css";
import popoverStyle from "../popover.module.css";

export const QuestionsModalTableColumns = [
    {
        id: "expend",
        header: "",
        cell: ({ row, table }) => {
            const { pageIndex } = table.getState();
            return <ExpandTask row={row} table={table} pageIndex={pageIndex} />;
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
        id: "ruleList",
        header: "Rules List",
        accessorKey: "ruleList",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div
                    className="d-flex flex-wrap "
                    style={{
                        width: "fit-content",
                    }}
                >
                    {data?.ruleList?.length > 0
                        ? data?.ruleList?.map((item, index) => (
                              <span
                                  className={`${style?.ruleItem} ${
                                      index !== 0 ? "ml-1" : ""
                                  } mb-1`}
                                  key={item.id}
                              >
                                  {item?.title}
                              </span>
                          ))
                        : "No Rules"}
                </div>
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

