import React from 'react'

const InnerNote = () => {
  return (
    <div className=''>
        <div>
          <h6>Note title</h6>  
          <div dangerouslySetInnerHTML={{__html: `<p>Note text here...</p>`}}/>
        </div>
    </div>
  )
}

export default InnerNote