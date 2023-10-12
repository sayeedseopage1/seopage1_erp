import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";
import { useCreateRevisionMutation } from "../../../../services/api/SingleTaskPageApi";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../../services/features/subTaskSlice";
import SubmitButton from "../../../components/SubmitButton";




const projectManagerAcknowladgement = [
    {
        id: "CPRx01",
        title: 'Client added some additional requirements which was not part of the actual job scope',
        isDeniable: false,
    },
    {
        id: 'PLRx12',
        title: 'I submitted the work without proper checking and overlooked the issues',
        isDeniable: true,
    },
    {
        id: 'PLRx03',
        title: 'I couldnt understand clients expectation properly earlier',
        isDeniable: false
    },
    {
        id: 'PLRx04',
        title: 'I didnt understand the job properly as it’s very technical in nature and relied fully on technical team for success',
        isDeniable: false,
    },
    {
        id: 'CPRx05',
        title: "The client didnt change his instruction but his interpretation of the original instruction now is weird and nobody could have interpreted it this way from his instruction",
        isDeniable: false,
        createDispute: true,
    },
    {
        id: 'CPRx06',
        title: "The client is asking for some minor changes which he couldn’t specify until he saw the completed work and we can’t charge him for these",
        isDeniable: false,
    },
    {
        id: 'SPRx01',
        title: "Sales person discussed something in a verbal meeting with the client and then forgot to document it when assigning",
        isDeniable: false,
        createDispute: false,
    },
    {
        id: 'SPRx02',
        title: "Sales person couldn't define requirement properly and I also failed to define it after I took over",
        isDeniable: false,
        createDispute: false,
    },
    {
        id: 'SPRx03',
        title: "Sales overpromised: This task is not doable to this extent or in this way and I informed management about it on day 1",
        isDeniable: false,
        createDispute: false,
    }
]


