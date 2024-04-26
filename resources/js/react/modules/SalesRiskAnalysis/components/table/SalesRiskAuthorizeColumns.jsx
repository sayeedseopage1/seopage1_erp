import React from "react";
import Switch from "../Switch";
import Tooltip from "../Tooltip";

export const SalesRiskAuthorizeColumns = [
    {
        id: "questions_asked",
        header: "Questions Asked",
        accessorKey: "questions_asked",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <table className="d-flex flex-column justify-content-center align-items-start">
                    {data?.questionAnswer?.map((question) => {
                        return (
                            <Switch key={question.id}>
                                <Switch.Case
                                    condition={question?.parent_id !== null}
                                    key={question?.id}
                                >
                                    <td key={question?.id} className="py-3 ">
                                        <Tooltip
                                            className="d-flex align-items-center"
                                            text={question?.title}
                                        >
                                            <p
                                                className="singleline-ellipsis"
                                                style={
                                                    customStyles.mainQuestion
                                                }
                                            >
                                                {question?.title}
                                            </p>
                                        </Tooltip>
                                    </td>
                                </Switch.Case>
                                <Switch.Case
                                    condition={question?.parent_id === null}
                                    key={question?.id}
                                >
                                    <td key={question?.id} className="py-3 ">
                                        <Tooltip
                                            className="d-flex align-items-center"
                                            text={question?.title}
                                        >
                                            <p
                                                className="singleline-ellipsis"
                                                style={
                                                    customStyles.mainQuestion
                                                }
                                            >
                                                {question?.title}
                                            </p>
                                        </Tooltip>
                                    </td>
                                </Switch.Case>
                            </Switch>
                        );
                    })}
                </table>
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
                <table className="d-flex flex-column justify-content-center align-items-center">
                    {data?.questionAnswer?.map((question) => (
                        <td key={question?.id} className="py-3">
                            <p
                                className="text-center"
                                style={customStyles.subQuestion}
                            >
                                {question?.value ?? "-"}
                            </p>
                        </td>
                    ))}
                </table>
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
                    <Switch>
                        <Switch.Case condition={data.key === "hourlyRate"}>
                            {data?.points.length > 0 ? (
                                <span style={customStyles.points}>
                                    {data?.points[0]}($
                                    {Number(data?.points[1]).toFixed(2)}/hours)
                                </span>
                            ) : (
                                <span>-</span>
                            )}
                        </Switch.Case>
                        <Switch.Case condition={data.key !== "hourlyRate"}>
                            <span style={customStyles.points}>
                                {data.points}
                            </span>
                        </Switch.Case>
                    </Switch>
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