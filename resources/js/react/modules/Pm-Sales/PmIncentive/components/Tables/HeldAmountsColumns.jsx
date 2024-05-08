import _ from "lodash";

export const HeldAmountsColumns = [
    {
        id: "month",
        header: "Month",
        accessorKey: "month",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <span
                        style={{
                            color: "#000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                        className="py-3"
                    >
                        {data?.month}
                    </span>
                </div>
            );
        },
    },
    {
        id: "title",
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <span
                        style={{
                            color: "#000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                        className="py-3"
                    >
                        {data?.title}
                        <div>(For the month of {data?.month})</div>
                    </span>
                </div>
            );
        },
    },
    {
        id: "total_amount",
        header: "Total Amount",
        accessorKey: "total_amount",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <span
                        style={{
                            color: "#000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                        className="py-3"
                    >
                        {data?.total_amount}
                    </span>
                </div>
            );
        },
    },

];
