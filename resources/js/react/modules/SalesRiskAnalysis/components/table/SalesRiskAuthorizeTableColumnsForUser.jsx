import React from "react";
import Switch from "../Switch";

export const SalesRiskAuthorizeTableColumnsForUser = [
    {
        id: "questions_asked",
        header: "Questions Asked",
        accessorKey: "questions_asked",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <p
                    className=" py-3"
                    style={customStyles.subQuestion}
                >
                    {data?.title}
                </p>
            );
        },
    },
    {
        id: "answered_sales_person_for_user",
        header: "Answered by the Sales Person",
        accessorKey: "answered_sales_person",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <p className="text-right mr-3 py-3" style={customStyles.subQuestion}>
                    {data?.value ?? "-"}
                </p>
            );
        },
    },
];

// Define custom styles
const customStyles = {
    mainQuestion: {
        color: "#000",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
    },
    subQuestion: {
        color: "#8F8F8F",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
    },
    points: {
        color: "#000",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
    },
};
