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
import getTextContent, {
    getCommentInHtml,
    htmlToPreservedText,
    htmlToString,
} from "../utils/getTextContent";
import getFormattedTime, { checkSameDay } from "../utils/getFormattedTime";
import { TiCancel } from "react-icons/ti";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import "../styles/single-comment.css";

const currentUser = new User(window.Laravel.user);

const SingleChat = ({
    id,
    comment,
    prevComment,
    onContextMenu,
    onKeyDown,
    idMatch,
    handleDeleteSingleComment,
    selectMentionIndex,
    setSelectMentionIndex,
}) => {
    // console.log("comment in single chat", comment);
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

    const replaceCodeWithAnchor = (html) => {
        const modifiedHtml = html
            .replace(/<code>/g, '<a href="#">')
            .replace(/<\/code>/g, "</a>");
        return modifiedHtml;
    };
    const commentHtml = comment?.comment
        ? replaceCodeWithAnchor(comment.comment)
        : "";

    const gotoTarget = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        const targetArr = document.querySelectorAll(
            ".comment_text_container a"
        );
        targetArr.forEach((targetItem) => {
            targetItem.target = "_blank";
        });
    }, []);

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
                if (
                    checkSameDay(
                        dayjs(previousComment?.created_date),
                        dayjs(currentComment?.created_date)
                    )
                ) {
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
                            {`${dayjs(comment?.created_date).format(
                                "hh:mm A"
                            )}`}
                        </span>
                    );
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
                            {`${getFormattedTime(comment?.created_date)}`}
                        </span>
                    );
                }
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
                    {/* Nafis, Today, 2:54 PM */}
                    {/* Nafis, Yesterday, 2:54 PM */}
                    {/* Nafis, Monday, 2:54 PM */}
                    {/* Nafis, Tuesday, 2:54 PM */}
                    {/* Nafis, Wednessday, 2:54 PM */}
                    {/* Nafis, Thursday, 2:54 PM */}
                    {/* Nafis, Friday, 2:54 PM */}
                    {/* Nafis, Nov 16,2023, 2:54 PM */}
                    {`${comment?.user?.name}, ${getFormattedTime(
                        comment?.created_date
                    )}`}
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
        const SelectedCommentsString = `${htmlToPreservedText(
            comment.comment
        )}\n${comment?.user?.name}, ${dayjs(comment?.created_date).format(
            "MMM DD, YYYY, hh:mm A"
        )} `;

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
                {/* comment selection checkmark */}
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

                {/* comment card */}
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
                                className={`${
                                    style.single_comment_deleted_container
                                } ${
                                    selectMentionIndex === comment?.id
                                        ? `${style.singleChat_match}`
                                        : ""
                                }`}
                            >
                                <section
                                    style={{
                                        alignSelf: isCurrentUser(
                                            comment?.user?.id
                                        )
                                            ? "flex-end"
                                            : "flex-start",
                                        gap:
                                            currentUser.roleId === 1
                                                ? // || currentUser.roleId === 8
                                                  "0 15px"
                                                : "0",
                                        justifyContent:
                                            currentUser.roleId === 1
                                                ? // || currentUser.roleId === 8
                                                  "space-between"
                                                : "center",
                                        flexFlow: isCurrentUser(
                                            comment?.user?.id
                                        )
                                            ? "row-reverse"
                                            : "row",
                                    }}
                                    className={`${style.single_comment_deleted_title}`}
                                >
                                    <span
                                        style={{
                                            color:
                                                currentUser?.roleId === 1
                                                    ? showDeletedComment
                                                        ? "#aaaaaa"
                                                        : "red"
                                                    : "#aaaaaa",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        <TiCancel
                                            style={{
                                                height: "100%",
                                                width: "auto",
                                                margin: isCurrentUser(
                                                    comment?.user?.id
                                                )
                                                    ? "0 2px 2px 0"
                                                    : "0 2px 2px 2px",
                                                color:
                                                    currentUser?.roleId === 1
                                                        ? showDeletedComment
                                                            ? "#aaaaaa"
                                                            : "red"
                                                        : "#aaaaaa",
                                            }}
                                        />
                                        {isCurrentUser(comment?.user?.id)
                                            ? `You have deleted this comment, ${getFormattedTime(
                                                  comment?.deleted_at
                                              )}`
                                            : `This comment was deleted by ${
                                                  comment?.user?.name
                                              }, ${getFormattedTime(
                                                  comment?.deleted_at
                                              )}`}{" "}
                                    </span>
                                    {currentUser.roleId === 1 ? (
                                        // || currentUser.roleId === 8
                                        showDeletedComment ? (
                                            <IoEyeOffOutline
                                                onClick={() =>
                                                    setShowDeletedComment(false)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    height: "15px",
                                                    color: "#aaaaaa",
                                                }}
                                            />
                                        ) : (
                                            <IoEyeOutline
                                                onClick={() =>
                                                    setShowDeletedComment(true)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    height: "15px",
                                                    color: "#1D82F5",
                                                }}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </section>
                                {showDeletedComment ? (
                                    <section
                                        className={`${
                                            style.single_comment_deleted_comment_body
                                        } ${
                                            isCurrentUser(comment?.user?.id)
                                                ? style.single_comment_deleted_comment_body_right
                                                : style.single_comment_deleted_comment_body_left
                                        }`}
                                        style={{
                                            margin: isCurrentUser(
                                                comment?.user?.id
                                            )
                                                ? "0 11px 0 0"
                                                : "0 0 0 11px",
                                        }}
                                    >
                                        {/* mentioned comment */}
                                        {comment?.mention ? (
                                            <div
                                                onClick={() => {
                                                    setSelectMentionIndex(
                                                        comment?.mention?.id
                                                    );
                                                }}
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
                                                    // backgroundColor: "#FFF3F4",
                                                    // color: "#F17B7C",
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
                                                                id={id}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: comment
                                                                        ?.mention
                                                                        ?.comment,
                                                                }}
                                                                className="comment_text_container"
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
                                                                    // console.log(comment?.mention?.original_files);
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`${style.chatInput_filePreview__file} shadow-sm`}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        "transparent",
                                                                                    position:
                                                                                        "absolute",
                                                                                    top: "0",
                                                                                    right: "0",
                                                                                    bottom: "0",
                                                                                    left: "0",
                                                                                }}
                                                                            />
                                                                            <HandleFileIcon
                                                                                fileName={
                                                                                    comment
                                                                                        ?.mention
                                                                                        ?.original_files
                                                                                        ? comment
                                                                                              ?.mention
                                                                                              ?.original_files[
                                                                                              i
                                                                                          ]
                                                                                        : file.name
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
                                                        }, ${getFormattedTime(
                                                            comment?.mention
                                                                ?.mention_created_at
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
                                                    id={id}
                                                    dangerouslySetInnerHTML={{
                                                        __html: comment?.comment,
                                                    }}
                                                    className="comment_text_container"
                                                />
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {/* file will be shown here */}
                                        {comment?.files_data?.length ? (
                                            <FileView
                                                comment={comment}
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
                                } ${
                                    selectMentionIndex === comment?.id
                                        ? `${style.singleChat_match}`
                                        : ""
                                }`}
                            >
                                {/* mentioned comment */}
                                {comment?.mention ? (
                                    comment?.mention?.is_deleted ? (
                                        <div
                                            onClick={() =>
                                                setSelectMentionIndex(
                                                    comment?.mention?.id
                                                )
                                            }
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
                                            <article
                                                className={`${style.single_comment_deleted_comment_body}`}
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "red",
                                                    }}
                                                    className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                                                >
                                                    <TiCancel
                                                        style={{
                                                            height: "100%",
                                                            width: "auto",
                                                            margin: "0 2px 2px",
                                                            color: "#aaaaaa",
                                                        }}
                                                    />
                                                    {isCurrentUser(
                                                        comment?.user?.id
                                                    )
                                                        ? "You have deleted this comment"
                                                        : "This comment was deleted"}{" "}
                                                </span>
                                            </article>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                setSelectMentionIndex(
                                                    comment?.mention?.id
                                                )
                                            }
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
                                                            id={id}
                                                            dangerouslySetInnerHTML={{
                                                                __html: comment
                                                                    ?.mention
                                                                    .comment,
                                                            }}
                                                            className="comment_text_container"
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
                                                                // console.log(comment.original_files);
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`${style.chatInput_filePreview__file} shadow-sm`}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                backgroundColor:
                                                                                    "transparent",
                                                                                position:
                                                                                    "absolute",
                                                                                top: "0",
                                                                                right: "0",
                                                                                bottom: "0",
                                                                                left: "0",
                                                                            }}
                                                                        />
                                                                        <HandleFileIcon
                                                                            fileName={
                                                                                comment
                                                                                    ?.mention
                                                                                    ?.original_files
                                                                                    ? comment
                                                                                          ?.mention
                                                                                          ?.original_files[
                                                                                          i
                                                                                      ]
                                                                                    : file.name
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
                                                        comment?.mention?.user
                                                            ?.name
                                                    }, ${getFormattedTime(
                                                        comment?.mention
                                                            ?.mention_created_at
                                                    )}`}
                                                </span>
                                            </article>
                                        </div>
                                    )
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
                                            alignSelf: comment?.mention
                                                ? "stretch"
                                                : isCurrentUser(
                                                      comment?.user?.id
                                                  )
                                                ? "flex-end"
                                                : "flex-start",
                                        }}
                                        className={`${style.singleChat_comment_card_text_message}`}
                                    >
                                        <div
                                            id={id}
                                            dangerouslySetInnerHTML={{
                                                __html: comment?.comment,
                                            }}
                                            className="comment_text_container"
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {/* file will be shown here */}
                                {comment?.files_data?.length ? (
                                    <FileView
                                        comment={comment}
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

                                {/* custom more option */}
                                <CustomMoreOption
                                    comment={comment}
                                    isCurrentUser={isCurrentUser}
                                    setMentionedComment={setMentionedComment}
                                    handleSelect={handleSelect}
                                    handleCopySingleComment={
                                        handleCopySingleComment
                                    }
                                    handleDeleteSingleComment={
                                        handleDeleteSingleComment
                                    }
                                />
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
    comment,
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
                    // console.log(comment);
                    return (
                        <div
                            key={i}
                            className={`${style.chatInput_filePreview__file} shadow-sm`}
                        >
                            <HandleFileIcon
                                fileName={
                                    comment.original_files
                                        ? comment.original_files[i]
                                        : file.name
                                }
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

const MoreOption = ({
    setShowCommentMenu,
    showCommentMenu,
    isCurrentUser,
    comment,
    menuBtnRef,
    menuRef,
    setMentionedComment,
    handleSelect,
    handleCopySingleComment,
    handleDeleteSingleComment,
}) => {
    return (
        <>
            {/* comment more btn */}
            <span
                onClick={() => {
                    // setScroll((prev) => !prev);
                    setShowCommentMenu((prev) => !prev);
                }}
                style={{
                    left: isCurrentUser(comment?.user?.id) ? "-14px" : "auto",
                    right: isCurrentUser(comment?.user?.id) ? "auto" : "-14px",
                }}
                className={`${style.singleChat_comment_card_text_more_btn}`}
                ref={menuBtnRef}
            ></span>

            {/* comment more options */}
            {showCommentMenu ? (
                <div
                    ref={menuRef}
                    style={{
                        left: isCurrentUser(comment?.user?.id)
                            ? "-131.133px"
                            : "auto",
                        right: isCurrentUser(comment?.user?.id)
                            ? "auto"
                            : "-131.133px",
                    }}
                    className={style.singleChat_comment_card_text_more_options}
                >
                    <section
                        onClick={() => {
                            setShowCommentMenu(false);
                            setMentionedComment(comment);
                        }}
                    >
                        <HiReply className={`${style.context_icons}`} />
                        <span className={`${style.context_title}`}>Reply</span>
                    </section>

                    <section
                        onClick={() => {
                            setShowCommentMenu(false);
                            handleSelect();
                        }}
                    >
                        <TbMessage2Check className={`${style.context_icons}`} />
                        <span className={`${style.context_title}`}>
                            Select Message
                        </span>
                    </section>

                    <section
                        onClick={() => {
                            setShowCommentMenu(false);
                            handleCopySingleComment(comment);
                        }}
                    >
                        <MdOutlineContentCopy
                            className={`${style.context_icons}`}
                        />
                        <span className={`${style.context_title}`}>Copy</span>
                    </section>

                    {isCurrentUser(comment?.user?.id) ? (
                        <section
                            onClick={() => {
                                setShowCommentMenu(false);
                                handleDeleteSingleComment(comment);
                            }}
                        >
                            <IoMdCloseCircleOutline
                                className={`${style.context_icons}`}
                            />
                            <span className={`${style.context_title}`}>
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
        </>
    );
};

const CustomMoreOption = ({
    comment,
    isCurrentUser,
    setMentionedComment,
    handleSelect,
    handleCopySingleComment,
    handleDeleteSingleComment,
}) => {
    useEffect(() => {
        document.addEventListener("contextmenu", (e) => {
            $(".dropdown_btn").dropdown("hide");
        });
    }, []);

    return (
        <div
            style={{
                left: isCurrentUser(comment?.user?.id) ? "-15px" : "auto",
                right: isCurrentUser(comment?.user?.id) ? "auto" : "-15px",
            }}
            className={`${
                isCurrentUser(comment?.user?.id) ? "dropleft" : "dropright"
            } ${style.singleChat_comment_card_text_custom_more_btn_container}`}
        >
            <button
                id="dropdown_btn"
                type="button"
                className={`dropdown_btn ${style.singleChat_comment_card_text_custom_more_btn}`}
                data-toggle="dropdown"
                aria-expanded="false"
            >
                <FiMoreVertical
                    style={{
                        height: "15px",
                        width: "15px",
                    }}
                />
            </button>
            <div
                className={`dropdown-menu ${style.singleChat_comment_card_text_custom_more_options}`}
            >
                <section
                    onClick={() => {
                        // setShowCommentMenu(false);
                        setMentionedComment(comment);
                    }}
                >
                    <HiReply className={`${style.context_icons}`} />
                    <span className={`${style.context_title}`}>Reply</span>
                </section>

                <section
                    onClick={() => {
                        // setShowCommentMenu(false);
                        handleSelect();
                    }}
                >
                    <TbMessage2Check className={`${style.context_icons}`} />
                    <span className={`${style.context_title}`}>
                        Select Message
                    </span>
                </section>

                {comment?.comment ? (
                    <section
                        onClick={() => {
                            // setShowCommentMenu(false);
                            handleCopySingleComment(comment);
                        }}
                    >
                        <MdOutlineContentCopy
                            className={`${style.context_icons}`}
                        />
                        <span className={`${style.context_title}`}>Copy</span>
                    </section>
                ) : (
                    <></>
                )}

                {isCurrentUser(comment?.user?.id) ? (
                    <section
                        onClick={() => {
                            // setShowCommentMenu(false);
                            handleDeleteSingleComment(comment);
                        }}
                    >
                        <IoMdCloseCircleOutline
                            className={`${style.context_icons}`}
                        />
                        <span className={`${style.context_title}`}>Remove</span>
                    </section>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
