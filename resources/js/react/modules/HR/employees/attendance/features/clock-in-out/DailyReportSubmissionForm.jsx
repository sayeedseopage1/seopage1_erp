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
    Label
} from "../../../../../../global/styled-component/Form";
import { checkIsURL } from "../../../../../../utils/check-is-url";

/**
 * * This component render task report form
 */

const SUBMISSION_URL = `/account/tasks/daily-submissions`;

const DailyReportSubmissionForm = ({ close, task, reportDate, onSubmit }) => {
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

        if(!attachmentLink){
            errCount++;
            err.attachmentLink = "You have to provide the link of you work";
        }

        if(attachmentLink && !checkIsURL(attachmentLink)){
            errCount++;
            err.attachmentLink = "Please provide a valid url";
        }

        if(!description){
            errCount++;
            err.description = "Please describe what you've done!";
        }

        if(!completedSection){
            errCount++;
            err.completedSection = "You must provide at least one section name that you have completed";
        }

        setError(err)
        return errCount === 0
    }

    // handle form submission
    const handleSubmission = (e) => {
        setIsLoading(true);
        e.preventDefault();

        if(!isValid()) {
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
            document.querySelector("meta[name='csrf-token']")
            .getAttribute("content")
        );
        files.forEach((file) => fd.append("file[]", file));

        // form submit
        const formSubmit = async () => {
            try {
                await axios
                    .post(SUBMISSION_URL, fd)
                    .then((res) => {
                        toast.success('Daily Task Report Successfully Submitted.')
                        onSubmit(res.data.submission_status)
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
                title: 'Do you want to finish this task for today?',
                icon: 'info',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: 'No'
            }).then(res => {
                if(res.isConfirmed){
                    formSubmit();
                }
            })
        }else{
            formSubmit();
        }

    };


    return (
        <div className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div
                    className="sp1_single_task--modal-panel"
                    style={{ transition: ".4s", minWidth: "320px" }}
                >
                    {/* modal header */}
                    <Flex
                        justifyContent="space-between"
                        gap="10px"
                        className="border-bottom pb-2"
                    >
                        <div className="font-weight-bold f-16">
                            Daily Task Progress Report Form
                        </div>
                        <Button variant="tertiary" onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </Flex>

                    {/* modal body */}
                    <div className="sp1_single_task--modal-body sp1_single_task-modal-body-options p-3">
                        <FormGroup>
                            <Label fontSize="14px">
                                Completed Section Name <sup>*</sup>{" "}
                                <i className="fa-solid fa-circle-question"></i>
                            </Label>
                            <Input
                                type="text"
                                name="completedSection"
                                required={true}
                                value={completedSection}
                                onChange={(e) =>
                                    setCompletedSection(e.target.value)
                                }
                            />
                            <FormError visible={error?.completedSection}>
                                {error?.completedSection}
                            </FormError>
                        </FormGroup>

                        <FormGroup className="mt-3">
                            <Label fontSize="14px">
                                Screenshots/Screen Records of the sections{" "}
                                <sup>*</sup>{" "}
                                <i className="fa-solid fa-circle-question"></i>
                            </Label>
                            <Input
                                type="text"
                                name="attachmentLink"
                                value={attachmentLink}
                                onChange={(e) =>
                                    setAttachmentLink(e.target.value)
                                }
                            />
                            <FormError visible={error?.attachmentLink}>
                                {error?.attachmentLink}
                            </FormError>
                        </FormGroup>

                        {/* Attachment */}
                        <FormGroup className="mt-3">
                            <Label>Attachments</Label>
                            <FileUploader files={files} setFiles={setFiles}>
                                <FileUploader.Input />
                                <FileUploader.SelectedFiles>
                                    {({ previews, onDelete }) =>
                                        Array.from(previews)?.map((p, i) => (
                                            <FileUploader.Preview
                                                key={i}
                                                id={i}
                                                fileName={p.name}
                                                previewUrl={p.preview}
                                                fileType={p.type}
                                                downloadAble={false}
                                                onRemove={onDelete}
                                            />
                                        ))
                                    }
                                </FileUploader.SelectedFiles>
                            </FileUploader>
                        </FormGroup>

                        {/* comment field */}
                        <FormGroup className="mt-3">
                            <Label fontSize="14px">
                                Describe which sections you have worked on today{" "}
                                <sup>*</sup>{" "}
                                <i className="fa-solid fa-circle-question"></i>
                            </Label>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    data={description}
                                    onChange={handleEditorChange}
                                />
                            </div>
                            {/* <Switch.Case condition={error?.comment}>
                                <div className='f-14 text-danger'>{error?.comment}</div>
                            </Switch.Case> */}

                            <FormError visible={error?.description}>
                                {error?.description}
                            </FormError>
                        </FormGroup>

                        {/* <Flex alignItem="center" className="mt-3">
                            <label htmlFor="markAsComplete">
                                <Checkbox
                                    type="checkbox"
                                    id="markAsComplete"
                                    name="markAsComplete"
                                    checked={markAsCompleted}
                                    value={markAsCompleted}
                                    onChange={(e) =>
                                        setMarkAsCompleted(e.target.checked)
                                    }
                                />{" "}
                                Mark as Complete
                            </label>
                        </Flex> */}

                        {/* footer section */}
                        <div className="mt-3 w-100 d-flex align-items-center">
                            {/* back button */}
                            <Button
                                variant="tertiary"
                                onClick={close}
                                className="ml-auto mr-2"
                            >
                                Close
                            </Button>

                            <Button
                                onClick={handleSubmission}
                                isLoading={isLoading}
                                loaderTitle="Processing..."
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyReportSubmissionForm;
