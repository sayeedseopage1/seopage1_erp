import React, {useState} from 'react'
import Button from '../../../components/Button';
import CKEditorComponent from '../../../../ckeditor';

const DenyAndContinue = ({onSubmit, isSubmitting, onBack, task}) => {
    const [comment, setComment] = useState("");
    const [err, setErr] = useState("");

    const handleEditorDataChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        if(comment !== ''){
            onSubmit(comment);
        }else{
            setErr("You have to Explain Why Did You Deny!")
        }
    }
    return (
        <React.Fragment>  
            <form action="">
                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Please Explain Why Did You Deny? <sup className="f-16 text-red">*</sup>
                    </label>
                    <div className="ck-editor-holder">
                        <CKEditorComponent onChange={handleEditorDataChange} />
                    </div>
                    {err && <small id="emailHelp" className="form-text text-danger">
                        {err}
                    </small>}

                    <div className="mt-3 d-flex align-items-center">
                            <Button onClick={onBack} variant="tertiary" className="ml-auto mr-2">
                                Back
                            </Button>

                            {!isSubmitting ? (
                                <React.Fragment>
                                    <Button onClick={handleOnSubmit}>Next</Button>
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
}

export default DenyAndContinue