import React, {lazy, Suspense} from 'react'
const HistoryItem = lazy(() => import('./HistoryItem'));
import { Placeholder } from '../../../global/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { storeHistories } from '../../../services/features/subTaskSlice';
import { useLazyGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import Histories from './Histories';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data); 

const HistorySection = () => {
  const {task, histories} = useSelector(s => s.subTask);
  const [modalRefButton, setModalRefButton] = React.useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { data, error, isLoading:isFetching } = useSWR(`/account/task/${task.id}/json?mode=task_history`, fetcher, {
    refreshInterval: 5000
  });

  //fetch all task 
  // const [getTaskDetails, {isFetching}] = useLazyGetTaskDetailsQuery('', {
  //   skip: histories?.length
  // })

   //if task notes fetch completed store data into redux store
  //  React.useEffect(()=> {
  //   if(task && task.id){
  //     getTaskDetails(`/${task?.id}/json?mode=task_history`)
  //     .unwrap()
  //     .then(res => {
  //       if(res){
  //         dispatch(storeHistories(res));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   } 
  // }, [task]); 

  React.useEffect(()=> {
    if(!isFetching && data){
      dispatch(storeHistories(data));
    }  
  }, [data, isFetching]); 
  

  // control modal
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);


  return (
    <div className='sp1_task_right_card mb-3' ref={setModalRefButton} style={{zIndex: isOpen ? 99 : ''}}>
        <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">History</span> 
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
        {/* side drop toggle button end */}
 
          {/* histories details */}
          <Histories
            isOpen={isOpen}
            close={close}
            data={histories} 
            toggle={modalRefButton}
          />

        <div className="sp1_task_right_card--body">
          {!isFetching ? histories ? histories.map( history => (
            <React.Fragment key={history.id}>
              <Suspense fallback={<div className='sp1_tark_right_item py-2 '> <Placeholder /> </div>}>
                <HistoryItem history={history} />
              </Suspense>
            </React.Fragment>
          )):<div
            className='d-flex align-items-center justify-content-center'
            style={{
              color: '#B4BCC4',
              fontSize: '15px',
              textAlign: 'center',
              height: '100%',
              width: '100%',
            }}
          >
              Empty History
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

export default HistorySection