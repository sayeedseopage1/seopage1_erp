import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useGetTaskCommentWidgetDataQuery } from "../../../services/api/TaskCommentApiSlice";
import dayjs from "dayjs";
import { timeCalculate } from "../../../utils/timeCalculate";
import Modal from "../../components/Modal";
import CommentPreview from "./CommentPreview";
import CommentsContainer from "../../../UI/comments/CommentsContainer";
import { useGetCommentsQuery } from "../../../services/api/commentsApiSlice";

// widget item

const WidgetItem = ({ comment }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!comment) return null;
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between sp1_tark_right_item align-items-start pt-1 pb-2">
                <div
                    className="w-100 sp1_st_comment-view"
                    style={{ overflow: "hidden" }}
                >
                    <p className="mb-0 pb-0">
                        <a
                            href={`/account/employees/${comment.user.id}`}
                            className="hover-underline text-primary"
                        >
                            {comment.user.name}
                        </a>{" "}
                        {comment.is_deleted
                            ? "deleted "
                            : comment.mention
                            ? "replied to "
                            : "added "}{" "}
                        a comment
                    </p>
                    <p
                        className="text-ellipsis d-flex align-items-center mb-0 pb-0"
                        style={{ color: "#AEAFB9" }}
                    >
                        {comment.is_deleted
                            ? timeCalculate(comment.deleted_at)
                            : timeCalculate(comment.created_date)}
                    </p>
                </div>

                <div className="d-flex align-items-center">
                    <a
                        href="#"
                        className={`mr-2 py-2 sp1_task_righ_action_btn ${
                            isOpen ? "text-primary" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(true);
                        }}
                    >
                        <i className="fa-regular fa-eye"></i>
                    </a>
                    {/* <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-pen-to-square"></i></a> */}
                </div>
            </div>

            {/* <Modal isOpen={isOpen}>
                <CommentPreview
                    isOpen={isOpen}
                    close={() => setIsOpen(false)}
                    commentId={comment.id}
                />
            </Modal> */}
            <CommentsContainer
                singleCommentId={comment.id}
                close={() => setIsOpen(false)}
                isOpen={isOpen}
                showCommentEditor={false}
                showFullScreenBtn={false}
                showSearchBtn={false}
                height="50vh"
            />
        </React.Fragment>
    );
};

const Widget = ({ task }) => {
    // console.log(task);
    // const { data, isLoading } = useGetTaskCommentWidgetDataQuery(task.id, {
    //     skip: !task.id,
    // });
    const { data: comments, isLoading } = useGetCommentsQuery(task.id, {
        skip: !task.id,
    });

    const handleOrdering = (comments = []) => {
        const sortedComments = [...comments];

        sortedComments.sort((a, b) => {
            if (a.is_deleted && b.is_deleted) {
                const a_day = dayjs(a.deleted_at);
                const b_day = dayjs(b.deleted_at);
                return b_day.diff(a_day);
            } else if (a.is_deleted) {
                const a_day = dayjs(a.deleted_at);
                const b_day = dayjs(b.created_date);
                return b_day.diff(a_day);
            } else if (b.is_deleted) {
                const a_day = dayjs(a.created_date);
                const b_day = dayjs(b.deleted_at);
                return b_day.diff(a_day);
            } else {
                const a_day = dayjs(a.created_date);
                const b_day = dayjs(b.created_date);
                return b_day.diff(a_day);
            }
        });

        return sortedComments;
    };

    // console.log({ widget: data });
    return (
        <React.Fragment>
            {_.map(handleOrdering(comments), (comment) => (
                <WidgetItem key={comment.id} comment={comment} />
            ))}
        </React.Fragment>
    );
};

export default Widget;
