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
import { validateDailySubPagesData } from "../../../../../../utils/daily-submission-data-validation";
import ErrorDisplay from "./helper/daily-submission-options/components/ErrorDisplay";

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
    const [errorFields, setErrorFields] = React.useState([]);
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

    // const validateDailySubPagesData = () => {
    //     const errors = [];
    //     const errorFields = [];
    //     const { pageData, frontendPasswordValue } = dailySubPagesData;

    //     // Check if frontendPasswordValue is defined
    //     if (
    //         isFrontendPassword === "yes" &&
    //         (frontendPasswordValue === undefined ||
    //             frontendPasswordValue.trim() === "")
    //     ) {
    //         errors.push("Frontend password cannot be empty.");
    //     }

    //     pageData.forEach((page, pageIndex) => {
    //         if (page.length === 0) {
    //             errors.push(
    //                 `Please select a category for Page-${pageIndex + 1}.`
    //             );
    //         }
    //         if (page) {
    //             page.forEach((section, sectionIndex) => {
    //                 const pageUrl = section.pageUrl;
    //                 if (
    //                     pageUrl === undefined ||
    //                     pageUrl === "" ||
    //                     !checkIsURL(pageUrl)
    //                 ) {
    //                     errors.push(
    //                         `Page-${pageIndex + 1}, Category-${
    //                             sectionIndex + 1
    //                         }: Page URL is invalid.`
    //                     );
    //                 }

    //                 if (section.categoryId == 1) {
    //                     const webUrl = section.webVersionUrl;
    //                     const mobileUrl = section.mobileVersionUrl;
    //                     const tabUrl = section.tabVersionUrl;
    //                     const webFile = section.webVersionFile || [];
    //                     const mobileFile = section.mobileVersionFile || [];
    //                     const tabFile = section.tabVersionFile || [];
    //                     const comment = section.comment;
    //                     const sectionName = section.sectionName;

    //                     if (
    //                         (webUrl === undefined ||
    //                             webUrl === "" ||
    //                             !checkIsURL(webUrl)) &&
    //                         webFile.length === 0
    //                     ) {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Web Version URL/file is invalid.`
    //                         );
    //                         errorFields.push({
    //                             pageId: section.pageId,
    //                             categoryId: section.categoryId,
    //                             sectionId: section.id,
    //                             errorName: "webVersionUrl",
    //                             errorMessage:
    //                                 "Web Version URL/file is invalid in error field.",
    //                         });
    //                         console.log("errorFields in form", errorFields);
    //                     }
    //                     if (
    //                         (mobileUrl === undefined ||
    //                             mobileUrl === "" ||
    //                             !checkIsURL(mobileUrl)) &&
    //                         mobileFile.length === 0
    //                     ) {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Mobile Version URL/file is invalid.`
    //                         );
    //                     }
    //                     if (
    //                         (tabUrl === undefined ||
    //                             tabUrl === "" ||
    //                             !checkIsURL(tabUrl)) &&
    //                         tabFile.length === 0
    //                     ) {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Tab Version URL/file is invalid.`
    //                         );
    //                     }
    //                     if (comment === undefined || comment === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Comment is required.`
    //                         );
    //                     }
    //                     if (sectionName === undefined || sectionName === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Section Name is required.`
    //                         );
    //                     }
    //                 } else if (section.categoryId == 2) {
    //                     const name = section.name;
    //                     const screenshotUrl = section.screenshotUrl;
    //                     const comment = section.comment;

    //                     if (name === undefined || name === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Name is required.`
    //                         );
    //                     }
    //                     if (
    //                         screenshotUrl === undefined ||
    //                         screenshotUrl === "" ||
    //                         !checkIsURL(screenshotUrl)
    //                     ) {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Screenshot URL is invalid.`
    //                         );
    //                     }

    //                     if (comment === undefined || comment === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Comment is required.`
    //                         );
    //                     }
    //                 } else if (section.categoryId == 3) {
    //                     const name = section.name;
    //                     const screenshotUrl = section.screenshotUrl;
    //                     const comment = section.comment;

    //                     if (name === undefined || name === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Name is required.`
    //                         );
    //                     }
    //                     if (
    //                         screenshotUrl === undefined ||
    //                         screenshotUrl === "" ||
    //                         !checkIsURL(screenshotUrl)
    //                     ) {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Screenshot URL is invalid.`
    //                         );
    //                     }

    //                     if (comment === undefined || comment === "") {
    //                         errors.push(
    //                             `Page-${pageIndex + 1}, Category-${
    //                                 sectionIndex + 1
    //                             }: Comment is required.`
    //                         );
    //                     }
    //                 }
    //             });
    //         }
    //     });

    //     console.log(errors);
    //     setErrorFields(errorFields);
    //     return errors;
    // };

    const handleSubmission = (e) => {
        setIsLoading(true);
        e.preventDefault();

        const validationErrors = validateDailySubPagesData(
            dailySubPagesData,
            isFrontendPassword,
            setErrorFields,
            errorFields
        );

        console.log("validationErrors after submit", validationErrors);

        if (validationErrors.length > 0) {
            // const errorMessage = (
            //     <div>
            //         <div style={{ fontWeight: "bold" }}>
            //             {" "}
            //             Please fill in the following fields:
            //         </div>
            //         <div>
            //             {validationErrors.map((field, index) => (
            //                 <p key={index} style={{ marginBottom: "2px" }}>
            //                     {index + 1}. {field}
            //                 </p>
            //             ))}
            //         </div>
            //     </div>
            // );

            // toast.error(errorMessage, {
            //     position: "top-center",
            //     autoClose: 5000,
            //     style: {
            //         backgroundColor: "#f8d7da",
            //         color: "#721c24",
            //         padding: "5px",
            //         width: "450px",
            //         fontSize: "14px",
            //     },
            // });
            toast.error("Please validate your input data", {
                autoClose: 5000,
                style: {
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                },
            });
            setIsLoading(false);
            return;
        }
        toast.success("Data submitted successfully", {
            autoClose: 5000,
            style: {
                backgroundColor: "#d4edda",
                color: "#155724",
            },
        });
        const fd = new FormData();
        // create form data

        // if (dailySubPagesData?.totalPage)
        //     fd.append("totalPage", dailySubPagesData.totalPage);
        // if (dailySubPagesData?.frontendPasswordValue)
        //     fd.append(
        //         "frontendPasswordValue",
        //         dailySubPagesData.frontendPasswordValue
        //     );
        // fd.append("totalPage", dailySubPagesData?.totalPage);
        // fd.append(
        //     "frontendPasswordValue",
        //     dailySubPagesData.frontendPasswordValue
        // );

        const pageDataJSON = JSON.stringify(dailySubPagesData);
        fd.append("submittedData", pageDataJSON);

        dailySubPagesData?.pageData.forEach((pageArray, pageIndex) => {
            pageArray.forEach((section, index) => {
                if (section.categoryId === "1") {
                    const sectionId = Number(section.id) + 1;
                    const pageId = section.pageId;
                    section.webVersionFile.forEach((file, fileIndex) => {
                        fd.append(
                            `pageId[${pageId}]sectionId[${sectionId}]webVersionFiles[]`,
                            file
                        );
                    });

                    section.mobileVersionFile.forEach((file, fileIndex) => {
                        fd.append(
                            `pageId[${pageId}]sectionId[${sectionId}]mobileVersionFiles[]`,
                            file
                        );
                    });

                    section.tabVersionFile.forEach((file, fileIndex) => {
                        fd.append(
                            `pageId[${pageId}]sectionId[${sectionId}]tabVersionFiles[]`,
                            file
                        );
                    });
                }
                //  else if (page.categoryId === "2") {
                //     fd.append(
                //         `pageData[${pageIndex}][${index}][name]`,
                //         page.name
                //     );
                //     fd.append(
                //         `pageData[${pageIndex}][${index}][screenshotUrl]`,
                //         page.screenshotUrl
                //     );
                //     fd.append(
                //         `pageData[${pageIndex}][${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "3") {
                //     fd.append(
                //         `additionalData[${index}][assignedRevisions]`,
                //         page.assignedRevisions
                //     );
                //     fd.append(
                //         `additionalData[${index}][completedRevisions]`,
                //         page.completedRevisions
                //     );
                //     fd.append(
                //         `additionalData[${index}][completedPercentage]`,
                //         page.completedPercentage
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "4") {
                //     fd.append(
                //         `additionalData[${index}][bugName]`,
                //         page.bugName
                //     );
                //     fd.append(
                //         `additionalData[${index}][bugFixedPercentage]`,
                //         page.bugFixedPercentage
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "5") {
                //     fd.append(
                //         `additionalData[${index}][functionalityName]`,
                //         page.functionalityName
                //     );
                //     fd.append(
                //         `additionalData[${index}][totalFixedPercentage]`,
                //         page.totalFixedPercentage
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "6") {
                //     fd.append(
                //         `additionalData[${index}][speedBeforeStarted]`,
                //         page.speedBeforeStarted
                //     );
                //     fd.append(
                //         `additionalData[${index}][screenshotUrlBeforeStarted]`,
                //         page.screenshotUrlBeforeStarted
                //     );
                //     fd.append(
                //         `additionalData[${index}][speedAfterFinished]`,
                //         page.speedAfterFinished
                //     );
                //     fd.append(
                //         `additionalData[${index}][screenshotUrlAfterFinished]`,
                //         page.screenshotUrlAfterFinished
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "7") {
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "8") {
                //     fd.append(
                //         `additionalData[${index}][websiteSize]`,
                //         page.websiteSize
                //     );
                //     fd.append(
                //         `additionalData[${index}][migrationReason]`,
                //         page.migrationReason
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "9") {
                //     fd.append(
                //         `additionalData[${index}][totalProducts]`,
                //         page.totalProducts
                //     );
                //     fd.append(
                //         `additionalData[${index}][screenshotUrl]`,
                //         page.screenshotUrl
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "10") {
                //     fd.append(
                //         `additionalData[${index}][totalBlogPosts]`,
                //         page.totalBlogPosts
                //     );
                //     fd.append(
                //         `additionalData[${index}][screenshotUrl]`,
                //         page.screenshotUrl
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // } else if (page.categoryId === "11") {
                //     fd.append(
                //         `additionalData[${index}][totalClonedPages]`,
                //         page.totalClonedPages
                //     );
                //     fd.append(
                //         `additionalData[${index}][isContentChanged]`,
                //         page.isContentChanged
                //     );
                //     fd.append(
                //         `additionalData[${index}][screenshotUrl]`,
                //         page.screenshotUrl
                //     );
                //     fd.append(
                //         `additionalData[${index}][comment]`,
                //         page.comment
                //     );
                // }
            });
        });

        fd.append("task_id", task.id);
        fd.append("user_id", window.Laravel.user.id);
        fd.append("project_id", task.projectId);
        fd.append("task_heading", task.task_title);
        fd.append("client_id", task.clientId);
        fd.append("client_name", task.client_name);
        fd.append("hours_spent", task.total_time_spent);
        fd.append("mark_as_complete", false);
        fd.append("report_date", reportDate);
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

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
    const [error, setError] = React.useState([]);

    useEffect(() => {
        const filteredError = errorFields.filter(
            (field) => field.errorName === "frontendPasswordValue"
        );
        setError(filteredError);
    }, [errorFields]);
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
                    height: "90%",
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
                            <>
                                <InputItem
                                    width="150%"
                                    placeHolder=""
                                    label="Insert the password here:"
                                    value={frontendPasswordValue}
                                    onChange={(e) =>
                                        setFrontendPasswordValue(e.target.value)
                                    }
                                />
                                <ErrorDisplay
                                    errors={error}
                                    errorName="frontendPasswordValue"
                                />
                            </>
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
                            errorFields={errorFields}
                            numberOfPages={numberOfPages}
                            key={index}
                            dailySubPagesData={dailySubPagesData}
                            setDailySubPagesData={setDailySubPagesData}
                            handleDailySubPagesData={handleDailySubPagesData}
                            pageNumber={pageNumber}
                        />
                    ))}
                </ModalBody>

                {numberOfPages > 0 && (
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
                )}
            </ModalContainer>
            {/* <div style={{ overflow: "auto" }}>
                {JSON.stringify(dailySubPagesData)}
            </div> */}
        </ReactModal>
    );
};

export default DailyReportSubmissionForm;
