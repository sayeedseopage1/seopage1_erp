/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import TableFilterButton from './TableFilterButton';
import { DataTableColumns } from '../components/DataTableColumns';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const DataTableContext = React.createContext();
const ContextProvider = ({children}) => {
    const [activeColumns, setActiveColumns] = React.useState([]);

    React.useEffect(() => {
        let columns = DataTableColumns.map(d => d.header);
        setActiveColumns([...columns]);
    }, [])



    return <DataTableContext.Provider value={{
        activeColumns,
        setActiveColumns,
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
const DataTable = ({data}) => {
    const [currentPageData, setCurrentPageData] = React.useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
    const { activeColumns, setActiveColumns } = useTableState();

    const columns = DataTableColumns.filter(d => activeColumns.includes(d.header))
                    .sort((a, b) => activeColumns.indexOf(a.header) - activeColumns.indexOf(b.header))
                                

    return(
        <div style={{maxWidth: '100%'}}>
            <div className='cnx__table_wrapper'>
                 {/* filter button */}
                        <div className='cnx__table_td_filter_btn'>
                            <TableFilterButton  />
                        </div> 
                    {/* header */}
                <div className='cnx__table'>
                   
                    <div className="cnx__table_head">
                        <div className="cnx__table_tr">
                            {columns.map(column => (
                                <DraggableColumn 
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
                    
                        {currentPageData.length > 0 ? currentPageData.map((data) => (
                                <div key={data.id} className="cnx__table_tr">
                                    {columns.map(d => (
                                        <div key={d.id} className="cnx__table_td">
                                            {d.cell(data)}
                                        </div>
                                    ))}
                                </div> 
                        )): [...Array(Number(numberOfRowPerPage))].map((_, i) => (
                                <div key={i} className="cnx__table_tr">
                                {columns.map(c => (
                                    <div key={c.header} className="cnx__table_td cnx__table_td_loading ">
                                        <span className='animate-pulse' style={{width: `${ Math.floor(Math.random() * (100 - 30) + 30)}%`}}>loading</span>
                                    </div>
                                ))}
                                </div> 
                        ))}
                    </div>
                    {/* end table body  */}
                </div>
            </div>
        {/* table footer  */}
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
                    data={data}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                />
                {/* end pagination */}
            </div>
            {/* end table footer  */}
        </div>
    )
}


const DataTableComponent = ({data}) => {
    return(
        <ContextProvider>
           <DndProvider backend={HTML5Backend}>
                <DataTable data={data} />
            </DndProvider> 
        </ContextProvider>
    )
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired
}

export default DataTableComponent;



const DraggableColumn = ({
    column,
    activeColumns,
    setActiveColumns
}) => {
    const ref = React.useRef(null);

    // re ordering column
    const reOrder = (curr, target) => {
        activeColumns.splice(
            activeColumns.indexOf(target),
            0,
            activeColumns.splice(activeColumns.indexOf(curr), 1)[0]
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
            <div ref={ref} className={`cnx__table_th_toggle  ${isDragging ? '__dragging': ''}`}>
                {column.header}
            </div>
        </div>
    )


}