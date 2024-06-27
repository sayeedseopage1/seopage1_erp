import React from 'react';

const FilesFilterButton = ({ isActive, onClick, icon, label, count }) => {
    return (
        <button onClick={onClick} className={`${isActive ? 'active_files_filter_btn' : 'inactive_files_filter_btn'}`}>
            <img src={icon} alt={label} />
            <span>{label} ({count})</span>
        </button>
    );
};

export default FilesFilterButton;
