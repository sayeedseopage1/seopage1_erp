import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useLocalStorage } from 'react-use' 

// reorder column
const reorderColumn = (
  draggedColumnId,
  targetColumnId,
  columnOrder
) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  )
  return [...columnOrder]
}

// dragable columns
export const DragableColumnHeader = ({header, table, className='', ...props}) => {
  const {getState, setColumnOrder} = table;
  const { columnOrder } = getState();
  const {column} = header;
  const { tableName } = table.getState();
  const [value, setValue] = useLocalStorage(tableName ??'')

  const dropRef = React.useRef(null);

  const [{isOver}, drop] = useDrop({
    accept: 'column',
    drop: (draggedColumn) => {
      if(column.id === "expend" || column.id === 'action') return; 
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setValue({
        ...value,
        columnOrders: newColumnOrder,
      })
      setColumnOrder(newColumnOrder); 
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const [{ isDragging }, drag, preview] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }), 
    item: () => column.id === "expend" || column.id === 'action' ? null : column,
    type: 'column',
  })

  
//   
  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  drag(drop(dropRef));

  return (
    <> 
      <th
        ref={dropRef}
        colSpan={header.colSpan}
        style={{ 
          opacity: isDragging ? 0.5 : 1, 
          background: isOver && (column.id !== "expend" || column.id !== 'action') ? '#f3f3f3' : '', 
          minWidth: column.id === 'id' && '50px',
          width:  column.id === 'id' && '50px',
          maxWidth:  column.id === 'id' && '50px',
        }}
        className={`sp1_tasks_th sp1_tasks_th--${column.id} ${className}`}
        {...props}
      >
        <div className="d-flex align-items-start">
          {column.id !== 'expend' && column.id !== 'action' &&
              <button 
              {...{
                onClick: header.column.getToggleSortingHandler(),
                className: 'sp1_tasks_column_sort_btn'
              }}>
  
              {header.column.getIsSorted() ? 
                  {
                    asc: <span className="table_asc_dec asc"></span>,
                    desc: <span className="table_asc_dec dec"></span>,
                  }[header.column.getIsSorted()] ?? null
              : <span className="table_asc_dec"></span>
              }

            </button>
          } 
          <div> 
            <div>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </div> 
          </div>
        </div>
      </th>
    </>
  ) 
}
