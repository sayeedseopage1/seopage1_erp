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

            {/* Pagination component with added styles */}
            {!isFetchingPmGoal && (
                <Flex justifyContent="space-between" alignItems="center">
                    <div>Showing 1 to {itemsPerPage} of 1 entries</div>
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={3}
                        php
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                        previousStyle={{ padding: "10px" }}
                        nextStyle={{ padding: "10px" }}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default PaginationPmGoalTable;
