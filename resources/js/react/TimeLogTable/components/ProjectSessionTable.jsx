import React, { useState, useEffect } from "react";
import "./data-table.css";
import TableFooter from "./TableFooter";
import TableDragAbleHeader from "./DragHeader";
import ProjectWiseTimeLogTableSessionLoader from "./ProjectSessionTableLoader";
import { useLocalStorage } from "react-use";



const DataTable = ({
    data,
    columns = [],
    tableName = "data-table",
    sortBy = "",
    height = "calc(100vh - 100px)",
    onPaginate,
    perpageData,
    handlePerPageData,
    totalEntry,
    currentPage,
    isLoading,
}) => {
    const [columnOrder, setColumnOrder] = useState([]);
    const [value, setValue] = useLocalStorage(tableName);

    // get columns keys
    useEffect(() => {
        if(value?.columnOrders){
            setValue(value?.columnOrders)
        }else{
            const column_ids = _.map(columns, "id");
            setColumnOrder([...column_ids]);
        }
    }, []);

    const _columns = _.sortBy(columns, (item) =>
        _.indexOf(columnOrder, item.id)
    );


    // render row
    const renderRow = (data) => {
        const rows = [];
        if (data) {
            for (const [key, value] of data) {
                {
                    value?.map((item, index) => {
                        const className =
                            value.length === index + 1
                                ? "sp1_tlr_td f-14 sp1_tlr_td_border"
                                : "sp1_tlr_td f-14"; 
                        rows.push(
                            <React.Fragment key={item.start_time}>
                                <tr className="sp1_tlr_tr">
                                    {
                                        _.map(_columns, col =>{
                                            if(col.group){
                                                return index === 0 && (
                                                    <React.Fragment key={col.id}>
                                                        {col.cell({row: item, data: value, rowSpan: _.size(value)})}
                                                    </React.Fragment>
                                                );
                                            }else{
                                                    return <React.Fragment key={col.id}>
                                                        { col.cell({ row: item, data: value, index,  className: `${className} sp1_drag_col_${col?.id}`})}
                                                    </React.Fragment>
                                                }
                                            }
                                        )
                                    }
                                </tr>
                            </React.Fragment>
                        );
                    });
                }
            }
        }
        return rows;
    };

    return (
        <React.Fragment>
            <div className="p-3">
                <div
                    className="position-relative sp1_tlr_tbl_wrapper"
                    style={{ height }}
                >
                    <table className="sp1_tlr_table">
                        <thead className="sp1_tlr_thead">
                            <tr className="sp1_tlr_tr">
                                {_.map(_columns, (column) => {
                                    return (
                                        <TableDragAbleHeader
                                            key={column.id}
                                            className="sp1_tlr_th"
                                            column={column}
                                            columns = {_columns}
                                            onSort={() => {}}
                                            onDrop={setColumnOrder}
                                            order={columnOrder}
                                            tableName={tableName}
                                            storeOnLocalStore={(columns) => setValue({...value, columnOrders: columns})}
                                        /> 
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="sp1_tlr_tbody">
                            {!isLoading && renderRow(data)}
                            {isLoading && <ProjectWiseTimeLogTableSessionLoader />}
                        </tbody>
                    </table>
                </div>

                <TableFooter
                    onPaginate={onPaginate}
                    perpageData={perpageData}
                    totalEntry={totalEntry}
                    currentPage={currentPage}
                    handlePerPageData={handlePerPageData}
                />
            </div>
        </React.Fragment>
    );
};

export default DataTable;
