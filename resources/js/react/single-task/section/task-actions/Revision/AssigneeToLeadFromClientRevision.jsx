import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";
import { useCreateRevisionMutation } from "../../../../services/api/SingleTaskPageApi";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../../services/features/subTaskSlice";
import SubmitButton from "../../../components/SubmitButton";

const AssigneeToLeadFromClientRevision = ({ close, onBack, onSubmit, task, auth, isSubmitting }) => {
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");

    // radio button change
    const handleChange = (e) => {
        setReason(e.target.value);
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

        const data = {
            task_id: task?.id,
            user_id: auth?.id,
            revision_acknowledgement: reason,
            project_manager_comment: comment 
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
                            <div className="form-check d-flex align-items-start mb-2">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios1"
                                    required= {true}
                                    onChange={handleChange}
                                    value="Task Has Revision Because Requirements Are
                                    Not Fullfilled Accordiong To My Instructions"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        marginTop: "3px",
                                    }}
                                    
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                    style={{ marginBottom: "3px" }}
                                >
                                    Task Has Revision Because Requirements Are
                                    Not Fullfilled Accordiong To My Instructions
                                </label>
                            </div>

                            <div className="form-check d-flex align-items-start mb-2">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios2"
                                    required= {true}
                                    onChange={handleChange}
                                    value="Task Has Revision Because I Have Customized
                                    Previous Instructions"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        marginTop: "3px",
                                    }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios2"
                                    style={{ marginBottom: "3px" }}
                                >
                                    Task Has Revision Because I Have Customized
                                    Previous Instructions
                                </label>
                            </div>

                            <div className="form-check d-flex align-items-start mb-2">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios3"
                                    required= {true}
                                    onChange={handleChange}
                                    value="Task Has Revision Because I Have Added
                                    Additional Instructions To Previous
                                    Instructions"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        marginTop: "3px",
                                    }}
                                />
                                <label
                                    className="form-check-label mb-1"
                                    htmlFor="exampleRadios3"
                                    style={{ marginBottom: "3px" }}
                                >
                                    Task Has Revision Because I Have Added
                                    Additional Instructions To Previous
                                    Instructions
                                </label>
                            </div> 

                            

                            <div className="form-check d-flex align-items-start mb-2">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios4"
                                    required= {true}
                                    onChange={handleChange}
                                    value="Revision Due To The Sales Team"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        marginTop: "3px",
                                    }}
                                />
                                <label
                                    className="form-check-label mb-1"
                                    htmlFor="exampleRadios4"
                                    style={{ marginBottom: "3px" }}
                                >
                                   Revision Due To The Sales Team 
                                </label>
                            </div>
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
