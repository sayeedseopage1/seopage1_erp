import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import CKEditorComponent from "../../../../../../ckeditor";
import FileUploader from "../../../../../../file-upload/FileUploader";
import Button from "../../../../../../global/Button";
import { Flex } from "../../../../../../global/styled-component/Flex";
import {
    FormError,
    FormGroup,
    Input,
    Label,
} from "../../../../../../global/styled-component/Form";
import { checkIsURL } from "../../../../../../utils/check-is-url";
import ReactModal from "react-modal";

/**
 * * This component render task report form
 */

const SUBMISSION_URL = `/account/tasks/daily-submissions`;

const DailyReportSubmissionForm = ({
    show,
    close,
    task,
    reportDate,
    onSubmit,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [completedSection, setCompletedSection] = React.useState("");
    const [attachmentLink, setAttachmentLink] = React.useState("");
    const [files, setFiles] = React.useState([]);
    const [description, setDescription] = React.useState("");
    const [markAsCompleted, setMarkAsCompleted] = React.useState(false);

    const [error, setError] = React.useState(null);

    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    // check validation of form
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if (!attachmentLink) {
            errCount++;
            err.attachmentLink = "You have to provide the link of you work";
        }

        if (attachmentLink && !checkIsURL(attachmentLink)) {
            errCount++;
            err.attachmentLink = "Please provide a valid url";
        }

        if (!description) {
            errCount++;
            err.description = "Please describe what you've done!";
        }

        if (!completedSection) {
            errCount++;
            err.completedSection =
                "You must provide at least one section name that you have completed";
        }

        setError(err);
        return errCount === 0;
    };

    // handle form submission
    const handleSubmission = (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!isValid()) {
            setIsLoading(false);
            return;
        }
        // create form data
        const fd = new FormData();
        fd.append("task_id", task.id);
        fd.append("user_id", window.Laravel.user.id);
        fd.append("project_id", task.projectId);
        fd.append("task_heading", task.task_title);
        fd.append("client_id", task.clientId);
        fd.append("client_name", task.client_name);
        fd.append("hours_spent", task.total_time_spent);
        fd.append("link_name", attachmentLink);
        fd.append("section_name", completedSection);
        fd.append("comment", description);
        fd.append("mark_as_complete", false);
        fd.append("report_date", reportDate);
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );
        files.forEach((file) => fd.append("file[]", file));

        // form submit
        const formSubmit = async () => {
            try {
                await axios.post(SUBMISSION_URL, fd).then((res) => {
                    toast.success("Daily Task Report Successfully Submitted.");
                    onSubmit(res.data.submission_status);
                });
                setIsLoading(false);
                close();
            } catch (error) {
                console.log(error);
            }
        };

        // show confirmation message for make this task complete
        if (markAsCompleted) {
            Swal.fire({
                title: "Do you want to finish this task for today?",
                icon: "info",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((res) => {
                if (res.isConfirmed) {
                    formSubmit();
                }
            });
        } else {
            formSubmit();
        }
    };

    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    margin: "auto auto",
                    zIndex: 1000000,
                },
                content: {
                    borderRadius: "10px",
                    maxWidth: "100%",
                    height: "fit-content",
                    maxHeight: "100%",
                    margin: "auto auto",
                    padding: "10px",
                    overflowY: "auto",
                    zIndex: 1000001,
                },
            }}
            ariaHideApp={false}
            isOpen={show}
            onRequestClose={close}
            closeTimeoutMS={500}
        >
            <div>modal</div>
        </ReactModal>
    );
};

export default DailyReportSubmissionForm;
