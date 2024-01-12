import React from "react";

import PaginationPmGoalTable from "./PaginationPmGoalTable";
import DeadlineExplainModal from "./DeadlineExplainModal";
import { useAuth } from "../../../hooks/useAuth";
import ResolveModal from "./ResolveModal";
const PMGoalsTable = ({ projectDetails, isFetchingPmGoal, pmGoal }) => {
    const auth = useAuth();
    const [projectPmGoalId, setProjectPmGoalId] = React.useState(1);
    // Table styles
    const tableStyle = {
        borderCollapse: "collapse",
        width: "100%",
    };

    // Styles for table headers and cells
    const thTdStyle = {
        textAlign: "center",

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

    //deadline explanation modal
    const [isModalTwoOpen, setIsModalTwoOpen] = React.useState(false);

    const closeModalTwo = () => {
        setIsModalTwoOpen(false);
    };

    //resolve modal

    const [isModalThreeOpen, setIsModalThreeOpen] = React.useState(false);

    const closeModalThree = () => {
        setIsModalThreeOpen(false);
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
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Reason</th>
                        <th style={thStyle}>Suggestion</th>
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
                                    {goal.description ? goal.description : "--"}
                                </td>
                                <td
                                    style={thTdStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: goal.reason
                                            ? goal.reason
                                            : "--",
                                    }}
                                />

                                <td style={thTdStyle}>
                                    {goal.suggestion ? goal.suggestion : "--"}
                                </td>
                                <td style={thTdStyle}>
                                    {auth.roleId === 4 && !goal.reason ? (
                                        new Date(goal.goal_end_date) <
                                        new Date() ? (
                                            <button
                                                style={{
                                                    color: "blue",
                                                    padding: "3px",
                                                }}
                                                onClick={() => {
                                                    setProjectPmGoalId(goal.id);
                                                    setIsModalTwoOpen(true);
                                                }}
                                            >
                                                Deadline Explanation
                                            </button>
                                        ) : (
                                            "N/A"
                                        )
                                    ) : (
                                        <button
                                            style={{
                                                color: "blue",
                                                padding: "3px",
                                            }}
                                            onClick={() => {
                                                setIsModalThreeOpen(true);
                                                setProjectPmGoalId(goal.id);
                                            }}
                                        >
                                            Resolve
                                        </button>
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
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                isModalTwoOpen={isModalTwoOpen}
                closeModalTwo={closeModalTwo}
            />

            <ResolveModal
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                isModalThreeOpen={isModalThreeOpen}
                closeModalThree={closeModalThree}
            />
        </div>
    );
};

export default PMGoalsTable;
