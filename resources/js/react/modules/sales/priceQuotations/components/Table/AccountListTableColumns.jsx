import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

// Components -Styled Components
import { TableTdWrapper } from "../UI/StyledComponents";

// Components - UI
import PersonAvatar from "../Shared/PersonAvatar";
import TablePopover from "../Shared/TablePopover";
import Switch from "../../../../../global/Switch";
import { isURL } from "validator";

export const AccountListTableColumns = [
    {
        id: "platform",
        header: "Platform",
        accessorKey: "platform",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="flex-start">
                    <p>{data?.platform ? data?.platform : "--"}</p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "user_name",
        header: "User name",
        accessorKey: "user_name",
    },
    {
        id: "user_url",
        header: "User URL",
        accessorKey: "user_url",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="flex-start">
                    <Switch>
                        <Switch.Case condition={isURL(data?.user_url)}>
                            <a href={data?.user_url}>{data?.user_url}</a>
                        </Switch.Case>
                        <Switch.Case condition={!isURL(data?.user_url)}>
                            <p>{data?.user_url ?? "--"}</p>
                        </Switch.Case>
                    </Switch>
                </TableTdWrapper>
            );
        },
    },

    {
        id: "account_email",
        header: "Account email",
        accessorKey: "account_email",
    },
    {
        id: "profile_type",
        header: "Profile type",
        accessorKey: "profile_type",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="center">
                    <p>{data?.profile_type ? data?.profile_type : "--"}</p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "generated_on",
        header: "Generated on",
        accessorKey: "generated_on",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="center">
                    <p>{data?.generated_on ? data?.generated_on : "--"}</p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "multiplying_factor",
        header: "Multiplying factor",
        accessorKey: "multiplying_factor",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="center">
                    <p>
                        {data?.multiplying_factor
                            ? data?.multiplying_factor
                            : "--"}
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TableTdWrapper justifyContent="center">
                    <button>
                        <FaRegEdit fill="var(--primarySuccess)" size={23} />
                    </button>
                    <button className="ml-2">
                        <MdDelete fill="var(--primaryDanger)" size={23} />
                    </button>
                </TableTdWrapper>
            );
        },
    },
];
