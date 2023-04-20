import * as React from 'react';
import styled from 'styled-components'


const Pagination = ({
    data,
    nPageRows,
    currentPage,
    setCurrentPage,
    setNPageRows,
}) => {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [renderButtons, setRenderButtons] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);

    // count total pages
    useEffect(() => {
        const tPages = Math.ceil(data.length / nPageRows);
        setTotalPages(tPages);
    }, [data, nPageRows]);

    // render buttons
    React.useEffect(() => {
        const buttons = [];

        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                buttons.push(i);
            }
        }

        if (currentPage > 3 && currentPage < totalPages - 3) {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                buttons.push(i);
            }
        }

        if (currentPage >= totalPages - 3) {
            for (let i = totalPages - 4; i <= totalPages; i++) {
                buttons.push(i);
            }
        }

        setRenderButtons(buttons);
    }, [currentPage, totalPages]);

    useEffect(() => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / nPageRows); i++) {
            pageNumbers.push(i);
        }
        setPageNumbers(pageNumbers);
    }, [data, nPageRows]);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSelectChange = (e) => {
        setNPageRows(e.target.value);
    };

    return (
        <PaginationContainer>
            <div>
                <label htmlFor="nPageRows">Show</label>
                <SelectParPage
                    name="nPageRows"
                    id="nPageRows"
                    onChange={handleSelectChange}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </SelectParPage>
                <label htmlFor="nPageRows">entries</label>
            </div>
            <PaginationGroup>
                <EntriesPerPage>
                    Showing {currentPage * nPageRows - nPageRows + 1} to{" "}
                    {currentPage * nPageRows > data.length
                        ? data.length
                        : currentPage * nPageRows}{" "}
                    of {data.length} entries
                </EntriesPerPage>
                <PaginationButtons>
                    <PreviousBtn
                        disabled={currentPage === 1 ? true : false}
                        onClick={previousPage}
                    >
                        Previous
                    </PreviousBtn>
                    {totalPages > 0 && (
                        <>
                            {
                                // render dots
                                renderButtons[0] > 1 && (
                                    <PaginateNumber>...</PaginateNumber>
                                )
                            }
                            {renderButtons.map((number) => (
                                <React.Fragment key={number}>
                                    <PaginateNumber
                                        key={number}
                                        id={number}
                                        onClick={handleClick}
                                        className={
                                            currentPage === number
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {number}
                                    </PaginateNumber>
                                </React.Fragment>
                            ))}

                            {
                                // render dots
                                renderButtons[renderButtons.length - 1] <
                                totalPages - 1 && (
                                    <PaginateNumber>...</PaginateNumber>
                                )
                            }
                        </>
                    )}

                    <NextBtn
                        disabled={
                            currentPage === pageNumbers.length ? true : false
                        }
                        onClick={nextPage}
                    >
                        Next
                    </NextBtn>
                </PaginationButtons>
            </PaginationGroup>
        </PaginationContainer>
    );
};