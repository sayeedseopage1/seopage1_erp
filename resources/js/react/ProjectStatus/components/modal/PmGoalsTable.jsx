import React from "react";

const PMGoalsTable = ({ isFetchingPmGoal, pmGoal }) => {
    const tableStyle = {
        borderCollapse: "collapse",
        width: "100%",
        fontFamily: "Arial, sans-serif",
    };

    const thTdStyle = {
        textAlign: "left",
        padding: "8px",
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: "#f2f2f2",
    };

    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Goal Start Date</th>
                    <th style={thStyle}>Goal DeadLine</th>
                    <th style={thStyle}>Duration</th>
                    <th style={thStyle}>Suggestion</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Action</th>
                </tr>
            </thead>
            {!isFetchingPmGoal && (
                <tbody>
                    {pmGoal.map((goal) => (
                        <tr key={goal.id}>
                            <td style={thTdStyle}>{goal.id}</td>
                            <td style={thTdStyle}>{goal.goal_start_date}</td>
                            <td style={thTdStyle}>{goal.goal_end_date}</td>
                            <td style={thTdStyle}>{goal.duration}</td>
                            <td style={thTdStyle}>{goal.suggestion}</td>
                            <td style={thTdStyle}>{goal.reason}</td>
                            <td style={thTdStyle}></td>
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
};

export default PMGoalsTable;
