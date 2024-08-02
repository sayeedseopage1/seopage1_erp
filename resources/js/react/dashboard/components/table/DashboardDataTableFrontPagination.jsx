import * as React from "react";
import PropTypes from "prop-types";

import Button from "../../../global/Button";

const DashboardDataTableFrontPagination = ({
    currentPage = 1,
    perPageRow = 10,
    onPaginate,
    totalEntry = 0,
    onNext,
    disableNext,
    onPrevious,
    disablePrevious,
    totalPages,
    onPageSize,
}) => {
    const [renderButtons, setRenderButtons] = React.useState([]);

    // const entryChange = React.useMemo(() => totalEntry, [totalEntry])
    const isTotalPagesChange = React.useMemo(() => totalPages, [totalPages]);
    const showingFrom = (currentPage - 1) * perPageRow;
    const sum = showingFrom + perPageRow;
    const showingTo = sum < totalEntry ? sum : totalEntry;

    const generateButtons = (start, end) => {
        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }
        return buttons;
    };

    const handleRenderButtons = React.useCallback(() => {
        let buttons = [];
        if (totalPages <= 7) {
            buttons = generateButtons(1, totalPages);
        } else if (currentPage <= 3) {
            buttons = generateButtons(1, 4);
        } else if (currentPage >= totalPages - 3) {
            buttons = generateButtons(totalPages - 4, totalPages);
        } else {
            buttons = generateButtons(currentPage - 2, currentPage + 2);
        }

        setRenderButtons(buttons);
    }, [currentPage, totalPages]);

    // create render buttons
    React.useEffect(() => {
        handleRenderButtons();
        return () => {
            setRenderButtons([]);
        };
    }, [currentPage, isTotalPagesChange]);

    return (
        <div className="cnx__table_footer mt-3">
            <div className="__show_entries">
                <span>Show</span>
                <select
                    className="py-1 border rounded-sm"
                    onChange={(e) => onPageSize(Number(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>

                <span>entries</span>
            </div>

            <div className="__total_entries">
                Showing {showingFrom + 1} to {showingTo} of {totalEntry} entries
            </div>

            {/* pagination */}

            <div className="cnx__table_pagination">
                {/* previous */}
                <Button
                    onClick={onPrevious}
                    className="cnx__table_pagination_btn cnx__table_pagination_btn_prev"
                    disabled={disablePrevious}
                >
                    Previous
                </Button>
                {/* pagination */}
                {totalPages > 0 && (
                    <React.Fragment>
                        {renderButtons[0] > 1 && (
                            <>
                                <Button
                                    onClick={() => onPaginate(1)}
                                    className={`cnx__table_pagination_btn ${
                                        currentPage === 1 ? "active" : ""
                                    }`}
                                >
                                    1
                                </Button>
                                <Button className="cnx__table_pagination_btn">
                                    ...
                                </Button>
                            </>
                        )}

                        {renderButtons?.map((number) => (
                            <React.Fragment key={number}>
                                <Button
                                    onClick={() => onPaginate(number)}
                                    className={`cnx__table_pagination_btn ${
                                        currentPage === number ? "active" : ""
                                    }`}
                                >
                                    {number}
                                </Button>
                            </React.Fragment>
                        ))}

                        {
                            // render dots
                            renderButtons[renderButtons.length - 1] <
                                totalPages - 1 && (
                                <>
                                    <Button className="cnx__table_pagination_btn">
                                        ...
                                    </Button>
                                    <Button
                                        onClick={() => onPaginate(totalPages)}
                                        className={`cnx__table_pagination_btn ${
                                            currentPage === totalPages
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        {totalPages}
                                    </Button>
                                </>
                            )
                        }
                    </React.Fragment>
                )}

                {/* next */}
                <Button
                    onClick={onNext}
                    disabled={disableNext}
                    className="cnx__table_pagination_btn cnx__table_pagination_btn_next"
                >
                    {" "}
                    Next{" "}
                </Button>
            </div>

            {/* end pagination */}
        </div>
    );
};

export default DashboardDataTableFrontPagination;

DashboardDataTableFrontPagination.propTypes = {
    currentPage: PropTypes.number,
    perPageRow: PropTypes.number,
    onPaginate: PropTypes.func,
    totalEntry: PropTypes.number,
    onNext: PropTypes.func,
    disableNext: PropTypes.bool,
    onPrevious: PropTypes.func,
    disablePrevious: PropTypes.bool,
    totalPages: PropTypes.number,
    onPageSize: PropTypes.func,
};
