import React, { useState, useEffect } from "react";
import _ from "lodash";
import TableFooter from "./TableFooter";
import TimeLogHistoryLoader from "./TimeLogHistoryLoader";
import TableDragAbleHeader from "./DragHeader";
import EmptyTable from "./EmptyTable";

const TimeLogHistoryTable = ({
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
    isLoading
}) => {
    const [columnOrder, setColumnOrder] = useState([]);

    // get columns keys
    useEffect(() => {
        const column_ids = _.map(columns, "id");
        setColumnOrder([...column_ids]);
    }, []);

    const _columns = _.sortBy(columns, (item) =>
        _.indexOf(columnOrder, item.id)
    );

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
                                            tableName="time_log_history_modal"
                                        />
                                        
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="sp1_tlr_tbody">
                            {!isLoading && (_.size(data) > 0) &&
                                _.map(data, (row) => (
                                    <tr key={row.employee_id} className="sp1_tlr_tr">
                                        {_.map(_columns, (col) => (
                                            <td key={col.id} className="sp1_tlr_td">
                                                {col.cell(row)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                            {isLoading && <TimeLogHistoryLoader />}
                        </tbody>
                    </table>
                </div>

                {!isLoading && _.size(data) === 0 && (
                    <EmptyTable colSpan={_.size(_columns)} />
                )}

                {!isLoading && _.size(data) > 0 && (
                    <TableFooter
                        onPaginate={onPaginate}
                        perpageData={perpageData}
                        totalEntry={totalEntry}
                        currentPage={currentPage}
                        handlePerPageData={handlePerPageData}
                    />
                )}
                
            </div>
        </React.Fragment>
    );
};

export default TimeLogHistoryTable;
