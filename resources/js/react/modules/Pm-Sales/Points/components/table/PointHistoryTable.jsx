import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
import { ConfigProvider, Table } from 'antd';
import moment from 'moment/moment';
import PointHistoryTableLoader from '../loader/PointHistoryTableLoader';
import upArrowIcon from '../../assets/upArrow.svg';
import downArrowIcon from '../../assets/downArrow.svg';
import PointHistoryTablePagination from '../PointHistoryTablePagination';


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

const baseColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <span className='point_table_data'>{text}</span>,
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text) => <span className='point_table_data'>{moment(text).format("DD-MM-YYYY")}</span>,
        sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
        title: 'Actions',
        dataIndex: 'activity',
        key: 'activity',
        render: (text) => {
            if (text) {
                return <span className='point_table_data' dangerouslySetInnerHTML={{ __html: text }} />
            } else {
                return <span className='point_table_data'> N/A </span>
            }
        },
    },
    {
        title: 'Point earned',
        dataIndex: 'total_points_earn',
        key: 'total_points_earn',
        render: (text) => <div className='point_table_data point_table_data_arrow'>
            <p>{parseFloat(text)?.toFixed(2)}</p>
            <img src={parseFloat(text) > 0 ? upArrowIcon : downArrowIcon} alt="up/down" />
        </div>,
        sorter: (a, b) => parseFloat(a.total_points_earn) - parseFloat(b.total_points_earn),
        align: 'center'
    },
    {
        title: 'Point Lost',
        dataIndex: 'total_points_lost',
        key: 'total_points_lost',
        render: (text) => <span className={`${parseFloat(text) > 0 ? 'point_table_data_neg' : ''} point_table_data`}>{parseFloat(text)?.toFixed(2)}</span>,
        sorter: (a, b) => parseFloat(a.total_points_lost) - parseFloat(b.total_points_lost),
        align: 'center'
    },
    {
        title: 'Balance Point',
        dataIndex: 'cumulative_balance',
        key: 'cumulative_balance',
        render: (text) => <span className={`${parseFloat(text) < 1 ? 'point_table_data_neg' : ''} point_table_data`}>{parseFloat(text)?.toFixed(2)}</span>,
        sorter: (a, b) => parseFloat(a.cumulative_balance) - parseFloat(b.cumulative_balance),
        align: 'center'
    },
];

const PointHistoryTable = ({ data, isLoading, onPageChange }) => {
    const [dragIndex, setDragIndex] = useState({ active: -1, over: -1 });
    // const [skipPageReset, setSkipPageReset] = useState(false);
    // const [{ pageIndex, pageSize }, setPagination] = useState({
    //     pageIndex: 0,
    //     pageSize: 10,
    // });


    // on pagination
    // const handlePageChange = ({ selected }) => {
    //     const paginate = {
    //         pageIndex: selected,
    //         pageSize,
    //     };

    //     setPagination({ ...paginate, pageIndex: 0 });
    //     onPageChange(paginate);
    // };

    // // handle page size change
    // const handlePageSizeChange = (e) => {
    //     e.preventDefault();

    //     const paginate = {
    //         pageIndex,
    //         pageSize: e.target.value,
    //     };
    //     setPagination({ ...paginate, pageIndex: 0 });
    //     onPageChange(paginate);
    // };

    // pagination
    // const pagination = useMemo(
    //     () => ({ pageIndex, pageSize }),
    //     [pageIndex, pageSize]
    // );

    // clear skipPageReset
    // useEffect(() => {
    //     if (skipPageReset) {
    //         setSkipPageReset(false);
    //     }
    // }, [data]);

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
        return <table className='cnx__table_body'><tbody><PointHistoryTableLoader /></tbody></table>
    }

    const rowClassName = (_record, index) => (index % 2 === 0 ? 'table-row-odd' : '');

    return (
        <div className="cnx__table_wrapper" style={{ padding: '16px' }}>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: '#fff'
                        },
                    },
                }}
            >
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
                                rowKey="id"
                                columns={columns}
                                dataSource={data?.data}
                                components={{
                                    header: { cell: TableHeaderCell },
                                    body: { cell: TableBodyCell },
                                }}
                                pagination={false}
                                scroll={{ x: 1024, y: 1000 }}
                                rowClassName={rowClassName}
                            />
                        </DragIndexContext.Provider>
                    </SortableContext>
                    <DragOverlay>
                        <th style={{ backgroundColor: 'gray', padding: 16 }}>
                            {columns[columns.findIndex((i) => i.key === dragIndex.active)]?.title}
                        </th>
                    </DragOverlay>
                </DndContext>
            </ConfigProvider>
            {/* <PointHistoryTablePagination
                tableData={data}
                handlePageSizeChange={handlePageSizeChange}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            /> */}
        </div>
    );
};

export default PointHistoryTable;