import React, {lazy, Suspense} from 'react'
const TimeLogItem = lazy(() => import('./TimeLogItem'));
import TimeLogTable from './TimeLogTable';
import { useDispatch, useSelector } from 'react-redux'; 
import { useLazyGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import { storeTimeLogs } from '../../../services/features/subTaskSlice';
import { Placeholder } from '../../../global/Placeholder';
import TimeLogItemLoader from './TimeLogItemLoader';
import _ from 'lodash';


const fetcher = (url) => axios.get(url).then(res => res.data); 


const TimeLogSection = () => {
  const {task, timeLogs} = useSelector(s => s.subTask);
  const [modalRefButton, setModalRefButton] = React.useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  
  // get data
    // fetch all task 
    const [getTaskDetails, {isFetching}] = useLazyGetTaskDetailsQuery('', {
      skip: timeLogs?.length
    }) 
  
    // if task notes fetch completed store data into redux store
    React.useEffect(()=> {
      if(task && task.id){
        getTaskDetails(`/${task?.id}/json?mode=task_time_log`)
        .unwrap()
        .then(res => {
          if(res){
            dispatch(storeTimeLogs(res));
          }
        })
        .catch(err => {
          console.log(err)
        })
      } 
    }, [task]); 
    

    // control modal
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <div className='sp1_task_right_card mb-3'  
    ref={setModalRefButton} style={{zIndex: isOpen ? '99' : ''}}>
        <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">Session Logs</span> 
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
        </div>


        {/* side drop toggle button */}
        {_.size(timeLogs) > 0 &&
          <button 
              aria-label='openCommentModalButton'
              className='sp1_task_right_dl_toggle'
              onClick={toggle}
              style={{zIndex: isOpen ? 110 : ''}}
            >
              <i 
                className={`fa-solid fa-circle-chevron-${ isOpen ? 'right' : 'left'}`} 
                style={{color: "#276fec"}} 
              />
          </button>}
        {/* side drop toggle button end */}


          <TimeLogTable
            isOpen={isOpen}
            close={close}
            toggle={modalRefButton}
            data={timeLogs}
          />


        <div className="sp1_task_right_card--body">
          { _.size(timeLogs) > 0 ?
            _.map(timeLogs, log => (
              <React.Fragment key={log.id}>
                <Suspense fallback={<TimeLogItemLoader />}>
                  <TimeLogItem log={log}/>
                </Suspense>
              </React.Fragment>
            )):
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    color: "#B4BCC4",
                    fontSize: "15px",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                No Logged Session is Available
            </div>
          } 
        </div>

    </div>
  )
}

export default TimeLogSection