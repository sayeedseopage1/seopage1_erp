import React from 'react'
import { useDebounce } from 'react-use';

const DebounceInput = ({className, rows=2, onChange, defaultValue='', debounceTime = 500, ...props}) => {
  const [value, setValue] = React.useState(defaultValue);
  const [, cancel] = useDebounce(() => onChange(value), debounceTime, [value]);
  return (
    <textarea rows={rows} className={className} value={value} onChange={(e) => setValue(e.target.value)} {...props} />
  )
}

export default DebounceInput