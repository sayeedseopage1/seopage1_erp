import React from "react";
import { TableHeadItem } from "./ui";
import { flexRender } from "@tanstack/react-table";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useLocalStorage } from "react-use";
import _ from "lodash";

// reorder column
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};

const TableHeaderItem = ({ header, table }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder, tableName } = getState();
    const { column } = header;

    const [value, setValue] = useLocalStorage(tableName);

    const dropRef = React.useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: "column",
        drop: (draggedColumn) => {
            // if (!column.columnDef?.draggable) return;

            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            );
            setValue({
                ...value,
                columnOrder: newColumnOrder,
            });
            setColumnOrder(newColumnOrder);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [{ isDragging }, drag, preview] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        // item: () => (column.columnDef?.draggable ? column : null),
        item: () => column ,
        type: "column",
    });

    //
    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(dropRef));

    return (
        <TableHeadItem ref={dropRef} className={`${column.id ?? ''} ${isDragging ? 'dragging' : ''} ${isOver ? 'dropArea': ''}`}>
            {!_.includes(['id'], column.id) &&
                <button
                {...{
                    onClick: header.column.getToggleSortingHandler(),
                    className: "sp1-data-table-sort-btn",
                }}
            >
                {header.column.getIsSorted() ? (
                    {
                        asc: <span className="table_asc_dec asc"></span>,
                        desc: <span className="table_asc_dec dec"></span>,
                    }[header.column.getIsSorted()] ?? null
                ) : (
                    <span className="table_asc_dec"></span>
                )}
            </button>
            }

            {header.isPlaceholder
                ? null
                : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                  )}
        </TableHeadItem>
    );
};

export default TableHeaderItem;
