import React, { useState, useEffect } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';

const OptionOne = () => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        window.$('#timepicker1').timepicker();
        window.$('#timepicker2').timepicker();
    },[checked])


    const handleOnChange = e => { 
        console.log(e.target.checked)
        e.preventDefault();
        setChecked(e.target.checked)
    }

    const handleOnClick = e => {
        setChecked(!checked)
    }

  return (
    <>
        {/* I Did Not Have Enough Work To Do! */}
        <div className='--option-item'>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input 
                    type='radio' 
                    name='confiramtion_time_stop' 
                    style={{cursor: 'pointer'}} 
                    onChange={handleOnChange}
                />
                I Did Not Have Enough Work To Do!
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
                                    <div className='ck-editor-holder' style={{width: '350px'}}>
                                        <CKEditorComponent />
                                    </div> 
                                </div>

                                <div className='mt-3 d-flex align-items-center'>
                                    <Button className='ml-auto'> Submit </Button>
                                </div>
                            </div>
                    )
                }
        </div>
    </>
  )
}

export default OptionOne