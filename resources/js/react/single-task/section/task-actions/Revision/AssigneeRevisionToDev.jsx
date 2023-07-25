import React, { useState } from "react";
import Button from "../../../components/Button";
import { Listbox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import CKEditorComponent from "../../../../ckeditor";
import SubmitButton from "../../../components/SubmitButton";
import _ from "lodash";

const AssigneeRevisionToDev = ({
    task,
    // onBack,
    onSubmit,
    isSubmitting = false,
}) => {
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskError, setSubtaskError] = useState("");

    // radio button change
    const handleChange = (e) => {
        setReason(e.target.value);
    };

    // editor change text
    const hanldeEditorTextChange = (e, editor, id) => {
        const data = editor.getData(); 
        const _comments = [...comments];

        const index = _comments?.findIndex(d => d.subtask_id === id); 
        if(index === -1){
            _comments.push({
                subtask_id: id,
                comment: data
            })
        }else{
           _comments[index] = {subtask_id: id, comment: data}
        }

        setComments([..._comments]);
    };


    // validation
    const validate = () => {
        let errorCount = 0;
        if (reason === "") {
            errorCount++;
            setReasonError("You have to select a reason from below options");
        }

       if(_.size(task?.subtask) > 0){
            if(subtasks.length === 0){
                errorCount++;
                setSubtaskError('You need to selecd at least one sub task to continue.')
            }

            if(comments.length === 0 || comments.length !== subtasks.length){
                const err = [];
                errorCount++;
                comments?.map(c => err.push(c.subtask_id))
                setCommentError(err)
            }

            comments?.map( comment =>{
                if(comment?.comment === ''){
                    const err = [];
                    errorCount++;
                    comments?.map(c => err.push(c.subtask_id))
                    setCommentError(err)
                }
            })
       } 

        return errorCount === 0 ? true : false;
    };

    // handle submiton
    const handleSubmition = (e) => {
        e.preventDefault();

        const data = {
            task_id: task?.id,
            reason,
            comments,
        }; 
        if(validate()){
            onSubmit(data)
        }
    };

    const onBackButtonClick = (e) => {
        e.preventDefault();
        onBack();
    }; 

    return (
        <React.Fragment>
            <form action="">
                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Revision Acknowledgement<sup className="f-16">*</sup> :
                    </label>
                    <div className="px-3">
                        <div className="form-check d-flex align-items-start mb-2">
                            <input
                                className="form-check-input mr-2"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                required={true}
                                onChange={handleChange}
                                value="Task Has Revision Because Requirements Are Not Fulfilled According to My Instractions"
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
                                Task Has Revision Because Requirements Are Not
                                Fulfilled According to My Instractions
                            </label>
                        </div>

                        <div className="form-check d-flex align-items-start mb-2">
                            <input
                                className="form-check-input mr-2"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                required={true}
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
                                required={true}
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
                                Additional Instructions To Previous Instructions
                            </label>
                        </div>
                    </div>
                    {reasonError && (
                        <small id="emailHelp" className="form-text text-danger">
                            {reasonError}
                        </small>
                    )}
                </div>

                {task?.subtask?.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Select SubTask<sup className="font-weight-bold f-16">*</sup> : 
                        </label>
                        <SubtaskSelectionMenu
                            task={task}
                            subTasks={subtasks}
                            setSubtasks={setSubtasks}
                        />
                    </div>
                )}

                {subtasks?.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Comment:
                        </label>
                        {subtasks.map((s, i) => (
                            <React.Fragment key={s.subtask_id}>
                                <div className="form-group">
                                    <label htmlFor="" className="font-weight-bold">{i+1}. {s?.title}<sup className="font-weight-bold f-16">*</sup> :</label>
                                    <div className="ck-editor-holder">
                                        <CKEditorComponent onChange={(e, editor) =>hanldeEditorTextChange(e, editor, s?.subtask_id)} />
                                    </div>
                                    {commentError.includes(s.subtask_id) && (
                                        <small id="emailHelp" className="form-text text-danger">
                                            You have to explain the revision in details, so that Developer can understand where they need to work.
                                        </small>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                

                <div className="mt-3 mb-3 d-flex align-items-center">
                    <Button
                        onClick={onBackButtonClick}
                        variant="tertiary"
                        className="ml-auto mr-2"
                    >
                        Back
                    </Button>
                    
                    <NextAndContinueButton
                        onClick={handleSubmition}
                        isLoading={isSubmitting}
                    />
                </div>
            </form>
        </React.Fragment>
    );
};

export default AssigneeRevisionToDev;

const NextAndContinueButton = ({ onClick, isLoading }) => {
    if (!isLoading) {
        return <Button onClick={onClick}>Accept & Continue</Button>;
    } else {
        return (
            <Button className="cursor-processing">
                <div
                    className="spinner-border text-white mr-2"
                    role="status"
                    style={{
                        width: "18px",
                        height: "18px",
                    }}
                />
                Processing...
            </Button>
        );
    }
};

// sub task selection menu
const SubtaskSelectionMenu = ({ task, subTasks, setSubtasks }) => {
    return (
        <div className="position-relative">
            <Listbox value={subTasks} onChange={setSubtasks} multiple>
                <Listbox.Button className="position-relative w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between">
                    <span className="w-100 mr-auto text-left d-flex flex-wrap align-items-center" style={{gap:'6px'}}>
                        {subTasks?.length > 0
                            ?  subTasks.map((s) =>(
                                <span key={s.id} className="badge badge-light" style={{fontSize: '13px'}}> {s?.title} </span>
                            ))
                            : "Select Subtasks"}
                    </span>
                    <HiOutlineSelector />
                </Listbox.Button>
                <Listbox.Options
                    className="position-absolute bg-white p-2 shadow w-100"
                    style={{
                        zIndex: 10,
                        maxHeight: "350px",
                        overflowY: "auto",
                    }}
                >
                    {task?.subtask?.length > 0 ? (
                        task?.subtask?.map((s) => (
                            <Listbox.Option
                                value={s}
                                key={s.subtask_id}
                                tabIndex={-1}
                                className={({ active }) => active
                                        ? "task-selection-list-option active"
                                        : "task-selection-list-option"
                                }
                            >
                                {
                                    ({selected}) => (
                                        <React.Fragment>
                                            <div>{s.title}</div>
                                            {selected && <div><i className="fa-solid fa-check"></i></div>}                                            
                                        </React.Fragment>
                                    )
                                }
                            </Listbox.Option>
                        ))
                    ) : (
                        <div>No Data Found</div>
                    )}
                </Listbox.Options>
            </Listbox>
        </div>
    );
};
