import React, {useState} from 'react'
import Button from '../../../components/Button'
import RevisionVeiw from './RevisionVeiw'
import { RevisionAcceptAndContinue } from './RevisionAcceptAndContinue';
import AssigneeRevisionToDev from './AssigneeRevisionToDev';
import DenyAndContinue from './DenyAndContinue';
import { useGetRevisionDetailsQuery, useRevisionAcceptOrDenyByLeadDeveloperMutation, useRevisionAcceptOrDenyMutation } from '../../../../services/api/SingleTaskPageApi';
import { useDispatch } from 'react-redux';
import { setTaskStatus } from '../../../../services/features/subTaskSlice';
import _ from 'lodash';


const RevisionViewModal = ({task, close}) => {
  const [show, setShow] = useState("REVISION");
  const [accept, setAccept] = useState('');
  const [comment, setComment] = useState('');
  const [denyReason, setDenyReason] = useState('');
  const dispatch = useDispatch();
  const { data: revision, isFetching } = useGetRevisionDetailsQuery(task?.id);
//   const [revisionAcceptOrDeny, {isLoading: isLoadingRevisionReview}] = useRevisionAcceptOrDenyMutation();
  const auth = window?.Laravel?.user;

  const [
    revisionAcceptOrDeny,
    {isLoading: isLoadingRevisionReview}
  ] = useRevisionAcceptOrDenyByLeadDeveloperMutation();

  // handle Accept and continue submition
  const hanldeAcceptAndContinueSubmition = (data, type) => {
    setComment(data);
    setShow(type); 
  }

   // handle Accept and continue submition
   const hanldeDenyAndContinueSubmition = (data, type) => {
    setComment(data);
    setDenyReason(data?.denyReason);
    setShow(type); 
  }


  const handleOnSubmit = (data, type) =>{
    let fdata ={
        comment: comment?.comment ?? '',
        task_id: data?.task_id,
        project_id: task?.projectId,
        user_id: auth?.id,
        subTask: _.map(data?.comments, comment => ({...comment, is_deniable: data?.is_deniable})),
        revision_acknowledgement: data?.reason ?? '',
        revision_id: revision?.id,
        mode: data?.continue ? 'continue' : accept,
        deny_reason: denyReason ?? '',
        is_deniable: data?.is_deniable ?? false,
    }

  
    const params = (!data?.continue && accept==="deny") ? 'deny-continue' :'accept-continue'; 

   
    revisionAcceptOrDeny({fdata, params})
    .unwrap()
    .then(res => {
        close();
    })
    .catch(err => console.log(err))
  } 

  const handleContinueButton = () => {
    setAccept('continue');
    if(_.size(revision?.taskSubTask) === 0){
        setShow('DENY_ASSINEE_TO_DEV');
    }else{
        handleOnSubmit({
            continue: true,
        }, '')
    }
  }

  console.log({task})
  return (
    <React.Fragment> 
        <div
            className="sp1_single_task--modal-panel"
            style={{ maxWidth: "550px" }}
        >
            <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                <div className="font-weight-bold f-16">
                    Task#{task?.id}:
                    {Number(auth?.role_id) === 6 ? (
                        <React.Fragment>
                            {show === "ASSINEE_TO_DEV"  ? "Revision For Developer":"Revision By Project Manager"}
                        </React.Fragment>
                    ): Number(auth?.role_id) === 4 ? (
                        <React.Fragment>
                            {show === "ASSINEE_TO_DEV"  ? "Revision For Lead Developer":"Revision By Project Manager"}
                        </React.Fragment>
                    ): "Revision By Lead Developer Manager"}
                </div>
                <Button onClick={close} className="">
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="px-3">
               {show === 'REVISION' && 
                    <RevisionVeiw 
                        revision={revision}
                        isLoading= {isFetching}
                        isContinue={isLoadingRevisionReview}
                        onAccept={() => {
                            setAccept('accept');
                            setShow('ACCEPT_AND_CONTINUE'); 
                        }} 
                        onDeny={() => {
                            setAccept('deny');
                            setShow('DENY_AND_CONTINUE')
                        }}
                        onContinue={handleContinueButton}
                    />
                } 

                {
                    show === 'ACCEPT_AND_CONTINUE' &&
                    <RevisionAcceptAndContinue
                        task={task}
                        isSubmitting={isLoadingRevisionReview}
                        onSubmit={data => hanldeAcceptAndContinueSubmition(data, "ASSINEE_TO_DEV")}
                        close={() => setShow("REVISION")}
                    />
                }

                {show === "ASSINEE_TO_DEV" &&
                    <AssigneeRevisionToDev 
                        task={task}
                        revision={revision}
                        type={true}
                        onSubmit={(data) =>handleOnSubmit( data, 'ASSINEE_TO_DEV' )}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("ACCEPT_AND_CONTINUE")}
                    />
                }

                {show === "DENY_AND_CONTINUE" && 
                    <DenyAndContinue
                        task={task} 
                        onSubmit={data => hanldeDenyAndContinueSubmition(data, "DENY_ASSINEE_TO_DEV")}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("REVISION")}
                    />
                }


                {_.size(task?.taskSubTask) > 0 && show === "DENY_ASSINEE_TO_DEV" &&
                    <AssigneeRevisionToDev 
                        task={task}
                        revision={revision}
                        type={false}
                        onSubmit={(data) => handleOnSubmit(data, 'DENY_ASSINEE_TO_DEV')}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("DENY_AND_CONTINUE")}
                    />
                }
            </div>
        </div>
    </React.Fragment>
  )
}


export default RevisionViewModal