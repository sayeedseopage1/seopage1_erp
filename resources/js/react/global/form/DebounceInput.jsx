import React from 'react'
import { useDebounce } from 'react-use';

const DebounceInput = ({className, onChange, defaultValue='', debounceTime = 500, ...props}) => {
  const [value, setValue] = React.useState(defaultValue);
  const [, cancel] = useDebounce(() => onChange(value), debounceTime, [value]);
  return (
    <textarea rows={2} className={className} value={value} onChange={(e) => setValue(e.target.value)} {...props} />
  )
}

export default DebounceInput