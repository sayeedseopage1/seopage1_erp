import * as React from 'react';


export default function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }){
    const ref = React.useRef();
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }