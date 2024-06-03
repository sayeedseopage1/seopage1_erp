// Components -Styled Components
import { CreatedBy } from "../../../../../ProjectStatus/components/table/ui";
import { TableTdWrapper } from "../UI/StyledComponents";

// Components - UI
import PersonAvatar from "../Shared/PersonAvatar";
import TablePopover from "../Shared/TablePopover";
import Switch from "../../../../../global/Switch";

export const PriceQuotationsTableColumns = [
    {
        id: "clients",
        header: "Clients",
        accessorKey: "clients",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <PersonAvatar
                    avatar={data.client_image}
                    key={data.client_name}
                    imageParentClass="rounded-circle"
                    name={data.client_name}
                    imageClass="rounded-circle"
                    url={`/account/clients/${data?.client_id}`}
                />
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
                    text={data?.deal_name}
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
            const data = row.original;
            return (
                <PersonAvatar
                    avatar={data.requested_by_image}
                    key={data.requested_by_id}
                    imageParentClass="rounded-circle"
                    name={data.requested_by_name}
                    imageClass="rounded-circle"
                    url={`/account/employees/${data?.requested_by_id}`}
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
                    <p>{data?.requested_on ? data?.requested_on : "--"}</p>
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
                    <p>{data?.primary_page ? data?.primary_page : "--"}</p>
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
                    <p>{data?.secondary_page ? data?.secondary_page : "--"}</p>
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
            return (
                <TableTdWrapper>
                    <p>
                        {data?.other_works_needed
                            ? data?.other_works_needed
                            : "--"}
                    </p>
                </TableTdWrapper>
            );
        },
    },
    {
        id: "system_suggested_price",
        header: "System suggested price",
        accessorKey: "system_suggested_price",
        cell: ({ row }) => {
            const data = row.original;
            const getColor = (value) => {
                if (value <= 2000) {
                    return "priceDec";
                } else if (value > 2000) {
                    return "priceAse";
                }
            };
            return (
                <TableTdWrapper>
                    <p className="d-flex">
                        <Switch>
                            <Switch.Case
                                condition={data?.system_suggested_price}
                            >
                                $ {data?.system_suggested_price}{" "}
                                <button className="sp1_price_quotation_column_sort_btn ml-2">
                                    <span
                                        className={`table_asc_dec ${getColor(
                                            data?.project_budget
                                        )}`}
                                    ></span>
                                </button>
                            </Switch.Case>
                            <Switch.Case
                                condition={!data?.system_suggested_price}
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
            const data = row.original;
            const getColor = (value) => {
                if (value <= 2000) {
                    return "priceDec";
                } else if (value > 2000) {
                    return "priceAse";
                }
            };
            return (
                <TableTdWrapper>
                    <p className="d-flex">
                        <Switch>
                            <Switch.Case condition={data?.project_budget}>
                                $ {data?.project_budget}{" "}
                                <button className="sp1_price_quotation_column_sort_btn ml-2">
                                    <span
                                        className={`table_asc_dec ${getColor(
                                            data?.project_budget
                                        )}`}
                                    ></span>
                                </button>
                            </Switch.Case>
                            <Switch.Case condition={!data?.project_budget}>
                                {"--"}
                            </Switch.Case>
                        </Switch>
                    </p>
                </TableTdWrapper>
            );
        },
    },
];
