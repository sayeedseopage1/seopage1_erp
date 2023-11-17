import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CKEditorComponent from '../../../../ckeditor/index';
import FileUploader from '../../../../file-upload/FileUploader';
import { Placeholder } from '../../../../global/Placeholder';
import { useSingleTask } from '../../../../hooks/useSingleTask';
import { useApproveSubmittedTaskMutation, useGetSubmittedTaskQuery } from '../../../../services/api/SingleTaskPageApi';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import SubmitButton from '../../../components/SubmitButton';

const ApproveTask = ({task, status, auth}) => {
  const dispatch = useDispatch();
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [completedWithInDeadline, setCompletedWithInDeadline] = useState(1);
  const [submittedStar, setSubmittedStar] = useState(1);
  const [fullfilledStar, setFullfilledStar] = useState(1);
  const [comment, setComment] = useState('');

  const [oldSubmittion, setOldSubmittion] = useState([]);
  const [latestSubmittion, setLatestSubmittion] = useState({});

  const [approveSubmittedTask, {isLoading}] = useApproveSubmittedTaskMutation();
  const { data: getSubmittedTask, isFetching  } = useGetSubmittedTaskQuery(task?.id);

  const { approveTask,  approveTaskLoadingStatus } = useSingleTask();

  const [err, setErr] = useState(null);

 
 useEffect(() => {
    if(getSubmittedTask){
        const data = _.sortBy(getSubmittedTask, ['submission_no']);
        const latest = _.last(data);
        const old = _.initial(data);
        setOldSubmittion([...old]);
        setLatestSubmittion(latest);
    }
 }, [isFetching]);

  const close = (e) => {
    e.preventDefault();
    setShowApproveForm(false)
  }

  // editor data 
  const onWriteOnEditor = (e, editor) => {
    const data = editor.getData();
    setComment(data);
  }


  const isValid = () =>{
    let count = 0;
    const error = new Object();

    if(!comment){
        error.comment = "Please add a comment!"
        count ++;
    }

    setErr(error);
    return !count;
  }

  // submit 
  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    const data = {
        rating: completedWithInDeadline,
        rating2: submittedStar,
        rating3: fullfilledStar,
        comment,
        task_id: task?.id,
        user_id: auth?.getId()
    }   

    if(isValid()){ 
        const cb = () => setShowApproveForm(false);
        await approveTask(data, cb ); 
    }else{
        toast.warn("Please add a comment!");
    }
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
                         { _.size(oldSubmittion) > 0 &&
                            <div className='mb-3'>
                                <div className="sp1_st--approve-card"> 
                                    <div className="sp1_st--approve-card-header" data-toggle="collapse" href="#oldSubmittedSuccess" role="button"   aria-expanded="false" aria-controls="oldSubmittedSuccess">
                                        Old Submitted Works ({_.size(oldSubmittion)})
                                        <button>
                                            <HiOutlineSelector />
                                        </button>
                                    </div>
                                </div>

                                <div className="collapse multi-collapse shadow-none" id="oldSubmittedSuccess">
                                    <div className="card card-body">
                                        {
                                            _.size(oldSubmittion) > 0 ?
                                            _.map(oldSubmittion, (task)=>(
                                                <SubmittedWorkCard key={`${task.id}_${task?.submission_no}`} data={task} isLoading={isFetching}/>
                                            )):
                                            <span>
                                                No Old Submittion!
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                         }
                        {/* content */}
                        {
                            // getSubmittedTask?.submission_no === getSubmittedTask.
                        }
                        <SubmittedWorkCard data={latestSubmittion} latest={true} isLoading={isFetching} />
                    </div>
                    {
                        !isFetching && 
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
    
                                    {/* {!isLoading ? (
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
                                    )} */}
                                    <SubmitButton onClick={handleOnSubmit} title="Approve" isLoading={approveTaskLoadingStatus} />
                                </div>
                            </form>
                        </div>
                    }
                    
                </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ApproveTask


// Submitted work

const SubmittedWorkCard = ({data, latest=false, className="", style, isLoading = false}) => {

    const links = _.compact(_.split(data?.links, ','));
    const attaches =  _.compact(_.split(data?.attaches, ','));
   

    if(isLoading){
        return <div className={`sp1_st--approve-card mb-3 ${className}`} style={style}> 
            <div className="sp1_st--approve-card-header">
                <Placeholder height="14px" width='80px' className='mb-2' />
                <Placeholder height="14px" width='50px' className='mb-2' />
            </div>

            <div className='sp1_st--approve-card-body'>
                <div className='mb-2'>
                    <Placeholder height="14px" width='80px' className='mb-2'/>

                    <div className='ml-2'>
                        <Placeholder height="14px" width='100%' className='mb-2'/>
                        <Placeholder height="14px" width='100%' className='mb-2'/>
                        <Placeholder height="14px" width='100%' className='mb-2'/>
                    </div> 
                </div>

                <div className='mb-2'>
                    <Placeholder height="14px" width='80px' className='mb-2'/>

                    <div className='ml-2'>
                        <Placeholder height="14px" width='100%' className='mb-2'/>
                        <Placeholder height="14px" width='100%' className='mb-2'/>
                        <Placeholder height="14px" width='50%' className='mb-2'/>
                    </div> 
                </div>
            </div>
        </div>
    }

    
    return(
        <div className={`sp1_st--approve-card mb-3 ${className}`} style={style}> 
            <div className="sp1_st--approve-card-header">
                <span>{latest ? 'Latest': "Old"} Submittion {!latest && `(${data?.submission_no})`}</span>
                <span>
                    {dayjs(data?.submission_date).format('MMM DD, YYYY hh:mm a')}
                </span>
            </div>

            <div className='sp1_st--approve-card-body'>
                <div className='mb-2'>
                    <div className='font-weight-bold f-12' style={{color: '#81868E'}}> Links</div>
                    <ol style={{listStyle: 'unset'}}>
                        {_.map(links, (link, index) =>(
                            <li key={`${link}_${index}`} style={{listStyle: 'numaric'}}>
                                <a href={link}>{link}</a>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className='mb-2'>
                    <div className="font-weight-bold f-12" style={{color: '#81868E'}}>Description</div>
                    <div className='sp1_ck_content p-2' dangerouslySetInnerHTML={{__html: data?.text ?? `<span style="color:rgb(180,188,196);">Comment Not Available</span>`}}/>
                </div>


                <div className="mt-3">
                <span
                    className="d-block f-12 font-weight-bold mb-2"
                    style={{ color: "#767581" }}
                >
                    Attached Files
                </span>
                {_.size(attaches) > 0 ? (
                    <FileUploader>
                        {_.map(attaches, (file, index) => (
                            <FileUploader.Preview
                                key={`${file}_${index}`}
                                fileName={file}
                                downloadAble={true}
                                deleteAble={false}
                                downloadUrl={`${file}`}
                                previewUrl={`${file}`}
                                fileType={_.includes(["png","jpg", "jpeg", "gif", "svg"], _.last(_.split(file, '.'))) ? 'images' : 'others'}
                                ext=""
                            />
                        ))}
                    </FileUploader>
                    ) : (
                        <span
                            className="px-2"
                            style={{ color: "rgb(180, 188, 196)" }}
                        >
                            No Attachment is available
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}