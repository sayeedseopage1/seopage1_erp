import React, { useState, useEffect } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';
import { Listbox } from '@headlessui/react';
import { HiOutlineSelector } from 'react-icons/hi';

const OptionFive = ({id, onChecked, checked}) =>  {
  const [startTime,setStartTime] = useState('08:00 AM');
  const [endTime,setEndTime] = useState('5:00 PM');
  const [task, setTask] = useState(null);


  useEffect(() => {
    window.$('#timepicker1')
        .timepicker('setTime', startTime)
        .on('changeTime.timepicker', function(e){
            setStartTime(e.target.value)
        });

    window.$('#timepicker2')
        .timepicker('setTime', endTime)
        .on('changeTime.timepicker', function(e){
            setEndTime(e.target.value)
        });
  },[checked])


  const handleOnChange = e => {  
      e.target.checked ? onChecked(id) : onChecked(null)
  } 
  return (
    <>
        <div className={checked ? '--option-item mt-3' : '--option-item'}>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input 
                    type='checkbox'  
                    style={{cursor: 'pointer'}}
                    checked={checked}
                    onChange={handleOnChange} 
                />
                <span className={checked ? 'font-weight-bold': ''}>I Forgot To Track Hours</span>
            </div>

            {
                checked && (
                        <div className='pl-3 my-3 bg-white'>  

                            {/* task selection */}
                            <div className='mt-3 mb-3'>
                                <div className='mb-1 text-dark'>Select the task you forgot to track hours</div>  
                                <div className='position-relative'>
                                    <Listbox 
                                        value={task} 
                                        onChange={setTask} 
                                    >
                                        <Listbox.Button className="position-relative w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between">
                                            <span>{task || '--'}</span>
                                            <HiOutlineSelector />
                                        </Listbox.Button>

                                        <Listbox.Options className="position-absolute bg-white p-2 shadow w-100" style={{zIndex: '1'}}>
                                            {[...Array(10)].map((_,i)=>(
                                                <Listbox.Option
                                                    key={i}
                                                    value={`option-${i}`}
                                                    className={({selected, active}) => selected ? 'task-selection-list-option selected': active ? 'task-selection-list-option active': 'task-selection-list-option'}
                                                >
                                                    option {i}
                                                </Listbox.Option> 
                                            )) }
                                        </Listbox.Options>
                                    </Listbox>
                                </div>
                            </div>



                            <div> 
                                <div className="w-100 pb-2">
                                     Select an approximate time here
                                </div>
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

export default OptionFive 
