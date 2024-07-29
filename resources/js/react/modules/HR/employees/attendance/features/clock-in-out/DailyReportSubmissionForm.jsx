import axios from "axios";
import React, { useEffect } from "react";
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
    DailySubmissionButtonContainer,
    FrontendPassword,
    HeaderLabel,
    InputItem,
    ItemTitle,
    ModalBody,
    ModalContainer,
    ModalHeader,
    NumberOfPages,
    RadioInput,
} from "./DailySubmissionUI";
import SubmissionForSinglePage from "./helper/daily-submission-options/SubmissionForSinglePage";

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

    const [markAsCompleted, setMarkAsCompleted] = React.useState(false);

    //mitul work
    const [dailySubPagesData, setDailySubPagesData] = React.useState({});

    const handleDailySubPagesData = (data, type) => {
        if (type === "frontendPassword")
            setDailySubmissionData([...dailySubmissionData, data]);
    };
    const [isFrontendPassword, setIsFrontendPassword] = React.useState("no");
    const [frontendPasswordValue, setFrontendPasswordValue] =
        React.useState("");
    const handleFrontendPasswordChange = (event) => {
        setIsFrontendPassword(event.target.value);
    };

    const [numberOfPages, setNumberOfPages] = React.useState(1);
    const [pageDetailsArray, setPageDetailsArray] = React.useState([]);
    React.useEffect(() => {
        const pageArray = Array.from(
            { length: numberOfPages },
            (_, index) => `${index + 1}`
        );
        setPageDetailsArray(pageArray);
        setFrontendPasswordValue("");
    }, [numberOfPages]);

    console.log("daily submission data", dailySubPagesData);
    console.log("setFrontendPasswordValue", frontendPasswordValue);

    useEffect(() => {
        setDailySubPagesData((prev) => ({ ...prev, frontendPasswordValue }));
    }, [frontendPasswordValue, numberOfPages]);

    const validateDailySubPagesData = () => {
        const errors = [];
        const { pageData, frontendPasswordValue } = dailySubPagesData;

        // Check if frontendPasswordValue is defined
        if (
            frontendPasswordValue === undefined ||
            frontendPasswordValue.trim() === ""
        ) {
            errors.push("Frontend password cannot be empty.");
        }

        pageData.forEach((page, pageIndex) => {
            if (page) {
                page.forEach((section, sectionIndex) => {
                    // Check each field for undefined and trim if it's a string
                    if (
                        section.pageId === undefined ||
                        section.pageId.trim() === ""
                    ) {
                        errors.push(
                            `Page ${pageIndex + 1}, Section ${
                                sectionIndex + 1
                            }: Page ID cannot be empty.`
                        );
                    }
                    if (
                        section.categoryId === undefined ||
                        section.categoryId.trim() === ""
                    ) {
                        errors.push(
                            `Page ${pageIndex + 1}, Section ${
                                sectionIndex + 1
                            }: Category ID cannot be empty.`
                        );
                    }
                    if (
                        section.categoryName === undefined ||
                        section.categoryName.trim() === ""
                    ) {
                        errors.push(
                            `Page ${pageIndex + 1}, Section ${
                                sectionIndex + 1
                            }: Category Name cannot be empty.`
                        );
                    }
                    if (
                        section.name === undefined ||
                        section.name.trim() === ""
                    ) {
                        errors.push(
                            `Page ${pageIndex + 1}, Section ${
                                sectionIndex + 1
                            }: Section Name cannot be empty.`
                        );
                    }
                    if (
                        (section.screenshotUrl === undefined ||
                            section.screenshotUrl.trim() === "") &&
                        (section.bugName === undefined ||
                            section.bugName.trim() === "")
                    ) {
                        errors.push(
                            `Page ${pageIndex + 1}, Section ${
                                sectionIndex + 1
                            }: Screenshot URL or Bug Name cannot be empty.`
                        );
                    }
                });
            }
        });

        return errors;
    };

    const handleSubmission = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const pageData = JSON.stringify(dailySubPagesData);

        const validationErrors = validateDailySubPagesData();
        if (validationErrors.length > 0) {
            const errorMessage = validationErrors.join("\n");
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false, // Prevent auto-hide
                style: {
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "16px",
                },
            });
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
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );
        fd.append("pageData", pageData);

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
                    zIndex: 9998,
                },
                content: {
                    borderRadius: "29px 29px 10px 10px",
                    maxWidth: "800px",
                    height: "98%",
                    margin: "auto auto",
                    padding: "0px",
                    zIndex: 9999,
                    border: "none",
                    // Additional styles for hiding scrollbars
                    msOverflowStyle: "none", // IE and Edge
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": {
                        display: "none", // Chrome, Safari, Opera
                    },
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
                        <Flex>
                            <RadioInput
                                type="radio"
                                name="frontend_password"
                                value="no"
                                checked={isFrontendPassword === "no"}
                                onChange={handleFrontendPasswordChange}
                            />{" "}
                            <span>No frontend password</span>
                        </Flex>
                        <Flex>
                            <RadioInput
                                type="radio"
                                name="frontend_password"
                                value="yes"
                                checked={isFrontendPassword === "yes"}
                                onChange={handleFrontendPasswordChange}
                            />{" "}
                            <span>We do have a frontend password</span>
                        </Flex>
                        <br />
                        {isFrontendPassword === "yes" && (
                            <InputItem
                                width="150%"
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
                            onChange={(e) => {
                                setNumberOfPages(e.target.value);
                            }}
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
                    {pageDetailsArray?.map((pageNumber, index) => (
                        <SubmissionForSinglePage
                            numberOfPages={numberOfPages}
                            key={index}
                            dailySubPagesData={dailySubPagesData}
                            setDailySubPagesData={setDailySubPagesData}
                            handleDailySubPagesData={handleDailySubPagesData}
                            pageNumber={pageNumber}
                        />
                    ))}
                </ModalBody>

                <DailySubmissionButtonContainer>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleSubmission}
                    >
                        Submit
                    </Button>
                    <Button variant="danger" size="md" onClick={close}>
                        Close
                    </Button>
                </DailySubmissionButtonContainer>
            </ModalContainer>
            <div style={{ overflow: "auto" }}>
                {JSON.stringify(dailySubPagesData)}
            </div>
        </ReactModal>
    );
};

export default DailyReportSubmissionForm;
