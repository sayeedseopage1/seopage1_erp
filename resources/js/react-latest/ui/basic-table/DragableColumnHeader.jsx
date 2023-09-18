import { flexRender } from "@tanstack/react-table";
import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useLocalStorage } from "react-use";
import { itemType } from "./dndType";

// reorder column
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};

// dragable columns
export const DragableColumnHeader = ({
    header,
    table,
    className = "",
    ...props
}) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;
    const { tableName } = table.getState();
    const [value, setValue] = useLocalStorage(tableName);

    const dropRef = React.useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: itemType.TABLE_COLUMN,
        drop: (draggedColumn) => {
            if (!column.columnDef?.draggable) return;
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
        item: () => (column.columnDef?.draggable ? column : null),
        type: itemType.TABLE_COLUMN,
    });

    //
    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(dropRef));

    return (
        <>
            <th
                ref={dropRef}
                colSpan={header.colSpan}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    background:
                        isOver && column.columnDef?.draggable ? "#f3f3f3" : "",
                }}
                className={`sp1-data-table-th sp1-data-table-th--${column.id} ${className}`}
                {...props}
            >
                <div className="d-flex align-items-start">
                    {column.columnDef?.sortable && (
                        <button
                            {...{
                                onClick:
                                    header.column.getToggleSortingHandler(),
                                className: "sp1-data-table-sort-btn",
                            }}
                        >
                            {header.column.getIsSorted() ? (
                                {
                                    asc: (
                                        <span className="table_asc_dec asc"></span>
                                    ),
                                    desc: (
                                        <span className="table_asc_dec dec"></span>
                                    ),
                                }[header.column.getIsSorted()] ?? null
                            ) : (
                                <span className="table_asc_dec"></span>
                            )}
                        </button>
                    )}
                    <div>
                        <div>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                        </div>
                    </div>
                </div>
            </th>
        </>
    );
};
