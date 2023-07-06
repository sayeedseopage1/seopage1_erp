import React, { useState, useEffect, useMemo} from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';
import LeaveExplainationOption from './LeaveexplanationOption';
import LateExplainationOption from './LateExplanationOption';
import LeavingEarlyExplainationOption from './LeavingEarlyExplainationOption';

const OptionThree = ({id, onChecked, checked}) => {

  const [selectedOption, setSelectedOption] = useState(null);

  const _checked = useMemo(() => checked, [checked])

  useEffect(() => {
    if(_checked){
      window.$('#timepicker1').timepicker();
      window.$('#timepicker2').timepicker();
    }
  },[_checked])


  const handleOnChange = e => {  
      if(e.target.checked){
          onChecked(id);
      }else onChecked(null)
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
               <span className={checked ? 'font-weight-bold': ''}>I Had Less Hours To Work Today</span> 
            </div>

            {
              checked && (
                <div className='d-flex flex-column pl-4 mt-2' style={{gap: '10px'}}>
                  <LeaveExplainationOption  
                    id='half-leave-option' 
                    onChecked={setSelectedOption} 
                    checked={selectedOption === 'half-leave-option'} 
                  />

                  <LateExplainationOption
                    id='late-option' 
                    onChecked={setSelectedOption} 
                    checked={selectedOption === 'late-option'} 
                  />

                  <LeavingEarlyExplainationOption
                    id='leaving-early-option' 
                    onChecked={setSelectedOption} 
                    checked={selectedOption === 'leaving-early-option'} 
                  />
              </div>
              )
            }
        </div>
    </>
  )
}

export default OptionThree