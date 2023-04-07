import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";
import React, { useState } from "react";
import { TableContext } from "./TableContext";
import CustomScrollbar from "../../CustomScrollbar";

const ColumnsVisibleFilter = ({ classes }) => {
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
        <div className="table-column-visible">
            {/* toggle */}
            <div
                className={`table-column-visible__toggle ${classes.filterToggle}`}
                onClick={toggle}
            >
                <div
                    className={`table-column-visible__toggle-icon ${classes.filterToggleIcon}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                    </svg>
                </div>
                <div
                    className={`table-column-visible__toggle-text ${classes.filterToggleText}`}
                >
                    <span>Filter Columns</span>
                </div>
            </div>
            {/* filter */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "300px", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className={`table-column-visible__filter ${classes.filterDropdown}`}
                    >
                        <CustomScrollbar minH={300} maxH={300}>
                            <div className="table-column-visible__filter-header">
                                {/* check all */}
                                <div
                                    className="table-column-visible__filter-header-check-all"
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
                                            checked:
                                                table.getIsAllColumnsVisible(),
                                            onChange:
                                                table.getToggleAllColumnsVisibilityHandler(),
                                        }}
                                    />
                                    <label htmlFor="dragTableCheckAllColumn">
                                        Select All
                                    </label>
                                </div>

                                {/* check individual */}
                                {table?.getAllLeafColumns()?.map((column) => {
                                    return (
                                        <div
                                            key={column.id}
                                            className="table-column-visible__filter-header-check-individual"
                                        >
                                            <input
                                                {...{
                                                    type: "checkbox",
                                                    id: `dragTableCheckColumn-${column.id}`,
                                                    checked:
                                                        column.getIsVisible(),
                                                    onChange:
                                                        column.getToggleVisibilityHandler(),
                                                }}
                                            />
                                            <label
                                                htmlFor={`dragTableCheckColumn-${column.id}`}
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
