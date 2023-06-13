import React from 'react'

const RevisionSection = () => {
  return (
    <div className="sp1_task_right_card mb-3" style={{maxHeight:'450px'}}>  
        <div className="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
            <span className="f-16">Task Review</span> 
        </div> 
        
        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Deadline Meet : </div>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Submission Quality: </div>
            <div className="d-flex align-items-center"> 
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star-half-stroke" style={{color:'#FFA500'}}></i>
                <i className="fa-regular fa-star" style={{color: '#b9b9b9'}}></i>
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Req. Fullfillment: </div>
            <div className="d-flex align-items-center"> 
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star-half-stroke" style={{color:'#FFA500'}}></i>
                <i className="fa-regular fa-star" style={{color: '#b9b9b9'}}></i>
            </div>
        </div> 

        <div className="d-flex align-items-center mb-2">
            <div className="" style={{width: '150px'}}>Overall Task Ratings: </div>
            <div className="d-flex align-items-center"> 
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
                <i className="fa-solid fa-star" style={{color:'#FFA500'}}></i>
            </div>
        </div> 

        <div className="mb-2">
            <span className="font-weight-bold d-block mb-1">Comments:</span>
            <p style={{color:'#777', fontSize: '13px'}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea omnis libero doloremque id earum voluptates eligendi, perspiciatis nemo a ut maxime vel ad dignissimos ex, mollitia necessitatibus? Libero, voluptatum perspiciatis.
                <a href="#">Read More</a>
            </p>
                
        </div> 
    </div>
  )
}

export default RevisionSection