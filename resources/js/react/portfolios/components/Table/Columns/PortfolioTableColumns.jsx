import Button from "../../../../global/Button";

export const PortfolioTableColumns = [
    {
        id: "portfolio_link",
        header: "Website Url",
        accessorKey: "portfolio_link",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.portfolio_link?.slice(0, 30) + "..."}</div>;
        },
    },
    {
        id: "website_type",
        header: "Website Type",
        accessorKey: "website_type",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.website_type}</div>;
        },
    },
    {
        id: "theme_id",
        header: "Theme Id",
        accessorKey: "theme_id",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.theme_id}</div>;
        },
    },
    {
        id: "cms_category",
        header: "Cms Category",
        accessorKey: "cms_category",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.cms_category}</div>;
        },
    },
    {
        id: "sub_niche",
        header: "Sub Niche",
        accessorKey: "sub_niche",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.sub_niche}</div>;
        },
    },
    {
        id: "action",
        header: () => {
            return <div>Rate</div>;
        },
        accessorKey: "action",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div>
                    <Button variant="primary">Rate</Button>
                </div>
            );
        },
    },
];
