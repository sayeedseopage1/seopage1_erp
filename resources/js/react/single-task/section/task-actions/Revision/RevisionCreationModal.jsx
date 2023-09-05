import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";
import { useCreateRevisionMutation } from "../../../../services/api/SingleTaskPageApi";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../../services/features/subTaskSlice";
import SubmitButton from "../../../components/SubmitButton";
import { useRevision } from '../../../../hooks/useRevision';

 

const RevisionCreationModal = ({ close, task, auth }) => {
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [isDeniable, setIsDeniable] = useState(false);
    const dispatch = useDispatch();
    const { 
        getLeadDeveloperAcknowladgementOptions, 
        getProjectManagerAcknowladgementOptions
    } = useRevision();

    const role = auth.getRoleId();

    const revisionOptions = role === 4 ? getProjectManagerAcknowladgementOptions() : getLeadDeveloperAcknowladgementOptions();

    const [createRevision, {isLoading}] =  useCreateRevisionMutation();

    // radio button change
    const handleChange = (value) => {
        setReason(value);
    };

    // editor change text 
    const hanldeEditorTextChange= (e, editor) => {
        const data = editor.getData();
        setComment(data);
    }

    // validation
    const validate = () => {
       let errorCount = 0;
       
       if(comment === ""){
            errorCount++;
            setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.')     
       }

       if(!reason){
            errorCount++;
            setReasonError('You have to select a reason from above options')
       }

       return errorCount === 0; 
    }


    // handle submiton
    const handleSubmition=(e)=>{
        e.preventDefault();

        const data = {
            task_id: task?.id,
            user_id: auth?.id,
            revision_acknowledgement: reason?.revision ?? '',
            acknowledgement_id: reason?.id ,
            comment,
            is_deniable: reason?.isDeniable ?? false
        }
 
        if(validate()){            
            createRevision(data)
            .unwrap()
            .then(res => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Task submitted for Revision successfully'
                })

                close();
            })
            .catch(err => console.log(err));
        }else{
            console.log('Your forgot to fillup some requried fields')
        } 
    }

    return (
        <React.Fragment>
            <div
                className="sp1_single_task--modal-panel"
                style={{ maxWidth: "550px" }}
            >
                <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                    <div className="font-weight-bold f-14">
                        Revision - Task: {task?.id}#
                        {task?.title || task?.heading}
                    </div>
                    <Button onClick={close} className="">
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                <form className="px-3">
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Select Reason for Revision<sup className="f-16">*</sup> :
                        </label>
                        <div className="px-3">
                            {revisionOptions.map(option => (
                                <div key={option.id} className="form-check d-flex align-items-start mb-2">
                                    <input
                                        className="form-check-input mr-2"
                                        type="radio"
                                        name="exampleRadios"
                                        id={option.id}
                                        required= {true}
                                        onChange={() => handleChange(option)}
                                        value={option.revision}
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
                                        {option.revision}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {reasonError && <small id="emailHelp" className="form-text text-danger">{reasonError}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold"> 
                            Explain or Comment<sup className="f-16">*</sup> :
                        </label>
                        <div className="ck-editor-holder">
                            <CKEditorComponent onChange={hanldeEditorTextChange}/>
                        </div> 
                        {commentError && <small id="emailHelp" className="form-text text-danger">{commentError}</small>}
                    </div>

                    <div>
                        <div className="mt-3 d-flex align-items-center">
                            <Button onClick={close} variant="tertiary" className="ml-auto mr-2">
                                Close
                            </Button>
                            <SubmitButton title="Submit" onClick={handleSubmition} isLoading={isLoading} />
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default RevisionCreationModal;
