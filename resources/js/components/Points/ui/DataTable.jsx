/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import TableFilterButton from './TableFilterButton';
import { useDrag, useDrop} from 'react-dnd';
import { Icon } from '../utils/Icon';


const DataTableContext = React.createContext();
const ContextProvider = ({children}) => {
    const [activeColumns, setActiveColumns] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState({key: 'id', direction: 'desc'});

    


    return <DataTableContext.Provider value={{
        activeColumns,
        setActiveColumns,
        sortConfig,
        setSortConfig
    }}>
        {children}
    </DataTableContext.Provider>
}


// table state
const useTableState = () => {
    const context = React.useContext(DataTableContext);
    return  context;
}


// data table 
const DataTable = ({data, defaultColumns, isLoading}) => {
    const [currentPageData, setCurrentPageData] = React.useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
    const { activeColumns, setActiveColumns, sortConfig, setSortConfig } = useTableState();

    // total page
    const totalPage = Math.ceil(data.length / numberOfRowPerPage);

    React.useEffect(() => {
        let columns = defaultColumns.map(d => d.id);
        setActiveColumns([...columns]);
    }, [])


    // config sort
    const sortedData = (data, sortConfig) => {
        if(sortConfig.key){
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return data;
    }

    // SORT REQUEST
    const requestSort = (key) => {
        
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        } else direction = "asc"; 

        setSortConfig({ key, direction });
    };



    const columns = defaultColumns.filter(d => activeColumns.includes(d.id))
                    .sort((a, b) => activeColumns.indexOf(a.id) - activeColumns.indexOf(b.id))
                                

    return(
        <div style={{maxWidth: '100%'}}>
            <div className='cnx__table_wrapper'>
                 {/* filter button */}
                        {/* <div className='cnx__table_td_filter_btn sp1__table_th_filter_btn'>
                            <TableFilterButton  />
                        </div>  */}
                    {/* header */}
                <div className='cnx__table sp1__pp_table'>
                   
                    <div className="cnx__table_head">
                        <div className="cnx__table_tr sp1__pp_table_tr">
                            {columns.map(column => (
                                <DraggableColumn 
                                    sort={sortConfig}
                                    requestSort={requestSort}
                                    key={column.id} 
                                    column={column}
                                    activeColumns={activeColumns}
                                    setActiveColumns={setActiveColumns}
                                />
                            ))}
                        </div>                         
                    </div>
                    
                    {/* end header */}

                    {/* table body */}

                    <div className="cnx__table_body">

                    {isLoading && (
                        [...Array(Number(numberOfRowPerPage))].map((_, i) => (
                            <div key={i} className="cnx__table_tr sp1__pp_table_tr">
                                {columns.map(d => 
                                    <div key={d.id} className="cnx__table_td cnx__table_td_loading ">
                                        <span className='animate-pulse' style={{width: `${ Math.floor(Math.random() * (100 - 30) + 30)}%`}}>loading</span>
                                    </div>
                                )}
                            </div> 
                        ))
                    )}

                    
                    {!isLoading && 
                        <React.Fragment>
                            {
                                currentPageData.length > 0 ? currentPageData.map((data) => (
                                        <div key={data.id} className="cnx__table_tr sp1__pp_table_tr">
                                            {columns.map(d => (
                                                <div key={d.id} className="cnx__table_td">
                                                    {d.cell(data)}
                                                </div>
                                            ))}
                                        </div> 
                                )): 
                                <div className='cnx__empty_table'>
                                    <div className='cnx__empty_table_content'>
                                        <Icon type="EmptyTable" /> 
                                        <div>No Data to show</div>
                                    </div>
                                </div> 
                            }
                        </React.Fragment>
                    }
                    </div>
                    {/* end table body  */}
                </div>
            </div>
        {/* table footer  */}
        {   
            totalPage > 1 &&
            <div className="cnx__table_footer">
                <div className="__show_entries">
                    <span>Show</span> 
                    <select onChange={(e) => setNumberOfRowPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>

                    <span>entries</span>
                </div>


                <div className='__total_entries'>
                    Showing 1 to 10 of 77 entries
                </div>


                {/* pagination */}
                <Pagination
                    sortConfig={sortConfig}
                    sortedData={sortedData}
                    data={data}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                />
                {/* end pagination */}
            </div>
        }
            {/* end table footer  */}
        </div>
    )
}


const DataTableComponent = ({data, defaultColumns, isLoading}) => {
    return(
        <ContextProvider>
           <DataTable data={data} defaultColumns={defaultColumns} isLoading={isLoading} />
        </ContextProvider>
    )
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired
}




export default DataTableComponent;





// drag able column
const DraggableColumn = ({
    sort,
    requestSort,
    column,
    activeColumns,
    setActiveColumns
}) => {
    const ref = React.useRef(null);

    // re ordering column
    const reOrder = (curr, target) => {
        activeColumns.splice(
            activeColumns.indexOf(target.id),
            0,
            activeColumns.splice(activeColumns.indexOf(curr.id), 1)[0]
        )

        return [...activeColumns]
    }

    // drag
    const [{isDragging}, drag] = useDrag({
        type: 'column',
        item: {column},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })


    // drop
    const [{isOver}, drop] = useDrop({
        accept: 'column',
        hover(item, monitor) {
            const dragIndex = activeColumns.indexOf(item.column.header);
            const hoverIndex = activeColumns.indexOf(column.header);

        },
        drop: (item, monitor) => {
            if(item.column !== column) {
                const reOrderColumn = reOrder(item.column, column);
                setActiveColumns(reOrderColumn);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    })

    drag(drop(ref));


    return(
        <div 
            id={`cnx__table_th_${column.id}`}
            className={`cnx__table_th`}
        
        >
            <div ref={ref}
                onClick = {(() => requestSort(column.accessor))}
                className={`cnx__table_th_toggle  ${isDragging ? '__dragging': ''} ${isOver ? '__dragging_over': ''}}`}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    backgroundColor: isOver ? '#f3f3f3' : 'transparent',
                    justifyContent: 'flex-start',
                    gap: '6px',
                }}
            >
                
                {
                    sort.key === column.accessor ?
                    sort.direction === "asc" ? (
                            <span className="table_asc_dec asc"></span>
                        ) : (
                            <span className="table_asc_dec dec"></span>
                    ) : <span className="table_asc_dec"></span>
                }
                {column.header}
            </div>
        </div>
    )

}

