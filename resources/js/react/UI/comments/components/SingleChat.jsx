import React, { useEffect, useRef, useState } from "react";
import style from "../styles/comments.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { HiReply } from "react-icons/hi";
import { TbMessage2Check } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaFile } from "react-icons/fa6";
import _ from "lodash";
import { useCommentContext } from "../CommentsBody";
import dayjs from "dayjs";

const SingleChat = ({ comment, onContextMenu, onKeyDown }) => {
    const { setContextHolder, setMentionedComment } = useCommentContext();
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const menuRef = useRef(null);
    const menuBtnRef = useRef(null);

    const closeContext = () => {
        setShowCommentMenu(false);
    };

    console.log({ comment });
    useEffect(() => {
        const handleClickOutside = (event) => {
            // console.log(event.target);
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                menuBtnRef.current &&
                !menuBtnRef.current.contains(event.target)
            ) {
                setShowCommentMenu((prev) => {
                    if (prev) {
                        return false;
                    } else {
                        return prev;
                    }
                });
                // console.log("outside clicked");
                // setShowCommentMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("contextmenu", closeContext);

        return () => {
            document.removeEventListener("contextmenu", closeContext);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const isCurrentUser = () => {
        return comment.id % 2 === 0;
    };

    return (
        <div
            className={`${style.singleChat}`}
            style={{
                alignSelf: isCurrentUser() ? "flex-end" : "flex-start",
            }}
        >
            <section
                style={{
                    height: "10px",
                    // backgroundColor: "black"
                }}
            />

            <section className={`${style.singleChat_comment_card}`}>
                {!isCurrentUser() && (
                    <span
                        className={`${style.singleChat_comment_card_avator}`}
                    ></span>
                )}
                <article className={`${style.singleChat_comment_card_text}`}>
                    <span
                        style={{
                            alignSelf: isCurrentUser()
                                ? "flex-end"
                                : "flex-start",
                        }}
                        className={`${style.singleChat_comment_card_text_time}`}
                    >
                        {/* Nafis, Nov 16,2023, 2:54 PM */}
                        {`${comment?.added_by_name}, ${dayjs(comment?.created_at).format('MMM DD, YYYY, hh:mm A')}`} 
                    </span>
                    <div
                        className={`${style.singleChat_comment_card_text_container}`}
                    >
                        {/* comment text */}
                        {comment?.comment ? (
                            <div
                                onContextMenu={(e) => {
                                    onContextMenu(e);
                                    setContextHolder(comment);
                                }}
                                onKeyDown={onKeyDown}
                                style={{
                                    position: "relative",
                                }}
                                className={`${style.singleChat_comment_card_text_message}`}
                            >
                                {comment.comment}
                            </div>
                        ) : (
                            <></>
                        )}
                        {/* file will be shown here */}
                        {comment?.files ? (
                            <FileView
                                onContextMenu={(e) => {
                                    onContextMenu(e);
                                    setContextHolder(comment);
                                }}
                                onKeyDown={onKeyDown}
                                isCurrentUser={isCurrentUser()}
                                files={comment.files}
                            />
                        ) : (
                            <></>
                        )}
                        <span
                            onClick={() => {
                                // setScroll((prev) => !prev);
                                setShowCommentMenu((prev) => !prev);
                            }}
                            style={{
                                left: isCurrentUser() ? "-14px" : "auto",
                                right: isCurrentUser() ? "auto" : "-14px",
                            }}
                            className={`${style.singleChat_comment_card_text_more_btn}`}
                            ref={menuBtnRef}
                        >
                            <FiMoreVertical
                                style={{
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        </span>
                        {showCommentMenu ? (
                            <div
                                ref={menuRef}
                                style={{
                                    left: isCurrentUser() ? "-98px" : "auto",
                                    right: isCurrentUser() ? "auto" : "-98px",
                                }}
                                className={
                                    style.singleChat_comment_card_text_more_options
                                }
                            >
                                <section
                                    onClick={() => {
                                        setShowCommentMenu(false);
                                        setMentionedComment(comment);
                                    }}
                                >
                                    <HiReply
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Reply
                                    </span>
                                </section>

                                <section
                                    onClick={() => {
                                        setShowCommentMenu(false);
                                    }}
                                >
                                    <TbMessage2Check
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Select Message
                                    </span>
                                </section>

                                <section
                                    onClick={() => {
                                        setShowCommentMenu(false);
                                    }}
                                >
                                    <MdOutlineContentCopy
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Copy
                                    </span>
                                </section>

                                <section
                                    onClick={() => {
                                        setShowCommentMenu(false);
                                    }}
                                >
                                    <IoMdCloseCircleOutline
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Remove
                                    </span>
                                </section>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* file will be shown here */}
                    {/* <FileView
                        isCurrentUser={isCurrentUser()}
                        files={_.fill(Array(3), {
                            type: "doc",
                            name: "file_name",
                        })}
                    /> */}
                </article>
            </section>
        </div>
    );
};

export default SingleChat;

const FileView = ({ files, isCurrentUser, onContextMenu, onKeyDown }) => {
    // console.log({ isCurrentUser });
    const handlePreviewUrl = (file) => {
        // return URL.createObjectURL(file);
        return file;
    };

    const handleFileComponent = (file) => {
        switch (file?.type) {
            case "image":
                console.log(handlePreviewUrl(file));
                return (
                    <img
                        onClick={() =>
                            window.open(handlePreviewUrl(file), "_blank")
                        }
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        src={handlePreviewUrl(file)}
                        alt=""
                    />
                );

            // case ""

            default:
                return (
                    <div
                        style={{
                            display: "flex",
                            flexFlow: "column nowrap",
                            justifyContent: "center",
                            gap: "5px",
                        }}
                        onClick={() =>
                            window.open(handlePreviewUrl(file), "_blank")
                        }
                    >
                        <FaFile
                            className={`${style.chatInput_filePreview__file__fileIcon}`}
                        />
                        <p
                            className={
                                style.chatInput_filePreview__file__fileName
                            }
                        >
                            {file?.name}
                        </p>
                    </div>
                );
        }
    };

    return (
        <span
            onContextMenu={onContextMenu}
            onKeyDown={onKeyDown}
            style={{
                // alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                justifyContent: isCurrentUser ? "right" : "left",
            }}
            className={`${style.singleChat_comment_card_files}`}
        >
            {files.map((file, i) => {
                return (
                    <div
                        key={i}
                        className={`${style.chatInput_filePreview__file}`}
                    >
                        {handleFileComponent(file)}
                    </div>
                );
            })}
        </span>
    );
};
