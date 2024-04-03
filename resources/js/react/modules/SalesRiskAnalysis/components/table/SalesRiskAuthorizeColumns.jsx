import React from "react";
import Switch from "../Switch";

export const SalesRiskAuthorizeColumns = [
    {
        id: "questions_asked",
        header: "Questions Asked",
        accessorKey: "questions_asked",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex flex-column justify-content-center align-items-start">
                    {data?.questions?.map((question, index) => (
                        <Switch key={question.id}>
                            <Switch.Case
                                condition={question?.parent_id === null}
                            >
                                <div key={question?.id} className="py-3">
                                    <p style={customStyles.mainQuestion}>
                                        {question?.question}
                                    </p>
                                </div>
                            </Switch.Case>
                            <Switch.Case condition={question?.parent_id}>
                                <div key={question?.id} className="ml-2 py-3">
                                    <p style={customStyles.subQuestion}>
                                        {question?.question}
                                    </p>
                                </div>
                            </Switch.Case>
                        </Switch>
                    ))}
                </div>
            );
        },
    },
    {
        id: "answered_sales_person",
        header: "Answered by the Sales Person",
        accessorKey: "answered_sales_person",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {data?.questions?.map((question) => (
                        <div key={question?.id} className="py-3">
                            <p
                                className="text-center"
                                style={customStyles.subQuestion}
                            >
                                {question?.answer}
                            </p>
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        id: "authorize_points",
        header: "Points",
        accessorKey: "points",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-end align-items-center pr-3">
                    <span style={customStyles.points}>{data.points}</span>
                </div>
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
