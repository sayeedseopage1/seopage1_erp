import * as React from 'react' 
import Button from '../../components/Button' 
import _ from 'lodash'
import CKEditorComponent from '../../../ckeditor'
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine'
import { useCrateNoteMutation } from '../../../services/api/SingleTaskPageApi'
import { useSelector } from 'react-redux'
import { storeNotes } from '../../../services/features/subTaskSlice'
import Input from '../../components/form/Input'

const CreateNote = ({close}) => {
  const {task} = useSelector(s => s.subTask); 
  const [files, setFiles] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [errTitle, setErrTitle] = React.useState(null);
  const [note,setNote] = React.useState('');


  const [crateNote, {isLoading}] = useCrateNoteMutation();

  // handle onchange
const handleChange = (e, setState) =>{
    e.preventDefault();
    let value = e.target.value;
    setState(value);
}

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
    Array.from(files).forEach((file) => {
        fd.append('file[]', file);
    });

    
    crateNote(fd).unwrap().then(res => {
        console.log({res})
            if(res?.status === 'success'){ 
                
                //  let _subtask = [...subTask];
                //  console.log({_subtask});
                //  _subtask = _subtask?.map(s => {
                //     if(Number(s?.id) === Number(res?.sub_task?.id)){
                //         return res?.sub_task 
                //     }else return s;
                //  })
                 
                // dispatch(storeNotes());  

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Data has been stored Successfully",
                    showConfirmButton: false,
                    timer: 2500
                }) 

                close();
            }
    }).catch((err) => {
        console.log(err)
    })

  }


  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setNote(data);
  }  

  return (
    <> 
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6>Write Notes</h6> 
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

                    <div className='sp1_st_write_comment_editor' style={{minHeight: '100px'}}>
                        <h6 className='mb-3' style={{color:'rgba(0,0,0,.5)'}}>Write note</h6>
                        <CKEditorComponent onChange={handleEditorChange}/>
                    </div>

                    <div className='mt-3'>
                        <h6 className='mb-3' style={{color:'rgba(0,0,0,.5)'}}>Upload Files</h6>
                        <UploadFilesInLine  
                            files={files} 
                            setFiles={setFiles} 
                        />
                    </div>


                    <div className="mt-5"> 
                            <div className="d-flex align-items-center">
                                <Button
                                    variant='secondary'
                                    className='mr-2'
                                    onClick={close}
                                > 
                                    Cancel
                                </Button> 
    
                                {!isLoading ? (
                                    <Button onClick={handleSubmit}>
                                        <i className="fa-regular fa-paper-plane"></i>
                                        Keep as Notes
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
    </>
  )
}

export default CreateNote 