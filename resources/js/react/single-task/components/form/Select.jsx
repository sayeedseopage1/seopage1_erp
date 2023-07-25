import * as React from 'react'
import { usePopper } from 'react-popper'


const Select = ({
  editable
}) => {
  return (
    <div className='sp1-selection'>
       <div className='sp1-selection-display'>
          <input type='text' />
       </div>
    </div>
  )
}

export default Select