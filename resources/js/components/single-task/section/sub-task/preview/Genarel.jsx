import React from "react";
import { useGetTaskDetailsQuery } from "../../../../services/api/SingleTaskPageApi";
import { User } from "../../../../utils/user-details";
import dayjs from "dayjs";
import { SingleTask } from "../../../../utils/single-task";
import Accordion from "../../../components/Accordion";
import Guideline from "../../../components/Guideline";
import RevisionText from "../../../components/RevisionText";

const Genarel = ({ taskID }) => {
    const { data, isFetching } = useGetTaskDetailsQuery(
        `/${taskID}/json?mode=basic`
    );
    const task = new SingleTask(data);
    const loggedUser = new User(window?.Laravel?.user);

    return (
        <div className="row">
            <div className="col-12 col-xl-6 pb-3 pb-xl-0">
                <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <h6 className="">
                        Subtask:{" "}
                        <span className="text-primary font-weight-normal">
                            {task?.title}
                        </span>
                    </h6>
                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">
                            Parent Task :{" "}
                        </div>
                        <div className="sp1_st-list-item-value">
                            {task?.parentTaskTitle}{" "}
                        </div>
                    </div>

                    <div className="sp1_st-list-item">
                        <div className="sp1_st-list-item-head">Project : </div>
                        <div className="sp1_st-list-item-value">
                            <span className="dot-color bg-danger mr-2" />
                            {task?.projectName}
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
                                    {task?.assigneeTo?.getName()}
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
                                    {task?.assigneeBy?.getName()}
                                    {Number(task?.assigneeBy?.getId()) ===
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

            <div
                className="col-12 col-xl-6 d-flex flex-column py-3"
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
                    <span>{task?.boardColumn.columnName}</span>
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
                </div>
            </div>

            <div className="col-12 border-top py-4 mt-4">
                <Accordion expendable={false} title="General Guidelines">
                    <Guideline text={task?.guidelines} editorContainerClass="modal-guideline-editor-text" />
                </Accordion>

                <Accordion
                    title="Task Revision from Client"
                    headingClass="d-flex align-items-center justify-content-between"
                    headingStyle={{
                        background: "rgba(227,62,79,1)",
                        color: "#fff",
                    }}
                >
                    <RevisionText
                        index="01"
                        date="Jan 06, 2023"
                        time="03:33PM"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                    />

                    <RevisionText
                        index="01"
                        date="Jan 06, 2023"
                        time="03:33PM"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                    />
                </Accordion>

                <Accordion
                    title="Task Revision from Client"
                    headingClass="d-flex align-items-center justify-content-between"
                    headingStyle={{
                        background: "rgba(227,62,79,1)",
                        color: "#fff",
                    }}
                >
                    <RevisionText
                        index="01"
                        date="Jan 06, 2023"
                        time="03:33PM"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                    />

                    <RevisionText
                        index="01"
                        date="Jan 06, 2023"
                        time="03:33PM"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                    />
                </Accordion>

                <Accordion expendable={false} title="Task Descriptions">
                    <Guideline text={task?.description} />
                </Accordion>
            </div>
        </div>
    );
};

export default Genarel;
