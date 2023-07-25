import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Insights/ui/Button';


const Pagination = ({currentPage = 1, perpageRow=10, onPaginate, totalEntry=0}) => {
    
    const [renderButtons,setRenderButtons] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);


    const entryChagne = React.useMemo(() => totalEntry, [totalEntry])
    const isTotalPagesChange = React.useMemo(() => totalPages, [totalPages]);
    const rowNumber = React.useMemo(()=> perpageRow, [perpageRow]);


    // count total pages
    React.useEffect(() => {
        const tPages = Math.ceil(entryChagne / rowNumber);
        setTotalPages(tPages);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entryChagne, rowNumber])


    // create render buttons
    React.useEffect(()=> {
        const buttons = [];

        if(totalPages <= 7){
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        }else{ 
            if (currentPage <= 3) {
                for (let i = 1; i < 5; i++) {
                    buttons.push(i);
                }
                
            }else if (currentPage >= totalPages - 3) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    buttons.push(i);
                }
            }else if (currentPage > 3 && currentPage < totalPages - 3) {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    buttons.push(i);
                }
            }
        }

        setRenderButtons([...buttons]);

    }, [totalPages, currentPage, isTotalPagesChange])



    // next 
    const nextPage = () => {
        if(currentPage < totalPages){
            onPaginate(currentPage + 1 );
        }
    }

    // previous 
    const prevPage = () => {
        if(currentPage > 1){
            onPaginate(currentPage - 1 );
        }
    }


    return (
        <div className='cnx__table_pagination'>
            {/* previous */}
            <Button onClick={prevPage} className='cnx__table_pagination_btn cnx__table_pagination_btn_prev'> Previous </Button>
            {/* pagination */}
            {totalPages > 1 && (
                <React.Fragment>
                    {
                        renderButtons[0] > 1 &&(
                            <>
                                <Button
                                onClick={()=> onPaginate(1)}
                                className={`cnx__table_pagination_btn ${currentPage === 1 ? 'active': ''}`} 
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
                                onClick={() => onPaginate(number)}
                                className={`cnx__table_pagination_btn ${currentPage === number ? 'active': ''}`} 
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
                                            onClick={()=> onPaginate(totalPages)}
                                            className={`cnx__table_pagination_btn ${currentPage === totalPages ? 'active': ''}`} 
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

export default Pagination;