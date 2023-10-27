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
import _ from "lodash";
import AvatarGroup from "../../../global/AvatarGroup";
import { useGetTaskCommentRepliesQuery } from "../../../services/api/TaskCommentApiSlice";
import Loader from "../../../global/Loader";
import { BsFillPlusCircleFill } from "react-icons/bs";

const Comment = ({ comment }) => {
    const user = comment?.user ? new User(comment.user) : null;
    return (
        <React.Fragment>
            <div className="w-100 d-flex align-items-center">
                <div className="mr-2">
                    <div className="rounded-circle">
                        <img
                            src={user?.getAvatar()}
                            alt={user?.getName()}
                            width="32px"
                            height="32px"
                            className="rounded-circle"
                        />
                    </div>
                </div>
                <div className="sp1_comment">
                    <span className="sp1_comment_user--name">
                        {user?.getName()} ({user?.getDesignationName()})
                    </span>
                    <span
                        className="sp1_comment_time"
                        style={{ color: "#888" }}
                    >
                        {comment?.last_updated_at && (
                            <>
                                {dayjs
                                    .unix(comment?.last_updated_at)
                                    .format("MMM DD, YYYY ")}{" "}
                                at &nbsp;
                                {dayjs
                                    .unix(comment?.last_updated_at)
                                    .format("hh:mm a")}
                            </>
                        )}
                    </span>
                </div>
            </div>

            <div className="__box __reply_text w-100 my-1 text-dark">
                <div
                    className="sp1_ck_content sp1_message--body"
                    style={{ overflow: "hidden" }}
                    dangerouslySetInnerHTML={{ __html: comment?.comment }}
                />
            </div>

            <div className="comment_files">
                <FileUploader>
                    {comment?.files_data?.map((file) => (
                        <FileUploader.Preview
                            key={file?.name}
                            fileName={file?.name}
                            downloadAble={true}
                            deleteAble={false}
                            downloadUrl={file?.url}
                            previewUrl={file?.url}
                            fileType={file?.icon}
                            classname="comment_file"
                            ext=""
                        />
                    ))}
                </FileUploader>
            </div>
        </React.Fragment>
    );
};

const Replies = ({ comment, cb, onReply, showReplyButton }) => {
    const { data, isLoading } = useGetTaskCommentRepliesQuery(comment.id, {
        refetchOnMountOrArgChange: true,
    });

    React.useEffect(() => {
        cb(isLoading);
    }, [isLoading]);

    return (
        <div className="sp1_task_replies_comment_list ml-3 w-100">
            {_.map(data, (r, i) => (
                <div key={i} className="pl-3 border-left border__left py-3 w-100">
                    <Comment comment={r} />
                </div>
            ))}

            {showReplyButton ? (
                <div className="border-left border__left reply_button pl-3">
                    <button
                        className="badge badge-dark px-3 py-2 fs-14"
                        onClick={onReply}
                    >
                        <BsFillPlusCircleFill className="fs-16 icon"/> <span>Reply</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

const InnerComment = ({ comment, updateComments }) => {
    const [showReplies, setShowReplies] = React.useState(false);
    const [replyMode, setReplyMode] = React.useState(false);
    const [activeEditMode, setActiveEditModal] = React.useState(false);
    const [uploadAttachment, setUploadAttachment] = React.useState(false);
    const [selectedEmoji, setSelectedEmoji] = React.useState("");
    const user = comment?.user ? new User(comment.user) : null;
    const auth = useAuth();

    const [isRepliesLoading, setIsRepliesLoading] = React.useState(false);

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

    // emoji selection control
    const handleEmojiSelect = (emojiData, event) => {
        setSelectedEmoji(emojiData.unified);
    };

    // permission
    const CAN_EDIT_COMMENT = auth.getId() === user.getId();

    return (
        <div className="sp1_task_comment_send_box sp1_task_comment_replied pl-2 pb-2">
            <div
                className="__send-box flex-column align-items-start"
                style={{ maxWidth: "100%" }}
            >
                <Comment comment={comment} />

                <div className="sp1_task_comment_actions">
                    <Dropdown>
                        <Dropdown.Toggle icon={false}>
                            <i className="fa-regular fa-face-smile"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <EmojiPicker lazyLoadEmojis={true} />
                        </Dropdown.Menu>
                    </Dropdown>

                    <span>•</span>
                    <a href="#" onClick={handleReplyButtonClick}>
                        Reply
                    </a>
                    <span>•</span>
                    {/* <Switch>
                        <Switch.Case condition={CAN_EDIT_COMMENT}>
                            <a href="#" onClick={handleEditButton}>
                                Edit
                            </a>
                            <span>•</span>
                        </Switch.Case>
                    </Switch> */}

                    {/* <a href="#">Delete</a>
                    <span>•</span> */}

                    <a href="#" onClick={handleUploadAttachment}>
                        <i className="fa-solid fa-paperclip"></i>
                    </a>

                    <Switch>
                        <Switch.Case condition={comment?.total_replies > 0}>
                            <div
                                className="replies_count"
                                onClick={() => setShowReplies(!showReplies)}
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
                                {isRepliesLoading ? <Loader title="" /> : null}
                            </div>
                            {/* </div> */}
                        </Switch.Case>
                    </Switch>
                </div>

                {/* reply box */}

                {showReplies ? (
                    <>
                        <Replies
                            comment={comment}
                            onReply={handleReplyButtonClick}
                            showReplyButton={!replyMode}
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
                        <AttachmentUpload comment={comment} />
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default InnerComment;
