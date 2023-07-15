import React, {useState} from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import CKEditorComponent from '../../../../ckeditor/index'
import {HiOutlineSelector} from 'react-icons/hi'

const ApproveTask = () => {
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [completedWithInDeadline, setCompletedWithInDeadline] = useState(0);
  const [submittedStar, setSubmittedStar] = useState(0);
  const [fullfilledStar, setFullfilledStar] = useState(0);
  const [comment, setComment] = useState('');

  const close = (e) => {
    e.preventDefault();
    setShowApproveForm(false)
  }


  // editor data 
  const onWriteOnEditor = (e, editor) => {
    const data = editor.getData();
    setComment(data);
  }

  // submit 
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    const data = {
        completedWithInDeadline,
        submittedStar,
        fullfilledStar,
        comment
    }

    console.log(data)
  }

  return (
    <React.Fragment>
        <Button
            variant='success'
            onClick={() => setShowApproveForm(true)}
            className='d-flex align-items-center border-success'
        >
            <i className="fa-solid fa-handshake-angle"></i>
            <span className="d-inline ml-1">Approve</span>
        </Button>

        <Modal isOpen={showApproveForm} className="sp1_single_task--modal w-100">
            <div className="sp1_single_task--modal-panerl-wrapper w-100">
                <div
                    className="sp1_single_task--modal-panel w-100"
                    style={{ maxWidth: '600px', minWidth: '320px' }}
                >
                    <div className="border-bottom pb-2 pl-3 pr-2 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-16"> Approve Task </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    <div className="px-3">
                         <div className='mb-3'>
                            <div className="sp1_st--approve-card"> 
                                <div className="sp1_st--approve-card-header" data-toggle="collapse" href="#oldSubmittedSuccess" role="button"   aria-expanded="false" aria-controls="oldSubmittedSuccess">
                                    Old Submitted Works
                                    <button>
                                        <HiOutlineSelector />
                                    </button>
                                </div>
                            </div>

                            <div className="collapse multi-collapse shadow-none" id="oldSubmittedSuccess">
                                <div className="card card-body">
                                    <SubmittedWorkCard data={{}}/>
                                    <SubmittedWorkCard data={{}}/>
                                    <SubmittedWorkCard data={{}}/>
                                </div>
                            </div>
                         </div>
                        {/* content */}
                        <SubmittedWorkCard data={{}} />
                    </div>

                    <div className="mt-4 px-3">
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="" className='font-weight-bold'>Is This Task Completed Within Deadline?<sup className='f-16'>*</sup></label>
                                <div className=''>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={completedWithInDeadline}
                                        onChange={setCompletedWithInDeadline}
                                        radius='small'
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="" className='font-weight-bold'>How Beautifully The Task Is Submitted?<sup className='f-16'>*</sup></label>
                                <div className=''>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={submittedStar}
                                        onChange={setSubmittedStar}
                                        radius='small'
                                    />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="" className='font-weight-bold'>
                                    How Perfectly The Task Requirements Are Fullfilled?<sup className='f-16'>*</sup>
                                </label>
                                <div className=''>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={fullfilledStar}
                                        onChange={setFullfilledStar}
                                        radius='small'
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="" className='font-weight-bold'>
                                    Any Recommendations For Developer?<sup className='f-16'>*</sup>
                                </label>
                                <div className='ck-editor-holder'>
                                    <CKEditorComponent onChange={onWriteOnEditor} />
                                </div>
                            </div>

                            <div className="mt-3 d-flex align-items-center">
                                <Button onClick={close} variant="tertiary" className="ml-auto mr-2">
                                   Close 
                                </Button>

                                {true ? (
                                    <React.Fragment>
                                        <Button onClick={handleOnSubmit}>Approve</Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Button className="cursor-processing">
                                            <div
                                                className="spinner-border text-white"
                                                role="status"
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                }}
                                            />{" "}
                                            Processing...
                                        </Button>
                                    </React.Fragment>
                                )}
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ApproveTask


// Submitted work

const SubmittedWorkCard = ({data, className="", style}) => {
    return(
        <div className={`sp1_st--approve-card mb-3 ${className}`} style={style}> 
            <div className="sp1_st--approve-card-header">
                <span>Latest Submittion</span>
                <span>2023-07-13</span>
            </div>

            <div className='sp1_st--approve-card-body'>
                <div className='mb-2'>
                    <div className='font-weight-bold f-12' style={{color: '#81868E'}}> Links</div>
                    <ol style={{listStyle: 'unset'}}>
                        <li style={{listStyle: 'numaric'}}><a href="#">https://gosolution.com/</a></li>
                        <li style={{listStyle: 'numaric'}}><a href="#">https://gosolution.com/</a></li>
                        <li style={{listStyle: 'numaric'}}><a href="#">https://gosolution.com/</a></li>
                    </ol>
                </div>

                <div className='mb-2'>
                    <div className="font-weight-bold f-12" style={{color: '#81868E'}}>Description</div>
                    <div className='sp1_ck_content border p-1'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae corporis blanditiis consequatur quo ullam laboriosam quidem, expedita quod a ut labore tempore! Eligendi repudiandae cumque alias et nostrum aliquid aliquam.
                    </div>
                </div>


                {/* <div className="mt-3">
                <span
                    className="d-block fs-12 font-weight-bold mb-2"
                    style={{ color: "#767581" }}
                >
                    Attached Files
                </span>
                {data?.attach ? (
                    <FileUploader>
                        {data?.attach?.map((file) => (
                            <FileUploader.Preview
                                key={file?.name}
                                fileName={file?.name}
                                downloadAble={true}
                                deleteAble={false}
                                downloadUrl={file?.url}
                                previewUrl={file?.url}
                                fileType={file?.type}
                                ext=""
                            />
                        ))}
                    </FileUploader>
                    ) : (
                        <span
                            className=""
                            style={{ color: "rgb(180, 188, 196)" }}
                        >
                            No Attachment is available
                        </span>
                    )}
                </div> */}
            </div>
        </div>
    )
}