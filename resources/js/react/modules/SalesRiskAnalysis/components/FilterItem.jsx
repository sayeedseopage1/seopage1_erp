import React from "react";
import PropTypes from "prop-types";

const FilterItem = ({ className = "", id, children }) => {
    return (
        <div id={id} className={`sp1__pp_filter_bar_item ${className}`}>
            {children}
        </div>
    );
};

export default FilterItem;

FilterItem.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};
