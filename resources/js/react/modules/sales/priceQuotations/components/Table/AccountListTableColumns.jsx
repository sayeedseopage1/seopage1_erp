import { FaRegEdit } from "react-icons/fa";
import { Switch as AntdSwitch } from "antd";
import { isURL } from "validator";

// Components -Styled Components
import { TableTdWrapper } from "../UI/StyledComponents";

// Components - UI
import Switch from "../../../../../global/Switch";

// Constants
import { PlatformOptions, ProfileTypeOptions } from "../../constant";

export const AccountListTableColumns = [
    {
        id: "platform",
        header: "Platform",
        accessorKey: "platform",
        cell: ({ row }) => {
            const data = row.original;
            const platform = PlatformOptions.find(
                (item) => item.id === data?.type
            );

            const Icons = platform?.icon;

            return (
                <TableTdWrapper justifyContent="flex-start">
                    <Switch>
                        <Switch.Case condition={platform.type === "svg"}>
                            <Icons
                                fill={platform?.color}
                                size={23}
                                className="mr-2"
                            />
                        </Switch.Case>
                        <Switch.Case condition={platform.type === "img"}>
                            <img
                                src={platform?.icon}
                                alt={platform?.name}
                                className="mr-2"
                                width={23}
                                height={23}
                            />
                        </Switch.Case>
                    </Switch>
                    <p>{platform?.name ?? "--"}</p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "name",
        header: "Name",
        accessorKey: "name",
    },
    {
        id: "username",
        header: "User name",
        accessorKey: "username",
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
                            <a className="singleline-ellipsis" href={data?.user_url}>{data?.user_url}</a>
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
        id: "email",
        header: "Account email",
        accessorKey: "email",
    },
    {
        id: "profile_type",
        header: "Profile type",
        accessorKey: "profile_type",
        cell: ({ row }) => {
            const data = row.original;
            const profileType = ProfileTypeOptions.find(
                (item) => item.id === data?.profile_type
            );
            return (
                <TableTdWrapper justifyContent="center">
                    <p>{profileType?.name ?? "--"}</p>
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
                    <p>{data?.generated_on ? data?.generated_on?.split(" ")[0] : "--"}</p>
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
        cell: ({ row, table }) => {
            const data = row.original;
            const action = table.options.meta;
            return (
                <TableTdWrapper justifyContent="center">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            action.editPlatformAccount(data);
                        }}
                    >
                        <FaRegEdit fill="var(--primarySuccess)" size={23} />
                    </button>
                    <button
                        onClick={() => {
                            action.disablePlatformAccount(data);
                        }}
                        className="ml-2 antd_custom_switch"
                    >
                        <AntdSwitch checked={data?.status} />
                    </button>
                </TableTdWrapper>
            );
        },
    },
];
