import React, {useState} from 'react'
import Button from '../../../components/Button'
import RevisionVeiw from './RevisionVeiw'
import { RevisionAcceptAndContinue } from './RevisionAcceptAndContinue';
import AssigneeRevisionToDev from './AssigneeRevisionToDev';
import DenyAndContinue from './DenyAndContinue';

const RevisionViewModal = ({task, close}) => {
  const [show, setShow] = useState("REVISION");

  return (
    <React.Fragment>
        <div
            className="sp1_single_task--modal-panel"
            style={{ maxWidth: "550px" }}
        >
            <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                <div className="font-weight-bold f-16">
                    Task#{task?.id}: {(show === "ASSINEE_TO_DEV" || show === "ASSINEE_TO_DEV") ? "Revision For Developer":"Revision By Project Manager"}
                </div>
                <Button onClick={close} className="">
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="px-3">
               {show === 'REVISION' && 
                    <RevisionVeiw 
                        onAccept={() => setShow('ACCEPT_AND_CONTINUE')} 
                        onDeny={() => setShow('DENY_AND_CONTINUE')}
                    />
                } 

                {
                    show === 'ACCEPT_AND_CONTINUE' &&
                    <RevisionAcceptAndContinue
                        task={task}
                        onSubmit={(data) => {
                            console.log({ASSINEE_TO_DEV: data}); 
                            setShow("ASSINEE_TO_DEV")
                        }}
                        close={() => setShow("REVISION")}
                    />
                }

                {show === "ASSINEE_TO_DEV" &&
                    <AssigneeRevisionToDev 
                        task={task}
                        onSubmit={(data) => console.log({ASSINEE_TO_DEV: data})}
                        isSubmitting = {false}
                        onBack={() => setShow("ACCEPT_AND_CONTINUE")}
                    />
                }

                {show === "DENY_AND_CONTINUE" && 
                    <DenyAndContinue
                        task={task} 
                        onSubmit={(data) => {
                            console.log({DENY_AND_CONTINUE: data});
                            setShow("DENY_ASSINEE_TO_DEV")
                        }}
                        isSubmitting = {false}
                        onBack={() => setShow("REVISION")}
                    />
                }

                {show === "DENY_ASSINEE_TO_DEV" &&
                    <AssigneeRevisionToDev 
                        task={task}
                        onSubmit={(data) => 
                            console.log({DENY_ASSINEE_TO_DEV: data})
                        }
                        isSubmitting = {false}
                        onBack={() => setShow("DENY_AND_CONTINUE")}
                    />
                }
            </div>
        </div>
    </React.Fragment>
  )
}


export default RevisionViewModal