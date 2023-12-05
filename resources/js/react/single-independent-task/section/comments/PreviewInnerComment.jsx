import * as React from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../components/Button";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import Dropdown from "../../components/Dropdown";
import { User } from "../../../utils/user-details";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import FileUploader from "../../../file-upload/FileUploader";
import dayjs from "dayjs";
import Switch from "../../../global/Switch";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import AttachmentUpload from "./AttachmentUpload";
import { useAuth } from "../../../hooks/useAuth";
import Comment from "./Comment";
import AvatarGroup from "../../../global/AvatarGroup";
import ReplyCommentPreview from "./ReplyCommentPreview";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useDeleteCommentMutation } from "../../../services/api/TaskCommentApiSlice";
import { toast } from "react-toastify";
import Loader from "../../../global/Loader";

const PreviewInnerComment = ({ comment, updateComments, isLoading, close }) => {
    const [showReplies, setShowReplies] = React.useState(false);
    const [replyMode, setReplyMode] = React.useState(false);
    const [activeEditMode, setActiveEditModal] = React.useState(false);
    const [uploadAttachment, setUploadAttachment] = React.useState(false);
    const [selectedEmoji, setSelectedEmoji] = React.useState("");
    const user = comment?.user ? new User(comment.user) : null;
    const auth = useAuth();

    const refOnView = React.useRef(null);

    React.useLayoutEffect(() => {
        refOnView.current &&
            refOnView.current.scrollIntoView({ behavior: "smooth" });
    }, [replyMode]);

    // handle delete
    const [deleteComment, { isLoading: isDeleting }] =
        useDeleteCommentMutation();

    if (isLoading) return <>Loading...</>;

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
    const CAN_EDIT_COMMENT = auth?.getId() === user?.getId();
    const CAN_DELETE_COMMENT = CAN_EDIT_COMMENT;

    // if(!isLoading && comment?.is_deleted) {
    //     close();
    //     return null;
    // }

    return (
        <div className="sp1_task_comment_send_box sp1_task_comment_replied pl-2 pr-3 pb-2">
            <div
                className="__send-box flex-column align-items-start"
                style={{ maxWidth: "100%" }}
            >
                <Comment comment={comment} onDelete={handleDeleteComment} />

                <Switch>
                    <Switch.Case condition={!comment.is_deleted}>
                        <div className="sp1_task_comment_actions">
                            {/* <Dropdown>
                                    <Dropdown.Toggle icon={false}>
                                        <i className="fa-regular fa-face-smile"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <EmojiPicker lazyLoadEmojis={true} />
                                    </Dropdown.Menu>
                                </Dropdown>

                                <span>•</span>
                            */}
                            <a href="#" onClick={handleReplyButtonClick}>
                                Reply
                            </a>
                            <span>•</span>
                            <Switch>
                                {/* <Switch.Case condition={CAN_EDIT_COMMENT}>
                                    <a href="#" onClick={handleEditButton}>
                                        Edit
                                    </a>
                                    <span>•</span>
                                </Switch.Case> */}

                                <Switch.Case condition={CAN_DELETE_COMMENT}>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleDeleteComment(e, comment.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                    <span>•</span>
                                </Switch.Case>
                            </Switch>

                            <a href="#" onClick={handleUploadAttachment}>
                                <i className="fa-solid fa-paperclip"></i>
                            </a>
                        </div>
                    </Switch.Case>

                    {/* <Switch.Case condition={activeEditMode}>
                        <EditComment
                            comment={comment}
                            updateComments={updateComments}
                            close={() => setActiveEditModal(false)}
                        />
                    </Switch.Case> */}

                    <Switch.Case condition={uploadAttachment}>
                        <AttachmentUpload comment={comment} />
                    </Switch.Case>

                    <Switch.Case
                        condition={
                            !comment.is_deleted || auth.getRoleId() === 1
                        }
                    >
                        <Replies
                            replies={comment.replies}
                            isRepliedModalOpen={replyMode}
                            onReplyButtonClick={() => setReplyMode(true)}
                            handleDeleteComment={handleDeleteComment}
                        />
                    </Switch.Case>

                    <Switch.Case condition={replyMode}>
                        <>
                            <ReplyComment
                                comment={comment}
                                onReply={() => setReplyMode(false)}
                                close={() => setReplyMode(false)}
                            />

                            <div ref={refOnView} />
                        </>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default PreviewInnerComment;

const Replies = ({
    replies,
    isRepliedModalOpen,
    onReplyButtonClick,
    handleDeleteComment,
}) => {
    return (
        <div className="sp1_task_replies_comment_list mt-4 ml-3 w-100">
            {_.map(replies, (r, i) => (
                <div
                    key={i}
                    className="pl-3 pr-3 border-left border__left py-3 w-100"
                >
                    <Comment comment={r} onDelete={handleDeleteComment} />
                </div>
            ))}

            {replies.length > 0 && !isRepliedModalOpen ? (
                <div className="border-left border__left reply_button pl-3">
                    <button onClick={onReplyButtonClick}>
                        <span>+ Reply</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
};
