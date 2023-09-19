import React from 'react'
import Modal from '../../global/Modal';
import Button from '../../global/Button';
import Avatar from '../../global/Avatar';
import { convertTime } from '../../utils/converTime';
import {Placeholder} from '../../global/Placeholder';

const PortfolioModal = ({isOpen, close, data, isLoading}) => {
 
  return (
    <div>
        <Modal isOpen={isOpen}>
            <div className="sp1_modal-content-wrapper">
                <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title">
                            <strong>View Category</strong>
                        </div>
                        <Button
                            onClick={close}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div className="sp1_modal-body sp1_task_create_modal_body px-5">
                        {
                            isLoading ? <Loader /> :  
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className=''>
                                        <p className='font-weight-bold f-14 mb-2'>Project Title:</p>
                                        <p>{data?.project_name}</p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Client Name:</p>
                                    <div className='d-flex align-items-center'>
                                        <Avatar
                                            src={data?.client_image ? `/user-uploads/avatar/${data?.client_image}`: null}
                                            alt={data?.client_name}
                                            name={data?.client_name}
                                            type='circle'
                                            width={32}
                                            height={32}
                                        />
                                        <span className='d-block px-2'>{data?.client_name}</span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Niche Category:</p>
                                    <div className='d-flex align-items-center'>
                                        {data?.niche?.category_name ?? '--'}
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'> Sub Niche Category:</p>
                                    <div className='d-flex align-items-center'>
                                        {data?.sub_niche?.category_name ?? '--'}
                                    </div>
                                </div>

                                

                                <div className="col-12 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Website Link:</p>
                                    <div className='d-flex align-items-center'>
                                        {data?.actual_link ? <a href={data?.actual_link} target='_blank'> {data?.actual_link} </a> : '--'}
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Agree Price:</p>
                                    <div className='d-flex align-items-center'>
                                        ${data?.project_budget ?? '0.00'}
                                    </div>
                                </div>

                                

                                <div className="col-12 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Theme Name:</p>
                                    <div className='d-flex align-items-center'>
                                        {data?.theme_name ?? '--'}
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Total estimated hours:</p>
                                    <div className='d-flex align-items-center'>
                                    {
                                        data?.estimated_total_minutes ?
                                        convertTime(data?.estimated_total_minutes) : '00 min'
                                    }
                                    </div>
                                </div>

                                
                                <div className="col-12 col-md-6 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Total logged hours:</p>
                                    <div className='d-flex align-items-center'>
                                    {
                                        data?.total_logged_time ?
                                        convertTime(data?.total_logged_time) : '00 min'
                                    }
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Average hourly price based on the final logged hours:</p>
                                    <div className='d-flex align-items-center'>
                                    ${data?.hourly_budget ?? 0}
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Total number of pages with page numbers:</p>
                                    <div className=''>
                                        <p>Main page name and number: {data?.main_page_number ?? 0} pages</p>
                                        <p>Secondary page name and number: {data?.secondary_page_number ?? 0} pages</p>
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <p className='font-weight-bold f-14 mb-2'>Is There Any Major Functions You Want To Mention About This Project? (Mention the name of the functionality and a brief description with screenshot):</p>
                                    
                                    {data?.description ? 
                                        <div dangerouslySetInnerHTML={{__html: data?.description }}  />:
                                        <span>No major functionalities to mention for this project</span>    
                                    }
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default PortfolioModal;




// loader 
const Loader = () => {
    return(
         <div className="row">
            <div className="col-12 mb-3">
                <div className=''>
                    <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder 
                        width={32}
                        height={32}
                        type='circle'
                    />
                    <Placeholder height={14} width="200px" className='ml-2' />
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <Placeholder height={12} width="80%" />
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <Placeholder height={12} width="80%" />
            </div>

            

            <div className="col-12 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="150px" />
                </div>
            </div>

            

            <div className="col-12 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            
            <div className="col-12 col-md-6 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder width='200px' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder width='80%' height={14} className='font-weight-bold f-14 mb-2' />
                <div className='d-flex align-items-center'>
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 mb-3">
                <Placeholder width='80%' height={14} className='font-weight-bold f-14 mb-2' />
                <Placeholder width='50%' height={14} className='font-weight-bold f-14 mb-2' />

                <div className='d-flex align-items-center'>
                <Placeholder width='80%' height={14} className='font-weight-bold f-14 mb-2' />
                <Placeholder width='50%' height={14} className='font-weight-bold f-14 mb-2' />
                </div> 
            </div>
        </div>
    )
}