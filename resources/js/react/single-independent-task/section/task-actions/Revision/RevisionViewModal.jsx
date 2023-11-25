import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetRevisionDetailsQuery, useRevisionAcceptOrDenyByLeadDeveloperMutation } from '../../../../services/api/SingleTaskPageApi';
import { User } from '../../../../utils/user-details';
import Button from '../../../components/Button';
import AssigneeRevisionToDev from './AssigneeRevisionToDev';
import DenyAndContinue from './DenyAndContinue';
import { RevisionAcceptAndContinue } from './RevisionAcceptAndContinue';
import RevisionView from './RevisionView';


const RevisionViewModal = ({task, close}) => {
  const [show, setShow] = useState("REVISION");
  const [accept, setAccept] = useState('');
  const [comment, setComment] = useState('');
  const [denyReason, setDenyReason] = useState('');
  const dispatch = useDispatch();
  const { data: revision, isFetching } = useGetRevisionDetailsQuery(task?.id);
//   const [revisionAcceptOrDeny, {isLoading: isLoadingRevisionReview}] = useRevisionAcceptOrDenyMutation();
  const auth = new User(window?.Laravel?.user);
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


  const handleOnSubmit = async (data, type) =>{
    let fdata ={
        comment: comment?.comment ?? '',
        task_id: data?.task_id,
        project_id: task?.projectId,
        user_id: auth?.getId(),
        subTask: _.map(data?.comments, comment => ({...comment, is_deniable: data?.is_deniable})),
        revision_acknowledgement: data?.reason ?? '',
        revision_id: revision?.id,
        mode: data?.continue ? 'continue' : accept,
        deny_reason: denyReason ?? '',
        is_deniable: data?.is_deniable ?? false,
    }


    const params = (!data?.continue && accept==="deny") ? 'deny-continue' :'accept-continue';

    await revisionAcceptOrDeny({fdata, params})
    .unwrap()
    .then(res => {
        toast.success('Your request has been successfully processed')
        close();
    })
    .catch(err => console.log(err))
  }

  const handleContinueButton = () => {
    setAccept('continue');
    if(_.size(revision?.taskSubTask) === 0){
        setShow('DENY_ASSIGNEE_TO_DEV');
    }else{
        handleOnSubmit({
            continue: true,
        }, '')
    }
  }


  const generateModalTitle = () => {
    if(auth.getRoleId() === 4){
        return show === "ASSIGNEE_TO_DEV"  ? "Revision For Lead Developer":"Revision By Project Manager";
    }else if(auth.getRoleId() === 6){
        return show === "ASSIGNEE_TO_DEV"  ? "Revision For Developer":"Revision By Project Manager";
    }else if(auth.getRoleId() === 9 || auth.getRoleId() === 10){
        return "Revision By Project Manager";
    }else return "Revision By Lead Developer"
  }




//   console.log({task})
  return (
    <React.Fragment>
        <div
            className="sp1_single_task--modal-panel"
            style={{ maxWidth: "550px" }}
        >
            <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                <div className="font-weight-bold f-16">
                    Task#{task?.id}:
                    {generateModalTitle()}
                </div>
                <Button onClick={close} className="">
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="px-3">
               {show === 'REVISION' &&
                    <RevisionView
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
                        onSubmit={data => hanldeAcceptAndContinueSubmition(data, "ASSIGNEE_TO_DEV")}
                        close={() => setShow("REVISION")}
                    />
                }

                {show === "ASSIGNEE_TO_DEV" &&
                    <AssigneeRevisionToDev
                        task={task}
                        revision={revision}
                        type={true}
                        onSubmit={(data) =>handleOnSubmit( data, 'ASSIGNEE_TO_DEV' )}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("ACCEPT_AND_CONTINUE")}
                    />
                }

                {show === "DENY_AND_CONTINUE" &&
                    <DenyAndContinue
                        task={task}
                        onSubmit={data => hanldeDenyAndContinueSubmition(data, "DENY_ASSIGNEE_TO_DEV")}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("REVISION")}
                    />
                }


                {_.size(task?.taskSubTask) > 0 && show === "DENY_ASSIGNEE_TO_DEV" &&
                    <AssigneeRevisionToDev
                        task={task}
                        revision={revision}
                        type={false}
                        onSubmit={(data) => handleOnSubmit(data, 'DENY_ASSIGNEE_TO_DEV')}
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
