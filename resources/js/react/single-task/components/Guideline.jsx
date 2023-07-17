import React from 'react'
import { useState, useRef } from 'react';
import Modal from './Modal';
import { useClickAway } from 'react-use';

const Guideline = ({text, editorContainerClass}) => {
  const [expend, setExpend] = useState(false);
  let isLong = text?.length > 400;
  const showText = isLong ? text.slice(0, 400) + '...' : text;
  const ref = useRef();

  const handleExpend = (e) => {
    e.preventDefault();
    setExpend(!expend);
  };

  useClickAway(ref, () => {
      setExpend(false)
  })

  return (
    <div className='sp1_task_card--sub-card'>
       <div className={editorContainerClass} dangerouslySetInnerHTML={{__html: showText}}></div> 
       {isLong ? <a href="#" onClick={handleExpend} className=''> Read full guideline </a> : ''}

       <Modal className="sp1_task_card--sub-card-modal" isOpen={expend}>
            <div ref={ref} className='sp1_task_card--sub-card-modal-content'>
                <div className='d-flex align-items-center justify-content-between __header'>
                    <button onClick={() => setExpend(false)}>
                    <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className='__content'> 
                    <div className={`sp1_ck_content ${editorContainerClass}`} dangerouslySetInnerHTML={{__html: text}} />
                </div>

                <div className=' __footer'>
                    <button className='btn btn-sm py-1 btn-primary ml-auto' onClick={() => setExpend(false)}>
                        Close
                    </button>
                </div> 
            </div>
        </Modal>
    </div>
  )
}

export default Guideline 