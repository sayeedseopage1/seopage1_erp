import React from 'react'

const Guideline = ({text}) => {
  let isLong = text.length > 400;
  const showText = isLong ? text.slice(0, 400) + '...' : text;


  return (
    <div className='sp1_task_card--sub-card'>
       {showText} 
       {isLong ? <a href="#" className='ml-2'>Read full guideline</a> : ''}
    </div>
  )
}

export default Guideline 