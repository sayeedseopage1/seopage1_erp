import React from "react";
import { flexRender } from "@tanstack/react-table";
import PropTypes from "prop-types";



/**
 * Without Draggable Column Header
 * @param {object} props - Component properties
 * @param {object} props.header - Header object
 * @param {object} props.table - Table object
 * @param {string} props.className - Additional classes
 * @param {boolean} props.isNewRuleModal - Is new rule modal
 * @returns {JSX.Element} - Rendered component
 * @description - Without Draggable Column Header Component
 */

const WithoutDraggableColumnHeader = ({
    header,
    table,
    className = "",
    isNewRuleModal,
    ...props
}) => {
    const { column } = header;

    // Define column styles
    const columnStyles = {
        id: { minWidth: "50px", width: "50px", maxWidth: "50px" },
        previous_deadline: { minWidth: "180px", width: "180px", maxWidth: "180px" },
        admin_comment: { minWidth: "180px", width: "180px", maxWidth: "180px" },
        reason: { minWidth: "180px", width: "180px", maxWidth: "180px" },
        approved_on: { minWidth: "180px", width: "180px", maxWidth: "160px" },
        approved_by: { minWidth: "180px", width: "180px", maxWidth: "180px" },
    }
    // Define column justify content
    const columnJustifyContent = {
        milestone_cost: "center",
        creation_date: "center",
        status: "center",
        due_date: "center",
        tracking_start_time: "center",
        estimate_hours: "center",
        logged_hours: "center",
        default: "flex-start",
    };

    const columnStyle = columnStyles[column.id] || {};
    const justifyContent =
        columnJustifyContent[column.id] || columnJustifyContent.default;

    return (
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
            </div>
        </th>
    );
};

export default WithoutDraggableColumnHeader;

WithoutDraggableColumnHeader.propTypes = {
    header: PropTypes.object.isRequired,
    table: PropTypes.object.isRequired,
    className: PropTypes.string,
    isNewRuleModal: PropTypes.bool,
};
