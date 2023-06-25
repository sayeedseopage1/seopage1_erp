import React from 'react'
import Modal from './Modal';
import Button from './Button';
import './file-upload.css';
import UploadedFiles from './UploadedFiles';
import { useClickAway } from 'react-use';

const FileUpload = ({isOpen, close}) => {
    const [uploadingModal, setUploadingModal] = React.useState(false);
    const ref = React.useRef(null);
    useClickAway(ref,close);
  return (
    <Modal className="upload-file-modal" isOpen={isOpen}>
        <div ref={ref} className='__panel'>
            <div className="__navbar">
                <h5>Uploads File</h5>
                <Button onClick={close} className='ml-auto'>
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="file_upload_panel__body">
                <div className='__upload_new'> 
                    <input type='file' multiple className='file-upload-input' />
                    <i class="fa-solid fa-cloud-arrow-up"></i>  
                    <p className='mt-1'>Drag and drop files here or <span style={{color: '#3662e6'}}>click here</span> to upload</p>
                </div>

                <div className='mt-3'>
                    <h5>Uploaded Files</h5>
                </div>

                <div className='sp1-uploaded-files_list mt-3'>
                    <UploadedFiles title="Today" />
                    <UploadedFiles title="Yesterday" />
                    <UploadedFiles title="Jun 13, 2023" />
                </div>


                {/* uploading Modal */}
                <Modal isOpen={uploadingModal}>
                    <div></div>
                </Modal> 
                {/* uploading modal edit */}

            </div>
        </div>
    </Modal>
  )
}

export default FileUpload