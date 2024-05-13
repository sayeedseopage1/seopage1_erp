import * as React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import styles from "../Styles/paginate.module.css";

const PointFactorsTablePagination = ({ handlePageSizeChange, handlePageChange, tableData, pageSize }) => {
    return (
        <div className="cnx__table_footer mt-3">
            <div className="__show_entries">
                <span>Show</span>
                <select
                    className="py-1 border rounded-sm"
                    onChange={handlePageSizeChange}
                    value={pageSize}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
                <span>entries</span>
            </div>

            <div className="__total_entries">
                Showing {tableData?.from} to {tableData?.to} of {tableData?.total} entries
            </div>

            {/* pagination */}
            <React.Fragment>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageChange}
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={tableData?.last_page ?? 1}
                    renderOnZeroPageCount={null}
                    containerClassName={styles.containerClassName}
                    pageLinkClassName={styles.pageLinkClassName}
                    activeLinkClassName={styles.activeLinkClassName}
                    previousLinkClassName={styles.pageLinkClassName}
                    nextLinkClassName={styles.pageLinkClassName}
                />
            </React.Fragment>
            {/* end pagination */}
        </div>
    );
};

export default PointFactorsTablePagination;

PointFactorsTablePagination.propTypes = {
    handlePageSizeChange: PropTypes.func,
    handlePageChange: PropTypes.func,
    tableData: PropTypes.object,
};
