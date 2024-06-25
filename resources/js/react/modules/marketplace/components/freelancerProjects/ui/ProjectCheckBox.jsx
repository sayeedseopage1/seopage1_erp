import React from 'react';

const ProjectCheckBox = ({ data, onChange, checked }) => {
    const { value, title } = data || {};
    return (
        <div className="filter_check_wrapper">
            <input
                onChange={onChange}
                checked={checked}
                className=""
                type="checkbox"
                name={value}
                id={value}
            />
            <label className='filter_check_label' htmlFor={value}>
                {title}
            </label>
        </div>
    );
};

export default ProjectCheckBox;