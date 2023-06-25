import * as React from 'react' 
import WorkItem from './WorkItem';
import useSWR from 'swr';
import SubmitionView from './SubmitionView';
import { useNavigate, useSearchParams } from 'react-router-dom';


const fetcher = (url) => axios.get(url).then(res => res.data); 


const SubmittedWork = ({task}) => { 
  const [modalRefButton, setModalRefButton] = React.useState(null); 
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate(); 
  const { data, error, isLoading } = useSWR(`/account/task/${task?.id}/json?mode=task_submission_list`, fetcher, {refreshInterval: 1000 * 3600});
  const [searchParams] = useSearchParams();
  const preview = searchParams.get('submitted-work');
    // control modal
  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  };
  const close = () => {
    setIsOpen(false);
    navigate(`/account/tasks/${task?.id}`);
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
          {preview && !isLoading && (
            <button 
                aria-label='openCommentModalButton'  
                ref={setModalRefButton}
                className='sp1_task_right_dl_toggle'
                onClick={close}
                style={{zIndex:  preview ? '110' : ''}}
              >
                <i 
                  className={`fa-solid fa-circle-chevron-${ (preview) ? 'right' : 'left'}`} 
                  style={{color: "#276fec"}} 
                />
            </button>
          )}

        {/* <SubmitionView
            isOpen={isOpen}
            toggle={modalRefButton}
            data={data}
            close={close}
        /> */}


        {/* side drop toggle button end */} 
        <div className="sp1_task_right_card--body"> 
        {
          data?.map((item => (
            <WorkItem 
              key={item.id} 
              data={item} 
              toggle={toggle} 
              close={close}
              modalRef={modalRefButton} 
            />
          )))
        }
        </div>

    </div>
  )
}

export default SubmittedWork 