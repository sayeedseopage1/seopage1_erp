import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useLocalStorage } from "react-use";
import { flexRender } from "@tanstack/react-table";
import PropTypes from "prop-types";

// reorder column
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};

// draggable columns
 const DraggableColumnHeader = ({
    header,
    table,
    sortingColumn = [],
    justifyStyleColumn = {},
    className = "",
    ...props
}) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;
    const { tableName } = table.getState();
    const [value, setValue] = useLocalStorage(tableName ?? "");

    const dropRef = React.useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: "column",
        drop: (draggedColumn) => {
            if (column.id === "expend" || column.id === "action") return;
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            );
            setValue({
                ...value,
                columnOrders: newColumnOrder,
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
        item: () =>
            column.id === "expend" || column.id === "action" ? null : column,
        type: "column",
    });

    //
    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(dropRef));

    const columnJustifyContent = {
        ...justifyStyleColumn,
        default: "flex-start",
    };

    const columnStyles = {
        id: { minWidth: "50px", width: "50px", maxWidth: "50px" },
        default: {},
    };

    const columnStyle = columnStyles[column.id] || columnStyles.default;
    const justifyContent =
        columnJustifyContent[column.id] || columnJustifyContent.default;

    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{
                opacity: isDragging ? 0.5 : 1,
                background:
                    isOver && !["expend", "action"].includes(column.id)
                        ? "var(--primaryDarkBlue)"
                        : "",
                ...columnStyle,
            }}
            className={`sp1_price_quotation_thead_th sp1_price_quotation_thead_th--${column.id} ${className}`}
            {...props}
        >
            <div
                style={{
                    justifyContent,
                }}
                className={`d-flex align-items-start ${
                    column.id && "text-center"
                }`}
            >
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
                {column.id !== "expend" &&
                    column.id !== "action" &&
                    sortingColumn?.includes(column?.id) && (
                        <button
                            {...{
                                onClick:
                                    header.column.getToggleSortingHandler(),
                                className:
                                    "sp1_price_quotation_column_sort_btn ml-2",
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
            </div>
        </th>
    );
};

DraggableColumnHeader.propTypes = {
    header: PropTypes.object,
    table: PropTypes.object,
    className: PropTypes.string,
    sortingColumn: PropTypes.array,
    justifyStyleColumn: PropTypes.object,
};

export default DraggableColumnHeader;