import React from 'react'
import Rating from '../../../global/Rating'
import useSWR from 'swr';
import axios from 'axios';
import { useSelector } from 'react-redux'
import ViewComment from './ViewComment';


const fetcher = (url) => axios.get(url).then(res => res.data); 

const RevisionSection = ({task}) => { 
  const [toggleRef, setToggleRef] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const close = e => {
    setIsOpen(false);
  }


  const { data, error, isLoading } = useSWR(`/account/task/${task.id}/json?mode=task_approve`, fetcher);


  const cmt = data?.comment;
  const commentLength = cmt?.length > 250; 
  let comment = commentLength ? cmt?.slice(0, 250): cmt;  
  comment = comment || `<span className='' style="color: #A7A9B2">No Comment is Available</span>`
 
  return (
    <div className="sp1_task_right_card mb-3" ref={setToggleRef} style={{maxHeight:'450px'}}>  

        {/* side drop toggle button */}
        {isOpen && (
            <button 
                aria-label='openCommentModalButton'  
                
                className='sp1_task_right_dl_toggle'
                onClick={toggle}
                style={{zIndex: isOpen ? '110' : ''}}
            >
                <i 
                className={`fa-solid fa-circle-chevron-${ isOpen ? 'right' : 'left'}`} 
                style={{color: "#276fec"}} 
                />
            </button>
        )}
        {/* side drop toggle button end */}

        <div className="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
            <span className="f-16">Task Review</span> 
        </div> 
       
        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Deadline Meet : </div>
            <div className="d-flex align-items-center">
                <Rating rating={Number(data?.deadline_meet)} />
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Submission Quality: </div>
            <div className="d-flex align-items-center">  
                <Rating rating={Number(data?.submission_quality)} />
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Req. Fullfillment: </div>
            <div className="d-flex align-items-center"> 
            <Rating rating={Number(data?.req_fullfillment)} />
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Overall Task Ratings: </div>
            <div className="d-flex align-items-center"> 
                <Rating rating={Number(data?.overall_tasks)} /> 
            </div>
        </div> 

        <div className="mb-2">
            <span className="font-weight-bold d-block mb-1">Comments:</span>
            <div style={{color:'#777', fontSize: '13px'}}>
                <div className='sp1_ck_content' dangerouslySetInnerHTML={{__html: comment}}></div> 
                { commentLength && <a href="#" onClick={toggle} >Read More</a>}
            </div>
        </div> 
        <ViewComment isOpen={isOpen} toggleRef={toggleRef} close={close} comment={data?.comment} />
    </div>
  )
}

export default RevisionSection