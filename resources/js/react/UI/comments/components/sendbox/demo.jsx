import React, { createContext, useContext, useEffect } from "react";
import style from "./styles/comments.module.css";
import "./editor.style.css";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import {
    IoIosArrowDown,
    IoIosArrowUp,
    IoMdCloseCircle,
    IoCustomRefresh,
} from "react-icons/io";
import commentRefresh from "./media/comment_refresh.svg";
import commentSearch from "./media/comment_search.svg";
// import commentClose from './media/comment_close.svg';
import commentBg from "./media/comments_body_bg.svg";
import commentBgPng from "./media/comments_body_bg.png";
import { GiCancel } from "react-icons/gi";
import SingleChat from "./components/SingleChat";
import ChatInput from "./components/ChatInput";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { ContextMenuItem, useContextMenu } from "use-context-menu";
import "use-context-menu/styles.css";
import "./styles/customContextMenu.css";
import { HiReply } from "react-icons/hi";
import { TbMessage2Check } from "react-icons/tb";
import { MdContentCopy, MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import _ from "lodash";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import isCurrentUser from "./utils/isCurrentUser";
import CommentsPlaceholder from "./utils/CommentsPlaceholder";
import getTextContent, {
    htmlToPreservedText,
    htmlToString,
} from "./utils/getTextContent";
import { useDeleteCommentsMutation } from "../../services/api/commentsApiSlice";
import { useParams } from "react-router-dom";
import ImageSliderModal from "./components/ImageSliderModal";
import { isHasPermissionForWriteComment } from "./utils/isHasPermissionForWriteComment";
import Sendbox from "./components/sendbox/Sendbox";
import axios from "axios";
import { useCommentStore } from "./zustand/store";

const CommentContext = createContext({
    setScroll: () => {},
    selectedComments: [],
    setSecletedComments: () => {},
    mentionedComment: {},
    setMentionedComment: () => {},
    contextHolder: {},
    setContextHolder: () => {},
    allComments: [],
    isImageModalOpen: false,
    setIsImageModalOpen: () => {},
    imageModalCurrentFileUrl: "",
    setImageModalCurrentFileUrl: () => {},
    refetchType: "",
    setRefetchType: () => {},
});
export function useCommentContext() {
    return useContext(CommentContext);
}

const CommentsBody = ({
    fullScreenView,
    setFullScreenView,
    isOpen,
    close,
    comments,
    loading,
    fetching,
    refetch,
    taskId,
    task,
    height,
    showFullScreenBtn = true,
    showCloseBtn = true,
    showCommentEditor = true,
    showSearchBtn = true,
    onSubmit = async () => null,
}) => {
    const { allComments, setAllComments } = useCommentStore();
    const param = useParams();
    const [deleteComments, { isLoading: deleteLoading }] =
        useDeleteCommentsMutation();
    const chatbottom_ref = useRef(null);
    const comments_ref = useRef(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchText, setSearchText] = useState("");

    const [commentIndex, setCommentIndex] = useState(0);
    const [searchIndexes, setSearchIndexes] = useState([]);
    const [animation, setAnimation] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [selectMentionIndex, setSelectMentionIndex] = useState(0);
    const [thisTask, setThisTask] = useState(null);

    // ============== ( CommentContext.Provider states ) ==============
    const [scroll, setScroll] = useState(false);
    const [selectedComments, setSecletedComments] = useState({});
    const [mentionedComment, setMentionedComment] = useState(null);
    const [contextHolder, setContextHolder] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageModalCurrentFileUrl, setImageModalCurrentFileUrl] =
        useState("");
    const [refetchType, setRefetchType] = useState("refetch");
    // =================================================================
    // fetch this task from api
    useEffect(() => {
        axios
            .get(`/account/task/${taskId}/json?mode=basic`)
            .then(({ data }) => {
                setThisTask(data.task);
            });
    }, []);

    useEffect(() => {
        setAllComments(comments);
    }, [comments]);

    const hnadleSelectComment = useCallback(() => {
        setSecletedComments((prev) => ({
            ...prev,
            [contextHolder.id]: contextHolder,
        }));
    }, [contextHolder]);

    const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
        <>
            <ContextMenuItem
                onSelect={() => {
                    setMentionedComment(contextHolder);
                }}
            >
                <HiReply className={`context_icons`} />
                <span className={`context_title`}>Reply</span>
            </ContextMenuItem>
            <ContextMenuItem
                onSelect={() => {
                    hnadleSelectComment();
                }}
            >
                <TbMessage2Check className={`context_icons`} />
                <span className={`context_title`}>Select Message</span>
            </ContextMenuItem>
            {contextHolder?.comment ? (
                <ContextMenuItem
                    onSelect={() => handleCopySingleComment(contextHolder)}
                >
                    <MdOutlineContentCopy className={`context_icons`} />
                    <span className={`context_title`}>Copy</span>
                </ContextMenuItem>
            ) : (
                <></>
            )}
            {isCurrentUser(contextHolder?.user_id) ? (
                <ContextMenuItem
                    onSelect={() => handleDeleteSingleComment(contextHolder)}
                >
                    <IoMdCloseCircleOutline className={`context_icons`} />
                    <span className={`context_title`}>Remove</span>
                </ContextMenuItem>
            ) : (
                <></>
            )}
        </>
    );

    // scroll to bottom feature
    useEffect(() => {
        let timer = setTimeout(() => {
            // chatbottom_ref.current?.scrollIntoView();
            chatbottom_ref.current?.scrollIntoView({
                // behavior: "smooth",
                block: "end",
            });
        }, 0);

        return () => clearTimeout(timer);
    }, [scroll, isOpen, comments, loading, fetching, isloading]);

    useEffect(() => {
        setSearchText("");
    }, [showSearchBar]);

    // scrolling to linked comment of search result
    useEffect(() => {
        if (commentIndex) {
            document
                .getElementById(
                    searchIndexes[searchIndexes.length - commentIndex]
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    // block: "",
                });
        } else {
            setScroll((prev) => !prev);
        }
    }, [commentIndex]);

    // scroll to the mention comment according to selection
    useEffect(() => {
        let time_ref;
        if (selectMentionIndex && param?.taskId) {
            document.getElementById(selectMentionIndex)?.scrollIntoView({
                behavior: "smooth",
                // block: "",
            });
            time_ref = setTimeout(() => {
                setSelectMentionIndex(0);
            }, 2000);
        }
        return () => {
            if (time_ref) {
                clearTimeout(time_ref);
            }
        };
    }, [selectMentionIndex]);

    const handleCopyComments = () => {
        // setIsLoading(true);
        const allSelectedComments = _.orderBy(
            Object.values(selectedComments),
            ["id"],
            ["asc"]
        );

        const allSelectedCommentsString = allSelectedComments.reduce(
            (total, comment, i, arr) => {
                total += `${htmlToPreservedText(comment?.comment)}\n${
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

        window.navigator.clipboard
            .writeText(allSelectedCommentsString)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Comments copied successfully",
                    timer: 2000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                });
                setSecletedComments({});
                setScroll((prev) => !prev);
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

    const handleDeleteComments = () => {
        const commentsId = Object.values({ ...selectedComments }).map(
            (comment) => comment.id
        );

        const deleteComments = async ({ commentsId }) => {
            await deleteComments({ commentsId })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Comments deleted successfully",
                        timer: 2000,
                        showConfirmButton: true,
                        timerProgressBar: true,
                    });
                    setSecletedComments({});
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "An error occured to delete comments",
                        timer: 2000,
                        showConfirmButton: true,
                        timerProgressBar: true,
                    });
                });
        };
        // setScroll(prev=>!prev);
        // refetch();
        // setIsLoading(false);

        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "If you click on Yes, the comment will be deleted. If you click on no, the comment will not be deleted.",
            showConfirmButton: true,
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            customClass: {
                confirmButton: "btn btn-primary",
            },
        }).then((res) => {
            if (res.isConfirmed) {
                deleteComments({ commentsId });
            }
        });
    };

    const handleCopySingleComment = (comment) => {
        let SelectedCommentsString;
        if (window.getSelection().toString()) {
            SelectedCommentsString = window.getSelection().toString();
        } else {
            SelectedCommentsString = `${htmlToPreservedText(
                comment.comment
            )}\n${comment?.user?.name}, ${dayjs(comment?.created_date).format(
                "MMM DD, YYYY, hh:mm A"
            )} `;
        }

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
            .finally(() => {});
    };

    const handleDeleteSingleComment = (comment) => {
        const deleteComment = async (commentId) => {
            await deleteComments({ commentsId: [commentId] })
                .then((res) => {
                    if (res.data.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: `${res.data.message}`,
                            timer: 2000,
                            showConfirmButton: true,
                            timerProgressBar: true,
                        });
                    } else if (res.data.status == 400) {
                        Swal.fire({
                            icon: "error",
                            title: `${res.data.comment}`,
                            timer: 2000,
                            showConfirmButton: true,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "An error occured to delete the comment",
                        timer: 2000,
                        showConfirmButton: true,
                        timerProgressBar: true,
                    });
                });
        };

        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "If you click on Yes, the comment will be deleted. If you click on no, the comment will not be deleted.",
            showConfirmButton: true,
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            customClass: {
                confirmButton: "btn btn-primary",
            },
        }).then((res) => {
            if (res.isConfirmed) {
                setRefetchType("");
                deleteComment(comment.id);
            }
        });
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);

        if (searchText) {
            const filteredComments = [...comments].filter(
                (comment) =>
                    !comment?.is_deleted &&
                    htmlToString(comment?.comment)
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            );

            setSearchIndexes(filteredComments.map((comment) => comment?.id));
            setCommentIndex(0);
            setAllComments(filteredComments);
        } else {
            setSearchIndexes([]);
            setCommentIndex(0);

            // Check if allComments is an array before calling map
            if (Array.isArray(allComments)) {
                setAllComments(allComments);
            } else {
                // Handle the case where allComments is not an array
                console.error("allComments is not an array");
            }
        }
    };

    return (
        <CommentContext.Provider
            value={{
                setScroll,
                selectedComments,
                setSecletedComments,
                mentionedComment,
                setMentionedComment,
                contextHolder,
                setContextHolder,
                allComments,
                isImageModalOpen,
                setIsImageModalOpen,
                imageModalCurrentFileUrl,
                setImageModalCurrentFileUrl,
                refetchType,
                setRefetchType,
            }}
        >
            <div
                className={style.commentsBody}
                style={{
                    backgroundImage: `url(${commentBg})`,
                    // backgroundImage:`url(https://seopage1storage.s3.ap-southeast-1.amazonaws.com/655f048a34e53.jpg)`,
                    // width: fullScreenView ? "100vw" : "auto",
                    width: fullScreenView ? "100%" : "auto",
                    // height: fullScreenView ? "99vh" : height,
                    height: fullScreenView ? "100%" : height,
                    // maxHeight: fullScreenView ? "99vh" : "auto",
                }}
            >
                <header className={style.commentsBody_header}>
                    {/* refresh btn */}
                    <span
                        onClick={() => {
                            setRefetchType("refetch");
                            refetch();
                        }}
                        className={style.commentsBody_header_btn}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                        >
                            <g
                                id="Group_3837"
                                data-name="Group 3837"
                                transform="translate(-837 -108)"
                            >
                                <circle
                                    id="Ellipse_1045"
                                    data-name="Ellipse 1045"
                                    cx="14"
                                    cy="14"
                                    r="14"
                                    transform="translate(837 108)"
                                    fill="#1d82f5"
                                />
                                <g
                                    id="reload"
                                    transform="translate(822.039 113.273)"
                                >
                                    <g
                                        id="Group_3836"
                                        data-name="Group 3836"
                                        transform="translate(20.982 0)"
                                    >
                                        <path
                                            id="Path_1534"
                                            data-name="Path 1534"
                                            d="M24.232,3.461a6.958,6.958,0,0,1,9.045-.239L31.206,3.3a.481.481,0,0,0,.018.962h.018l3.179-.118a.48.48,0,0,0,.463-.481V3.607h0L34.767.464A.481.481,0,1,0,33.8.5l.075,1.971a7.913,7.913,0,0,0-10.293.278,7.916,7.916,0,0,0-2.381,7.737.479.479,0,0,0,.467.367.417.417,0,0,0,.114-.014.482.482,0,0,0,.353-.581A6.954,6.954,0,0,1,24.232,3.461Z"
                                            transform="translate(-20.982 0)"
                                            fill="#fff"
                                        />
                                        <path
                                            id="Path_1535"
                                            data-name="Path 1535"
                                            d="M91.023,185.581a.481.481,0,0,0-.934.228A6.952,6.952,0,0,1,78.895,192.8l2.1-.189a.481.481,0,1,0-.089-.959l-3.168.285a.481.481,0,0,0-.435.524l.285,3.168a.48.48,0,0,0,.478.438.175.175,0,0,0,.043,0,.481.481,0,0,0,.435-.524l-.171-1.928a7.86,7.86,0,0,0,4.573,1.743c.135.007.271.011.4.011a7.915,7.915,0,0,0,7.68-9.783Z"
                                            transform="translate(-75.289 -178.613)"
                                            fill="#fff"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>

                    {!param?.taskId ? (
                        <span
                            onClick={() =>
                                window.open(
                                    `/account/tasks/${taskId}`,
                                    "_blank"
                                )
                            }
                            className={style.commentsBody_header_btn}
                        >
                            <svg
                                id="maximize"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                            >
                                <path
                                    id="Path_14871"
                                    data-name="Path 14871"
                                    d="M25.375,0H2.625A2.628,2.628,0,0,0,0,2.625V13.431a.875.875,0,0,0,1.75,0V2.625a.876.876,0,0,1,.875-.875h22.75a.876.876,0,0,1,.875.875v22.75a.876.876,0,0,1-.875.875H14.569a.875.875,0,0,0,0,1.75H25.375A2.628,2.628,0,0,0,28,25.375V2.625A2.628,2.628,0,0,0,25.375,0Z"
                                />
                                <path
                                    id="Path_14872"
                                    data-name="Path 14872"
                                    d="M9.625,18h-7A2.628,2.628,0,0,0,0,20.625v7A2.628,2.628,0,0,0,2.625,30.25h7a2.628,2.628,0,0,0,2.625-2.625v-7A2.628,2.628,0,0,0,9.625,18Zm.875,9.625a.876.876,0,0,1-.875.875h-7a.876.876,0,0,1-.875-.875v-7a.876.876,0,0,1,.875-.875h7a.876.876,0,0,1,.875.875Z"
                                    transform="translate(0 -2.25)"
                                />
                                <path
                                    id="Path_14873"
                                    data-name="Path 14873"
                                    d="M16.494,15.494,22,9.987v1.388a.875.875,0,0,0,1.75,0v-3.5A.889.889,0,0,0,22.875,7h-3.5a.875.875,0,1,0,0,1.75h1.388l-5.506,5.506a.875.875,0,0,0,0,1.237.886.886,0,0,0,1.237,0Z"
                                    transform="translate(-1.875 -0.875)"
                                />
                            </svg>
                        </span>
                    ) : (
                        <></>
                    )}

                    {showSearchBar ? (
                        <div
                            className={`${
                                style.commentsBody_header_searchBar_container
                            } ${animation ? style.open : style.close}`}
                        >
                            <input
                                value={searchText}
                                onChange={handleSearchTextChange}
                                placeholder="Search..."
                                className={`${style.commentsBody_header_searchBar}`}
                                type="text"
                            />
                            <section
                                className={`${style.commentsBody_header_searchBar_actions}`}
                            >
                                <IoIosArrowDown
                                    className={`${style.commentsBody_header_searchBar_actions_btn}`}
                                    onClick={() => {
                                        setCommentIndex((prev) => {
                                            if (prev > 0) {
                                                return prev - 1;
                                            } else {
                                                return prev;
                                            }
                                        });
                                    }}
                                />
                                <span
                                    className={`${style.commentsBody_header_searchBar_actions_text}`}
                                >
                                    {`${commentIndex} of ${searchIndexes.length}`}
                                </span>
                                <IoIosArrowUp
                                    className={`${style.commentsBody_header_searchBar_actions_btn}`}
                                    onClick={() => {
                                        setCommentIndex((prev) => {
                                            if (prev < searchIndexes.length) {
                                                return prev + 1;
                                            } else {
                                                return prev;
                                            }
                                        });
                                    }}
                                />
                            </section>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* search btn */}
                    {param?.taskId && showSearchBtn ? (
                        <span
                            onClick={() => {
                                if (showSearchBar) {
                                    setTimeout(() => {
                                        setShowSearchBar(false);
                                    }, 500);
                                    setAnimation(false);
                                } else {
                                    setShowSearchBar(true);
                                    setAnimation(true);
                                }
                            }}
                            className={style.commentsBody_header_btn}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="29"
                                height="29"
                                viewBox="0 0 29 29"
                            >
                                <path
                                    id="Search"
                                    d="M19.362,8.871a.674.674,0,1,1-.954.954,6.077,6.077,0,0,0-8.584,0,.674.674,0,0,1-.954-.954A7.427,7.427,0,0,1,19.362,8.871ZM33,30.3a2.7,2.7,0,0,1-4.6,1.907l-7.081-7.081a.674.674,0,0,1,0-.954l.954-.954-1.5-1.5a10.134,10.134,0,1,1,.954-.954l1.5,1.5.954-.954a.674.674,0,0,1,.954,0L32.21,28.4A2.678,2.678,0,0,1,33,30.3ZM22.884,14.116a8.767,8.767,0,1,0-8.767,8.767A8.777,8.777,0,0,0,22.884,14.116ZM31.651,30.3a1.34,1.34,0,0,0-.4-.954l-6.6-6.6-1.907,1.907,6.6,6.6a1.38,1.38,0,0,0,1.907,0,1.34,1.34,0,0,0,.4-.954Z"
                                    transform="translate(-4 -4)"
                                    fill="#727272"
                                />
                            </svg>
                        </span>
                    ) : (
                        <></>
                    )}

                    {/* full screen btn */}
                    {param?.taskId && showFullScreenBtn ? (
                        !fullScreenView ? (
                            <AiOutlineFullscreen
                                onClick={() => setFullScreenView(true)}
                                className={`${style.commentsBody_header_btn} ${style.fullscreen_icons}`}
                            />
                        ) : (
                            <AiOutlineFullscreenExit
                                onClick={() => setFullScreenView(false)}
                                className={`${style.commentsBody_header_btn} ${style.fullscreen_icons}`}
                            />
                        )
                    ) : (
                        <></>
                    )}

                    {/* cancel btn */}
                    {showCloseBtn ? (
                        <span
                            onClick={() => {
                                if (setFullScreenView) {
                                    setFullScreenView(false);
                                }
                                close();
                            }}
                            className={`${style.commentsBody_header_btn}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                                viewBox="15 7 28 28"
                            >
                                <defs>
                                    <filter
                                        id="Ellipse_58"
                                        x="0"
                                        y="0"
                                        width="58"
                                        height="58"
                                        filterUnits="userSpaceOnUse"
                                    >
                                        <feOffset dy="8" input="SourceAlpha" />
                                        <feGaussianBlur
                                            stdDeviation="5"
                                            result="blur"
                                        />
                                        <feFlood
                                            floodColor="#757575"
                                            floodOpacity="0.161"
                                        />
                                        <feComposite operator="in" in2="blur" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g
                                    id="Group_3644"
                                    data-name="Group 3644"
                                    transform="translate(-976 -145)"
                                >
                                    <g
                                        transform="matrix(1, 0, 0, 1, 976, 145)"
                                        filter="url(#Ellipse_58)"
                                    >
                                        <circle
                                            id="Ellipse_58-2"
                                            data-name="Ellipse 58"
                                            cx="14"
                                            cy="14"
                                            r="14"
                                            transform="translate(15 7)"
                                            fill="#df0b0b"
                                        />
                                    </g>
                                    <path
                                        id="remove_1_"
                                        data-name="remove (1)"
                                        d="M5.059,13A7.941,7.941,0,1,1,13,20.941,7.941,7.941,0,0,1,5.059,13ZM13,4a9,9,0,0,0,0,18,9.139,9.139,0,0,0,6.911-3.235A8.762,8.762,0,0,0,22,13,9,9,0,0,0,13,4ZM9.256,15.995,12.251,13,9.256,10.005,10,9.257,13,12.251l3-3,.748.748-3,3,3,3-.748.748-3-2.995L10,16.743Z"
                                        transform="translate(992 153)"
                                        fill="#fff"
                                        fillRule="evenodd"
                                    />
                                </g>
                            </svg>
                        </span>
                    ) : (
                        <></>
                    )}
                </header>

                <main
                    ref={comments_ref}
                    className={`position-relative ${style.commentsBody_commentArea}`}
                >
                    {/* {loading || isloading || deleteLoading ? ( */}
                    {(loading || fetching) && refetchType === "refetch" ? (
                        <CommentsPlaceholder />
                    ) : (
                        <>
                            {allComments?.map((comment, i) => {
                                return (
                                    <SingleChat
                                        idMatch={
                                            comment?.id ===
                                            searchIndexes[
                                                searchIndexes.length -
                                                    commentIndex
                                            ]
                                        }
                                        id={comment?.id}
                                        // comment_text_id={`${comment.id}_comment`}
                                        setScroll={setScroll}
                                        onContextMenu={onContextMenu}
                                        onKeyDown={onKeyDown}
                                        key={i}
                                        comment={comment}
                                        prevComment={
                                            i ? allComments[i - 1] : null
                                        }
                                        handleDeleteSingleComment={
                                            handleDeleteSingleComment
                                        }
                                        selectMentionIndex={selectMentionIndex}
                                        setSelectMentionIndex={
                                            setSelectMentionIndex
                                        }
                                    />
                                );
                            })}
                            {isloading || deleteLoading ? (
                                <div className="d-flex justify-content-center mt-2">
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    ></div>
                                </div>
                            ) : (
                                <></>
                            )}
                            {contextMenu}
                        </>
                    )}
                    <div
                        style={{
                            minHeight: "10px",
                            height: "10px",
                            // backgroundColor: "transparent",
                            position: "relative",
                            // backgroundColor: "black",
                        }}
                        ref={chatbottom_ref}
                    />
                    <ImageSliderModal
                        isOpen={isImageModalOpen}
                        close={() => setIsImageModalOpen(false)}
                        selectedImgUrl={imageModalCurrentFileUrl}
                        setSelectedImgUrl={setImageModalCurrentFileUrl}
                    />
                </main>
                {isHasPermissionForWriteComment({
                    assignTo: thisTask?.users[0],
                    assignBy: thisTask?.create_by,
                }) ? (
                    <footer className={`${style.commentsBody_inputField}`}>
                        <Sendbox
                            onSubmit={onSubmit}
                            taskId={taskId}
                            setScroll={setScroll}
                            setIsLoading={setIsLoading}
                        />
                    </footer>
                ) : null}

                {Object.keys(selectedComments).length > 0 ? (
                    <div
                        className={`${style.comments_selected_action_controller} ${style.open_action_controller}`}
                    >
                        {Object.values(selectedComments).every((comment) => {
                            return !!comment?.comment;
                        }) ? (
                            <section
                                className={`${style.comments_selected_action_controller_btn}`}
                            >
                                <span
                                    onClick={handleCopyComments}
                                    className={`${style.comments_selected_action_controller_btn_icon}`}
                                >
                                    {/* icon 1 */}
                                    <MdContentCopy
                                        style={{
                                            height: "19.02px",
                                            width: "16.01px",
                                        }}
                                    />
                                </span>
                                <span
                                    onClick={handleCopyComments}
                                    className={`${style.comments_selected_action_controller_btn_text}`}
                                >
                                    Copy
                                </span>
                            </section>
                        ) : (
                            <></>
                        )}
                        {Object.values(selectedComments).every((comment) => {
                            return isCurrentUser(comment?.user?.id);
                        }) ? (
                            <section
                                className={`${style.comments_selected_action_controller_btn}`}
                            >
                                {!deleteLoading ? (
                                    <>
                                        <span
                                            onClick={() =>
                                                handleDeleteComments()
                                            }
                                            className={`${style.comments_selected_action_controller_btn_icon}`}
                                        >
                                            {/* icon 2 */}
                                            <IoMdCloseCircleOutline
                                                style={{
                                                    height: "18.54px",
                                                    width: "18.54px",
                                                }}
                                            />
                                        </span>
                                        <span
                                            onClick={() =>
                                                handleDeleteComments()
                                            }
                                            className={`${style.comments_selected_action_controller_btn_text}`}
                                        >
                                            Remove
                                        </span>
                                    </>
                                ) : (
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    ></div>
                                )}
                            </section>
                        ) : (
                            <></>
                        )}
                        {/* <section
                    className={`${style.comments_selected_action_controller_btn}`}
                >
                    <span
                        className={`${style.comments_selected_action_controller_btn_icon}`}
                    ></span>
                    <span
                        className={`${style.comments_selected_action_controller_btn_text}`}
                    ></span>
                </section> */}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </CommentContext.Provider>
    );
};

export default CommentsBody;
