import * as React from 'react'
import Button from '../../components/Button'
import CustomModal from '../../components/CustomModal' 
import { useGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi'
import { useSearchParams } from 'react-router-dom'
import { User } from '../../../utils/user-details'
import ContentLoader from "react-content-loader"


const NoteView = ({close, isOpen, toggleRef}) => {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('note');
    const type = searchParams.get('type');

    // fetch all task 
    const {data, isFetching} = useGetTaskDetailsQuery(`/${noteId}/json?mode=task_note_edit`, {
        skip: type ? (type !== 'view' || !noteId) : true,
        refetchOnMountOrArgChange: true
    }) 
    
    
  const user = data ?  new User(data.user) : null;
 

  return (
    <CustomModal isOpen={isOpen} toggleRef={toggleRef}>
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                <h6>Notes</h6> 
                {isFetching && <div 
                    className="spinner-border text-dark ml-2 mr-auto" 
                    role="status"
                    style={{
                        width: '16px',
                        height: '16px',
                        border: '0.14em solid rgba(0, 0, 0, .25)',
                        borderRightColor: 'transparent'
                    }}
                />} 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='py-3'>
                    <div>
                        {isFetching ? <NoteViewLoader /> : 
                        <>
                            <div className='d-flex align-items-center'>
                                <div className=''>
                                    <img src={user?.getAvatar()} alt="" width={40} height={40} />
                                </div>
                                <div className='px-3'>
                                    <h6 className='mb-0'>{user?.getName()}</h6>
                                    <span className='' style={{color: '#A5ACB5'}}>{user?.getDesignationName()}</span>
                                </div>
                            </div> 
                            <div className='mt-4'>
                                <h6 className='font-weight-bold'>{data?.title}</h6>
                                <div className='sp1_ck_content' dangerouslySetInnerHTML={{__html: data?.note}} />
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </CustomModal>
    
  )
}

export default NoteView


 
const NoteViewLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={650}
    height={250}
    viewBox="0 0 650 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="57" y="14" rx="5" ry="5" width="220" height="15"/> 
    <rect x="57" y="35" rx="5" ry="5" width="132" height="9" /> 
    <rect x="10" y="141" rx="5" ry="5" width="389" height="10" /> 
    <rect x="7" y="65" rx="5" ry="5" width="65" height="15" /> 
    <rect x="6" y="7" rx="0" ry="0" width="39" height="41" /> 
    <rect x="64" y="95" rx="5" ry="5" width="357" height="11" /> 
    <rect x="7" y="117" rx="5" ry="5" width="378" height="11" /> 
    <rect x="14" y="141" rx="5" ry="5" width="400" height="11" />
  </ContentLoader>
) 