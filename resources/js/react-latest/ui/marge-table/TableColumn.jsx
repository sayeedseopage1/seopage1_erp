/* eslint-disable react/prop-types */
import React, { useLayoutEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { itemType } from "./dndType";
import styles from "./table.module.css";
import _ from "lodash";

const TableColumn = ({ col, table }) => {
  const [randerSub, setRanderSub] = useState(false);
  const columnRef = useRef(null);
  const {
    columnOrderChange,
    onSortChange,
    state: { columnOrder, tableName, sort},
  } = table;

  const order = columnOrder;

  /**** DRAG & DROP CONFIG****/
  // reorder
  const reOrder = (curr, target) => {
    order.splice(order.indexOf(target?.id), 0, order.splice(order.indexOf(curr?.id), 1)[0]);
    return [...order];
  };

  const [{ isDragging }, drag, preview] = useDrag({
    type: itemType.TABLE_COLUMN,
    item: () => col.moveable ?  {col}  : null,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //drop
  const [{isOver}, drop] = useDrop({
    accept: itemType.TABLE_COLUMN,
    drop: (item) => {
      if (item.col !== col && item.col.moveable) {
        const reOrderColumn = reOrder(item.col, col);
        columnOrderChange(reOrderColumn);
        localStorage.setItem(tableName, JSON.stringify({ _columnOrders: reOrderColumn }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(columnRef));
 

  // UPDATE LAYOUT EFFECT
  useLayoutEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IS DRAGGING CHAGNE CSS

  return (
    <React.Fragment>
      <th 
        ref={col?.moveable ? columnRef : null} 
        rowSpan={col?.rowSpan ?? 1} 
        colSpan={col?.subHeading?.length ?? 1} 
        data-column-id={col.id}
        className={`${isDragging ? styles.isDragging : isOver ? styles.isOver : ''}`}
      >  
        <div> {col.heading} </div> 

        {col && col.sort && 
          <button 
            onClick={() => onSortChange({
              order: sort?.order === 'desc' ? 'asc' : 'desc', 
              key: col.id,
              col
            })}
            className= {styles.sp1_data_table_sort_btn}
          >
              {!_.isEmpty(sort) && sort.key === col.id ? 
                sort?.order === 'desc' ? <span className={`${styles.table_asc_desc} ${styles.desc}`}></span> : 
                <span className={`${styles.table_asc_desc} ${styles.asc}`}></span>
              : <span className={styles.table_asc_desc}></span>
              }  
          </button> 
        }
      </th>
    </React.Fragment>
  );
};

export default TableColumn;
