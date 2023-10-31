import * as React from "react";
import EmojiPicker from "emoji-picker-react";
import Dropdown from "../../components/Dropdown";
import { User } from "../../../utils/user-details";
import Switch from "../../../global/Switch";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import AttachmentUpload from "./AttachmentUpload";
import { useAuth } from "../../../hooks/useAuth";
import _, { compact } from "lodash";
import AvatarGroup from "../../../global/AvatarGroup";
import {
    useDeleteCommentMutation,
    useGetTaskCommentRepliesQuery,
} from "../../../services/api/TaskCommentApiSlice";
import Loader from "../../../global/Loader";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Comment from "./Comment";
import ReplyCommentPreview from "./ReplyCommentPreview";
import { toast } from "react-toastify";

const InnerComment = ({ comment, updateComments }) => {
    const [showReplies, setShowReplies] = React.useState(false);
    const [replyMode, setReplyMode] = React.useState(false);
    const [activeEditMode, setActiveEditModal] = React.useState(false);
    const [uploadAttachment, setUploadAttachment] = React.useState(false);
    const [selectedEmoji, setSelectedEmoji] = React.useState("");
    const user = comment?.user ? new User(comment.user) : null;
    const auth = useAuth();

    const [isRepliesLoading, setIsRepliesLoading] = React.useState(false);

    // api hook
    // handle delete
    const [deleteComment, { isLoading: isDeleting }] =
        useDeleteCommentMutation();

    const handleReplyButtonClick = (e) => {
        e.preventDefault();
        setReplyMode(true);
        setActiveEditModal(false);
        setUploadAttachment(false);
    };

    // handle edit
    const handleEditButton = (e) => {
        e.preventDefault();
        setReplyMode(false);
        setUploadAttachment(false);
        setActiveEditModal(true);
    };

    const handleUploadAttachment = (e) => {
        e.preventDefault();
        setReplyMode(false);
        setActiveEditModal(false);
        setUploadAttachment(true);
    };

    // handle comment delete
    // delete comment
    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();

        Swal.fire({
            icon: "warning",
            title: `Are you sure you want to delete this comment?`,
            html: "This action cannot be undone. Deleting this comment will permanently remove it from the discussion.",
            showDenyButton: true,
            denyButtonText: "Cancel",
            // denyButtonColor: '#ffffff',

            showConfirmButton: true,
            confirmButtonText: "Yes, Delete It!",
            confirmButtonColor: "#E73819",
            customClass: {
                confirmButton: "delete-confirm-button",
                denyButton: "delete-deny-button",
            },
            buttonsStyling: false,
        }).then((res) => {
            if (res.isConfirmed) {
                deleteCommentData();
            }
        });

        // delete
        const deleteCommentData = async () => {
            const response = await deleteComment(commentId).unwrap();
            if (response) {
                toast.success("Comment Deleted Successfully");
            }
        };
    };

    // emoji selection control
    const handleEmojiSelect = (emojiData, event) => {
        setSelectedEmoji(emojiData.unified);
    };

    // permission
    const CAN_EDIT_COMMENT = auth.getId() === user.getId();

    // console.log({ comment });

    return (
        <div className="sp1_task_comment_send_box sp1_task_comment_replied pl-2 pr-3 pb-2">
            <div
                className="__send-box flex-column align-items-start"
                style={{ maxWidth: "100%" }}
            >
                {/* show comment details */}
                <Comment comment={comment} onDelete={handleDeleteComment} />

                <Switch>
                    <Switch.Case
                        condition={
                            !comment.is_deleted || auth.getRoleId() === 1
                        }
                    >
                        <div className="sp1_task_comment_actions">
                            {/* <Dropdown>
                                <Dropdown.Toggle icon={false}>
                                    <i className="fa-regular fa-face-smile"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <EmojiPicker lazyLoadEmojis={true} />
                                </Dropdown.Menu>
                            </Dropdown>

                            <span>•</span> */}
                            <Switch.Case condition={!comment.is_deleted}>
                                <a href="#" onClick={handleReplyButtonClick}>
                                    Reply
                                </a>
                                <span>•</span>
                                <a href="#" onClick={handleUploadAttachment}>
                                    <i className="fa-solid fa-paperclip"></i>
                                </a>
                            </Switch.Case>

                            {/* <Switch>
                                <Switch.Case condition={CAN_EDIT_COMMENT}>
                                    <a href="#" onClick={handleEditButton}>
                                        Edit
                                    </a>
                                    <span>•</span>
                                </Switch.Case>
                            </Switch>
                            */}

                            {/* <a href="#">Delete</a>
                <span>•</span> */}

                            <Switch>
                                <Switch.Case
                                    condition={comment?.total_replies > 0}
                                >
                                    <div
                                        className="replies_count"
                                        onClick={() =>
                                            setShowReplies(!showReplies)
                                        }
                                    >
                                        <AvatarGroup
                                            users={_.map(
                                                comment?.replies_users,
                                                (user) => ({
                                                    ...user,
                                                    src: user.image_url,
                                                })
                                            )}
                                        />
                                        <div className="ml-1 mr-2">
                                            {comment.total_replies} replies
                                        </div>
                                        {isRepliesLoading ? (
                                            <Loader title="" />
                                        ) : null}
                                    </div>
                                    {/* </div> */}
                                </Switch.Case>
                            </Switch>
                        </div>
                    </Switch.Case>
                </Switch>

                {/* reply box */}

                {showReplies ? (
                    <>
                        <ReplyCommentPreview
                            comment={comment}
                            onReply={handleReplyButtonClick}
                            showReplyButton={!replyMode}
                            onDelete={handleDeleteComment}
                            cb={(loading) => setIsRepliesLoading(loading)}
                        />
                    </>
                ) : null}

                <Switch>
                    <Switch.Case condition={activeEditMode}>
                        <EditComment
                            comment={comment}
                            updateComments={updateComments}
                            close={() => setActiveEditModal(false)}
                        />
                    </Switch.Case>

                    <Switch.Case condition={replyMode}>
                        <ReplyComment
                            comment={comment}
                            onReply={() => {
                                setShowReplies(true);
                            }}
                            close={() => setReplyMode(false)}
                        />
                    </Switch.Case>

                    <Switch.Case condition={uploadAttachment}>
                        <AttachmentUpload
                            comment={comment}
                            onReply={() => setShowReplies(true)}
                            close={() => setUploadAttachment(false)}
                        />
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default InnerComment;
