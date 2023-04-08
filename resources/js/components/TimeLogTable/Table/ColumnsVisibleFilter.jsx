import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";
import React, { useState } from "react";
import { TableContext } from "./TableContext";
import CustomScrollbar from "../../CustomScrollbar";
import ReactDOM from 'react-dom/client'

import { MdOutlineSettingsSuggest } from 'react-icons/md'


const ColumnsVisibleFilter = () => {
    const { table } = React.useContext(TableContext);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // set click outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isFilterOpen &&
                !event.target.closest(".table-column-visible")
            ) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isFilterOpen]);

    return (
        <div className="table-column-visible " >
            {/* toggle */}
            <div
                className="employee-wise__col_filter_toggle"
                onClick={toggle}
            >
                <div
                    className="employee-wise__col_filter_icon mb-1 mr-1"
                >
                    <MdOutlineSettingsSuggest />
                </div>
                <div
                    className={`table-column-visible__toggle-text`}
                >
                    <span>Filter Columns</span>
                </div>
            </div>
            {/* filter */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0, pointerEvents: 'none', y: 15 }}
                        animate={{ opacity: 1, pointerEvents: 'all', y: 0 }}
                        exit={{ opacity: 0, pointerEvents: 'none', y: 15 }}
                        className={`table-column-visible__filter employee-table__dd_wrapper`}
                    >
                        <CustomScrollbar maxH={'100%'}>
                            <div className="table-column-visible__filter-header employee-table_filter_dd">
                                {/* check all */}
                                <div
                                    className="table-column-visible__filter-header-check-all table_filter_checkbox"
                                    onMouseDown={() =>
                                        localStorage.removeItem(
                                            "visibleColumns"
                                        )
                                    }
                                >
                                    <input
                                        {...{
                                            type: "checkbox",
                                            id: "dragTableCheckAllColumn",
                                            className: "mb-2",
                                            checked:
                                                table.getIsAllColumnsVisible(),
                                            onChange:
                                                table.getToggleAllColumnsVisibilityHandler(),
                                        }}
                                    />
                                    <label htmlFor="dragTableCheckAllColumn mt-1">
                                        Select All
                                    </label>
                                </div>

                                {/* check individual */}
                                {table?.getAllLeafColumns()?.map((column) => {
                                    if (column.id === 'employee_name') return;
                                    return (
                                        <div
                                            key={column.id}
                                            className="table-column-visible__filter-header-check-individual"
                                        >
                                            <input
                                                {...{
                                                    type: "checkbox",
                                                    id: `dragTableCheckColumn-${column.id}`,
                                                    className: 'mb-1',
                                                    checked:
                                                        column.getIsVisible(),
                                                    onChange:
                                                        column.getToggleVisibilityHandler(),
                                                }}
                                            />
                                            <label
                                                htmlFor={`dragTableCheckColumn-${column.id}`}
                                                className="mt-1"
                                            >
                                                {_.upperFirst(column.id)}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </CustomScrollbar>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ColumnsVisibleFilter;


const DOMRef = document.getElementById('employeeWiseTableColumnFilterBar');
if (DOMRef) {
    const root = ReactDOM.createRoot(DOMRef);
    root.render(
        <ColumnsVisibleFilter />
    )
}