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

    // Define column styles
    const columnStyles = {
        id: { minWidth: "50px", width: "50px", maxWidth: "50px" },
        questionType: { minWidth: "90px", width: "90px", maxWidth: "90px" },
        ruleList: { minWidth: "300px", width: "300px", maxWidth: "300px" },
        question_title: {
            minWidth: "300px",
            width: "300px",
            maxWidth: "300px",
        },
    };

    // Define column justify content
    const columnJustifyContent = {
        policy_rules: isNewRuleModal ? "flex-start" : "center",
        applicable_points: "end",
        questionType: "end",
        department_name: "center",
        answered_sales_person: "center",
        authorize_points: "end",
        default: "flex-start",
    };

    const columnStyle = columnStyles[column.id] || {};
    const justifyContent =
        columnJustifyContent[column.id] || columnJustifyContent.default;

    return (
        <>
            <th
                colSpan={header.colSpan}
                style={{
                    ...columnStyle,
                    padding: "15px 0",
                }}
                className={`sp1_tasks_th sp1_tasks_th--${column.id} ${className}`}
                {...props}
            >
                <div
                    style={{
                        justifyContent,
                        paddingRight:
                            column.id === "applicable_points" ? "10px" : "0",
                        paddingLeft:
                            column.id === "policy_name" ||
                            (column.id === "policy_rules" && isNewRuleModal)
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
