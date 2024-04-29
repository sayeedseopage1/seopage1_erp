import * as React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import styles from "../Styles/paginate.module.css";

const SalesAnalysisReportTablePagination = ({
    handlePageSizeChange,
    handlePageChange,
    tableData,
    pageSize,
    reportStatus,
}) => {
    const [page, setPage] = React.useState(0);
    React.useEffect(() => {
        setPage(0);
    }, [reportStatus]);

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
                Showing {tableData?.from} to {tableData?.to} of{" "}
                {tableData?.total} entries
            </div>

            {/* pagination */}

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
                forcePage={page}
            />
            {/* end pagination */}
        </div>
    );
};

export default SalesAnalysisReportTablePagination;

SalesAnalysisReportTablePagination.propTypes = {
    handlePageSizeChange: PropTypes.func,
    handlePageChange: PropTypes.func,
    tableData: PropTypes.object,
    pageSize: PropTypes.number,
    reportStatus: PropTypes.string,
};
