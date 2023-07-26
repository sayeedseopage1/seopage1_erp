import React from 'react'
import Note from './Note'
import CreateNote from './CreateNote';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { storeNotes } from '../../../services/features/subTaskSlice';
import { useLazyGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import EditNote from './EditNote';
import NoteView from './NoteView';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NoteSection = () => {
  const {task, notes} = useSelector(s => s.subTask); 
  const [mode, setMode] = React.useState('');

  const [modalRefButton, setModalRefButton] = React.useState(null); 

  const dispatch = useDispatch();   
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramType = searchParams.get('type');


  // fetch all task 
  const [getTaskDetails, {isFetching}] = useLazyGetTaskDetailsQuery('', {
    skip: notes?.length
  })

  // control mode 
  React.useEffect(() => {
    let _mode = paramType ? paramType : '';
    setMode(_mode);
  }, [paramType])


  // if task notes fetch completed store data into redux store
  React.useEffect(()=> {
    if(task && task.id){
      getTaskDetails(`/${task?.id}/json?mode=task_note`)
      .unwrap()
      .then(res => {
        if(res){
          dispatch(storeNotes(res));
        }
      })
      .catch(err => {
        console.log(err)
      })
    } 
  }, [task]);
 
 
  // close modal
  const close = (e) => { 
    navigate(`/account/tasks/${task.id}`); 
  }

  return (
    <div className='sp1_task_right_card mb-3' ref={setModalRefButton} style={{zIndex: mode ? '99' : ''}}>
       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Notes</span>
          {isFetching && 
                <div 
                    className="spinner-border text-dark ml-2 mr-auto" 
                    role="status"
                    style={{
                        width: '16px',
                        height: '16px',
                        border: '0.14em solid rgba(0, 0, 0, .25)',
                        borderRightColor: 'transparent' 
                    }}
                />
          }
          <Button
              variant='tertiary'
              className="sp1_tark_add_item" 
              aria-label="addButton"
              onClick={() => navigate(`?type=create`)}
          > 
              {mode === 'create' ? (
                <> <i className="fa-solid fa-xmark" style= {{fontSize: '12px'}}/> Close </> 
                ) :
                (
                  <> <i className="fa-solid fa-plus"  style= {{fontSize: '12px'}} /> Note  </>
                )
              }
          </Button>
        </div>

        {/* left dropdown */}
        {mode && <button 
          aria-label='openCommentModalButton'  
          
          className='sp1_task_right_dl_toggle'
          onClick={close}
          style={{zIndex: mode ? '110' : ''}}
        >
            <i 
              className={`fa-solid fa-circle-chevron-${ mode ? 'right' : 'left'}`} 
              style={{color: "#276fec"}} 
            />
        </button>}
      {/* left dropdown */}

        {/* create new */} 
        <CreateNote 
            close={close}  
            isOpen={mode === 'create'} 
            toggleRef={modalRefButton}
        /> 

        {/* edit note */} 
        <EditNote 
          close={close} 
          isOpen={ mode === 'edit'}   
          toggleRef={modalRefButton}
        />  


        {/* note view */}
        <NoteView 
          close={close}
          isOpen={mode === 'view'} 
          toggleRef={modalRefButton}
        /> 

        <div className="sp1_task_right_card--body">
          { !isFetching ? notes?.length > 0 ? notes.map(note => (
            <Note 
              key={note.id} 
              note={note}  
            /> 
          )): <div
            className='d-flex align-items-center justify-content-center'
            style={{
              color: '#B4BCC4',
              fontSize: '15px',
              textAlign: 'center',
              height: '100%',
              width: '100%',
            }}
          >
              Empty Notes
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

export default NoteSection