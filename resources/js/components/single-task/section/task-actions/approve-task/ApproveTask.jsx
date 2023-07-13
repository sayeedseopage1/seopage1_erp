import React, {useState} from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal';

const ApproveTask = () => {
  const [showApproveForm, setShowApproveForm] = useState(false);

  return (
    <React.Fragment>
        <Button
            variant='success'
            onClick={() => setShowApproveForm(true)}
            className='d-flex align-items-center mr-2 border-success'
        >
            <i className="fa-regular fa-handshake"></i>
            <span className="d-inline ml-1">Approve</span>
        </Button>

        <Modal isOpen={showApproveForm} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div
                    className="sp1_single_task--modal-panel"
                    style={{ maxWidth: "550px" }}
                >
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14"> Approve Task </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    {/* content */}
                    <div className='sp1_st--approve-card'>
                        <div className="sp1_st--approve-card-header">
                            <span>Latest Submission</span>
                            <span>2023-07-13</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ApproveTask