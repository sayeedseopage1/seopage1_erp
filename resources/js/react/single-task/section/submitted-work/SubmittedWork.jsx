import * as React from 'react' 
import WorkItem from './WorkItem';
import useSWR from 'swr';
import SubmitionView from './SubmitionView';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SubmittedModalView from './SubmittedModalView';


const fetcher = (url) => axios.get(url).then(res => res.data); 


const SubmittedWork = ({task}) => { 
  const [modalRefButton, setModalRefButton] = React.useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { data, error, isLoading } = useSWR(`/account/task/${task?.id}/json?mode=task_submission_list`, fetcher, {refreshInterval: 1000 * 3600});
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
    <div className='sp1_task_right_card mb-3'>
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
          
          <button 
              aria-label='openCommentModalButton'  
              ref={setModalRefButton}
              className='sp1_task_right_dl_toggle'
              onClick={toggle}
              style={{zIndex:  (preview || modal === 'submitted-work') ? '110' : ''}}
            >
              <i 
                className={`fa-solid fa-circle-chevron-${ (preview || modal === 'submitted-work') ? 'right' : 'left'}`} 
                style={{color: "#276fec"}} 
              />
          </button>

        <SubmittedModalView
            isOpen={modal === 'submitted-work'}
            toggle={modalRefButton}
            data={data}
            close={close}
            isLoading={isLoading}
        />


        {/* side drop toggle button end */} 
        <div className="sp1_task_right_card--body"> 
        {
          data?.map((item => (
            <WorkItem 
              key={item.id} 
              data={item} 
              toggle={toggle} 
              close={close}
              isLoading={isLoading}
              modalRef={modalRefButton} 
            />
          )))
        }
        </div>

    </div>
  )
}

export default SubmittedWork 