export const PointFactorsColumns = [
    {
        id: "criteria",
        header: "Criteria",
        accessorKey: "criteria",
        cell: ({ row }) => {
            const data = row?.original;
            console.log("data", data);
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <span
                        style={{
                            color: "#000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        {data?.title}
                    </span>
                </div>
            );
        },
    },
    {
        id: "factors",
        header: "Factors",
        accessorKey: "factors",
        cell: ({ row, table }) => {
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <span
                        style={{
                            color: "#8F8F8F",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        Factors
                    </span>
                </div>
            );
        },
    },
    {
        id: "factors_points",
        header: "Points",
        accessorKey: "factors_points",
        cell: ({ row, table }) => {
            return (
                <div className="d-flex justify-content-end align-items-center">
                    <span
                        style={{
                            color: "#8F8F8F",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        Points
                    </span>
                </div>
            );
        },
    },

];
