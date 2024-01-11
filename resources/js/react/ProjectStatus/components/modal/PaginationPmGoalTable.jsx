import React from "react";
import ReactPaginate from "react-paginate";
import { Flex } from "../table/ui";

const PaginationPmGoalTable = ({
    pageCount,
    handlePageClick,
    handleItemsPerPageChange,
    isFetchingPmGoal,
    itemsPerPage,
}) => {
    return (
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
    );
};

export default PaginationPmGoalTable;