const AssigneeToLeadFromClientRevision = ({ close, onBack, onSubmit, task, auth, isSubmitting }) => {
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [additionalPaid, setAdditionalPaid] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const [additionalAmount, setAdditionalAmount] = useState(0);
    const [additionalError, setAdditionalError] = useState('');

    // radio button change
    const handleChange = (e, reason) => {
        setReason(reason);
        setAdditionalAmount(0);
        setAdditionalPaid('');
        setAdditionalInfo(null);
    };


    // on blur
    const handleBlurEvent = () => {
        Swal.fire({
            title: 'Do you want to create a milestone?',
            // showDenyButton: true,
            confirmButtonText: 'Yes',
            // denyButtonText: `No`,
            }).then(res => {
            if(res.isConfirmed){
                window.open(`/account/projects/${task?.projectId}?tab=milestones`, '_blank');
            }
        })
    }

    // additional payment
    const hasAdditionalPayment = (isPay) =>{
        setAdditionalPaid(() => isPay ? 'yes': 'no');
    }

    // editor change text
    const handleEditorTextChange= (e, editor) => {
        const data = editor.getData();
        setComment(data);
    }

    // validation
    const validate = () => {
       let errorCount = 0;

       if(comment === ""){
            errorCount++;
            setCommentError('You have to explain the revision in details, so that lead developer can understand where they need to work.')
       }

       if(!reason){
            errorCount++;
            setReasonError('You have to select a reason from above options')
       }


       if(reason && reason?.id === 'CPRx01'){
            if(additionalPaid === 'yes' && additionalAmount === 0){
                errorCount++;
                setAdditionalError('You have to provide amount')
            }

            if(additionalPaid === 'no' && !additionalInfo){
                errorCount++;
                setAdditionalError('You have to select an option')
            }
       }

       return errorCount === 0;
    }


    // handle submission
    const handleSubmission=(e)=>{
        e.preventDefault();



        const data = {
            acknowledgement_id: reason?.id ,
            task_id: task?.id,
            user_id: auth?.id,
            is_deniable: reason?.isDeniable,
            revision_acknowledgement: reason?.title,
            comment: comment,
            additional_amount: Number(additionalAmount),
            additional_status: additionalPaid,
            additional_comment: additionalInfo?.info ?? '',
            dispute_create: reason?.createDispute || additionalInfo?.disputeCreate || false
        }

        if(validate()){
            onSubmit(data);
        }else{
            console.log('Your forgot to fillup some required fields')
        }
    }



    return (
        <React.Fragment>
                <form className="px-3">
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Select Reason for Revision<sup className="f-16">*</sup> :
                        </label>
                        <div className="px-3">
                            {
                                _.map(projectManagerAcknowladgement, option => (
                                    <div key={option.id} className="form-check d-flex align-items-start mb-2">
                                        <input
                                            className="form-check-input mr-2"
                                            type="radio"
                                            name="exampleRadios"
                                            id={option.id}
                                            required= {true}
                                            onChange={e => handleChange(e, option)}
                                            value={option.title}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginTop: "3px",
                                            }}

                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={option.id}
                                            style={{ marginBottom: "3px" }}
                                        >
                                           {option.title}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        {reasonError && <small id="emailHelp" className="form-text text-danger">{reasonError}</small>}
                    </div>

                    {reason?.id === 'CPRx01' &&
                        <div className="form-group">
                            <label htmlFor="" className="d-block font-weight-bold">Is the client paying additionally for these changes? <sup>*</sup></label>
                            <div className="d-block">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            name="milestone"
                                            type="radio"
                                            id="createMilestoneYes"
                                            value="1"
                                            onChange={(e)=>hasAdditionalPayment(true)}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginTop: "3px",
                                            }}
                                        />
                                        <label htmlFor="createMilestoneYes" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            name="milestone"
                                            type="radio"
                                            id="createMilestoneNo"
                                            value="0"
                                            onChange={(e) => hasAdditionalPayment(false)}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginTop: "3px",
                                            }}
                                        />
                                        <label htmlFor="createMilestoneNo" className="form-check-label">No</label>
                                    </div>
                            </div>
                        </div>
                    }

                    {additionalPaid === 'yes' &&
                        <div className="form-group">
                            <label htmlFor="" className="d-block font-weight-bold">Amount? <sup>*</sup></label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input
                                    type="number"
                                    onChange={e => setAdditionalAmount(e.target.value)}
                                    className="form-control"
                                    id="inlineFormInputGroup"
                                    placeholder="300"
                                    onBlur={handleBlurEvent}
                                />
                            </div>
                        </div>
                    }

                    {
                        additionalPaid === 'no' &&
                        <div className="form-group">
                            <label htmlFor="" className="d-block font-weight-bold">Is the client paying additionally for these changes? <sup>*</sup></label>
                            <div className="d-block">
                                    <div className="form-check mb-3">
                                        <input
                                            name="additionalInformation"
                                            className="form-check-input"
                                            type="radio"
                                            id="additionalInformation1"
                                            onChange={e => setAdditionalInfo({
                                                info: e.target.value,
                                                disputeCreate: false,
                                            })}
                                            value="Client changed his/her mind and he/she don't want to pay additional payment. We have to continue the task for client satisfaction"
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginTop: "3px",
                                            }}
                                        />
                                        <label htmlFor="additionalInformation1" className="form-check-label">
                                            Client changed his/her mind and he/she don't want to pay additional payment. We have to continue the task for client satisfaction
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            name="additionalInformation"
                                            type="radio"
                                            id="additionalInformation2"
                                            value="The client is interpreting his original instruction in a very unusual way!"
                                            onChange={(e) => setAdditionalInfo({
                                                info: e.target.value,
                                                disputeCreate: true,
                                            })}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                marginTop: "3px",
                                            }}
                                        />
                                        <label htmlFor="additionalInformation2" className="form-check-label">
                                        The client is interpreting his original instruction in a very unusual way!
                                        </label>
                                    </div>
                            </div>
                        </div>
                    }

                    { additionalError && <div className="mb-3">
                        <small id="emailHelp" className="form-text text-danger">
                            {additionalError}
                        </small>
                    </div>}

                    {/* Editor  */}
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Explain or Comment<sup className="f-16">*</sup> :
                        </label>
                        <div className="ck-editor-holder">
                            <CKEditorComponent onChange={handleEditorTextChange}/>
                        </div>
                        {commentError && <small id="emailHelp" className="form-text text-danger">{commentError}</small>}
                    </div>


                    <div>
                        <div className="mt-3 d-flex align-items-center">
                            <Button onClick={onBack} variant="tertiary" className="ml-auto mr-2">
                                Back
                            </Button>
                            <SubmitButton title="Submit" onClick={handleSubmission} isLoading={isSubmitting} />
                        </div>
                    </div>
                </form>
        </React.Fragment>
    );
};

export default AssigneeToLeadFromClientRevision;
