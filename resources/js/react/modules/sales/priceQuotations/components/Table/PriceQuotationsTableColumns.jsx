import { FaEye } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import dayjs from "dayjs";

// Components -Styled Components
import { TableTdWrapper } from "../UI/StyledComponents";

// Components - UI
import PersonAvatar from "../Shared/PersonAvatar";
import TablePopover from "../Shared/TablePopover";

// Components - Logic - Global
import Switch from "../../../../../global/Switch";

// Helper
import { getAseDseColor } from "../../helper";
import { useState } from "react";

export const PriceQuotationsTableColumns = [
    {
        id: "clients",
        header: "Clients",
        accessorKey: "clients",
        cell: ({ row }) => {
            const dealStage = row.original.deal_stage;

            return (
                <Switch>
                    <Switch.Case
                        condition={
                            dealStage?.client_badge === "existing client" &&
                            dealStage?.client_details !== null
                        }
                    >
                        <PersonAvatar
                            avatar={dealStage?.client_details?.image_url}
                            imageParentClass="rounded-circle"
                            name={
                                dealStage?.client_details?.name ||
                                dealStage?.client_details?.user_name
                            }
                            imageClass="rounded-circle"
                            url={`/account/clients/${dealStage?.client_details?.id}`}
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            dealStage?.client_badge === "existing client" &&
                            dealStage?.client_details === null
                        }
                    >
                        <PersonAvatar
                            avatar={null} // New Client did't have an image, that's why we use null
                            imageParentClass="rounded-circle"
                            name={
                                dealStage?.client_name ||
                                dealStage?.client_username
                            }
                            imageClass="rounded-circle"
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            dealStage?.client_badge === "new client" &&
                            dealStage?.client_details === null
                        }
                    >
                        <PersonAvatar
                            avatar={null} // New Client did't have an image, that's why we use null
                            imageParentClass="rounded-circle"
                            name={
                                dealStage?.client_name ||
                                dealStage?.client_username
                            }
                            imageClass="rounded-circle"
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            dealStage?.client_badge === "new client" &&
                            dealStage?.client_details !== null
                        }
                    >
                        <PersonAvatar
                            avatar={dealStage?.client_details?.image_url}
                            imageParentClass="rounded-circle"
                            name={
                                dealStage?.client_details?.name ||
                                dealStage?.client_details?.user_name
                            }
                            imageClass="rounded-circle"
                            url={`/account/clients/${dealStage?.client_details?.id}`}
                        />
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "deal_name",
        header: "Deal name",
        accessorKey: "deal_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TablePopover
                    text={data?.deal_stage?.project_name}
                    btnClass="text-left"
                    isDangerHtml={false}
                />
            );
        },
    },
    {
        id: "requested_by",
        header: "Requested by",
        accessorKey: "requested_by",
        cell: ({ row }) => {
            const person = row?.original?.added_by;
            return (
                <PersonAvatar
                    avatar={person?.image_url}
                    key={person?.id}
                    imageParentClass="rounded-circle"
                    name={person?.name}
                    imageClass="rounded-circle"
                    url={`/account/employees/${person?.id}`}
                />
            );
        },
    },

    {
        id: "requested_on",
        header: "Requested on",
        accessorKey: "requested_on",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper>
                    {dayjs(data?.created_at).format("YYYY-MM-DD h:mm:ss A")}
                </TableTdWrapper>
            );
        },
    },
    {
        id: "primary_page",
        header: "Primary page",
        accessorKey: "primary_page",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper>
                    <p>
                        {data?.no_of_primary_pages
                            ? data?.no_of_primary_pages
                            : "--"}
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "secondary_page",
        header: "Secondary page",
        accessorKey: "secondary_page",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper>
                    <p>
                        {data?.no_of_secondary_pages
                            ? data?.no_of_secondary_pages
                            : "--"}
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "other_works_needed",
        header: "Other works needed",
        accessorKey: "other_works_needed",
        cell: ({ row }) => {
            const data = row.original;

            const getHourWithMin = (check) => {
                const duration = parseFloat(check);
                const getHours = parseInt(duration);
                const getMin = (duration - getHours) * 60;
                return `${getHours} Hours ${
                    getMin === 0 ? "" : ` ${Math.floor(getMin)} Min`
                }`;
            };
            return (
                <TableTdWrapper>
                    <p>
                        {getHourWithMin(data?.total_hours_of_others_works) ??
                            "--"}
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "system_suggested_price",
        header: "System sugg. price",
        accessorKey: "system_suggested_price",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper>
                    <p className="d-flex">
                        <Switch>
                            <Switch.Case
                                condition={
                                    data?.usd_budget_with_additional_percent
                                }
                            >
                                ${data?.usd_budget_with_additional_percent}{" "}
                                {/* <button className="sp1_price_quotation_column_sort_btn ml-2">
                                    <span
                                        className={`table_asc_dec ${getAseDseColor(
                                            data?.usd_budget_with_additional_percent
                                        )}`}
                                    ></span>
                                </button> */}
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    !data?.usd_budget_with_additional_percent
                                }
                            >
                                {"--"}
                            </Switch.Case>
                        </Switch>
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const dealData = row?.original?.deal_stage?.deal;

            return (
                <TableTdWrapper>
                    <p className="d-flex">
                        <Switch>
                            <Switch.Case condition={dealData}>
                                ${Number(dealData?.amount).toFixed(2)}{" "}
                                {/* <button className="sp1_price_quotation_column_sort_btn ml-2">
                                    <span
                                        className={`table_asc_dec ${getAseDseColor(
                                            Number(dealData?.amount).toFixed(2)
                                        )}`}
                                    ></span>
                                </button> */}
                            </Switch.Case>
                            <Switch.Case condition={!dealData}>
                                {"--"}
                            </Switch.Case>
                        </Switch>
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row, table }) => {
            const data = row.original;
            const action = table.options.meta;
            let status = false;

            const handleCopy = () => {
                status = true;
                action.copyToClipBoard(data);
                setTimeout(() => {
                    status = false;
                }, 1000);
            };

            return (
                <TableTdWrapper>
                    <button onClick={() => action.viewPDf(data)}>
                        <FaEye fill="var(--primaryBlue)" size={28} />
                    </button>
                    <ShowCopyItem
                        copyItem={data}
                        handleClipboard={action.copyToClipBoard}
                    />
                </TableTdWrapper>
            );
        },
    },
];

const ShowCopyItem = ({ copyItem, handleClipboard }) => {
    const [status, setStatus] = useState(false);

    const handleCopy = () => {
        setStatus(true);
        handleClipboard(copyItem);
        setTimeout(() => {
            setStatus(false);
        }, 1000);
    };

    return (
        <button onClick={handleCopy} className="ml-2">
            <Switch>
                <Switch.Case condition={status}>
                    <IoMdCheckmark fill="var(--primaryBlue)" size={28} />
                </Switch.Case>
                <Switch.Case condition={!status}>
                    <IoCopy fill="var(--primaryBlue)" size={28} />
                </Switch.Case>
            </Switch>
        </button>
    );
};
