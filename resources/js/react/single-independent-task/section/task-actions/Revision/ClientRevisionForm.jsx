import React, { useState, useRef } from "react";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";
import SubmitButton from "../../../components/SubmitButton";




const ClientRevisionForm = ({
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
        // console.log("open")
            errorCount++;
            setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.')     
       }

       if(reason === ''){
        // console.log('first')
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
           onSubmitForm(data);
        }else{
            // console.log('Your forgot to fillup some requried fields')
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
                                    value="Client's Requirements Are Not Fulfilled As Per Instruction"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        marginTop: "3px",
                                    }}
                                    
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                    style={{ marginBottom: "3px", }}
                                >
                                   Client's Requirements Are Not Fulfilled As Per Instruction 
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
                                    value="Client Has Changed Previous Requirements Instructions"
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
                                   Client Has Changed Previous Requirements Instructions 
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
                                    value="Client Has Added Some Additional Requirements Instructions"
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
                                   Client Has Added Some Additional Requirements Instructions 
                                </label>
                            </div> 

                            {/* <div className="form-check d-flex align-items-start mb-2">
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
                            </div>  */}
                        </div>
                        {reasonError && <small id="emailHelp" className="form-text text-danger">{reasonError}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold"> 
                            Enter exactly what client said about this revision<sup className="f-16">*</sup> :
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

                            <SubmitButton 
                                onClick={handleSubmition} 
                                isLoading={isSubmitting} 
                                title="Accept & Continue" 
                            /> 
                        </div>
                    </div>
                </form> 
        </React.Fragment>
    );
};

export default ClientRevisionForm;
