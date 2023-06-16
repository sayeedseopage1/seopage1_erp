import React from 'react'

const Input = ({
    label, 
    id, 
    readOnly=false, 
    placeholder='', 
    inputClass='', 
    labelClass='', 
    type='text', 
    value, 
    onChange, 
    ...rest 
}) => {
  return (
    <div className="form-group my-3">
        <label 
            htmlFor={id}
            className={`f-14 text-dark-gray mb-1 ${labelClass}`} 
            data-label="true"
        >
            {label} 
            {rest.required && <sup className='f-14 mr-1'>*</sup> }
        </label>
        <input 
            type={type}
            className={`form-control height-35 f-14 ${inputClass}`}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            {...rest}
        />
    </div>
  )
}

export default Input