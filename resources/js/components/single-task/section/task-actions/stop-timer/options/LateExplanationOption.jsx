import React, { useEffect } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';

const LateExplainationOption = ({id, onChecked, checked}) => { 
    useEffect(() => {
        window.$('#timepicker1').timepicker();
        window.$('#timepicker2').timepicker();
    },[checked])


    const handleOnChange = e => {  
        if(e.target.checked){
            onChecked(id);
        }else onChecked(null)
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
               I Came Late
            </div>
                {
                    checked && (
                            <div className='pl-3 my-3 bg-white'> 
                                <div className='mb-2 font-weight-bold'> Select the delay time here </div>
                                 
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
                                    <div className='mb-2 font-weight-bold'>Explain the reason of being late today</div>  
                                    <div className='ck-editor-holder stop-timer-options'>
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

export default LateExplainationOption 