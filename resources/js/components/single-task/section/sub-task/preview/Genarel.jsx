import React from 'react'
import { useGetTaskDetailsQuery } from '../../../../services/api/SingleTaskPageApi';
import { User } from '../../../../utils/user-details';

const Genarel = ({taskID}) => { 
 const {  data: task,  isFetching } = useGetTaskDetailsQuery(`/${taskID}/json?mode=basic`);
 const assigneeTo = new User(task?.users?.[0]);
 const assigneeBy = new User(task?.create_by);
 const loggedUser = new User(window?.Laravel?.user);
 
  return (
    <div className='d-flex flex-column' style={{gap: '10px'}}>
        <h6 className=''>Subtask: <span className='text-primary font-weight-normal'>{_.startCase(task?.subtask_title)}</span></h6>
        <div className='d-flex align-items-center'>
            <div className="mr-2" style={{width: '100px'}}>Parent Task </div>
            <div> : &nbsp; {_.startCase(task?.heading)} </div>
        </div>

        <div className='d-flex align-items-center'>
            <div className="mr-2" style={{width: '100px'}}>Project </div>
            <div className='d-flex align-items-center'>  : &nbsp;
                <span
                    style={{
                        display: 'block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '100%',
                        background: 'red',
                        marginRight: '6px',
                        boxShadow: '0 0 10px rgba(0,0,0,.1)'
                    }} 
                />
                {_.startCase(task?.project_name)}
            </div>
        </div>


        <div className='d-flex align-items-center'>
            <div className="mr-2" style={{width: '100px'}}>Milestone </div>
            <div className='d-flex align-items-center'>  : &nbsp;
                <span
                    style={{
                        display: 'block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '100%',
                        background: task?.board_column?.label_color,
                        marginRight: '6px',
                        boxShadow: '0 0 10px rgba(0,0,0,.1)'
                    }} 
                />
                {task?.board_column?.column_name}
            </div>
        </div> 

        {/* asignee to */}
        <div className="d-flex align-items-center">
            <div className="mr-2" style={{width: '100px'}}>Assigned To </div>
            <div className="d-flex align-items-center"> : &nbsp;
                <div  
                    style={{
                        width: '32px',
                        height: '32px'
                    }}
                >
                    <img 
                        src={assigneeTo?.getAvatar()}
                        alt={assigneeTo?.getName()}
                        width='32px'
                        height='32px'
                        className="rounded-circle"
                    />
                </div>
                <div className="ml-2">
                    <span className={`d-block f-14 font-weight-bold`}>
                        {assigneeTo?.getName()} 
                        {Number(assigneeTo?.getId()) === Number(loggedUser?.getId()) && 
                            <sup 
                                className="rounded-pill bg-dark text-white px-1" 
                                style={{fontSize: '10px'}}
                            >
                                It's You
                            </sup>
                        }
                    </span>

                    <span
                        style={{fontSize: '12px'}} 
                    >
                        {assigneeTo?.getDesignationName()}
                    </span>
                </div>
            </div>
        </div>


        {/* assignee by */}
        <div className="d-flex align-items-center">
            <div className="mr-2" style={{width: '100px'}}>Assigned by </div>
            <div className="d-flex align-items-center"> : &nbsp;
                <div  
                    style={{
                        width: '32px',
                        height: '32px'
                    }}
                >
                    <img 
                        src={assigneeBy?.getAvatar()}
                        alt={assigneeBy?.getName()}
                        width='32px'
                        height='32px'
                        className="rounded-circle"
                    />
                </div>
                <div className="ml-2">
                    <span className={`d-block f-14 font-weight-bold`}>
                        {assigneeBy?.getName()} 
                        {Number(assigneeBy?.getId()) === Number(loggedUser?.getId()) && 
                            <sup 
                                className="rounded-pill bg-dark text-white px-1" 
                                style={{fontSize: '10px'}}
                            >
                                It's You
                            </sup>
                        }
                    </span>

                    <span
                        style={{fontSize: '12px'}} 
                    >
                        {assigneeBy?.getDesignationName()}
                    </span>
                </div>
            </div>
        </div>

        {/* PRIORITY */}
        
        <div className='d-flex align-items-center'>
            <div className="mr-2" style={{width: '100px'}}>Priority </div>
            <div className='d-flex align-items-center'>  : &nbsp;
                <span
                    style={{
                        display: 'block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '100%',
                        background: 'rgba(252, 189, 1, 1)',
                        marginRight: '6px',
                        boxShadow: '0 0 10px rgba(0,0,0,.1)'
                    }} 
                />
                {_.startCase(task?.priority)}
            </div>
        </div> 

        {/* category */}
        <div className='d-flex align-items-center'>
            <div className="mr-2" style={{width: '100px'}}>Task Category </div>
            <div className='d-flex align-items-center'> : &nbsp;
                {_.startCase(task?.task_category?.category_name) }
            </div>
        </div> 

    </div>
  )
}

export default Genarel