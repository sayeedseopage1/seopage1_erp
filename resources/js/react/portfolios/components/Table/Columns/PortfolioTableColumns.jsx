import Button from "../../../../global/Button";
import ActionRating from "./ActionRating";

export const PortfolioTableColumns = [
    {
        id: "clientName",
        header: "Client",
        accessorKey: "clientName",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <a
                    className="portfolio-item-link"
                    href={`account/employees/${data?.clientId}`}
                    target="_blank"
                >
                    {data?.clientName}
                </a>
            );
        },
    },
    {
        id: "pmName",
        header: "Project Manager",
        accessorKey: "pmName",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <a
                    className="portfolio-item-link"
                    href={`account/employees/${data?.pmId}`}
                    target="_blank"
                >
                    {data?.pmName}
                </a>
            );
        },
    },
    {
        id: "portfolio_link",
        header: "Website URL",
        accessorKey: "portfolio_link",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <a
                    className="portfolio-item-link"
                    href={`${data?.portfolio_link}`}
                    target="_blank"
                >
                    {data?.portfolio_link?.slice(0, 30) + "..."}
                </a>
            );
        },
    },
    {
        id: "category_name",
        header: " Niche Category",
        accessorKey: "category_name",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.category_name}</div>;
        },
    },

    {
        id: "sub_category_name",
        header: "Sub Niche Category",
        accessorKey: "sub_category_name",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.sub_category_name}</div>;
        },
    },

    {
        id: "theme_name",
        header: "Theme",
        accessorKey: "theme_name",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.theme_name}</div>;
        },
    },
    {
        id: "cms_name",
        header: "Website CMS",
        accessorKey: "cms_name",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.cms_name}</div>;
        },
    },
    {
        id: "cms",
        header: " Website Type",

        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.category_name}</div>;
        },
    },

    {
        id: "rating_score",
        header: () => {
            return <div>Rate</div>;
        },
        accessorKey: "rating_score",
        cell: ({ row }) => {
            const data = row.original;

            return <ActionRating data={data} />;
        },
    },
];
