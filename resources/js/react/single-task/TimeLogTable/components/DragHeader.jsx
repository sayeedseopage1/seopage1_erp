import _ from 'lodash';
import React, {useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';


const TableDragAbleHeader = ({
    onSort,
    column,
    columns,
    order,
    onDrop,
    tableName,
    className,
    storeOnLocalStore,
}) =>{
    const ref = useRef(null);
        const reOrder = (curr, target) => {
            order.splice( order.indexOf(target?.id),  0,  order.splice(order.indexOf(curr?.id), 1)[0]  ); 
            return [...order];
        };
         
    
        const [{ isDragging }, drag, preview] = useDrag({
            type: "column",
            item: { column },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        });
    
        // drop
        const [{isOver}, drop] = useDrop({
            accept: "column",
            hover(item, monitor) {
                const dragIndex = order.indexOf(item.column);
                const hoverIndex = order.indexOf(column);
            },
    
            drop: (item, monitor) => {
                if (item.column !== column) {
                    const reOrderColumn = reOrder(item.column, column);
                    onDrop(reOrderColumn);
                    storeOnLocalStore(reOrderColumn);
                }
            },

            collect: (monitor) =>({
                isOver: !!monitor.isOver()
            })
        });
    
        drag(drop(ref));

        React.useEffect(() => {
            preview(getEmptyImage(), { captureDraggingState: true })
          }, [])

    return (
        <th ref={ref} className={`${className} sp1_drag_th sp1_drag_col_${column?.id} ${isDragging ? '__dragging': ''} ${isOver ? '__drop-area': ''}`}>
            {column.header}
        </th>
    )
}
export default TableDragAbleHeader;