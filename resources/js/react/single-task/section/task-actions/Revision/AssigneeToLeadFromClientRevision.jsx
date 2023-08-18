import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";
import { useCreateRevisionMutation } from "../../../../services/api/SingleTaskPageApi";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../../services/features/subTaskSlice";
import SubmitButton from "../../../components/SubmitButton";




const projectManagerAcknowladgement = [
    {
        id: 'revision1',
        title: 'Client added some additional requirements which was not part of the actual job scope',
        isDeniable: false,
    },
    {
        id: 'revision2',
        title: 'I submitted the work without proper checking and overlooked the issues',
        isDeniable: true,
    },
    {
        id: 'revision3',
        title: 'I couldnt understand clients expectation properly earlier',
        isDeniable: false
    },
    {
        id: 'revision4',
        title: 'I didnt understand the job properly as it’s very technical in nature and relied fully on technical team for success',
        isDeniable: false,
    }, 
    {
        id: 'revision5',
        title: "The client didnt change his instruction but his interpretation of the original instruction now is weird and nobody could have interpreted it this way from his instruction",
        isDeniable: true,
    }, 
    {
        id: 'revision6',
        title: "The client is asking for some minor changes which he couldn’t specify until he saw the completed work and we can’t charge him for these",
        isDeniable: true,
    }
]


const AssigneeToLeadFromClientRevision = ({ close, onBack, onSubmit, task, auth, isSubmitting }) => {
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [isDeniable, setIsDeniable] = useState(false);

    // radio button change
    const handleChange = (e, deniable) => {
        setReason(e.target.value);
        setIsDeniable(deniable);
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

       if(reason === ''){
            errorCount++;
            setReasonError('You have to select a reason from above options')
       }

       return errorCount === 0; 
    }


    // handle submiton
    const handleSubmition=(e)=>{
        e.preventDefault();

        console.log({task})
        const data = {
            task_id: task?.id,
            user_id: auth?.id,
            is_deniable: isDeniable, 
            revision_acknowledgement: reason,
            comment: comment,
        }
 
        if(validate()){   
            onSubmit(data);
        }else{
            console.log('Your forgot to fillup some requried fields')
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
                                            onChange={e => handleChange(e, option.isDeniable)}
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
                            <Button onClick={onBack} variant="tertiary" className="ml-auto mr-2">
                                Back
                            </Button>
                            <SubmitButton title="Submit" onClick={handleSubmition} isLoading={isSubmitting} />
                        </div>
                    </div>
                </form> 
        </React.Fragment>
    );
};

export default AssigneeToLeadFromClientRevision;
