import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import CKEditorComponent from "../../../../ckeditor";
import SubmitButton from "../../../components/SubmitButton";

// button
export const AcceptAndContinueButton = ({ isLoading, onClick }) => {
    if (!isLoading) {
        return <Button onClick={onClick}>Accept & Continue</Button>;
    } else {
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
        </React.Fragment>;
    }
};

// component
export const RevisionAcceptAndContinue = ({
    task,
    revision,
    onSubmit,
    close,
    onNext,
    isSubmitting = false,
}) => {
    const [comment, setComment] = useState("");
    const [err, setErr] = useState("");

    const handleEditorDataChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        if(comment !== ''){
            onSubmit({comment});
        }else{
            setErr("You have to Explain Why & How Did This Happen!")
        }
    }

    const auth = window?.Laravel?.user;

    return (
        <React.Fragment>
            <form action="">
                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Please Explain Why & How Did This Happen?{" "}
                        <sup className="f-16 text-red">*</sup>
                    </label>
                    <div className="ck-editor-holder">
                        <CKEditorComponent onChange={handleEditorDataChange} />
                    </div>
                    {err && <small id="emailHelp" className="form-text text-danger">
                        {err}
                    </small>}

                    <div className="mt-3 d-flex align-items-center">
                        <Button
                            onClick={close}
                            variant="tertiary"
                            className="ml-auto mr-2"
                        >
                            Back
                        </Button>

                        {!isSubmitting ? (
                            <React.Fragment>
                                {_.includes([4, 6], auth?.role_id) ? (
                                    <Button onClick={handleOnSubmit}>Next</Button>
                                ): 
                                    <SubmitButton
                                        title="Submit" 
                                        isLoading={isSubmitting}
                                        onClick={handleOnSubmit}
                                    />
                                }
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
        </React.Fragment>
    );
};
