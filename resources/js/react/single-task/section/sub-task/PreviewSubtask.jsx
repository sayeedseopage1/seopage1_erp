import * as React from "react";
import { useNavigate } from "react-router-dom";
import Genarel from "./preview/Genarel";
import { SingleTask } from "../../../utils/single-task";
import {
    useGetTaskDetailsQuery,
    useLazyGetTaskDetailsQuery,
} from "../../../services/api/SingleTaskPageApi";
import SubmittedWork from "./preview/SubmittedWork";
import TimeLog from "./preview/TimeLog";
import TaskReview from "./preview/TaskReview";
import History from "./preview/History";
import Comments from "./preview/Comments";

const PreviewSubtask = ({ parentTask, subTask }) => {
    const taskID = subTask?.id;
    const [submittedWork, setSubmittedWork] = React.useState([]);
    const [timeLog, setTimeLog] = React.useState([]);
    const [review, setReview] = React.useState(null);
    const [histories, setHistories] = React.useState([]);
    const [comments, setComments] = React.useState([]);

    const navigate = useNavigate();

    //   fetch data
    const { data, isFetching } = useGetTaskDetailsQuery(`/${taskID}/json?mode=basic`);


    const [getTaskDetails, { isFetching: detailFetchingStateLoading }] =
        useLazyGetTaskDetailsQuery();

    // task instance
    const task = new SingleTask({
        ...data?.task,
        parent_task_action: data?.parent_task_action,
        parent_task_title: data?.parent_task_heading?.heading || null,
        working_environment: data?.working_environment,
        working_environment_data: data?.working_environment_data,
        pm_task_guideline: data?.task_guideline,
        task_revisions: data?.revisions,
    });

    //   fetch submitted rtk api
    const fetchData = (url, cb) => {
        getTaskDetails(`/${task?.id}/json?mode=${url}`)
            .unwrap()
            .then((res) => cb(res))
            .catch((err) => console.error(err));
    };

    // fetch submitted works when submitted tab clieked
    const fetchSubmittedWork = (e) => {
        e.preventDefault();
        if (submittedWork.length === 0) {
            fetchData("task_submission_list", setSubmittedWork);
        }
    };

    // fetch timelog data on tab click
    const fetchTimeLogData = (e) => {
        e.preventDefault();
        if (timeLog.length === 0) {
            fetchData("task_time_log", setTimeLog);
        }
    };

    // fetch review
    const fetchReviewData = (e) => {
        e.preventDefault();
        fetchData("task_approve", setReview);
    };

    // fetch histories
    const fetchHistories = (e) => {
        e.preventDefault();
        fetchData("task_history", setHistories);
    };

    // fetch comments
    const fetchComments = (e) => {
        e.preventDefault();
        fetchData("task_comment", setComments);
    };

    // on comment post
    const onCommentPost = (comment) => {
        const _comments = [...comments];
        _comments.unshift(comment);
        setComments(_comments);
    };

    return (
        <React.Fragment>
            {/* tab */}
            <div
                className="nav flex-column nav-pills sp1-subtask-modal-sidebar"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <a
                    className="nav-link active"
                    id="v-pills-general-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                >
                    General
                </a>
                <a
                    className="nav-link"
                    id="v-pills-comments-tab"
                    data-toggle="pill"
                    href="#v-pills-comments"
                    role="tab"
                    aria-controls="v-pills-comments"
                    aria-selected="false"
                    onClick={fetchComments}
                >
                    Comment
                </a>
                <a
                    className="nav-link"
                    id="v-pills-submitted-work-tab"
                    data-toggle="pill"
                    href="#v-pills-submitted-work"
                    role="tab"
                    aria-controls="v-pills-submitted-work"
                    aria-selected="false"
                    onClick={fetchSubmittedWork}
                >
                    Submitted Works
                </a>
                <a
                    className="nav-link"
                    id="v-pills-time-log-work-tab"
                    data-toggle="pill"
                    href="#v-pills-time-log-work"
                    role="tab"
                    aria-controls="v-pills-time-log-work"
                    aria-selected="false"
                    onClick={fetchTimeLogData}
                >
                    Time Logs
                </a>
                <a
                    className="nav-link"
                    id="v-pills-history-tab"
                    data-toggle="pill"
                    href="#v-pills-history"
                    role="tab"
                    aria-controls="v-pills-history"
                    aria-selected="false"
                    onClick={fetchHistories}
                >
                    History
                </a>
                <a
                    className="nav-link"
                    id="v-pills-task-review-work-tab"
                    data-toggle="pill"
                    href="#v-pills-task-review-work"
                    role="tab"
                    aria-controls="v-pills-task-review-work"
                    aria-selected="false"
                    onClick={fetchReviewData}
                >
                    Task Review
                </a>
            </div>

            <div
                className="tab-content p-3 sp1-subtask-modal-tab-content"
                id="v-pills-tabContent"
            >
                <div
                    className="tab-pane fade show active sp1_st_tab_panel"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-general-tab"
                >
                    <div className="mr-3">
                        <Genarel isFetching={isFetching} taskID={taskID} task={task} />
                    </div>
                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-comments"
                    role="tabpanel"
                    aria-labelledby="v-pills-comments-tab"
                >
                    <Comments
                        task={task}
                        comments={comments}
                        onCommentPost={onCommentPost}
                        isLoading={detailFetchingStateLoading}
                    />
                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-submitted-work"
                    role="tabpanel"
                    aria-labelledby="v-pills-submitted-work-tab"
                >
                    <div className="mr-3">
                        <SubmittedWork
                            task={task}
                            submittedWork={submittedWork}
                            loading={detailFetchingStateLoading}
                        />
                    </div>
                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-time-log-work"
                    role="tabpanel"
                    aria-labelledby="v-pills-time-log-work-tab"
                >
                    <div className="mr-3">
                        <TimeLog
                            task={task}
                            timeLog={timeLog}
                            isLoading={detailFetchingStateLoading}
                        />
                    </div>
                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-history"
                    role="tabpanel"
                    aria-labelledby="v-pills-history-tab"
                >
                    <div className="mr-3">
                        <History
                            histories={histories}
                            isLoading={detailFetchingStateLoading}
                        />
                    </div>
                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-task-review-work"
                    role="tabpanel"
                    aria-labelledby="v-pills-task-review-work-tab"
                >
                    <TaskReview
                        review={review}
                        isLoading={detailFetchingStateLoading}
                    />
                </div>
            </div>
            {/* end tab */}
        </React.Fragment>
    );
};

export default PreviewSubtask;
