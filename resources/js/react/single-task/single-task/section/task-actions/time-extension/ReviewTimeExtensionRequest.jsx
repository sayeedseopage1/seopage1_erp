import React, {useState} from "react";
import Button from "../../../components/Button";
import DatePicker from "../../../components/DatePicker";
import CKEditorComponent from "../../../../ckeditor";

const ReviewTimeExtensionRequest = ({task, isSubmitting=false, onSubmit, close}) => {
    const [date, setDate] = useState();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
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
            comment,
            hours,
            minutes
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
                        <label htmlFor="DateExtention" className="font-weight-bold">
                            Original Due Date & Time
                        </label>
                        <div className="row mx-0">
                            <div className="col-6 px-1">
                                <div 
                                    className="sp1__jquery_date_picker position-relative w-100 border" 
                                    style={{
                                        background:'#f5f5f5',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    <div className="sp1__jquery_date_btn">
                                        <i className="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div className="sp1__jquery_date_text">July 13, 2023</div>
                                </div>
                            </div>

                            
                            <div className="col-3 px-1">
                                <div 
                                    className="sp1__jquery_date_picker position-relative w-100 border" 
                                    style={{
                                        background:'#f5f5f5',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    <div className="sp1__jquery_date_btn">
                                        <i className="fa-solid fa-clock"></i>
                                    </div>
                                    <div className="sp1__jquery_date_text">04 hours</div>
                                </div>
                            </div>

                            
                            <div className="col-3 px-1">
                                <div 
                                    className="sp1__jquery_date_picker position-relative w-100 border" 
                                    style={{
                                        background:'#f5f5f5',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    <div className="sp1__jquery_date_btn">
                                        <i className="fa-solid fa-clock"></i>
                                    </div>
                                    <div className="sp1__jquery_date_text">03 Mins</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="DateExtention" className="font-weight-bold">Extension Date & Time<sup>*</sup></label>
                        <React.Fragment>
                        <div className="row mx-0">
                            <div className="col-6 px-1">
                                <label>Date</label>
                                <DatePicker 
                                    date={date} 
                                    setDate={setDate}
                                    className="w-100 border"
                                />
                            </div>

                            <div className="col-3 px-1">
                                <label>Hours</label>
                                <div className="sp1__jquery_date_picker position-relative w-100 border p-0">
                                    <div className="sp1__jquery_date_text">
                                        <input 
                                            type="number"
                                            value={hours}
                                            onChange={e => setHours(e.target.value)}
                                            className="w-100 bg-transparent border-0 h-100 py-2 px-3"
                                        />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-3 px-1">
                                <label>Minutes</label>
                                <div className="sp1__jquery_date_picker position-relative w-100 border p-0">
                                    <div className="sp1__jquery_date_text">
                                        <input 
                                            type="number" 
                                            value={minutes} 
                                            onChange={e => setMinutes(e.target.value)} 
                                            className="w-100 bg-transparent border-0 h-100 py-2 px-3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </React.Fragment>
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

export default ReviewTimeExtensionRequest;