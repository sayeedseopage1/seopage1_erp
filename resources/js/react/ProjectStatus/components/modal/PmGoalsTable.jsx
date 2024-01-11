import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Flex } from "../table/ui";

const PMGoalsTable = ({ isFetchingPmGoal, pmGoal }) => {
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

    // Number of items to display per page
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Calculate the total number of pages
    const pageCount = Math.ceil(pmGoal.length / itemsPerPage);

    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(0);

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
                                <td style={thTdStyle}>N\A</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            {/* Entries per page dropdown bar */}

            <Flex justifyContent="space-between" margin="20px 30px 0px 30px">
                <Flex style={{ marginBottom: "10px" }}>
                    <div htmlFor="itemsPerPage">Show</div>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        {[5, 10, 15, 20].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div>Entries</div>
                </Flex>

                {/* Pagination component */}
                {!isFetchingPmGoal && (
                    <Flex justifyContent="space-between">
                        <div>Showing to of entries</div>
                        <ReactPaginate
                            pageCount={pageCount}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </Flex>
                )}
            </Flex>
        </div>
    );
};

export default PMGoalsTable;
