import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../Insights/ui/Button';


const Pagination = ({ data, setCurrentPageData, numOfPerPageRow = 10, sortConfig, sortedData, currentPage = 1, setCurrentPage }) => {

    console.log(data)

    const [renderButtons, setRenderButtons] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);


    const isDataChange = React.useMemo(() => data, [data]);
    const isTotalPagesChange = React.useMemo(() => totalPages, [totalPages]);

    const paginate = (data, currentPage, nPaginate) => {
        if (data.length <= nPaginate) return data;
        const startIndex = (currentPage - 1) * nPaginate;
        return data.slice(startIndex, startIndex + nPaginate);
    };

    const sortData = (data) => {
        return data.sort((a, b) => {
            if (a.user_id > b.user_id) {
                return 1;
            }
            if (a.user_id < b.user_id) {
                return -1;
            }
            return 0;
        });
    }

    /// set current page data
    React.useEffect(() => {
        let _data = sortedData(data, sortConfig);
        _data = sortData(_data);
        let perPageData = paginate(_data, currentPage, numOfPerPageRow);
        setCurrentPageData(perPageData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, numOfPerPageRow, data, sortConfig])



    // count total pages
    React.useEffect(() => {
        const tPages = Math.ceil(data.length / numOfPerPageRow);
        setTotalPages(tPages);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataChange, numOfPerPageRow])


    // create render buttons
    React.useEffect(() => {
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

    }, [totalPages, currentPage, isTotalPagesChange])



    // next 
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    // previous 
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }


    return (
        <div className='cnx__table_pagination'>
            {/* previous */}
            <Button onClick={prevPage} className='cnx__table_pagination_btn cnx__table_pagination_btn_prev'> Previous </Button>
            {/* pagination */}
            {totalPages > 0 && (
                <React.Fragment>
                    {
                        renderButtons[0] > 1 && (
                            <>
                                <Button
                                    onClick={() => setCurrentPage(1)}
                                    className={`cnx__table_pagination_btn ${currentPage === 1 ? 'active' : ''}`}
                                >
                                    1
                                </Button>
                                <Button
                                    className="cnx__table_pagination_btn"
                                >
                                    ...
                                </Button>
                            </>
                        )
                    }

                    {renderButtons?.map(number => (
                        <React.Fragment key={number}>
                            <Button
                                onClick={() => setCurrentPage(number)}
                                className={`cnx__table_pagination_btn ${currentPage === number ? 'active' : ''}`}
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
                                <Button
                                    className="cnx__table_pagination_btn"
                                >
                                    ...
                                </Button>
                                <Button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`cnx__table_pagination_btn ${currentPage === totalPages ? 'active' : ''}`}
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
                onClick={nextPage}
                className='cnx__table_pagination_btn cnx__table_pagination_btn_next'> Next  </Button>
        </div>
    )
}


Pagination.propTypes = {
    sortConfig: PropTypes.object.isRequired,
    sortedData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setCurrentPageData: PropTypes.func,
    numOfPerPageRow: PropTypes.number,
}


export default Pagination;