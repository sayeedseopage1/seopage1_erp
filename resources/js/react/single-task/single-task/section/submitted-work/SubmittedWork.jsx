import * as React from 'react' 
import WorkItem from './WorkItem';
import useSWR from 'swr';
import SubmitionView from './SubmitionView';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SubmittedModalView from './SubmittedModalView';
import _ from 'lodash';

const fetcher = (url) => axios.get(url).then(res => res.data); 

const SubmittedWork = ({task}) => { 
  const [modalRefButton, setModalRefButton] = React.useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { data, error, isLoading } = useSWR(`/account/tasks/get-task-submissions/${task?.id}`, fetcher, {refreshInterval: 1000 * 3600});
  const [searchParams] = useSearchParams();
  const preview = searchParams.get('submitted-work');
  const modal = searchParams.get('view-modal')
    // control modal
  const toggle = (e) => {
    e.preventDefault();
    if(preview || modal){
      if(location.state && location.state.from){
        navigate(location.state.from);
      }else{navigate(`/account/tasks/${task?.id}`);} 
    }else{
      navigate(`/account/tasks/${task?.id}?view-modal=submitted-work`) 
    }
  };
  const close = () => { 
    if(location.state && location.state.from){
      navigate(location.state.from);
    }else{navigate(`/account/tasks/${task?.id}`);} 
  }
 
  return (
    <div className='sp1_task_right_card mb-3'  
    ref={setModalRefButton} 
    style={{zIndex:  (preview || modal === 'submitted-work') ? 99 : ''}}>
        <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">Submitted Works</span> 
          {isLoading && 
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
       {
        _.size(data) > 0 &&
        <button 
            aria-label='openCommentModalButton'
            className='sp1_task_right_dl_toggle'
            onClick={toggle}
            style={{zIndex:  (preview || modal === 'submitted-work') ? '110' : ''}}
          >
            <i 
              className={`fa-solid fa-circle-chevron-${ (preview || modal === 'submitted-work') ? 'right' : 'left'}`} 
              style={{color: "#276fec"}} 
            />
        </button>
       } 

        <SubmittedModalView
            isOpen={modal === 'submitted-work'}
            toggle={modalRefButton}
            data={_.orderBy(data, ['task_id', 'submission_no'], ['desc', 'desc'])}
            close={close}
            isLoading={isLoading}
        />

        {/* side drop toggle button end */} 
        <div className="sp1_task_right_card--body"> 
        {
          _.size(data) > 0 ? 
            _.map(_.orderBy(data, ['task_id', 'submission_no'], ['desc', 'desc']), item => (
              <WorkItem 
                key={item?.submission_date + item?.submission_no} 
                data={item} 
                toggle={toggle} 
                close={close}
                isLoading={isLoading}
                modalRef={modalRefButton} 
              />
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
                No Submitted Work is Available
            </div>
        }
        </div>
    </div>
  )
}

export default SubmittedWork 