import React, {useState} from 'react'
import Button from '../../../components/Button'
import RevisionVeiw from './RevisionVeiw'
import { RevisionAcceptAndContinue } from './RevisionAcceptAndContinue';
import AssigneeRevisionToDev from './AssigneeRevisionToDev';
import DenyAndContinue from './DenyAndContinue';
import { useGetRevisionDetailsQuery, useRevisionAcceptOrDenyMutation } from '../../../../services/api/SingleTaskPageApi';
import { useDispatch } from 'react-redux';
import { setTaskStatus } from '../../../../services/features/subTaskSlice';

const DeveloperRevisionView = ({task, close}) => {
  const [show, setShow] = useState("REVISION");
  const [accept, setAccept] = useState();
  const dispatch = useDispatch();
  const { data: revision, isFetching: isFetchingRevision } = useGetRevisionDetailsQuery(task?.id);
  const [revisionAcceptOrDeny, {isLoading: isLoadingRevisionReview}] = useRevisionAcceptOrDenyMutation();
  const auth = window?.Laravel?.user;

  // handle Accept and continue submition
  const hanldeAcceptAndContinueSubmition = (data, type) => {

    revisionAcceptOrDeny({
        text2: data,
        task_id: task?.id,
        user_id: auth?.id,
        revision_id: revision?.id,
        mode: accept ? 'accept': 'deny'
    })
    .unwrap()
    .then(res => {
        if(_.includes([4, 6], Number(auth?.role_id))){
            setShow(type);
        }else{
            dispatch(setTaskStatus(res?.task_status));
            close();
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
        <div
            className="sp1_single_task--modal-panel"
            style={{ maxWidth: "550px" }}
        >
            <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                <div className="font-weight-bold f-16">
                    Task#{task?.id}: {" "}
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
                        isLoading= {isFetchingRevision}
                        onAccept={() => {
                            setAccept(true);
                            setShow('ACCEPT_AND_CONTINUE'); 
                        }} 
                        onDeny={() => {
                            setAccept(false);
                            setShow('DENY_AND_CONTINUE')
                        }}
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

                {show === "DENY_AND_CONTINUE" && 
                    <DenyAndContinue
                        task={task} 
                        onSubmit={data => hanldeAcceptAndContinueSubmition(data, "DENY_ASSINEE_TO_DEV")}
                        isSubmitting = {isLoadingRevisionReview}
                        onBack={() => setShow("REVISION")}
                    />
                }
            </div>
        </div>
    </React.Fragment>
  )
}


export default DeveloperRevisionView