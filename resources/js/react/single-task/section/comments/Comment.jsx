import * as React from "react";
import { User } from "../../../utils/user-details";
import FileUploader from "../../../file-upload/FileUploader";
import { timeCalculate } from "../../../utils/timeCalculate";
import Dropdown from "../../components/Dropdown";
import { Menu } from "@headlessui/react";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ comment, onDelete }) => {
    const auth = useAuth();
    const user = comment?.user ? new User(comment.user) : null;
    const [showDeletedComment, setShowDeletedComment] = React.useState(false);

    if (comment.is_deleted && !showDeletedComment) {
        return (
            <div className="sp1_comment_deleted_status w-100">
                This Comment has been deleted
                {auth.getRoleId() === 1 ? (
                    <button onClick={() => setShowDeletedComment(true)}>
                        <i className="fa-solid fa-eye-slash" />
                    </button>
                ) : null}
            </div>
        );
    }

    const deletedClass = comment.is_deleted ? "sp1_comment_deleted_status" : "";
    return (
        <React.Fragment>
            <div className={`w-100 d-flex align-items-center  ${deletedClass}`}>
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

                
                <div className="w-100 d-flex align-items-center justify-between">
                    <div className="sp1_comment">
                        <span className="sp1_comment_user--name">
                            {user?.getName()} ({user?.getDesignationName()})
                        </span>
                        <span
                            className="sp1_comment_time"
                            style={{ color: "#888" }}
                        >
                            {timeCalculate(comment.last_updated_date)}
                        </span>
                    </div>

                    {comment.is_deleted && auth.getRoleId() === 1 ? (
                        <button className="ml-auto" onClick={() => setShowDeletedComment(!showDeletedComment)}>
                            <i className="fa-solid fa-eye" />
                        </button>
                    ) : null}
                </div>

                {/* <Dropdown className="sp1_comment_extend_menu_dd">
                    <Dropdown.Toggle icon={false}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu placement="bottom-end" className="sp1_comment_extend_menu">
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                {comment.is_deleted || user.getId() !== auth.getId() ? null : (
                    <Menu as="div" className="sp1_comment_extend_menu">
                        <Menu.Button
                            as="button"
                            className="sp1_comment_extend_menu-btn"
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                        </Menu.Button>
                        <Menu.Items
                            as="div"
                            placement="bottom-end"
                            className="sp1_comment_extend_menu__items"
                        >
                            <Menu.Item
                                as="div"
                                className="sp1_comment_extend_menu__item --disabled"
                            >
                                Edit
                            </Menu.Item>
                            <Menu.Item
                                as="div"
                                className="sp1_comment_extend_menu__item --delete"
                                onClick={(e) => onDelete(e, comment.id)}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                )}
            </div>
            {comment?.comment ? (
                <div className="__box __reply_text w-100 my-1 text-dark border-rounded">
                    <div
                        className="sp1_ck_content sp1_message--body"
                        style={{ overflow: "hidden" }}
                        dangerouslySetInnerHTML={{ __html: comment?.comment }}
                    />
                </div>
            ) : null}

            <div className="comment_files mt-2">
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
export default Comment;
