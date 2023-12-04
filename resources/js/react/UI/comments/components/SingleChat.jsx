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

const SingleChat = ({
    id,
    comment,
    prevComment,
    onContextMenu,
    onKeyDown,
    idMatch,
}) => {
    const { setContextHolder, setMentionedComment } = useCommentContext();
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const menuRef = useRef(null);
    const menuBtnRef = useRef(null);

    const closeContext = () => {
        setShowCommentMenu(false);
    };

    // console.log({ comment });
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
        return comment.id % 3 !== 0;
    };

    // file preview url generator
    const handlePreviewUrl = (file) => {
        // return URL.createObjectURL(file);
        return file;
    };

    // conditionally render component according to file type
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
                            {file.name}
                        </p>
                    </div>
                );
        }
    };

    const handleSenderInfo = ({currentComment,previousComment}) => {
        if (true) {
        } else {
        }
        return (
            <span
                style={{
                    alignSelf: isCurrentUser() ? "flex-end" : "flex-start",
                }}
                className={`${style.singleChat_comment_card_text_time}`}
            >
                {/* Nafis, Nov 16,2023, 2:54 PM */}
                {`${comment?.added_by_name}, ${dayjs(
                    comment?.created_at
                ).format("MMM DD, YYYY, hh:mm A")}`}
            </span>
        );
    };

    return (
        <div
            id={id}
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
                    {/* comment sender info */}
                    {handleSenderInfo({currentComment:comment,previousComment:prevComment})}

                    {/* comment message box */}
                    <div
                        style={{
                            alignSelf: isCurrentUser()
                                ? "flex-end"
                                : "flex-start",
                        }}
                        className={`${
                            style.singleChat_comment_card_text_container
                        } ${idMatch ? `${style.singleChat_match}` : ""}`}
                    >
                        {/* mentioned comment */}
                        {comment?.mention_comment ? (
                            <div
                                onContextMenu={(e) => {
                                    onContextMenu(e);
                                    setContextHolder(comment);
                                }}
                                onKeyDown={onKeyDown}
                                style={{
                                    borderRadius: comment?.comment
                                        ? "5px 5px 0 0"
                                        : "5px",
                                    borderBottom: comment?.comment
                                        ? "solid 1px hsla(0, 0%, 44%, 0.13)"
                                        : "0.15px solid #aaaaaa",
                                }}
                                className={`${style.singleChat_comment_card_mentioned_comment}`}
                            >
                                <HiReply
                                    className={`${style.chatInput_mentioned_comment_icon}`}
                                />
                                <article
                                    className={`${style.chatInput_mentioned_comment_text_area}`}
                                >
                                    {comment?.comment ? (
                                        <span
                                            className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                                        >
                                            {comment.comment}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                    {comment?.files?.length ? (
                                        <span
                                            className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
                                        >
                                            {comment?.files?.map((file, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`${style.chatInput_filePreview__file} shadow-sm`}
                                                    >
                                                        {handleFileComponent(
                                                            file
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                    <span
                                        style={{ fontStyle: "italic" }}
                                        className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
                                    >
                                        {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
                                        {`${comment?.added_by_name}, ${dayjs(
                                            comment?.created_at
                                        ).format("MMM DD, YYYY, hh:mm A")}`}
                                    </span>
                                </article>
                            </div>
                        ) : (
                            <></>
                        )}

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
                                    borderRadius: comment?.mention_comment
                                        ? "0 0 5px 5px"
                                        : "5px",
                                    borderTop: comment?.mention_comment
                                        ? "none"
                                        : "0.15px solid #aaaaaa",
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
                                topMargin={!!comment?.comment}
                            />
                        ) : (
                            <></>
                        )}

                        {/* comment more btn */}
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

                        {/* comment more options */}
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

                    {/* {idMatch ? <div style={{height:'10px'}} /> : <></>} */}

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
            {/* <section
                style={{
                    height: "10px",
                    // backgroundColor: "black"
                }}
            /> */}
        </div>
    );
};

export default SingleChat;

const FileView = ({
    files,
    isCurrentUser,
    onContextMenu,
    onKeyDown,
    topMargin,
}) => {
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
                marginTop: topMargin ? "5px" : "0",
            }}
            className={`${style.singleChat_comment_card_files}`}
        >
            {files.map((file, i) => {
                return (
                    <div
                        key={i}
                        className={`${style.chatInput_filePreview__file} shadow-sm`}
                    >
                        {handleFileComponent(file)}
                    </div>
                );
            })}
        </span>
    );
};
