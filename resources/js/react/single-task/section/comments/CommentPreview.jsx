import React from "react";
import Button from "../../components/Button";
import InnerComment from "./InnerComment";
import { useGetPreviewCommentDataQuery } from "../../../services/api/TaskCommentApiSlice";
import PreviewInnerComment from "./PreviewInnerComment";

const CommentPreview = ({ isOpen, close, commentId }) => {
    // get comment details
    const { data: comment, isLoading } =
        useGetPreviewCommentDataQuery(commentId);

    return (
        <div className="sp1_st_comment_preview">
            <div className="sp1_st_comment_panel">
                <div className="border-bottom pb-2 d-flex align-items-center">
                    <Button
                        aria-label="close-modal"
                        className="_close-modal"
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                {/* comment */}
                <div className="_comment_list mt-3">
                    {/* show comment details */}
                    <PreviewInnerComment
                        comment={comment}
                        updateComments={() => null}
                        isLoading={isLoading}
                        close={close}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentPreview;
