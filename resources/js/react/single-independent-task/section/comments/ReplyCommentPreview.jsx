import * as React from "react";
import _ from "lodash";
import { useGetTaskCommentRepliesQuery } from "../../../services/api/TaskCommentApiSlice";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Comment from "./Comment";

const ReplyCommentPreview = ({
    comment,
    cb,
    onReply,
    showReplyButton,
    onDelete,
}) => {
    const { data, isLoading } = useGetTaskCommentRepliesQuery(comment.id, {
        refetchOnMountOrArgChange: true,
    });

    React.useEffect(() => {
        cb(isLoading);
    }, [isLoading]);

    return (
        <div className="sp1_task_replies_comment_list ml-3 w-100">
            {_.map(data, (r, i) => (
                <div
                    key={i}
                    className="pl-3 pr-4 border-left border__left py-3 w-100"
                >
                    <Comment comment={r} onDelete={onDelete} />
                </div>
            ))}

            {!comment.is_deleted && !isLoading && showReplyButton ? (
                <div className="border-left border__left reply_button pl-3">
                    <button onClick={onReply}>
                        {/* <BsFillPlusCircleFill className="fs-16 icon" /> */}
                        <span>+ Reply</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default ReplyCommentPreview;
