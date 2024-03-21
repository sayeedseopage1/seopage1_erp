import React from "react";
import { flexRender } from "@tanstack/react-table";
import PropTypes from "prop-types";

// without draggable column header
const WithoutDraggableColumnHeader = ({
    header,
    table,
    className = "",
    isNewRuleModal,
    ...props
}) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;
    const { tableName } = table.getState();

    return (
        <>
            <th
                colSpan={header.colSpan}
                style={{
                    minWidth:
                        column.id === "id"
                            ? "50px"
                            : column.id === "questionType"
                            ? "90px"
                            : "auto",
                    width:
                        column.id === "id"
                            ? "50px"
                            : column.id === "questionType"
                            ? "90px"
                            : column.id === "ruleList"
                            ? "300px"
                            : "auto",
                    maxWidth:
                        column.id === "id"
                            ? "50px"
                            : column.id === "questionType"
                            ? "90px"
                            : column.id === "ruleList"
                            ? "300px"
                            : "auto",
                    padding: "15px 0",
                }}
                className={`sp1_tasks_th sp1_tasks_th--${column.id} ${className}`}
                {...props}
            >
                <div
                    style={{
                        justifyContent:
                            column.id === "policy_rules"
                                ? isNewRuleModal
                                    ? "flex-start"
                                    : "center"
                                : column.id === "applicable_points"
                                ? "end"
                                : column.id === "questionType"
                                ? "end"
                                : column.id === "department_name"
                                ? "center"
                                : "flex-start",
                        paddingRight:
                            column.id === "applicable_points" ? "10px" : "0",
                        paddingLeft:
                            column.id === "policy_name"
                                ? "10px"
                                : column.id === "policy_rules" && isNewRuleModal
                                ? "10px"
                                : "0",
                    }}
                    className={`d-flex align-items-start`}
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
                    {column.id !== "expend" && column.id !== "action" && (
                        <button
                            {...{
                                onClick:
                                    header.column.getToggleSortingHandler(),
                                className: "sp1_tasks_column_sort_btn pl-1",
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
        </>
    );
};

export default WithoutDraggableColumnHeader;

WithoutDraggableColumnHeader.propTypes = {
    header: PropTypes.object.isRequired,
    table: PropTypes.object.isRequired,
    className: PropTypes.string,
    isNewRuleModal: PropTypes.bool,
};
