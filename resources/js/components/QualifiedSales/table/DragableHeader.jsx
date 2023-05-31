import _ from 'lodash'
import * as React from 'react'
import { useDrag, useDrop } from 'react-dnd';

const DragableHeader = ({column, columns, setColumns, sortConfig }) => {
    const ref = React.useRef(null);

    // re ordering column
    const reOrder = (curr, target) => {
        columns.splice(
            columns.indexOf(target),
            0,
            columns.splice(columns.indexOf(curr), 1)[0]
        )

        return [...columns];
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
            const dragIndex = columns.indexOf(item.column.header);
            const hoverIndex = columns.indexOf(column.header);

        },
        drop: (item, monitor) => {
            if(item.column !== column) {
                const reOrderColumn = reOrder(item.column, column);
                setColumns(reOrderColumn);
                localStorage.setItem(`qualifiedSalesTable_${window?.Laravel?.user?.id}`, JSON.stringify(reOrderColumn));
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    })

    drag(drop(ref));




  return (
    <div 
        ref={ref} 
        style={{
            opacity: isDragging? 0.5: 1,
            background: isOver ? '#ccc': '',
        }}
        className={`sp1_qs_table_td sp1_qs_table_th sp1_qs_table_td_${column?.id} ${column?.headClass}`}
    >

        
        {/* <span className="table_asc_dec asc"></span>
        <span className="table_asc_dec dec"></span> */}
        {_.isFunction(column.header) ? column.header() : column.header}
    </div>
  )
}

export default DragableHeader