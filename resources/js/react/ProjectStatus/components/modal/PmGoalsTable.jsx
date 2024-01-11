import React from "react";

import PaginationPmGoalTable from "./PaginationPmGoalTable";
import DeadlineExplainModal from "./DeadlineExplainModal";

const PMGoalsTable = ({ isFetchingPmGoal, pmGoal }) => {
    const [projectId, setProjectId] = React.useState("900");
    // Table styles
    const tableStyle = {
        borderCollapse: "collapse",
        width: "100%",
        fontFamily: "Arial, sans-serif",
    };

    // Styles for table headers and cells
    const thTdStyle = {
        textAlign: "left",
        padding: "8px",
    };

    // Style for table headers with background color
    const thStyle = {
        ...thTdStyle,
        backgroundColor: "#f2f2f2",
    };

    //pagination start
    // Number of items to display per page
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    // Calculate the total number of pages
    const pageCount = Math.ceil(pmGoal.length / itemsPerPage);

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = React.useState(0);

    // Function to handle page change
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    // Function to handle items per page change
    const handleItemsPerPageChange = (e) => {
        const selectedItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        setCurrentPage(0); // Reset to the first page when changing items per page
    };
    //pagination end

    //modal
    const [isModalTwoOpen, setIsModalTwoOpen] = React.useState(false);

    const closeModalTwo = () => {
        setIsModalTwoOpen(false);
        setSelectedProjectName("");
    };

    // Calculate the starting and ending indices for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return (
        <div>
            {/* Table component */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>#</th>
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
                        {pmGoal.slice(startIndex, endIndex).map((goal) => (
                            <tr key={goal.id}>
                                <td style={thTdStyle}>{goal.id}</td>
                                <td style={thTdStyle}>
                                    {goal.goal_start_date}
                                </td>
                                <td style={thTdStyle}>{goal.goal_end_date}</td>
                                <td style={thTdStyle}>{goal.duration} Days</td>
                                <td style={thTdStyle}>
                                    {goal.reason ? goal.reason : "--"}
                                </td>
                                <td style={thTdStyle}>
                                    {goal.suggestion ? goal.suggestion : "--"}
                                </td>
                                <td style={thTdStyle}>
                                    {new Date(goal.goal_end_date) <
                                    new Date() ? (
                                        <button
                                            style={{
                                                color: "blue",
                                                padding: "3px",
                                            }}
                                            onClick={() => {
                                                setIsModalTwoOpen(true);
                                                setProjectId(goal.project_id);
                                            }}
                                        >
                                            Deadline Explanation
                                        </button>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            <PaginationPmGoalTable
                isFetchingPmGoal={isFetchingPmGoal}
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                handleItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPage={itemsPerPage}
            />
            <DeadlineExplainModal
                projectId={projectId}
                isModalTwoOpen={isModalTwoOpen}
                closeModalTwo={closeModalTwo}
            />
        </div>
    );
};

export default PMGoalsTable;
