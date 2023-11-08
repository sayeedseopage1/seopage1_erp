import React from "react";
import Loader from "../../../components/Loader";
import CommentSendBox from "../../comments/CommentSendBox";
import InnerComment from "../../comments/InnerComment";
import { useGetTaskCommentsQuery } from "../../../../services/api/TaskCommentApiSlice";
import _ from "lodash";

const Comments = ({ task, onCommentPost }) => {
    const { data: comments, isLoading } = useGetTaskCommentsQuery(task?.id, {
        skip: !task?.id,
    });

    return (
        <React.Fragment>
            <div className="d-flex flex-column">
                <CommentSendBox task={task} onCommentPost={onCommentPost} />
                <div className="sp1_task_comment_list mt-4 ">
                    <div className="font-weight-bold pb-3">Comments: </div>
                    <div
                        className="sp1_task_comment_list_items"
                        style={{ maxHeight: "500px" }}
                    >
                        {isLoading && comments?.length === 0 && <Loader />}
                        {_.size(comments) > 0 &&
                            _.map(
                                _.orderBy(comments, "id", "desc"),
                                (comment) => (
                                    <InnerComment
                                        key={comment.id}
                                        comment={comment}
                                    />
                                )
                            )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Comments;
