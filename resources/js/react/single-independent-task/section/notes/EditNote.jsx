import * as React from 'react' 
import Button from '../../components/Button' 
import _ from 'lodash'
import CKEditorComponent from '../../../ckeditor'
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine'
import { useCrateNoteMutation, useDeleteNoteUploadedFileMutation, useGetTaskDetailsQuery, useUpdateNoteMutation } from '../../../services/api/SingleTaskPageApi'
import { useDispatch, useSelector } from 'react-redux'
import { storeNotes } from '../../../services/features/subTaskSlice'
import Input from '../../components/form/Input'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CustomModal from '../../components/CustomModal'
import { useWindowSize } from 'react-use' 
import Modal from '../../components/Modal'

const EditNote = ({isOpen, close, toggleRef}) => {
  const {task, notes} = useSelector(s => s.subTask); 
  const [files, setFiles] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [errTitle, setErrTitle] = React.useState(null);
  const [note,setNote] = React.useState('');
  const [attachedFiles, setAttachedFiles] = React.useState([]);
  const dispatch = useDispatch();
  const { width: deviceWidth} = useWindowSize();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get('note');
  const type = searchParams.get('type');



   const [updateNote, {isLoading}] = useUpdateNoteMutation();

  // fetch all task 
  const {data, isFetching} = useGetTaskDetailsQuery(`/${noteId}/json?mode=task_note_edit`, {
    skip: type ? (type !== 'edit' || !noteId) : true,
    refetchOnMountOrArgChange: true
  }) 




  useEffect(() => {
    clearField();
    if(!isFetching && data){ 
        setTitle(data?.title);
        setNote(data?.note);
        setAttachedFiles(data?.files || []);
    }
  }, [data, noteId, isFetching]);

  const clearField = () => {
    setTitle('');
    setNote('');
    setAttachedFiles([]);
  }

  const handleClose = () => {
    clearField();
    close();
  }


 // handle onchange
const handleChange = (e, setState) =>{
    e.preventDefault();
    let value = e.target.value;
    setState(value);
}


// handle submittion
  const handleSubmit = e => { 
    e.preventDefault();
    if(!title){
        setErrTitle('Title name required');
        return null;
    }
    const fd = new FormData(); 
    fd.append('title', title);
    fd.append('note', note);
    fd.append('taskId', task?.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    fd.append('_method', 'PUT');
    Array.from(files).forEach((file) => {
        fd.append('file[]', file);
    });

    
    updateNote({data: fd, id: noteId}).unwrap().then(res => { 
            if(res?.status === 'success'){  
                let _notes = [...notes];
                _notes = _notes?.map(note => {
                    if(Number(note?.id) === Number(res?.note?.id)){
                        return res?.note;
                    }else return note
                })
  
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res?.message,
                    showConfirmButton: false,
                    timer: 2500
                }) 

                dispatch(storeNotes(_notes)); 

                handleClose();
            }
    }).catch((err) => {
        console.log(err)
    })

  }


  // handle editor
  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setNote(data);
  }  

  // handle loading state
React.useEffect(() => { 
    if (isLoading || isFetching) {
        document.getElementsByTagName('body')[0].style.cursor = 'progress';
      } else {
        document.getElementsByTagName('body')[0].style.cursor = 'default';
      }
}, [isLoading, isFetching])




  // handle uplaoded file delete request
const [deleteNoteUploadedFile] = useDeleteNoteUploadedFileMutation();

const handleFileDelete = (e, file) => { 
    // delete
    deleteNoteUploadedFile(file?.id).unwrap();
   
    // delete form ui
    let previousFile = [...attachedFiles];
    let index = previousFile?.indexOf(file);
    previousFile.splice(index,1);
    setAttachedFiles(previousFile);
}


    const content = () => {
        return (
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6>Update Notes
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
                  </h6> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={handleClose}
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                {isFetching && 
                    <div className='w-100' style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}/>
                }
                <div className='py-3'>
                    <Input 
                        id='title'
                        label="Title"
                        type="text" 
                        placeholder='Enter a task title'
                        name='title'
                        required={true}
                        value={title}
                        error= {errTitle}
                        onChange={e => handleChange(e, setTitle)}
                    />

                    <div className='sp1_st_write_comment_editor pr-0' style={{minHeight: '100px'}}>
                        <h6 className='mb-3 f-14' style={{color:'#777'}}>Write Note</h6>
                        <CKEditorComponent data={note} onChange={handleEditorChange}/>
                    </div>

                    <div className='mt-3'>
                        <h6 className='mb-3 f-14' style={{color:'#777'}}>Upload Files</h6>
                        <UploadFilesInLine  
                            files={files} 
                            setFiles={setFiles} 
                            previous={attachedFiles}
                            onPreviousFileDelete={handleFileDelete}
                        />
                    </div>


                    <div className="mt-5"> 
                            <div className="d-flex align-items-center">
                                <Button
                                    variant='secondary'
                                    className='mr-2'
                                    onClick={handleClose}
                                > 
                                    Cancel
                                </Button> 
    
                                {!isLoading ? (
                                    <Button onClick={handleSubmit}>
                                        <i className="fa-regular fa-paper-plane"></i>
                                        Update
                                    </Button>
                                ) : (
                                <Button className='cursor-processing'>
                                    <div 
                                        className="spinner-border text-white" 
                                        role="status"
                                        style={{
                                            width: '18px',
                                            height: '18px', 
                                        }}
                                    >
                                    </div>
                                    Processing...
                                </Button>
                                )}
                            </div>
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
    return (
        <Modal isOpen={isOpen}> 
            <React.Fragment>
            {content()}
            </React.Fragment>
        </Modal>
      )
 }
}

export default EditNote;