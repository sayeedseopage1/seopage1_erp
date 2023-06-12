import * as React from 'react'
import Button from './components/Button'
import Accordion from './components/Accordion' 
import Guideline from './components/Guideline'
import RevisionText from './components/RevisionText'

const SingleTask = () => {
  return (
    <React.Fragment>
        <div className="f-16 mb-3">
            <span> <strong>Subtask: </strong> </span>
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting elit</span>
        </div> 


        <div className='row'>
            <div className="col-8">

                <div className="bg-white rounded-lg p-3">
                    {/* button groups */}
                    <div className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group">
                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                           <i className="fa-solid fa-circle-play"></i>
                            Start Timer
                        </Button>


                        {/* <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-stopwatch"></i>
                            <span className="d-inline ml-1">00:05:44</span>
                        </Button> */}


                        {/* <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-pause"></i>
                            <span className="d-inline ml-1">Stop Timer</span>
                        </Button> */}
                           

                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-check"></i>
                            <span className="d-inline ml-1">Mark As Complete</span>
                        </Button>


                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-plus"></i>
                            <span className="d-inline ml-1">Request Time Extension</span>
                        </Button>
                     
                          

                        {/* {{-- approved --}} */}
                        {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-success mr-2 text-white border-0"
                        >
                            <span className="d-inline mr-1">Approved</span> 
                        </button> */}

                        {/* {{-- awaiting for time extension --}} */}
                        {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-warning mr-2 text-dark border-0" >
                            <span className="d-inline mr-1">Awaiting for Time Extension</span> 
                        </button> */}

                        {/* {{-- 3 dot --}} */}
                        <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                            <i className="bi bi-three-dots" ></i>
                        </button>
                    </div> 


                    {/* task information */}
                    <div>
                        
                        <div className="d-flex flex-column py-3">
                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Parent Task: </div>
                                <div className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Project : </div>
                                <div className="d-flex align-items-center">
                                    <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'red',
                                        marginRight: '6px'
                                    }}></span>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </div>
                            </div>  

                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Milestone : </div>
                                <div className="d-flex align-items-center">
                                    <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--header_color)',
                                        marginRight: '6px'
                                    }}></span>
                                    Lorem Ipsum is simply dummy text of the printing.
                                </div>
                            </div>                     

                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Assigned To : </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img 
                                            src="/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png"
                                            alt=""
                                            width='32px'
                                            height='32px'
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <span className="d-block f-14 font-weight-bold">Md Sadik Istiak <sup className="rounded-pill bg-dark text-white px-1" style={{fontSize: '10px'}}>It's You</sup></span>

                                        <span
                                            style={{fontSize: '13px',color:'rgba(111,114,122,1)'}} 
                                        >
                                            UI/UX Designer
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Assigned by : </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img 
                                            src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                                            alt=""
                                            width='32px'
                                            height='32px'
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <span className="d-block f-14 font-weight-bold">Tapas Mandal</span>  
                                        <span style={{fontSize: '13px',color:'rgba(111,114,122,1)'}}>
                                            Co-Ordinator
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Priority : </div>
                                <div className="d-flex align-items-center">
                                    <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'rgba(252, 189, 1, 1)',
                                        marginRight: '6px'
                                    }}></span>
                                    Medium
                                </div>
                            </div>  
                            
                            <div className="d-flex align-items-center mb-2">
                                <div className="" style={{width: '150px'}}>Task Category : </div>
                                <div className="d-flex align-items-center"> 
                                    Frontend Design
                                </div>
                            </div>   
                        </div>
                    </div>
                    

                    {/* guidelines */}

                   <div>
                    <Accordion expendable={false} title="General Guidelines">
                            <Guideline  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with " />

                            <Guideline  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with " />
                        </Accordion>



                        <Accordion 
                            title="Task Revision from Client"
                            headingClass="d-flex align-items-center justify-content-between"
                            headingStyle={{background: 'rgba(227,62,79,1)',color:'#fff'}}
                        >
                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />

                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />
                        </Accordion>


                        <Accordion 
                            title="Task Revision from Client"
                            headingClass="d-flex align-items-center justify-content-between"
                            headingStyle={{background: 'rgba(227,62,79,1)',color:'#fff'}}
                        >
                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />

                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />
                        </Accordion>

                        <Accordion expendable={false} title="Task Descriptions">
                            <Guideline  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with " />

                            <Guideline  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with " />
                        </Accordion>
                   </div>


                    
                </div>
                
            </div>
        </div>
    </React.Fragment>
  )
}

export default SingleTask