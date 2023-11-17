import React from "react"; 
import { User } from "../../../../utils/user-details"; 
import Accordion from "../../../components/Accordion";
import Guideline from "../../../components/Guideline";
import RevisionText from "../../../components/RevisionText";
import GenarelLoader from "../../../components/loader/GenarelLoader";
import ArticleLoader from "../../../components/loader/ArticleLoader";
import dayjs from "dayjs";
import { Placeholder } from "../../../../global/Placeholder";

const Genarel = ({task, isFetching}) => { 
    const loggedUser = new User(window?.Laravel?.user);

    
    return (
        <div className="row">
            {isFetching ? <GenarelLoader /> : 
                <React.Fragment>
                    <div className="col-12 col-xl-6 pb-3 pb-xl-0">
                        <div className="d-flex flex-column" style={{ gap: "10px" }}>
                            <h6 className="">
                                Task: <a target="__blank" href={`/account/tasks/${task?.id}`} className="text-primary font-weight-normal">
                                    {task?.getSubtaskTitle()}
                                </a>
                            </h6>
                            {
                                task?.isSubtask && (
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Parent Task :
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            <a href={`/account/tasks/${task?.parentTaskId}`} className="text-dark text-hover-underline">
                                                {task?.parentTaskTitle}
                                            </a>
                                        </div>
                                    </div>
                                )
                            }

                            {/* project name */}
                            {/* <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">Project : </div>
                                <div className="sp1_st-list-item-value">
                                    <span className="dot-color bg-danger mr-2" />
                                    <a href={`/account/projects/${task?.projectId}`} className="text-dark text-hover-underline"> 
                                        {task?.projectName} 
                                    </a>
                                </div>
                            </div> */}

                            {/* milestone */}
                            {/* <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Milestone :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <span className="dot-color bg-primary mr-2" />
                                    {task?.milestoneTitle}
                                </div>
                            </div> */}

                            {/* asignee to */}
                            <div className="sp1_st-list-item">
                                <div className="sp1_st-list-item-head">
                                    Assigned To :{" "}
                                </div>
                                <div className="sp1_st-list-item-value">
                                    <div style={{ width: "32px", height: "32px" }}>
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
                                            <a href={task?.assigneeTo?.getUserLink()} className="text-dark hover-underline">{task?.assigneeTo?.getName()}</a> 
                                            {Number(task?.assigneeTo?.getId()) ===
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
                                    <div style={{ width: "32px", height: "32px" }}>
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
                                            {Number(task?.assigneeBy?.getId()) ===
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
                                <div className="sp1_st-list-item-head">Priority : </div>
                                <div className="sp1_st-list-item-value">
                                    <span
                                        className="dot-color mr-2"
                                        style={{ background: "rgba(252, 189, 1, 1)" }}
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
            }

            <div
                className="col-12 col-xl-6 d-flex flex-column py-3 px-3"
                style={{ gap: "10px", background: "#F0F2F6" }}
            >
                <div className="font-weight-bold d-block"> Status: </div>

                {
                    isFetching ?
                    <Placeholder width="80px" />:
                    <div
                    className="d-flex align-items-center"
                    style={{ gap: "6px" }}
                >
                    <span
                        className="dot-color mr-2"
                        style={{ background: task?.boardColumn?.labelColor }}
                    />
                    <span className="font-weight-bold">{task?.boardColumn.columnName}</span>
                </div>
                }

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Start Date{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {isFetching ?
                    <Placeholder width="80px" />:
                    task?.getStartDate("MMM DD, YYYY")}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Due Date{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {isFetching ?
                    <Placeholder width="80px" />:
                    task?.getDueDate("MMM DD, YYYY")}
                    </div>
                </div>

                {/* Time Estimate */}
                {/* <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                        Time Estimate{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {task?.getEstimateTime()}
                    </div>
                </div> */}

                <div className="row">
                    <div className="col-6 col-sm-5 col-md-3 col-xl-6">
                    Total Hours Logged{" "}
                    </div>
                    <div className="col-6 col-sm-7 col-md-9 col-xl-6">
                        : {isFetching ?
                    <Placeholder width="80px" />:
                    task?.parentTaskTimeLog || "--"}
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
                {/* <Accordion expendable={false} title="General Guidelines">
                    {
                        isFetching ? 
                        <ArticleLoader /> :
                        <Guideline text={task?.guidelines} editorContainerClass="modal-guideline-editor-text" />
                    }
                </Accordion> */}

                {_.size(task?.revisions) > 0 &&
                    <Accordion
                        title={_.last(task?.revisions)?.revisionStatus}
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
                                    date={dayjs(revision.createdAt).format('MMM DD, YYYY')}
                                    time={dayjs(revision.createdAt).format('hh:mm a')}
                                    text={revision?.comment}
                                />
                            ))
                        }
                        
                    </Accordion>
                }

                <Accordion expendable={false} title="Task Descriptions">
                    <Guideline text={task?.description} />
                </Accordion>
            </div>
        </div>
    );
};

export default Genarel;
