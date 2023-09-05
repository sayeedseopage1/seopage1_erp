import React from 'react'
import { useDebounce } from 'react-use';

const DebounceTextarea = ({className, rows=2, onChange, defaultValue='', debounceTime = 500, ...props}) => {
  const [value, setValue] = React.useState(defaultValue); 
  const [, cancel] = useDebounce(() => onChange(value), debounceTime, [value]);
  const ref = React.useRef();

  const handleOnChange = (e) => {
    setValue(e.target.value); 
  }

  return (
    <textarea 
      ref={ref} 
      rows={rows} 
      className={className} 
      value={value} 
      onChange={handleOnChange}  
      {...props} 
    />
  )
}

export default DebounceTextarea