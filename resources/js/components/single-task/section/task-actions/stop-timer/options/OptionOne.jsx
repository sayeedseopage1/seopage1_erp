import React, { useEffect, useState } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';

const OptionOne = ({id, onChecked, checked}) => {   
    const [duratonStart, setDurationStart] = useState('08:00 AM');
    const [durationEnd, setDurationEnd] = useState('05:00 PM');

    const [comment, setComment] = useState('');


    // initials jquery time picker
    useEffect(() => {
        window.$('#timepicker1')
        .timepicker('setTime', duratonStart)
        .on('changeTime.timepicker', function(e){
            setDurationStart(e.target.value)
        });

        window.$('#timepicker2')
        .timepicker('setTime', durationEnd)
        .on('changeTime.timepicker', function(e){
            setDurationEnd(e.target.value)
        });
    },[checked])


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
            reason_for_less_tracked_hours_a_day_task: "I Did Not Have Enough Work To Do",
            duration_form: duratonStart,
            duration_to: durationEnd
        }

        console.log({data})


    }


  return (
    <>
        {/* I Did Not Have Enough Work To Do! */}
        <div className='--option-item'>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input 
                    type='checkbox'  
                    style={{cursor: 'pointer'}}
                    checked={checked}
                    onChange={handleOnChange} 
                />
                I Did Not Have Enough Work To Do
            </div>
                {
                    checked && (
                            <div className='pl-3 my-3 bg-white'>  
                                <div className="row">
                                    <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                        <label htmlFor="" className='d-block'> From: </label>
                                        <input 
                                            id="timepicker1" 
                                            className="form-control w-100 py-2" 
                                            data-minute-step="1" 
                                            data-modal-backdrop="false" 
                                            type="text"
                                        /> 
                                    </div> 
    
                                    <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                        <label htmlFor="" className='d-block'>To</label>
                                        <input 
                                            id="timepicker2" 
                                            className="form-control w-100 py-2" 
                                            data-minute-step="1" 
                                            data-modal-backdrop="false" 
                                            type="text"
                                        /> 
                                    </div> 
                                </div>
    
                                <div className='mt-3'>
                                    <h6>Write your comments here.</h6>  
                                    <div className='ck-editor-holder stop-timer-options'>
                                        <CKEditorComponent onChange={handleEditorChange} />
                                    </div>  
                                </div>

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

export default OptionOne