import * as React from "react";
import Button from "./Button";

const TasksTablePagination = ({
    currentPage = 1,
    perpageRow = 10,
    onPaginate,
    totalEntry = 0,
    onNext,
    disableNext,
    onPrevious,
    disablePrevious,
    totalPages,
    onPageSize
}) => {
    const [renderButtons, setRenderButtons] = React.useState([]);
    // const [totalPages, setTotalPages] = React.useState(1);

    // const entryChange = React.useMemo(() => totalEntry, [totalEntry])
    const isTotalPagesChange = React.useMemo(() => totalPages, [totalPages]);
    const showingFrom = (currentPage - 1) * perpageRow;
    const sum = showingFrom + perpageRow;
    const showingTo = sum < totalEntry ? sum : totalEntry

    // render buttons
    const handleRenderButtons = React.useCallback(() => {
        const buttons = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i < 5; i++) {
                    buttons.push(i);
                }
            } else if (currentPage >= totalPages - 3) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    buttons.push(i);
                }
            } else if (currentPage > 3 && currentPage < totalPages - 3) {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    buttons.push(i);
                }
            }
        }

        setRenderButtons([...buttons]);
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
                Showing {showingFrom + 1} to {showingTo} of{" "}
                {totalEntry} entries
            </div>

            {/* pagination */}
            <React.Fragment>
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
                                            currentPage === number
                                                ? "active"
                                                : ""
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
                                            onClick={() =>
                                                onPaginate(totalPages)
                                            }
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
            </React.Fragment>
            {/* end pagination */}
        </div>
    );
};

export default TasksTablePagination;
