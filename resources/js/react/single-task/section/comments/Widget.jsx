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
                        {comment.mention? "replied to " : "added "} a
                        comment
                    </p>
                    <p
                        className="text-ellipsis d-flex align-items-center mb-0 pb-0"
                        style={{ color: "#AEAFB9" }}
                    >
                        {timeCalculate(comment.created_date)}
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
            <CommentsContainer singleCommentId={comment.id} close={() => setIsOpen(false)} isOpen={isOpen} />
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

    // console.log({ widget: data });
    return (
        <React.Fragment>
            {_.map(_.orderBy(comments, "id", "desc"), (comment) => (
                <WidgetItem key={comment.id} comment={comment} />
            ))}
        </React.Fragment>
    );
};

export default Widget;
