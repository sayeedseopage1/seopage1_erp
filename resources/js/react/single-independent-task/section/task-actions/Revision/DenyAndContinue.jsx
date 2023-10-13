import React, {useState} from 'react'
import Button from '../../../components/Button';
import CKEditorComponent from '../../../../ckeditor';
import SubmitButton from '../../../components/SubmitButton';
import { User } from '../../../../utils/user-details';



const denyOptions = (type) => {
    switch(type){
        case 'lead_dev': 
            return ([
                {id: 'deny1', title: 'The project manager added new things in the instruction which was not part of the original instruction'},
                {id: 'deny2', title: 'The way the project manager is interpreting his original instruction now was not possible to understand from what his writing'}
            ])
        case 'dev':
            return([
                {id: 'deny1', title: 'The lead developer added new things in the instruction which was not part of the original instruction'},
                {id: 'deny2', title: 'The way the lead developer is interpreting his original instruction now was not possible to understand from what his writing'}
            ])
        default: []
    }
}



const DenyAndContinue = ({onSubmit, isSubmitting, onBack, task}) => {
    const auth = new User(window?.Laravel?.user);
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [err, setErr] = useState(null);

    const handleEditorDataChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // radio button change
    const handleChange = (e) => {
        setReason(e.target.value);
    };

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


    const handleOnSubmit = e => {
        e.preventDefault();
        if(validate()){
            onSubmit({
                comment,
                denyReason: reason
            });
        }else{
            setErr("You have to Explain Why Did You Deny!")
        }
    }




    const options = auth?.getRoleId() === 6 ? denyOptions('lead_dev') : denyOptions('dev');
    return (
        <React.Fragment>  
            <form action="">
                {/* reason for deny */}
                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Select reason for deny<sup className="f-16">*</sup> :
                    </label>
                    <div className="px-3">
                        {options.map(option => (
                            <div key={option.id} className="form-check d-flex align-items-start mb-2">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    name="exampleRadios"
                                    id={option.id}
                                    required= {true}
                                    onChange={handleChange}
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
                        ))}
                    </div>
                    {reasonError && <small id="emailHelp" className="form-text text-danger">{reasonError}</small>}
                </div>


                {/* rich editor  */}
                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Please Explain Why Did You Deny? <sup className="f-16 text-red">*</sup>
                    </label>
                    <div className="ck-editor-holder">
                        <CKEditorComponent onChange={handleEditorDataChange} />
                    </div>
                    {commentError && <small id="emailHelp" className="form-text text-danger">
                        {commentError}
                    </small>} 
                </div>

                <div className="mt-3 d-flex align-items-center">
                        <Button onClick={onBack} variant="tertiary" className="ml-auto mr-2">
                            Back
                        </Button>

                        {!isSubmitting ? (
                            <React.Fragment>
                                <React.Fragment>
                                {_.includes([4, 6], auth?.getRoleId()) ? (
                                    <Button onClick={handleOnSubmit}>Next</Button>
                                ): 
                                    <SubmitButton
                                        title="Submit" 
                                        isLoading={isSubmitting}
                                        onClick={handleOnSubmit}
                                    />
                                }
                            </React.Fragment>
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
            </form>
        </React.Fragment>
    );
}

export default DenyAndContinue