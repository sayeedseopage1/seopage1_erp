import { flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";

const TableHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;

    // reorder the columns
    // const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    //     const draggedColumnIndex = columnOrder.indexOf(draggedColumnId);
    //     const targetColumnIndex = columnOrder.indexOf(targetColumnId);

    //     const newColumnOrder = [...columnOrder];
    //     newColumnOrder.splice(draggedColumnIndex, 1);
    //     newColumnOrder.splice(targetColumnIndex, 0, draggedColumnId);

    //     return [...newColumnOrder];
    // };

    const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
        columnOrder.splice(
            columnOrder.indexOf(targetColumnId),
            0,
            columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
        );

        return [...columnOrder];
    };

    // drop
    const [, drop] = useDrop({
        accept: "column",
        drop: (draggedColumn) => {
            // reorder the columns
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            );
            // save to local storage
            setColumnOrder(newColumnOrder);
            localStorage.setItem("columnOrder", JSON.stringify(newColumnOrder));
        },
    });

    // drag
    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: "column",
    });

    return (
        <th
            ref={drop}
            colSpan={column.colSpan}
            className="drag-table__header"
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <div ref={previewRef} className="drag-table__header-wrapper">
                <div ref={dragRef} className="drag-table__header-drag" />
                <div className="drag-table__header-content">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                </div>

                {/* sort */}
                <div
                    {...{
                        className: "drag-table__header-sort",
                        onClick: header.column.getToggleSortingHandler(),
                    }}
                >
                    {!header.column.getIsSorted() ? (
                        <>
                            <span className="before"></span>
                            <span className="after"></span>
                        </>
                    ) : header.column.getIsSorted() === "asc" ? (
                        <>
                            <span className="before active"></span>
                            <span className="after"></span>
                        </>
                    ) : (
                        <>
                            <span className="before"></span>
                            <span className="after active"></span>
                        </>
                    )}
                </div>
            </div>
        </th>
    );
};

export default TableHeader;
