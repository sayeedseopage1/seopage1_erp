import React, {useState} from 'react'
import Modal from '../../components/Modal'
import  Input  from '../../components/form/Input';
import Button from '../../components/Button';
import FileUploader from '../../../file-upload/FileUploader'

const MarkAsComplete = () => { 
 const [markAsCompleteModaIsOpen,  setMarkAsCompleteModalIsOpen] = useState(true);
 
 const toggle = () => {
    setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
 }

 const close = () => {
    setMarkAsCompleteModalIsOpen(false);
 }


  return (
    <>
        <Button 
            variant='tertiary'
            onClick={toggle}
            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
        >
            <i className="fa-solid fa-check" />
            <span className="d-inline ml-1">Mark As Complete</span>
        </Button> 

        <Modal isOpen={false} className="sp1_mark-as--modal">
            <div className="sp1_mark-as--modal-panel">
                {/* heading bar */}
                <div className="sp1_mark-as--modal-heading">
                    <h6 className='mb-0'>Submit Task</h6>

                    <Button aria-label='closeModal'>
                        <i className='fa-solid fa-xmark' />
                    </Button>
                </div>

                {/* body */}
                <div className='sp1_mark-as--modal-body'>
                    <form>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">
                                Submit Links What You've Done<sup>*</sup> 
                                <span 
                                    className='ml-2' 
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Submit Links What You've Done"
                                    data-boundary='window'
                                    style={{cursor: 'pointer'}}
                                >
                                    <i class="fa-regular fa-circle-question"/>
                                </span>
                            </label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="exampleFormControlInput1" placeholder="name@example.com" 
                            />
                        </div>


                        <div className=''>
                            <FileUploader>

                            </FileUploader>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    </>
  )
}

export default MarkAsComplete