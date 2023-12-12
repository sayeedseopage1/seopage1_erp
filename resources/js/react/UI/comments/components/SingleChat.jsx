import React, { useEffect, useRef, useState } from "react";
import style from "../styles/comments.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { HiReply } from "react-icons/hi";
import { TbMessage2Check } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash, FaFile } from "react-icons/fa6";
import _ from "lodash";
import { useCommentContext } from "../CommentsBody";
import dayjs from "dayjs";
import HandleFileIcon from "../utils/HandleFileIcon";
import isCurrentUser from "../utils/isCurrentUser";
import { User } from "../utils/user-details";
import Swal from "sweetalert2";
import getTextContent, { htmlToString } from "../utils/getTextContent";

const currentUser = new User(window.Laravel.user);

const SingleChat = ({
    id,
    comment,
    prevComment,
    onContextMenu,
    onKeyDown,
    idMatch,
    handleDeleteSingleComment,
}) => {
    const {
        setContextHolder,
        setMentionedComment,
        selectedComments,
        setSecletedComments,
    } = useCommentContext();
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const [showDeletedComment, setShowDeletedComment] = useState(false);
    const menuRef = useRef(null);
    const menuBtnRef = useRef(null);

    const closeContext = () => {
        setShowCommentMenu(false);
    };

    // comment more btn clicked menu
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

    // comment sender info showing handler
    const handleSenderInfo = ({ currentComment, previousComment }) => {
        if (
            Number(currentComment?.user?.id) ===
            Number(previousComment?.user?.id)
        ) {
            if (
                dayjs(currentComment?.created_date).diff(
                    dayjs(previousComment?.created_date),
                    "minutes"
                ) <= 10
            ) {
                return <></>;
            } else {
                return (
                    <span
                        style={{
                            alignSelf: isCurrentUser(comment?.user?.id)
                                ? "flex-end"
                                : "flex-start",
                        }}
                        className={`${style.singleChat_comment_card_text_time}`}
                    >
                        {/* 2:54 PM */}
                        {`${dayjs(comment?.created_date).format("hh:mm A")}`}
                    </span>
                );
            }
        } else {
            return (
                <span
                    style={{
                        alignSelf: isCurrentUser(comment?.user?.id)
                            ? "flex-end"
                            : "flex-start",
                    }}
                    className={`${style.singleChat_comment_card_text_time}`}
                >
                    {/* Nafis, Nov 16,2023, 2:54 PM */}
                    {`${comment?.user?.name}, ${dayjs(
                        comment?.created_date
                    ).format("MMM DD, YYYY, hh:mm A")}`}
                </span>
            );
        }
    };

    // comment sender avator showing handler
    const handleSenderAvator = ({ currentComment, previousComment }) => {
        if (
            Number(currentComment?.user?.id) ===
            Number(previousComment?.user?.id)
        ) {
            if (isCurrentUser(comment?.user?.id)) {
                return <></>;
            } else {
                return (
                    <span
                        style={{
                            visibility: "hidden",
                        }}
                        className={`${style.singleChat_comment_card_avator}`}
                    ></span>
                );
            }
        } else {
            if (isCurrentUser(comment?.user?.id)) {
                return <></>;
            } else {
                return (
                    <span className={`${style.singleChat_comment_card_avator}`}>
                        <img
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                            src={`/user-uploads/avatar/${comment?.user?.image}`}
                            alt=""
                        />
                    </span>
                );
            }
        }
    };

    // comment field top space handler
    const handleTopSpace = ({ currentComment, previousComment }) => {
        if (
            Number(currentComment?.user?.id) ===
            Number(previousComment?.user?.id)
        ) {
            if (
                dayjs(currentComment?.created_date).diff(
                    dayjs(previousComment?.created_date),
                    "minutes"
                ) <= 10
            ) {
                return (
                    <section
                        style={{
                            height: "5px",
                            // backgroundColor: "black"
                        }}
                    />
                );
            } else {
                return (
                    <section
                        style={{
                            height: "5px",
                            // backgroundColor: "black"
                        }}
                    />
                );
            }
        } else {
            return (
                <section
                    style={{
                        height: "10px",
                        // backgroundColor: "black"
                    }}
                />
            );
        }
    };

    const handleSelect = () => {
        setSecletedComments((prev) => ({
            ...prev,
            [id]: comment,
        }));
    };

    const handleUnSelect = () => {
        setSecletedComments((prev) => {
            const selected = { ...prev };
            delete selected[id];
            return selected;
        });
    };

    const handleCopySingleComment = (comment) => {
        const SelectedCommentsString = [comment].reduce(
            (total, comment, i, arr) => {
                total += `${htmlToString(comment?.comment)}\n\n${
                    comment?.user?.name
                }, ${dayjs(comment?.created_date).format(
                    "MMM DD, YYYY, hh:mm A"
                )}`;

                if (i < arr.length - 1) {
                    total += "\n\n\n";
                }
                return total;
            },
            ``
        );
        // console.log({ allSelectedCommentsString });
        window.navigator.clipboard
            .writeText(SelectedCommentsString)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Comments copied successfully",
                    timer: 2000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                });
                // setSecletedComments({});
                // setScroll(prev=>!prev);
                setContextHolder(null);
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Comments didn't copied",
                    timer: 2000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                });
            })
            .finally(() => {
                //   setIsLoading(false);
            });
    };

    return (
        <div
            id={id}
            className={`${style.singleChat}`}
            style={{
                alignSelf: isCurrentUser(comment?.user?.id)
                    ? "flex-end"
                    : "flex-start",
            }}
        >
            {
                // <section
                //     style={{
                //         height: "10px",
                //         // backgroundColor: "black"
                //     }}
                // />
                handleTopSpace({
                    currentComment: comment,
                    previousComment: prevComment,
                })
            }
            <div
                style={{
                    display: "inline-flex",
                    // border:"solid",
                    gap: "0 6px",
                    flexDirection: isCurrentUser(comment?.user?.id)
                        ? "row-reverse"
                        : "row",
                }}
            >
                {[...Object.keys(selectedComments)].length > 0 ? (
                    <span
                        style={{
                            // border: "solid",
                            height: "28px",
                            // flex: "0 0 28px",
                            borderRadius: "28px",
                        }}
                        onClick={() => {
                            if (selectedComments[id]) {
                                handleUnSelect();
                            } else {
                                handleSelect();
                            }
                        }}
                    >
                        {selectedComments[id] ? <Select /> : <UnSelect />}
                    </span>
                ) : (
                    <></>
                )}
                <section
                    id="comment-card"
                    className={`${style.singleChat_comment_card}`}
                >
                    {/* {!isCurrentUser(comment?.user?.id) && (
                        <span
                            className={`${style.singleChat_comment_card_avator}`}
                        ></span>
                    )} */}
                    {handleSenderAvator({
                        currentComment: comment,
                        previousComment: prevComment,
                    })}
                    <article
                        id="comment-card-text "
                        className={`${style.singleChat_comment_card_text}`}
                    >
                        {/* comment sender info */}
                        {handleSenderInfo({
                            currentComment: comment,
                            previousComment: prevComment,
                        })}

                        {/* comment message box */}
                        {comment?.is_deleted ? (
                            <div
                                title={`${dayjs(comment?.created_date).format(
                                    "MMM DD, YYYY, hh:mm A"
                                )}`}
                                className={`${style.single_comment_deleted_container}`}
                            >
                                <section
                                    style={{
                                        borderBottom: showDeletedComment
                                            ? "0.15px solid #f8d0d39a"
                                            : "0",
                                        gap:
                                            currentUser.roleId === 1 ||
                                            currentUser.roleId === 8
                                                ? "0 20px"
                                                : "0",
                                        justifyContent:
                                            currentUser.roleId === 1 ||
                                            currentUser.roleId === 8
                                                ? "space-between"
                                                : "center",
                                    }}
                                    className={`${style.single_comment_deleted_title}`}
                                >
                                    <span>This Comment has been deleted</span>
                                    {currentUser.roleId === 1 ||
                                    currentUser.roleId === 8 ? (
                                        showDeletedComment ? (
                                            <FaEyeSlash
                                                onClick={() =>
                                                    setShowDeletedComment(false)
                                                }
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <FaEye
                                                onClick={() =>
                                                    setShowDeletedComment(true)
                                                }
                                                style={{ cursor: "pointer" }}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </section>
                                {showDeletedComment ? (
                                    <section
                                        className={`${style.single_comment_deleted_comment_body}`}
                                    >
                                        {/* mentioned comment */}
                                        {comment?.mention ? (
                                            <div
                                                // onContextMenu={(e) => {
                                                //     onContextMenu(e);
                                                //     setContextHolder(comment);
                                                // }}
                                                // onKeyDown={onKeyDown}
                                                style={{
                                                    // borderRadius:
                                                    //     comment?.comment
                                                    //         ? "5px 5px 0 0"
                                                    //         : "5px",
                                                    backgroundColor: "#FFF3F4",
                                                    color: "#F17B7C",
                                                    // border: "0.15px solid #f17b7dbb",
                                                    border: "none",
                                                    // borderBottom:
                                                    //     comment?.comment
                                                    //         ? "solid 1px #f17b7dbb"
                                                    //         : "solid 0.15px #f17b7dbb",
                                                }}
                                                className={`${style.singleChat_comment_card_mentioned_comment}`}
                                            >
                                                <HiReply
                                                    style={{ color: "#F17B7C" }}
                                                    className={`${style.chatInput_mentioned_comment_icon}`}
                                                />
                                                <article
                                                    className={`${style.chatInput_mentioned_comment_text_area}`}
                                                >
                                                    {comment?.mention
                                                        ?.comment ? (
                                                        <span
                                                            className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: comment
                                                                        ?.mention
                                                                        ?.comment,
                                                                }}
                                                            />
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {comment?.mention
                                                        ?.files_data?.length ? (
                                                        <span
                                                            className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
                                                        >
                                                            {comment?.mention?.files_data?.map(
                                                                (file, i) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`${style.chatInput_filePreview__file} shadow-sm`}
                                                                            style={{
                                                                                color: "#F17B7C",
                                                                            }}
                                                                        >
                                                                            <HandleFileIcon
                                                                                fileName={
                                                                                    file?.name
                                                                                }
                                                                                URL={
                                                                                    file?.url
                                                                                }
                                                                            />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <span
                                                        style={{
                                                            fontStyle: "italic",
                                                        }}
                                                        className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
                                                    >
                                                        {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
                                                        {`${
                                                            comment?.mention
                                                                ?.user?.name
                                                        }, ${dayjs(
                                                            comment?.mention
                                                                ?.created_date
                                                        ).format(
                                                            "MMM DD, YYYY, hh:mm A"
                                                        )}`}
                                                    </span>
                                                </article>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {/* comment text */}
                                        {comment?.comment ? (
                                            <div
                                                // onContextMenu={(e) => {
                                                //     onContextMenu(e);
                                                //     setContextHolder(comment);
                                                // }}
                                                // onKeyDown={onKeyDown}
                                                style={{
                                                    backgroundColor: "#FFF3F4",
                                                    color: "#F17B7C",
                                                    position: "relative",
                                                    // borderRadius:
                                                    //     comment?.mention
                                                    //         ? "0 0 5px 5px"
                                                    //         : "5px",
                                                    // border: "0.15px solid #f17b7dbb",
                                                    // borderTop:
                                                    // comment?.mention
                                                    // ? "none"
                                                    // : "0.15px solid #f17b7dbb",
                                                    padding: "0",
                                                    border: "none",
                                                }}
                                                className={`${style.singleChat_comment_card_text_message}`}
                                            >
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: comment?.comment,
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {/* file will be shown here */}
                                        {comment?.files_data?.length ? (
                                            <FileView
                                                // onContextMenu={(e) => {
                                                //     onContextMenu(e);
                                                //     setContextHolder(comment);
                                                // }}
                                                // onKeyDown={onKeyDown}
                                                isCurrentUser={isCurrentUser(
                                                    comment?.user?.id
                                                )}
                                                files={comment?.files_data}
                                                topMargin={!!comment?.comment}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </section>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <div
                                title={`${dayjs(comment?.created_date).format(
                                    "MMM DD, YYYY, hh:mm A"
                                )}`}
                                style={{
                                    alignSelf: isCurrentUser(comment?.user?.id)
                                        ? "flex-end"
                                        : "flex-start",
                                }}
                                className={`${
                                    style.singleChat_comment_card_text_container
                                } ${
                                    idMatch ? `${style.singleChat_match}` : ""
                                }`}
                            >
                                {/* mentioned comment */}
                                {comment?.mention ? (
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
                                            {comment?.mention?.comment ? (
                                                <span
                                                    className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: comment
                                                                ?.mention
                                                                .comment,
                                                        }}
                                                    />
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                            {comment?.mention?.files_data
                                                ?.length ? (
                                                <span
                                                    className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
                                                >
                                                    {comment?.mention?.files_data?.map(
                                                        (file, i) => {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className={`${style.chatInput_filePreview__file} shadow-sm`}
                                                                >
                                                                    <HandleFileIcon
                                                                        fileName={
                                                                            file?.name
                                                                        }
                                                                        URL={
                                                                            file?.url
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                            <span
                                                style={{ fontStyle: "italic" }}
                                                className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
                                            >
                                                {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
                                                {`${
                                                    comment?.mention?.user?.name
                                                }, ${dayjs(
                                                    comment?.mention
                                                        ?.mention_created_at
                                                ).format(
                                                    "MMM DD, YYYY, hh:mm A"
                                                )}`}
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
                                            borderRadius: comment?.mention
                                                ? "0 0 5px 5px"
                                                : "5px",
                                            borderTop: comment?.mention
                                                ? "none"
                                                : "0.15px solid #aaaaaa",
                                        }}
                                        className={`${style.singleChat_comment_card_text_message}`}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: comment?.comment,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {/* file will be shown here */}
                                {comment?.files_data?.length ? (
                                    <FileView
                                        onContextMenu={(e) => {
                                            onContextMenu(e);
                                            setContextHolder(comment);
                                        }}
                                        onKeyDown={onKeyDown}
                                        isCurrentUser={isCurrentUser(
                                            comment?.user?.id
                                        )}
                                        files={comment?.files_data}
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
                                        left: isCurrentUser(comment?.user?.id)
                                            ? "-14px"
                                            : "auto",
                                        right: isCurrentUser(comment?.user?.id)
                                            ? "auto"
                                            : "-14px",
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
                                            left: isCurrentUser(
                                                comment?.user?.id
                                            )
                                                ? "-98px"
                                                : "auto",
                                            right: isCurrentUser(
                                                comment?.user?.id
                                            )
                                                ? "auto"
                                                : "-98px",
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
                                            <span
                                                className={`${style.context_title}`}
                                            >
                                                Reply
                                            </span>
                                        </section>

                                        <section
                                            onClick={() => {
                                                setShowCommentMenu(false);
                                                handleSelect();
                                            }}
                                        >
                                            <TbMessage2Check
                                                className={`${style.context_icons}`}
                                            />
                                            <span
                                                className={`${style.context_title}`}
                                            >
                                                Select Message
                                            </span>
                                        </section>

                                        <section
                                            onClick={() => {
                                                setShowCommentMenu(false);
                                                handleCopySingleComment(
                                                    comment
                                                );
                                            }}
                                        >
                                            <MdOutlineContentCopy
                                                className={`${style.context_icons}`}
                                            />
                                            <span
                                                className={`${style.context_title}`}
                                            >
                                                Copy
                                            </span>
                                        </section>

                                        {isCurrentUser(comment?.user?.id) ? (
                                            <section
                                                onClick={() => {
                                                    setShowCommentMenu(false);
                                                    handleDeleteSingleComment(
                                                        comment
                                                    );
                                                }}
                                            >
                                                <IoMdCloseCircleOutline
                                                    className={`${style.context_icons}`}
                                                />
                                                <span
                                                    className={`${style.context_title}`}
                                                >
                                                    Remove
                                                </span>
                                            </section>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                    </article>
                </section>
            </div>
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
            {[...files]?.length ? (
                [...files]?.map((file, i) => {
                    return (
                        <div
                            key={i}
                            className={`${style.chatInput_filePreview__file} shadow-sm`}
                        >
                            <HandleFileIcon
                                fileName={file?.name}
                                URL={file?.url}
                            />
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </span>
    );
};

const Select = () => {
    return (
        <svg
            style={{
                cursor: "pointer",
            }}
            // onClick={onclick}
            id="Group_3960"
            data-name="Group 3960"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
        >
            <circle
                id="Ellipse_54"
                data-name="Ellipse 54"
                cx="14"
                cy="14"
                r="14"
                fill="#009cec"
            />
            <g
                id="Group_3829"
                data-name="Group 3829"
                transform="translate(4.278 5.251)"
            >
                <path
                    id="Path_1532"
                    data-name="Path 1532"
                    d="M6.361,6.861,5,8.222l4.861,4.861,9.722-9.722L18.222,2,9.861,10.361Z"
                    transform="translate(-0.139 -1.028)"
                    fill="#fff"
                />
                <path
                    id="Path_1533"
                    data-name="Path 1533"
                    d="M8.75,16.556a6.806,6.806,0,1,1,0-13.611,7.094,7.094,0,0,1,3.4.875l.972-1.653A8.758,8.758,0,0,0,0,9.75a8.75,8.75,0,0,0,17.5,0H15.556A6.764,6.764,0,0,1,8.75,16.556Z"
                    transform="translate(0 -1)"
                    fill="#fff"
                />
            </g>
        </svg>
    );
};

const UnSelect = () => {
    return (
        <svg
            style={{
                cursor: "pointer",
            }}
            // onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
        >
            <g
                id="Group_3961"
                data-name="Group 3961"
                transform="translate(0 -0.068)"
            >
                <circle
                    id="Ellipse_1044"
                    data-name="Ellipse 1044"
                    cx="14"
                    cy="14"
                    r="14"
                    transform="translate(0 0.068)"
                    fill="#009cec"
                />
                <g
                    id="Ellipse_1043"
                    data-name="Ellipse 1043"
                    transform="translate(7 7.068)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                >
                    <circle cx="7" cy="7" r="7" stroke="none" />
                    <circle cx="7" cy="7" r="7.75" fill="none" />
                </g>
            </g>
        </svg>
    );
};
