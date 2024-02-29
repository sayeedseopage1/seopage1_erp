import React from "react";
import { User } from "../../../../utils/user-details";
import Accordion from "../../../components/Accordion";
import Guideline from "../../../components/Guideline";
import RevisionText from "../../../components/RevisionText";
import GenarelLoader from "../../../components/loader/GenarelLoader";
import ArticleLoader from "../../../components/loader/ArticleLoader";
import dayjs from "dayjs";
import PMGuideline from "../../../components/PMGuideline";
import FileUploader from "../../../../file-upload/FileUploader";
import { useAuth } from "../../../../hooks/useAuth";

const Genarel = ({ task, isFetching }) => {
    const loggedUser = new User(window?.Laravel?.user);
    const auth = useAuth();
    console.log("task revision", task?.revisions);

    return (
        <div className="row">
            {isFetching ? (
                <GenarelLoader />
            ) : (
                <React.Fragment>
                    <div className="col-12 col-xl-6 pb-3 pb-xl-0">
                        <div
                            className="d-flex flex-column"
                            style={{ gap: "10px" }}
                        >
                            <h6 className="">
                                Task:{" "}
                                <a
                                    target="__blank"
                                    href={`/account/tasks/${task?.id}`}
                                    className="text-primary font-weight-normal"
                                >
                                    {task?.getSubtaskTitle()}
                                </a>
                            </h6>
                            {task?.isSubtask && (
                                <div className="sp1_st-list-item">
                                    <div className="sp1_st-list-item-head">
                                        Parent Task :
                                    </div>
                                    <div className="sp1_st-list-item-value">
                                        <a
                                            href={`/account/tasks/${task?.parentTaskId}`}
                                            className="text-dark text-hover-underline"
                                        >
                                            {task?.parentTaskTitle}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Project :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <span className="dot-color bg-danger mr-2" />
                                    <a
                                        href={`/account/projects/${task?.projectId}`}
                                        className="text-dark text-hover-underline"
                                    >
                                        {task?.projectName}
                                    </a>
                                </div>
                            </div>

                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Milestone :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <span className="dot-color bg-primary mr-2" />
                                    {task?.milestoneTitle}
                                </div>
                            </div>

                            {/* asignee to */}
                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Assigned To :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <div
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                    >
                                        <img
                                            src={task?.assigneeTo?.getAvatar()}
                                            alt={task?.assigneeTo?.getName()}
                                            width="32px"
                                            height="32px"
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <span
                                            className={`d-block f-14 font-weight-bold`}
                                        >
                                            <a
                                                href={task?.assigneeTo?.getUserLink()}
                                                className="text-dark hover-underline"
                                            >
                                                {task?.assigneeTo?.getName()}
                                            </a>
                                            {Number(
                                                task?.assigneeTo?.getId()
                                            ) ===
                                                Number(loggedUser?.getId()) && (
                                                <sup
                                                    className="rounded-pill bg-dark text-white px-1"
                                                    style={{ fontSize: "10px" }}
                                                >
                                                    {" "}
                                                    It's You{" "}
                                                </sup>
                                            )}
                                        </span>

                                        <span style={{ fontSize: "12px" }}>
                                            {task?.assigneeTo?.getDesignationName()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* assignee by */}
                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Assigned by:{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <div
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                    >
                                        <img
                                            src={task?.assigneeBy?.getAvatar()}
                                            alt={task?.assigneeBy?.getName()}
                                            width="32px"
                                            height="32px"
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <span
                                            className={`d-block f-14 font-weight-bold`}
                                        >
                                            <a
                                                href={task?.assigneeBy?.getUserLink()}
                                                className="text-dark hover-underline"
                                            >
                                                {task?.assigneeBy?.getName()}
                                            </a>
                                            {Number(
                                                task?.assigneeBy?.getId()
                                            ) ===
                                                Number(loggedUser?.getId()) && (
                                                <sup
                                                    className="rounded-pill bg-dark text-white px-1"
                                                    style={{ fontSize: "10px" }}
                                                >
                                                    It's You
                                                </sup>
                                            )}
                                        </span>

                                        <span style={{ fontSize: "12px" }}>
                                            {task?.assigneeBy?.getDesignationName()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* PRIORITY */}

                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Priority :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <span
                                        className="dot-color mr-2"
                                        style={{
                                            background: "rgba(252, 189, 1, 1)",
                                        }}
                                    />
                                    {task?.priority}
                                </div>
                            </div>

                            {/* category */}
                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Task Category :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    {task?.category?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}

            <div
                className="col-12 col-xl-6 d-flex flex-column py-3 px-3"
                style={{ gap: "10px", background: "#F0F2F6" }}
            >
                <div className="font-weight-bold d-block"> Status: </div>

                <div
                    className="d-flex align-items-center"
                    style={{ gap: "6px" }}
                >
                    <span
                        className="dot-color mr-2"
                        style={{ background: task?.boardColumn?.labelColor }}
                    />
                    <span className="font-weight-bold">
                        {task?.boardColumn.columnName}
                    </span>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Start Date{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.getStartDate("MMM DD, YYYY")}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Due Date{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.getDueDate("MMM DD, YYYY")}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Time Estimate{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.getEstimateTime()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Total Hours Logged{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.parentTaskTimeLog || "--"}
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Parent Task Hours Logged{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.parentTaskTimeLog || "--"}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Subtask Hours Logged:{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.subTaskTimeLog || "--"}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Total Hours Logged{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.totalTimeLog || "--"}
                    </div>
                </div> */}
            </div>

            <div className="col-12 border-top py-4 mt-4">
                <Accordion expendable={false} title="General Guidelines">
                    {isFetching ? (
                        <ArticleLoader />
                    ) : (
                        <>
                            {task?.hasProjectManagerGuideline && (
                                <div className="mb-3">
                                    <PMGuideline
                                        guideline={task?.PMTaskGuideline}
                                    />
                                </div>
                            )}

                            {!_.isEmpty(task?.workEnvData) && (
                                <div className="sp1_task_card--sub-card">
                                    <div
                                        className="px-4 py-3"
                                        style={{ background: "#F3F5F9" }}
                                    >
                                        <h6 className="mb-2">
                                            Working Environment
                                        </h6>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span>
                                                    <strong>
                                                        Working/Staging Site's
                                                        URL
                                                    </strong>
                                                    : <br />{" "}
                                                    <a
                                                        target="__blank"
                                                        href={
                                                            task?.workEnvData
                                                                ?.site_url
                                                        }
                                                    >
                                                        View on new tab
                                                    </a>
                                                </span>
                                            </div>

                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span>
                                                    <strong>
                                                        Frontend Password
                                                    </strong>
                                                    : <br />{" "}
                                                    {
                                                        task?.workEnvData
                                                            ?.frontend_password
                                                    }
                                                </span>
                                            </div>

                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span>
                                                    <strong>
                                                        Working/Staging Site's
                                                        Login URL
                                                    </strong>
                                                    : <br />{" "}
                                                    <a
                                                        target="__blank"
                                                        href={
                                                            task?.workEnvData
                                                                ?.login_url
                                                        }
                                                    >
                                                        View on new tab
                                                    </a>{" "}
                                                </span>
                                            </div>

                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span>
                                                    <strong>
                                                        Working/Staging Site's
                                                        Username/Email
                                                    </strong>
                                                    : <br />{" "}
                                                    {task?.workEnvData?.email}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span>
                                                    <strong>Password</strong>:{" "}
                                                    <br />{" "}
                                                    {
                                                        task?.workEnvData
                                                            ?.password
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Guideline
                                text={task?.guidelines}
                                task={task}
                                workEnv={task?.workEnvData}
                                editorContainerClass="modal-guideline-editor-text"
                            />
                        </>
                    )}
                </Accordion>

                {_.size(task?.revisions) > 0 && (
                    <Accordion
                        title={
                            task?.category?.name === "Graphic Design" ||
                            task?.category?.name === "UI/UIX Design"
                                ? "Lead Designer Revision"
                                : _.last(task?.revisions)?.revisionStatus
                        }
                        headingClass="d-flex align-items-center justify-content-between"
                        headingStyle={{
                            background: "rgba(227,62,79,1)",
                            color: "#fff",
                        }}
                    >
                        {_.map(task?.revisions, (revision, index) => (
                            <RevisionText
                                key={revision.id}
                                index={index + 1}
                                date={dayjs(revision.createdAt).format(
                                    "MMM DD, YYYY"
                                )}
                                time={dayjs(revision.createdAt).format(
                                    "hh:mm a"
                                )}
                                revision={revision}
                            />
                        ))}
                    </Accordion>
                )}

                <Accordion expendable={false} title="Task Descriptions">
                    <Guideline
                        text={task?.description}
                        task={task}
                        type="TASK_DESCRIPTION"
                    />
                    {_.size(task?.attachments) > 0 ? (
                        <div className="mt-3">
                            <h4 className="mb-2">Task Attachments: </h4>
                            <FileUploader>
                                {_.map(task?.attachments, (attachment) =>
                                    attachment?.task_file_name ? (
                                        <FileUploader.Preview
                                            key={attachment?.task_file_id}
                                            fileName={
                                                attachment?.task_file_name
                                            }
                                            downloadAble={true}
                                            deleteAble={false}
                                            downloadUrl={
                                                attachment?.task_file_url
                                            }
                                            previewUrl={
                                                attachment?.task_file_url
                                            }
                                            fileType={
                                                _.includes(
                                                    [
                                                        "png",
                                                        "jpeg",
                                                        "jpg",
                                                        "svg",
                                                        "webp",
                                                        "gif",
                                                    ],
                                                    attachment?.task_file_icon
                                                )
                                                    ? "images"
                                                    : "others"
                                            }
                                            classname="comment_file"
                                            ext={attachment?.task_file_icon}
                                        />
                                    ) : null
                                )}
                            </FileUploader>
                        </div>
                    ) : null}
                </Accordion>
            </div>
        </div>
    );
};

export default Genarel;
