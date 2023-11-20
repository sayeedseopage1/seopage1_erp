import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CKEditorComponent from "../../../../ckeditor";
import { useRevision } from "../../../../hooks/useRevision";
import { useCreateRevisionMutation } from "../../../../services/api/SingleTaskPageApi";
import Button from "../../../components/Button";
import SubmitButton from "../../../components/SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RevisionCreationModal = ({ close, task, auth }) => {
    const [reason, setReason] = useState(null);
    const [reasonError, setReasonError] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [isDeniable, setIsDeniable] = useState(false);
    const dispatch = useDispatch();
    const {
        getLeadDeveloperAcknowladgementOptions,
        getProjectManagerAcknowladgementOptions,
    } = useRevision();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // console.log({pathname});

    const role = auth.getRoleId();

    const revisionOptions =
        (role === 1 || role === 4 || role === 8)
            ? getProjectManagerAcknowladgementOptions()
            : getLeadDeveloperAcknowladgementOptions();

    const [createRevision, { isLoading }] = useCreateRevisionMutation();

    // radio button change
    const handleChange = (value) => {
        setReason(value);
    };

    // editor change text
    const handleEditorTextChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // validation
    const validate = () => {
        let errorCount = 0;

        if (comment === "") {
            errorCount++;
            setCommentError(
                "You have to explain the revision in details, so that lead developer/developer can understand where they need to work."
            );
        }

        if (!reason) {
            errorCount++;
            setReasonError("You have to select a reason from above options");
        }

        return errorCount === 0;
    };

    // handle submission
    const handleSubmission = (e) => {
        e.preventDefault();

        const data = {
            task_id: task?.id,
            user_id: auth?.id,
            revision_acknowledgement: reason?.revision ?? "",
            acknowledgement_id: reason?.id,
            comment,
            is_deniable: reason?.isDeniable ?? false,
        };

        if (validate()) {
            createRevision(data)
                .unwrap()
                .then((res) => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Task submitted for Revision successfully",
                    });
                    navigate(`${pathname}`);
                    close();
                })
                .catch((err) => console.log(err));
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            Toast.fire({
                icon: "error",
                title: "Your forgot to fill up some required fields",
            });
        }
    };

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
                            Select Reason for Revision
                            <sup className="f-16">*</sup> :
                        </label>
                        <div className="px-3">
                            {revisionOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className="form-check d-flex align-items-start mb-2"
                                >
                                    <input
                                        className="form-check-input mr-2"
                                        type="radio"
                                        name="exampleRadios"
                                        id={option.id}
                                        required={true}
                                        onChange={() => handleChange(option)}
                                        value={option.revision}
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
                                        {option.revision}
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

                    <div className="form-group">
                        <label htmlFor="" className="font-weight-bold">
                            Explain or Comment<sup className="f-16">*</sup> :
                        </label>
                        <div className="ck-editor-holder">
                            <CKEditorComponent
                                onChange={handleEditorTextChange}
                            />
                        </div>
                        {commentError && (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {commentError}
                            </small>
                        )}
                    </div>

                    <div>
                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                onClick={close}
                                variant="tertiary"
                                className="ml-auto mr-2"
                            >
                                Close
                            </Button>
                            <SubmitButton
                                title="Submit"
                                onClick={handleSubmission}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default RevisionCreationModal;
