import React from 'react'

const FilterItem = ({ className = '', id, children }) => {
    return (
        <div id={id} className={`sp1__pp_filter_bar_item ${className}`} style={{ borderRight: 'none' }}>
            {children}
        </div>
    )
}

export default FilterItem 