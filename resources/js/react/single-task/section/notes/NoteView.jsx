import * as React from 'react'
import Button from '../../components/Button'
import CustomModal from '../../components/CustomModal' 
import { useGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi'
import { useSearchParams } from 'react-router-dom'
import { User } from '../../../utils/user-details'
import ContentLoader from "react-content-loader"
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine'
import { useWindowSize } from 'react-use'
import Modal from '../../components/Modal'


const NoteView = ({close, isOpen, toggleRef}) => {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('note');
    const type = searchParams.get('type');
    const { width: deviceWidth} = useWindowSize();

    // fetch all task 
    const {data, isFetching} = useGetTaskDetailsQuery(`/${noteId}/json?mode=task_note_edit`, {
        skip: type ? (type !== 'view' || !noteId) : true,
        refetchOnMountOrArgChange: true
    }) 
    
  const user = data ?  new User(data.user) : null;

  const content = () =>{
    return(
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
                        {isFetching ? <>Loading...</> : 
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
                                <div className='sp1_ck_content mb-5' dangerouslySetInnerHTML={{__html: data?.note}} />
                                {data?.files && <UploadFilesInLine previous={data?.files} mode='preview'/>}
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if(deviceWidth > 1200){
    return (
        <CustomModal 
            isOpen={isOpen} 
            toggleRef={toggleRef}
        > 
            <React.Fragment>
            {content()}
            </React.Fragment>
        </CustomModal>
    )
  }else{
    return <Modal isOpen={isOpen} > 
        <React.Fragment>
            {content()}
        </React.Fragment>
     </Modal>
  }
}

export default NoteView