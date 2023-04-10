import { flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";

const TableHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;


    const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {


        columnOrder.splice(
            columnOrder.indexOf(targetColumnId),
            0,
            columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
        );
        console.log('new col:', columnOrder)

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
            localStorage.setItem(`${tableName}ColumnOrder`, JSON.stringify(newColumnOrder));
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
            className="drag-table__header py-3 text-primary bg-white "
            style={{
                opacity: isDragging ? 0 : 1,
                borderBottom: '2px solid #AAD1FC',
                minWidth: '160px',
                fontSize: '12px'
            }}
        >
            <div ref={previewRef} className="drag-table__header-wrapper d-flex align-items-center pr-5">
                {/* sort */}
                <div
                    {...{
                        className: "drag-table__header-sort left-0 pr-1",
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
                <div className="position-relative">
                    <div ref={header.column.id === 'employee_name' ? null : dragRef} className="drag-table__header-drag"

                        style={{
                            cursor: header.column.id === 'employee_name' ? 'default' : 'move',
                            userSelect: 'none'
                        }}
                    />
                    <div className="drag-table__header-content">
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
    );
};

export default TableHeader;
