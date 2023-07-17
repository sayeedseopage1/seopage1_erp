import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";

const RevisionCreationModal = ({
    isOpen,
    close,
    onSubmitForm,
    isSubmitting = false,
    task,
}) => {
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
        console.log("open")
            errorCount++;
            setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.')     
       }

       if(reason === ''){
        console.log('first')
            errorCount++;
            setReasonError('You have to select a reason from below options')
       }

       return errorCount === 0; 
    }

    // handle submiton
    const handleSubmition=(e)=>{
        e.preventDefault();

        const data = {
            task_id: task?.id,
            reason,
            comment
        }
        
        if(validate()){
           console.log(data)
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

                            {!isSubmitting ? (
                                <React.Fragment>
                                    <Button onClick={handleSubmition}>Submit</Button>
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
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default RevisionCreationModal;
