import React from "react";
import _ from "lodash";
import Toaster from "../../../global/Toaster";
import PaginationPmGoalTable from "./PaginationPmGoalTable";
import DeadlineExplainModal from "./DeadlineExplainModal";
import { useAuth } from "../../../hooks/useAuth";
import ResolveModal from "./ResolveModal";
import { TableItem, TableRow } from "../table/ui";
import { Placeholder } from "../../../global/Placeholder";

const PMGoalsTable = ({ projectDetails, isFetchingPmGoal, pmGoal }) => {
    const auth = useAuth();
    const [projectPmGoalId, setProjectPmGoalId] = React.useState(1);
    const [pmGoalExtendReason, setPmGoalExtendReason] = React.useState("");
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
                        <th style={thStyle}>Comment</th>
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

                                <td
                                    style={thTdStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: goal.suggestion
                                            ? goal.suggestion
                                            : "--",
                                    }}
                                />

                                <td
                                    style={thTdStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: goal.admin_comment
                                            ? goal.admin_comment
                                            : "--",
                                    }}
                                />
                                <td style={thTdStyle}>
                                    {(() => {
                                        if (auth.roleId === 4) {
                                            if (!goal.reason) {
                                                if (
                                                    new Date(
                                                        goal.goal_end_date
                                                    ) < new Date()
                                                ) {
                                                    return (
                                                        <button
                                                            style={{
                                                                color: "blue",
                                                                padding: "3px",
                                                            }}
                                                            onClick={() => {
                                                                setProjectPmGoalId(
                                                                    goal.id
                                                                );
                                                                setIsModalTwoOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Deadline Explanation
                                                        </button>
                                                    );
                                                } else {
                                                    return "N/A";
                                                }
                                            }
                                        } else if (
                                            auth.roleId === 1 &&
                                            goal.reason
                                        ) {
                                            if (
                                                goal.admin_comment &&
                                                goal.suggestion
                                            ) {
                                                return (
                                                    <button
                                                        style={{
                                                            padding: "3px",
                                                        }}
                                                    >
                                                        Resolved
                                                    </button>
                                                );
                                            }
                                            return (
                                                <button
                                                    style={{
                                                        color: "blue",
                                                        padding: "3px",
                                                    }}
                                                    onClick={() => {
                                                        setIsModalThreeOpen(
                                                            true
                                                        );
                                                        setProjectPmGoalId(
                                                            goal.id
                                                        );
                                                        setPmGoalExtendReason(
                                                            goal.reason
                                                        );
                                                    }}
                                                >
                                                    Resolve
                                                </button>
                                            );
                                        }

                                        return "--"; // Default case
                                    })()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
                {isFetchingPmGoal &&
                    _.times(itemsPerPage, (item) => (
                        <TableRow key={item}>
                            {_.times(9, (col) => (
                                <TableItem key={col} className="py-3">
                                    <Placeholder />
                                </TableItem>
                            ))}
                        </TableRow>
                    ))}
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
                pmGoalExtendReason={pmGoalExtendReason}
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                isModalThreeOpen={isModalThreeOpen}
                closeModalThree={closeModalThree}
            />

            <Toaster />
        </div>
    );
};

export default PMGoalsTable;

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
