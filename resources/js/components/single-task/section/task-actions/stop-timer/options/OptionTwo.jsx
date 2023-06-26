import React from 'react'

const OptionTwo = () => {
  return (
    <>
        <div className='--option-item'>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input type='radio' name='confiramtion_time_stop' />
                During Transition From One Task To Another, I Had To Wait For a While
            </div>
        </div>
        <div className='--option-item'>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input type='radio' />
                I Forgot To Track Hours
            </div>
        </div>
    </>
  )
}

export default OptionTwo