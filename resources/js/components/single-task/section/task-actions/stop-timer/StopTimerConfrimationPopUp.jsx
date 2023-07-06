import React from 'react'
import OptionOne from './options/OptionOne'
import OptionTwo from './options/OptionTwo'
import OptionThree from './options/OptionThree'
import OptionFour from './options/OptionFour'
import OptionFive from './options/OptionFive'

const StopTimerConfrimationPopUp = () => {  
    const [optionId, setOptionId] = React.useState(null);

  return (
    <div  className='sp1_single_task--modal-panel' style={{transition: '.4s'}}>

        {/* 1st stap */}
       <div className='py-2 px-4'>
            <h3 className='mb-3'> Are you closing for the day?</h3>
            <div className='sp1_conf--button-group' style={{gap: '10px', height: 'fit-content'}}>
                <button className=''>Yes</button>
                <button className=''>No, I am temporarily <br/> stopping the tracker</button>
            </div>
       </div>


        {/* if yes */}
        <div className='sp1_single_task--modal-body p-3'>

            {/* show track time */}
            <div className='alert alert-warning'>
                Your minimum tracked hours should have been <span className='font-weight-bold'>7 hours and 15 minutes</span>, <br/>and it is <span className='font-weight-bold'>XXX</span> hours and <span className='font-weight-bold'>YYY</span> minutes less
            </div>
            {/* show track time   */}

            <div className='sp1_stop-button-confirmation-option'>
                <h6>Why is that?</h6>
                <div className='confirmation--options'>
                    {optionId ? (
                        <>
                        { optionId === 'option-1' &&   <OptionOne id="option-1" onChecked={setOptionId} checked={optionId === 'option-1'} /> }
                        { optionId === 'option-2' &&   <OptionTwo id="option-2" onChecked={setOptionId} checked={optionId === 'option-2'}/> }
                        { optionId === 'option-3' &&   <OptionThree id="option-3" onChecked={setOptionId} checked={optionId === 'option-3'}/>  }
                        { optionId === 'option-4' &&   <OptionFour id="option-4" onChecked={setOptionId} checked={optionId === 'option-4'}/> }
                        { optionId === 'option-5' &&   <OptionFive id="option-5" onChecked={setOptionId} checked={optionId === 'option-5'}/> }
                        </>
                    ):(
                        <>
                            <OptionOne id="option-1" onChecked={setOptionId} checked={optionId === 'option-1'} /> 
                            <OptionTwo id="option-2" onChecked={setOptionId} checked={optionId === 'option-2'}/> 
                            <OptionThree id="option-3" onChecked={setOptionId} checked={optionId === 'option-3'}/>  
                            <OptionFour id="option-4" onChecked={setOptionId} checked={optionId === 'option-4'}/> 
                            <OptionFive id="option-5" onChecked={setOptionId} checked={optionId === 'option-5'}/> 
                        </>
                    )}
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default StopTimerConfrimationPopUp