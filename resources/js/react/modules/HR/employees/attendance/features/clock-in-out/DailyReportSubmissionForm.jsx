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
import { RxCross2 } from "react-icons/rx";
import {
    CloseButton,
    FrontendPassword,
    HeaderLabel,
    InputItem,
    ItemTitle,
    ModalBody,
    ModalContainer,
    ModalHeader,
    NumberOfPages,
} from "./DailySubmissionUI";
import SubmissionForSinglePage from "./helper/daily-submission/SubmissionForSinglePage";

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

    //mitul
    const [isFrontendPassword, setIsFrontendPassword] = React.useState("no");
    const [frontendPasswordValue, setFrontendPasswordValue] =
        React.useState("");
    console.log(frontendPasswordValue, "frontendPasswordValue");
    const handleFrontendPasswordChange = (event) => {
        setIsFrontendPassword(event.target.value);
    };

    const [numberOfPages, setNumberOfPages] = React.useState(1);

    const handleNumberOfPagesChange = (event) => {
        setNumberOfPages(event.target.value);
    };
    const pageDetailsArray = Array.from(
        { length: numberOfPages },
        (_, index) => `id_${index + 1}`
    );

    const [inputValues, setInputValues] = React.useState();

    const handleChange = (id, value) => {
        setInputValues({
            ...inputValues,
            [id]: value,
        });
    };
    console.log(inputValues, "inputValues");
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    margin: "auto auto",
                    zIndex: 1000000,
                },
                content: {
                    borderRadius: "29px 29px 0px 0px",
                    maxWidth: "956px",
                    maxHeight: "95%",
                    margin: "auto auto",
                    padding: "0px",
                    zIndex: 1000001,
                    border: "none",
                },
            }}
            ariaHideApp={false}
            isOpen={show}
            onRequestClose={close}
            closeTimeoutMS={500}
        >
            <ModalContainer>
                <ModalHeader>
                    <HeaderLabel>Daily Task Progress Report Form</HeaderLabel>
                    <CloseButton onClick={close}>
                        <RxCross2 color="white" size={"25px"} />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <FrontendPassword>
                        <ItemTitle>Enter frontend password</ItemTitle>
                        <div>
                            <input
                                type="radio"
                                name="frontend_password"
                                value="no"
                                checked={isFrontendPassword === "no"}
                                onChange={handleFrontendPasswordChange}
                            />
                            {"  "} No frontend password
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="frontend_password"
                                value="yes"
                                checked={isFrontendPassword === "yes"}
                                onChange={handleFrontendPasswordChange}
                            />
                            {"  "} We do have a frontend password
                        </div>
                        <br />
                        {isFrontendPassword === "yes" && (
                            <InputItem
                                width="200%"
                                placeHolder="write password.."
                                label="Insert the password here:"
                                value={frontendPasswordValue}
                                onChange={(e) =>
                                    setFrontendPasswordValue(e.target.value)
                                }
                            />
                        )}
                    </FrontendPassword>
                    <br />

                    <NumberOfPages>
                        <HeaderLabel>
                            Number of pages you worked on today under this task
                        </HeaderLabel>

                        <input
                            type="number"
                            value={numberOfPages}
                            onChange={handleNumberOfPagesChange}
                            style={{
                                borderRadius: "6px",
                                background: "#d8edfc",
                                width: "50px",
                                height: "40px",
                                border: "none",
                                padding: "10px",
                            }}
                        />
                        <p style={{ marginTop: "10px" }}>pages</p>
                    </NumberOfPages>
                    <br />
                    {pageDetailsArray?.map((id, index) => (
                        <SubmissionForSinglePage
                            value={inputValues[id] || ""}
                            key={id}
                            id={id}
                            handleChange={handleChange}
                        />
                    ))}
                </ModalBody>
            </ModalContainer>
        </ReactModal>
    );
};

export default DailyReportSubmissionForm;
