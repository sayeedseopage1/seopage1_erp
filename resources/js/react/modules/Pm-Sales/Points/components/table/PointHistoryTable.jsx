import React, { createContext, useContext, useState } from 'react';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
import { Table } from 'antd';
import moment from 'moment/moment';
import PointHistoryTableLoader from '../loader/PointHistoryTableLoader';


const DragIndexContext = createContext({ active: -1, over: -1 });

const dragActiveStyle = (dragState, id) => {
    const { active, over, direction } = dragState;
    // drag active style
    let style = {};
    if (active && active === id) {
        style = { backgroundColor: 'gray', opacity: 0.5 };
    }
    // dragover dashed style
    else if (over && id === over && active !== over) {
        style =
            direction === 'right'
                ? { borderRight: '1px dashed gray' }
                : { borderLeft: '1px dashed gray' };
    }
    return style;
};

const TableBodyCell = (props) => {
    const dragState = useContext(DragIndexContext);
    return <td {...props} style={{ ...props.style, ...dragActiveStyle(dragState, props.id) }} />;
};

const TableHeaderCell = (props) => {
    const dragState = useContext(DragIndexContext);
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: props.id });
    const style = {
        ...props.style,
        cursor: 'move',
        ...(isDragging ? { position: 'relative', zIndex: 9999, userSelect: 'none' } : {}),
        ...dragActiveStyle(dragState, props.id),
    };
    return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

// const dataSource = [
//     {
//         key: '1',
//         name: 'John Brown',
//         gender: 'male',
//         age: 32,
//         email: 'John Brown@example.com',
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         gender: 'female',
//         age: 42,
//         email: 'jimGreen@example.com',
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         gender: 'female',
//         age: 32,
//         email: 'JoeBlack@example.com',
//         address: 'Sidney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'George Hcc',
//         gender: 'male',
//         age: 20,
//         email: 'george@example.com',
//         address: 'Sidney No. 1 Lake Park',
//     },
// ];

const baseColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (text) => <span className='point_table_data'>{text}</span>,
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        render: (text) => <span className='point_table_data'>{moment(text).format("DD-MM-YYYY")}</span>
    },
    {
        title: 'Actions',
        dataIndex: 'activity',
        render: (text) => {
            if (text) {
                return <span className='point_table_data' dangerouslySetInnerHTML={{ __html: text }} />
            } else {
                return <span className='point_table_data'> N/A </span>
            }
        }
    },
    {
        title: 'Point earned',
        dataIndex: 'total_points_earn',
        render: (text) => <span className='point_table_data'>{text}</span>
    },
    {
        title: 'Point Lost',
        dataIndex: 'total_points_lost',
        render: (text) => <span className='point_table_data'>{text}</span>
    },
    {
        title: 'Balance Point',
        dataIndex: 'cumulative_balance',
        render: (text) => <span className='point_table_data'>{text}</span>
    },
];

const PointHistoryTable = ({ data, isLoading }) => {
    const [dragIndex, setDragIndex] = useState({ active: -1, over: -1 });

    const [columns, setColumns] = useState(() =>
        baseColumns.map((column, i) => ({
            ...column,
            key: `${i}`,
            onHeaderCell: () => ({ id: `${i}` }),
            onCell: () => ({ id: `${i}` }),
        })),
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 1,
            },
        }),
    );

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setColumns((prevState) => {
                const activeIndex = prevState.findIndex((i) => i.key === active?.id);
                const overIndex = prevState.findIndex((i) => i.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
        setDragIndex({ active: -1, over: -1 });
    };

    const onDragOver = ({ active, over }) => {
        const activeIndex = columns.findIndex((i) => i.key === active.id);
        const overIndex = columns.findIndex((i) => i.key === over?.id);
        setDragIndex({
            active: active.id,
            over: over?.id,
            direction: overIndex > activeIndex ? 'right' : 'left',
        });
    };

    if (isLoading) {
        return <table className='cnx__table_body'><PointHistoryTableLoader /></table>
    }

    return (
        <DndContext
            sensors={sensors}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            collisionDetection={closestCenter}
        >
            <SortableContext items={columns.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                <DragIndexContext.Provider value={dragIndex}>
                    <Table
                        rowKey="key"
                        columns={columns}
                        dataSource={data}
                        components={{
                            header: { cell: TableHeaderCell },
                            body: { cell: TableBodyCell },
                        }}
                        pagination={false}
                        scroll={{ x: 1024, y: 1000 }}
                    />
                </DragIndexContext.Provider>
            </SortableContext>
            <DragOverlay>
                <th style={{ backgroundColor: 'gray', padding: 16 }}>
                    {columns[columns.findIndex((i) => i.key === dragIndex.active)]?.title}
                </th>
            </DragOverlay>
        </DndContext>
    );
};

export default PointHistoryTable;