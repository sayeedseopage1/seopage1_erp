import React from 'react'
import { Placeholder } from '../../../global/Placeholder'

const InnerHistoryItemLoader = () => {
  return (
    <div className="d-flex align-items-center sp1_tark_right_item py-2">
        <div className=''>
            <Placeholder
              width={48}
              height={48}
            />
        </div>
        <div className='px-3 w-100'>
            <Placeholder className='mb-2'/>  
            <Placeholder/>
        </div>
    </div>
)
}

export default InnerHistoryItemLoader 