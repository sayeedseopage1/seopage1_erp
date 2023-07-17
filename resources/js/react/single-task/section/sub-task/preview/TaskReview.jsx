import React from 'react'
import Rating from '../../../../global/Rating';
import Loader from '../../../components/Loader';

const TaskReview = ({review, isLoading}) => {
    const data = review; 
    let comment = data?.comment || `<span className='' style="color: #A7A9B2">No Comment is Available</span>`;
   
    return (
        <div className="sp1_task_right_card mb-3" style={{maxHeight:'450px'}}>  
          {/* side drop toggle button end */}
          <div className="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
              <span className="f-16">Task Review</span> 
          </div> 

          {isLoading ? <Loader/> : <React.Fragment>
            
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
                </div>
            </div> 
            </React.Fragment>} 
          
        </div>
    )
}

export default TaskReview