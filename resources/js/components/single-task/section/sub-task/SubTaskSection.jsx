import React from 'react'
import SubTask from './SubTask' 
import SubTaskForm from './SubTaskForm';
import Button from '../../components/Button';
import SubTaskFormModal from './SubTaskFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTaskDetailsQuery, useLazyGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import { useNavigate } from 'react-router-dom';
import { storeSubTasks } from '../../../services/features/subTaskSlice';
import SubtTaskEditForm from './SubTaskEditForm';
import CustomModal from '../../components/CustomModal';

const SubTaskSection = () => {
  const {task, subTask} = useSelector(s => s.subTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = React.useState(null);


  const [formMode, setFormMode] = React.useState('add');
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const [subtaskModalToggleRef, setSubtaskModalToggleRef] = React.useState(null);
  
  const toggleAddButton = () => setIsTaskModalOpen(!isTaskModalOpen);
  const closeAddModal = () => {
    setIsTaskModalOpen(false)
    setFormMode('add');
    navigate(`/account/tasks/${task?.id}`);
  };
  const toggleEditButton = (e) => {
    setFormMode('edit')
    setIsTaskModalOpen(!isTaskModalOpen)
  };

  // edit modal form control
  const toggleEditForm = (e, id) => {
    e.preventDefault();
    setEdit(id);
    setIsTaskModalOpen(true);
  }

  const closeEditForm = () => {
    setEdit(null);
    setIsTaskModalOpen(false);
  }

  // edit modal form control end
  // const {
  //   data,
  //   isFetching
  // } = useGetTaskDetailsQuery(`/${task?.id}/json?mode=sub_task`, {
  //   skip: subTask?.length
  // });

  // fetch all task 
  const [getTaskDetails, {isFetching}] = useLazyGetTaskDetailsQuery('', {
    skip: subTask?.length
  })

  
  // if task notes fetch completed store data into redux store
  React.useEffect(()=> {
    if(task && task.id){
      getTaskDetails(`/${task?.id}/json?mode=sub_task`)
      .unwrap()
      .then(res => {
        if(res){
          dispatch(storeSubTasks(res));
        }
      })
      .catch(err => {
        console.log(err)
      })
    } 
  }, [task]);
   
  // React.useEffect(() => {
  //   if(!isFetching && data){
  //     dispatch(storeSubTasks(data)); 
  //   }
  // },[data])
 
  return (
    <div className='sp1_task_right_card mb-3' style={{zIndex: isTaskModalOpen? '99' : ''}}>  

      <CustomModal 
        toggleRef={subtaskModalToggleRef}
        isOpen={isTaskModalOpen}  
        close={closeAddModal}
        formMode={formMode}
      >
       {
       !edit ? 
          <SubTaskForm  close={closeAddModal}/> 
        : 
          <SubtTaskEditForm close={closeEditForm} editId={edit}/>
      } 
      </CustomModal>

      {/* left dropdown */}
      
      {isTaskModalOpen && 
        <button 
          aria-label='openCommentModalButton'  
          ref={setSubtaskModalToggleRef}
          className='sp1_task_right_dl_toggle'
          onClick={toggleAddButton}
          style={{zIndex: isTaskModalOpen? '110' : ''}}
        >
            <i className={`fa-solid fa-circle-chevron-${isTaskModalOpen ? 'right' : 'left'}`} style={{color: "#276fec"}} />
        </button>
      }
      {/* left dropdown */}

       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <div className="f-16">
              <span>Sub Task</span>
                {isFetching && <div 
                    className="spinner-border text-dark ml-2" 
                    role="status"
                    style={{
                        width: '16px',
                        height: '16px',
                        border: '0.14em solid rgba(0, 0, 0, .25)',
                        borderRightColor: 'transparent' 
                    }}
                />}
          </div> 
              <Button
                  variant='tertiary'
                  className="sp1_tark_add_item" 
                  aria-label="addButton"
                  onClick={toggleAddButton}
              > 
                  {isTaskModalOpen ? (
                    <> <i className="fa-solid fa-xmark" style= {{fontSize: '12px'}}/> Close </> 
                    ) :
                    (
                      <> <i className="fa-solid fa-plus"  style= {{fontSize: '12px'}} /> Sub Task  </>
                    )
                  } 
              </Button>
        </div>

        <div className="sp1_task_right_card--body">
        {
          !isFetching ? subTask.length !== 0
            ? subTask?.map((sub) => 
                <SubTask 
                    key={sub.id} 
                    subTask={sub} 
                    task={task}
                    toggleEditForm={toggleEditForm} 
                />)
             :<div
            className='d-flex align-items-center justify-content-center'
            style={{
              color: '#B4BCC4',
              fontSize: '15px',
              textAlign: 'center',
              height: '100%',
              width: '100%',
            }}
          >
             Sub Task is Not Available
          </div> : 
          <div className='d-flex align-items-center justify-content-center'
            style={{
              color: '#5A6169',
              fontSize: '15px',
              textAlign: 'center',
              height: '100%',
              width: '100%',
            }}
          > 
              <div 
                    className="spinner-border text-dark ml-2" 
                    role="status"
                    style={{
                        width: '16px',
                        height: '16px',
                        border: '0.14em solid rgba(0, 0, 0, .25)',
                        borderRightColor: 'transparent',
                        marginRight: '10px'
                    }}
                />
              Loading...
          </div> } 
        </div>

   </div>
  )
}

export default SubTaskSection