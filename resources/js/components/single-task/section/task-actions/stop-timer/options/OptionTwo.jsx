import React, { useState, useEffect, useMemo } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';


const OptionTwo = ({id, onChecked, checked}) => {
   const [transitionHours, setTransitionHours] = useState(0);
   const [transitionMinutes, setTransitionMinutes] = useState(0);
   const [comment, setComment] = useState('');

    const handleOnChange = e => {  
        if(e.target.checked){
            onChecked(id);
        }else onChecked(null)
    } 


    // handle comment 
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    }  

    // handle submission 
    const handleSubmittion = (e) => {
        e.preventDefault();

        const data = {
            reason_for_less_tracked_hours_a_day_task: "During Transition From One Task To Another, I Had To Wait For a While",
            transition_hours: transitionHours,
            transition_minutes: transitionMinutes
        }
 
        console.log({data}) 
    }

  return (
    <>
        <div className='--option-item'>
            <div className='d-flex align-items-start' style={{gap: '10px'}}>
                <input 
                    type='checkbox'  
                    style={{cursor: 'pointer', marginTop: '3px'}}
                    checked={checked}
                    onChange={handleOnChange} 
                />
                During Transition From One Task To Another, I Had To Wait For a While
            </div>

            {
                    checked && (
                            <div className='pl-3 my-3 bg-white'> 
                                <React.Fragment>
                                    <div className='mt-2 mb-2 font-weight-bold'>
                                        Enter an approximate time here:
                                    </div> 
                                    <div className="row">
                                        <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                            <label htmlFor="transitionHours" className='d-block'> Hours </label>
                                            <input 
                                                id="transitionHours" 
                                                className="form-control w-100 py-2"  
                                                type="number"
                                                value={transitionHours}
                                                onChange={e => setTransitionHours(e.target.value)}
                                            /> 
                                        </div>
                                        <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                            <label htmlFor="transitionMinutes" className='d-block'> Minutes </label>
                                            <input 
                                                id="transitionMinutes" 
                                                className="form-control w-100 py-2"  
                                                type="number"
                                                value={transitionMinutes}
                                                onChange={e => setTransitionMinutes(e.target.value)}
                                            /> 
                                        </div>  
                                    </div>
                                </React.Fragment>
    
                                <div className='mt-3'>
                                    <h6>Write your comments here.</h6>  
                                    <div className='ck-editor-holder stop-timer-options'>
                                        <CKEditorComponent onChange={handleEditorChange} />
                                    </div>  
                                </div>

                                {/* submittion and back button */}
                                <div className='mt-3 d-flex align-items-center'>
                                    <Button 
                                        variant='tertiary'
                                        onClick={() => onChecked(null)}
                                        className='ml-auto mr-2'
                                    > Back </Button>
                                    
                                    <Button 
                                        onClick={handleSubmittion}
                                        className=''
                                    > Submit </Button>
                                </div>
                            </div>
                    )
                }
        </div> 
    </>
  )
}

export default OptionTwo