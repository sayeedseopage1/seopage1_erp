import React from 'react';

const FilterBarTitle = ({ title, onClick }) => {
    return (
        <div className='filter_bar_title_wrapper'>
            <p className='filter_bar_title'>{title}</p>
            <button onClick={onClick} className='filter_bar_clear'>Clear</button>
        </div>
    );
};

export default FilterBarTitle;