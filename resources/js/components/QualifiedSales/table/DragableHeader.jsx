import _ from "lodash";
import * as React from "react";
import { useDrag, useDrop } from "react-dnd";

const DragableHeader = ({
    column,
    columns,
    setColumns,
    sortConfig,
    requestSort,
}) => {
    const ref = React.useRef(null);

    // re ordering column
    const reOrder = (curr, target) => {
        columns.splice(
            columns.indexOf(target),
            0,
            columns.splice(columns.indexOf(curr), 1)[0]
        );

        return [...columns];
    };

    // drag
    const [{ isDragging }, drag] = useDrag({
        type: "column",
        item: { column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // drop
    const [{ isOver }, drop] = useDrop({
        accept: "column",
        hover(item, monitor) {
            const dragIndex = columns.indexOf(item.column.header);
            const hoverIndex = columns.indexOf(column.header);
        },
        drop: (item, monitor) => {
            if (item.column !== column) {
                const reOrderColumn = reOrder(item.column, column);
                setColumns(reOrderColumn);
                localStorage.setItem(
                    `qualifiedSalesTable_${window?.Laravel?.user?.id}`,
                    JSON.stringify(reOrderColumn)
                );
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
                background: isOver ? "#ccc" : "",
            }}
            className={`sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_${
                column?.id
            } sp1_qs_table_td_${column?.id} ${column?.headClass || ""}`}
        >
            {column.accessor ? (
                <>
                    <div onClick={() => requestSort(column.accessor)}>
                        {sortConfig.key === column.accessor ? (
                            sortConfig.direction === "asc" ? (
                                <span className="table_asc_dec asc"></span>
                            ) : (
                                <span className="table_asc_dec dec"></span>
                            )
                        ) : (
                            <span className="table_asc_dec"></span>
                        )}
                    </div>
                    {/* <span className="table_asc_dec asc"></span>
        <span className="table_asc_dec dec"></span> */}

                    <span className="sp1_qs_table_th_text">
                        {_.isFunction(column.header)
                            ? column.header()
                            : column.header}
                    </span>
                </>
            ) : _.isFunction(column.header) ? (
                <span className="sp1_qs_table_th_text">{column.header()}</span>
            ) : (
                <span className="sp1_qs_table_th_text">{column.header}</span>
            )}
        </div>
    );
};

export default DragableHeader;
