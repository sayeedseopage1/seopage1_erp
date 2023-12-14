import React, { createContext, useContext, useMemo, useState } from "react";

// utils function ------------------------------------------
function getTotalPage(totalItem, perPageItem) {
    return Math.ceil(totalItem / perPageItem);
}
// ---------------------------------------------------------

// pagination component
export default function Pagination() {
    const {
        currentPage,
        setCurrentPage,
        totalItem,
        setTotalItem,
        perPageItem,
        setPerPageItem,
    } = usePagination();

    const TOTAL_PAGE = useMemo(
        () => getTotalPage(totalItem, perPageItem),
        [totalItem, perPageItem]
    );

    // test variable
    // const TOTAL_PAGE = 10;

    const handleMiddleOrder = (TOTAL_PAGE, currentPage) => {
        const middleOrder = [];

        if (TOTAL_PAGE > 2 && TOTAL_PAGE <= 1 + 4) {
            for (let i = 2; i < TOTAL_PAGE; i++) {
                middleOrder.push(i);
            }
        } else if (TOTAL_PAGE > 1 + 4) {
            if (currentPage < 1 + 3) {
                for (let i = 2; i <= 1 + 3; i++) {
                    middleOrder.push(i);
                }
            } else if (currentPage >= 1 + 3 && currentPage <= TOTAL_PAGE - 3) {
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    middleOrder.push(i);
                }
            } else if (currentPage > TOTAL_PAGE - 3) {
                for (let i = TOTAL_PAGE - 3; i <= TOTAL_PAGE - 1; i++) {
                    middleOrder.push(i);
                }
            }
        }

        // console.log("middleOrder", middleOrder);
        return middleOrder;
    };

    return (
        <section
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <span
                style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                Showing {perPageItem * currentPage - (perPageItem - 1)} to{" "}
                {perPageItem * currentPage > totalItem
                    ? totalItem
                    : perPageItem * currentPage}{" "}
                of {totalItem} entries
            </span>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* previous button */}
                    <li className="page-item">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => {
                                    return prev > 1 ? prev - 1 : 1;
                                })
                            }
                            className="page-link"
                        >
                            Previous
                        </button>
                    </li>

                    {/* first page */}
                    <li
                        className={`page-item ${currentPage === 1 && "active"}`}
                    >
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="page-link"
                        >
                            1
                        </button>
                    </li>

                    {/* gapping */}
                    {TOTAL_PAGE > 5 && currentPage > 3 && (
                        <li className="page-item">
                            <button className="page-link">...</button>
                        </li>
                    )}

                    {/* middle order */}
                    {handleMiddleOrder(TOTAL_PAGE, currentPage).map((page) => {
                        return (
                            <li
                                key={page}
                                className={`page-item ${
                                    currentPage === page && "active"
                                }`}
                            >
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className="page-link"
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}

                    {/* gapping */}
                    {TOTAL_PAGE > 5 && currentPage <= TOTAL_PAGE - 3 && (
                        <li className="page-item">
                            <button className="page-link">...</button>
                        </li>
                    )}

                    {/* last page */}
                    {TOTAL_PAGE > 1 && (
                        <li
                            className={`page-item ${
                                currentPage === TOTAL_PAGE && "active"
                            }`}
                        >
                            <button
                                onClick={() => setCurrentPage(TOTAL_PAGE)}
                                className="page-link"
                            >
                                {TOTAL_PAGE}
                            </button>
                        </li>
                    )}

                    {/* next button */}
                    <li className="page-item">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => {
                                    return prev < TOTAL_PAGE
                                        ? prev + 1
                                        : TOTAL_PAGE;
                                })
                            }
                            className="page-link"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

// pagination context
export const PaginationContext = createContext({
    currentPage: 1,
    setCurrentPage: () => 0,
    totalItem: 1,
    setTotalItem: () => 0,
    perPageItem: 1,
    setPerPageItem: () => 0,
});

export const usePagination = () => {
    const {
        currentPage,
        setCurrentPage,
        totalItem,
        setTotalItem,
        perPageItem,
        setPerPageItem,
    } = useContext(PaginationContext);

    return {
        currentPage,
        setCurrentPage,
        totalItem,
        setTotalItem,
        perPageItem,
        setPerPageItem,
    };
};

// pagination provider
Pagination.Provider = function Provider({ children }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [perPageItem, setPerPageItem] = useState(1);

    return (
        <PaginationContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                totalItem,
                setTotalItem,
                perPageItem,
                setPerPageItem,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};
