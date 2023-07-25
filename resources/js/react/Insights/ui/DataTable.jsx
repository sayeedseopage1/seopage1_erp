/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import TableFilterButton from './TableFilterButton';
import { useDrag, useDrop} from 'react-dnd';
import { Icon } from '../utils/Icon';
import {motion, AnimatePresence} from 'framer-motion';


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
const DataTable = React.forwardRef(({
    data, 
    isLoading, 
    defaultColumns, 
    visibleColumns,
    goal,
    isRowSelectedAble = false,
}, ref) => {
    const [currentPageData, setCurrentPageData] = React.useState([...data]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
    const { activeColumns, setActiveColumns, sortConfig, setSortConfig } = useTableState();
    const [totalPage, setTotalPage] = React.useState(1);
    const [selectionStart, setSelectionStart] = React.useState(false);
    const [rowSelected, setRowSelected] = React.useState(0);
    const [rowSelectionStatus, setRowSelectionStatus] = React.useState('idle'); 
    const [startRowIndex, setStartRowIndex] = React.useState();
    const [actualAmount, setActualAmount] = React.useState(0);
    const [contributedAmount, setContributedAmount] = React.useState(0);
    const [showSelectedRowSummary, setShowSelectedRowSummary] = React.useState(false);


    // columns
    React.useEffect(() => {
        let _columnsToDisplay = []
        let _columns = defaultColumns.map(d => d.id);
        if(visibleColumns){
            let _visibleColumns = visibleColumns.map(d => {
                if(d.status){
                    return d.accessor;
                }
            });
            _columnsToDisplay = _columns.filter(d => _visibleColumns.includes(d));
        } else{
            _columnsToDisplay = [..._columns];
        }
        setActiveColumns([..._columnsToDisplay]);
    }, [defaultColumns, visibleColumns])


    React.useEffect(()=> {
      if(!data) return;
       const sorted = sortedData(data, sortConfig);
       let t = Math.ceil(sorted.length / numberOfRowPerPage)
       setCurrentPageData([...sorted]);
       setTotalPage(t);
    }, [data, sortConfig])


    // config sort
    const sortedData = (data, sortConfig) => {
        if(!data) return [];
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


    // mouse down in row
    const handleMouseDown = (e) => {
        if(!isRowSelectedAble) return;
        e.preventDefault();
        setActualAmount(0);
        setRowSelected(0);
        setStartRowIndex(null); 
        setContributedAmount(0);
        setSelectionStart(true);
        let {rowIndex} = e.target.parentNode.dataset;
        setStartRowIndex(Number(rowIndex)); 
    }

    // mouse up in row
    const handleMouseUp = (e) => {
        if(!isRowSelectedAble) return;
        e.preventDefault();
        setSelectionStart(false);
        setRowSelectionStatus('selected');
        let parent = e.target.parentNode;
        let {rowIndex} = parent.dataset;
        let isBetweenRange = Math.abs(rowIndex - startRowIndex);
        
        setShowSelectedRowSummary(isBetweenRange);
        
        // let _filterData = data.filter(d => (d.id >= startRowIndex && d.id <= rowId) || (d.id <= startRowIndex && d.id >= rowId));
        let _filterData = currentPageData.filter((d, i) => (i >= startRowIndex && i<= rowIndex) || (i <= startRowIndex && i >= rowIndex));

        setRowSelected(_filterData.length);
        _filterData?.map(d => {
                if(d['amount'] || d['deal_amount']){
                    let amount = d['amount'] || d['deal_amount'];
                    setActualAmount(p => p + Number(amount));
                }
        }); 

        _filterData?.map(d => {
                if(d['team_total_amount']){
                    setContributedAmount(p => p + Number(d['team_total_amount']));
                }
        });    
    }

    // mouse move in row
    const handleMouseMove = (e) => {
        if(!isRowSelectedAble) return;
        e.preventDefault();
        if(!selectionStart) return;
        setRowSelectionStatus('selecting');
        let rows = document.querySelectorAll('.cnx__table_tr');
        let parent = e.target.parentNode;
        let {rowId, rowIndex} = parent.dataset;
        rowId = Number(rowId);
        rowIndex = Number(rowIndex);

        for(let i = 0; i < rows.length; i++){
            const row  = rows[i];
            const currentRowId = Number(row.dataset.rowId);
            const currentRowIndex = Number(row.dataset.rowIndex);
            

            const isBetweenRange = 
                (currentRowIndex >= startRowIndex && currentRowIndex <= rowIndex) ||
                (currentRowIndex <= startRowIndex && currentRowIndex >= rowIndex);
            
            if(isBetweenRange){
                row.classList.add('__selected'); 
            }else{
                row.classList.remove('__selected'); 
            } 

        }

    }

    /*
    ** If any row is selected, 
    ** unselect that row on click.
    */ 
      
    React.useEffect(() => {
        if(!isRowSelectedAble) return;

        const resetSelectedRow = (e) => {
            let rows = document.querySelectorAll('.cnx__table_tr');
            rows.forEach(row=> {
               if(row.classList.contains('__selected')) {
                row.classList.remove('__selected'); 
               }
            })
            setSelectionStart(false);
            setRowSelected(0);
            setRowSelectionStatus('idle');
            setShowSelectedRowSummary(false);
            setActualAmount(0);
            setContributedAmount(0);
            setStartRowIndex(null);
        }
    
       let timer;

       if(rowSelectionStatus === 'selected'){
            timer = setTimeout(() => window.addEventListener('click', resetSelectedRow), 10); 
       } else{
            window.removeEventListener('click', resetSelectedRow);
            clearTimeout(timer)
       }

       return () =>{
            window.removeEventListener('click', resetSelectedRow);
            clearTimeout(timer)
       } 
    }, [startRowIndex, selectionStart])

    const columns = defaultColumns.filter(d => activeColumns.includes(d.id))
                    .sort((a, b) => activeColumns.indexOf(a.id) - activeColumns.indexOf(b.id))
             
      

    return (
        <div style={{maxWidth: '100%'}}>
            <div className='cnx__table_wrapper'>
                 {/* filter button */}
                        <div className='cnx__table_td_filter_btn'>
                            {/* <TableFilterButton  /> */}
                        </div> 
                    {/* header */}

            {/* select row data */}
                <AnimatePresence>
                    {rowSelectionStatus === 'selected' && showSelectedRowSummary && <motion.div 
                        initial={{x:10}} 
                        animate={{ x: 0}}
                        exit={{x: 10}}
                        className='cnx__table_calculated_value'
                    >
                             <div className='cnx__table_calculated_item'>
                                <span>Total Row Selected</span>
                                <h6>{rowSelected}</h6>
                            </div> 


                            <div className='cnx__table_calculated_item'>
                                <span>Actual Amount</span>
                                <h6>{goal?.trackingType === 'value' ? '$': ''}{actualAmount.toFixed(2)}</h6>
                            </div> 
                            
                            { (data[1]?.team_total_amount !== undefined && Number(goal?.team_id) !== 1) && 
                            <div className='cnx__table_calculated_item'>
                                <span>Contribution Amount</span>
                                <h6>{goal?.trackingType === 'value' ? '$': ''}{contributedAmount.toFixed(2)}</h6>
                            </div> }
                        
                    </motion.div>}
                </AnimatePresence>

                   {/* end selected row data */}


                <div className='cnx__table' >
                   
                    {/* <div className="cnx__table_head" style={{paddingRight: currentPageData.length > 34 ? '5px' : ''}}>
                        <div className="cnx__table_tr">
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
                    </div> */}
                    
                    {/* end header */}

                    {/* table body */}

                    <div className="cnx__table_body" ref={ref} style={{padding: 0}}>
                    <div className="cnx__table_head">
                        <div className="cnx__table_tr">
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

                    {isLoading && (
                        [...Array(Number(numberOfRowPerPage))].map((_, i) => (
                            <div key={i} className="cnx__table_tr">
                                {columns.map(d => 
                                    <div key={d.id} className="cnx__table_td cnx__table_td_loading ">
                                        <span 
                                            className='animate-pulse' 
                                            style={{width: `${ Math.floor(Math.random() * (70 - 20) + 20)}%`}}
                                        >loading</span>
                                    </div>
                                )}
                            </div> 
                        ))
                    )}

                    
                    {!isLoading && 
                        <React.Fragment>
                            {
                                currentPageData.length > 0 ? currentPageData.map((data, index) => (
                                        <div 
                                            key={data.id} 
                                            className="cnx__table_tr"
                                            data-row-index = {index} 
                                            data-row-id = {data.id}
                                            onMouseDown={handleMouseDown}
                                            onMouseUp={handleMouseUp}
                                            onMouseMove={handleMouseMove}
                                            // onClick={handleOnClickOfRow}
                                        >
                                            {columns.map(d => (
                                                <div key={d.id} className="cnx__table_td">
                                                    {d.cell(data) || <span> &nbsp; </span>}
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
         {/* {   
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


                 <Pagination
                    sortConfig={sortConfig}
                    sortedData={sortedData}
                    data={[...data]}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                />  
            </div>
        }  */}
        </div>
    )
})


const DataTableComponent = React.forwardRef(({data, goal, isRowSelectedAble = false, isLoading, defaultColumns, visibleColumns}, ref) => {
    return(
        <ContextProvider>
           <DataTable 
                ref={ref}
                data={data} 
                isLoading={isLoading}  
                defaultColumns={defaultColumns}
                goal={goal}
                visibleColumns={visibleColumns}
                isRowSelectedAble = {isRowSelectedAble}
                
           />
        </ContextProvider>
    )
}) 


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
            className={`cnx__table_th_toggle  ${isDragging ? '__dragging': ''}`}>
                {column.header}
                {
                    sort.key === column.accessor &&
                    <i className={`fa-solid fa-caret-${sort.direction === 'desc' ? 'down': 'up'}`}></i>
                }
                
            </div>
        </div>
    )

}

