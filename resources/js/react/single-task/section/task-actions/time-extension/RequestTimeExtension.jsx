import React, {useState} from "react";
import Button from "../../../components/Button";
import DatePicker from "../../../components/DatePicker";
import CKEditorComponent from "../../../../ckeditor";

const RequestTimeExtension = ({task, isSubmitting=false, onSubmit, close}) => {
    const [date, setDate] = useState();
    const [comment, setComment] = useState('');

    const hanldeEditorChange =(e, editor) => {
        const data = editor.getData();
        setComment(data);
    }

    const handleSubmittion = (e) => {
        e.preventDefault();
        const data = {
            task_id: task?.id,
            date,
            comment
        }

        onSubmit(e, data);
    }

    return (
        <React.Fragment>
            <div
                className="sp1_single_task--modal-panel"
                style={{ maxWidth: "550px" }}
            >
                <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                    <div className="font-weight-bold f-14">
                        Task # {task?.id}: Request for Time Extension
                    </div>
                    <Button onClick={close} className="">
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>
                
                <form className="px-3">
                    <div className="form-group">
                        <label htmlFor="DateExtention" className="font-weight-bold">Extension Date</label>
                        <div>
                            <DatePicker 
                                date={date} 
                                setDate={setDate}
                                className="w-100 border"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Explaination" className="font-weight-bold">
                            Explanation<sup>*</sup>
                        </label>
                        <div className="ck-editor-holder">
                            <CKEditorComponent onChange={hanldeEditorChange} />
                        </div>
                    </div>

                    <div className="mt-3 d-flex align-items-center">
                        <Button
                            variant="tertiary"
                            className="ml-auto mr-2"
                            onClick={close}
                        >
                            Close
                        </Button>
                        {!isSubmitting ? (
                            <React.Fragment>
                                <Button onClick={handleSubmittion}>Send Request</Button>
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
            </div>
        </React.Fragment>
    );
};

export default RequestTimeExtension;
