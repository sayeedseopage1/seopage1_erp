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
        id: { minWidth: "80px", width: "80px", maxWidth: "80px" },
        ...props?.columnStyles,
    };
    // Define column justify content
    const columnJustifyContent = {
        default: "flex-start",
        ...props?.columnJustifyContent,
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
            className={`sp1_dashboard_data_table_thead_th sp1_tasks_th sp1_tasks_th--${column.id} ${className}`}
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
    props: PropTypes.object,
};
