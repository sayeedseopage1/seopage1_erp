import { Input } from 'antd';
import React from 'react';

const FilterInput = ({ label, value, placeholder, onChange, suffix, prefix }) => {
    return (
        <div className='filter_input_wrapper'>
            <label>{label}</label>
            <Input size="large" value={value} placeholder={placeholder} onChange={onChange} prefix={prefix} suffix={suffix} />
        </div>
    );
};

export default FilterInput;