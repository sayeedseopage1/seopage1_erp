import { Listbox } from "@headlessui/react";
import _ from "lodash";
import React, { useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import CKEditorComponent from "../../../../ckeditor";
import Button from "../../../components/Button";

// const options = [
//     {
//         id: "LDRx10",
//         revision: "I overlooked a few things while checking",
//         isDeniable: false,
//     },
//     {
//         id: "LDRx11",
//         revision: "I couldn't understand a few things in the instruction",
//         isDeniable: false,
//     },
// ];

const AssigneeRevisionToDev = ({
    task,
    onBack,
    onSubmit,
    revision,
    type = false,
    isSubmitting = false,
}) => {
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState("");
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState(false);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskError, setSubtaskError] = useState("");
    const [isDeniable, setIsDeniable] = useState(false);

    // radio button change
    const handleChange = (value) => {
        setReason(value);
    };

    // editor change text
    const hanldeEditorTextChange = (e, editor, id) => {
        const data = editor.getData();
        const _comments = [...comments];

        const index = _comments?.findIndex((d) => d.subtask_id === id);
        if (index === -1) {
            _comments.push({
                id: id,
                subtask_id: id,
                comment: data,
                acknowledgement_id: null,
            });
        } else {
            _comments[index] = {
                id: id,
                subtask_id: id,
                comment: data,
                acknowledgement_id: null,
            };
        }

        setComments([..._comments]);
    };

    // validation
    const validate = () => {
        let errorCount = 0;
        // if (reason === null && revision?.is_deniable && type) {
        //     errorCount++;
        //     setReasonError("You have to select a reason from below options");
        // }

        if (_.size(task?.subtask) > 0) {
            if (subtasks.length === 0) {
                errorCount++;
                setSubtaskError(
                    "You need to select at least one sub task to continue."
                );
            }

            if (comments.length === 0 || comments.length !== subtasks.length) {
                errorCount++;
                setCommentError(true);
            }

            comments?.map((comment) => {
                if (comment?.comment === "") {
                    errorCount++;
                    setCommentError(true);
                }
            });
        }

        return errorCount === 0 ? true : false;
    };

    // handle submiton
    const handleSubmition = (e) => {
        e.preventDefault();

        const data = {
            task_id: task?.id,
            reason: reason?.revision,
            comments,
            is_deniable: reason?.isDeniable ?? false,
        };
        if (validate()) {
            onSubmit(data);
        }
    };

    const onBackButtonClick = (e) => {
        e.preventDefault();
        onBack();
    };

    return (
        <React.Fragment>
            <form action="">
                {/* {revision?.is_deniable !== 0 && type ? (
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Revision Acknowledgement
                            <sup className="f-16">*</sup> :
                        </label>
                        <div className="px-3">
                            {_.map(options, (revision) => (
                                <div
                                    key={revision.id}
                                    className="form-check d-flex align-items-start mb-2"
                                >
                                    <input
                                        className="form-check-input mr-2"
                                        type="radio"
                                        name="exampleRadios"
                                        id={revision.id}
                                        required={true}
                                        onChange={() => handleChange(revision)}
                                        value={revision.revision}
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            marginTop: "3px",
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={revision.id}
                                        style={{ marginBottom: "3px" }}
                                    >
                                        {revision.revision}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {reasonError && (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {reasonError}
                            </small>
                        )}
                    </div>
                ) : null} */}

                {task?.taskSubTask?.length > 0 && (
                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Select SubTask
                            <sup className="font-weight-bold f-16">*</sup> :
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
                                    <label
                                        htmlFor=""
                                        className="font-weight-bold"
                                    >
                                        {i + 1}. Task: {s?.title}
                                    </label>{" "}
                                    <br />
                                    <label className="font-weight-bold">
                                        Write Your Revision
                                        <sup className="font-weight-bold f-16">
                                            *
                                        </sup>
                                        :{" "}
                                    </label>
                                    <div className="ck-editor-holder">
                                        <CKEditorComponent
                                            onChange={(e, editor) =>
                                                hanldeEditorTextChange(
                                                    e,
                                                    editor,
                                                    s?.subtask_id
                                                )
                                            }
                                        />
                                    </div>
                                    {commentError && (
                                        <small
                                            id="emailHelp"
                                            className="form-text text-danger"
                                        >
                                            You have to explain the revision in
                                            details, so that Developer can
                                            understand where they need to work.
                                        </small>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                <div className="mt-3 mb-3 d-flex align-items-center">
                    {/* <Button
                        onClick={onBackButtonClick}
                        variant="tertiary"
                        className="ml-auto mr-2"
                    >
                        Back
                    </Button>
                     */}
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
        return (
            <Button className="m-auto" onClick={onClick}>
                {" "}
                Continue
            </Button>
        );
    } else {
        return (
            <Button className="cursor-processing m-auto">
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
                    <span
                        className="w-100 mr-auto text-left d-flex flex-wrap align-items-center"
                        style={{ gap: "6px" }}
                    >
                        {subTasks?.length > 0
                            ? subTasks.map((s) => (
                                  <span
                                      key={s.subtask_id}
                                      className="badge badge-light"
                                      style={{ fontSize: "13px" }}
                                  >
                                      {" "}
                                      {s?.title}{" "}
                                  </span>
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
                    {task?.taskSubTask?.length > 0 ? (
                        task?.taskSubTask?.map((s) => (
                            <Listbox.Option
                                value={s}
                                key={s.subtask_id}
                                tabIndex={-1}
                                className={({ active }) =>
                                    active
                                        ? "task-selection-list-option active"
                                        : "task-selection-list-option"
                                }
                            >
                                {({ selected }) => (
                                    <React.Fragment>
                                        <div>
                                            {s.title}{" "}
                                            <span className="badge badge-success">
                                                {s.assigned_to_name}
                                            </span>
                                        </div>
                                        {selected && (
                                            <div>
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
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
