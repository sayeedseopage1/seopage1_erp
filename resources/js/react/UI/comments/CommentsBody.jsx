import React, { createContext, useContext, useEffect } from "react";
import style from "./styles/comments.module.css";
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
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import commentDemoData from "./_Data/commentDemoData";
import _ from "lodash";

const CommentContext = createContext({
    setScroll: () => {},
    selectedComments: [],
    setSecletedComments: () => {},
    mentionedComment: {},
    setMentionedComment: () => {},
    contextHolder: {},
    setContextHolder: () => {},
});
export function useCommentContext() {
    return useContext(CommentContext);
}

const comments = commentDemoData(20);

const CommentsBody = ({
    close,
    // comments,
    fullScreenView,
    setFullScreenView,
}) => {
    const param = useParams();
    // console.log({ param });
    const chatbottom_ref = useRef(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [allComments, setAllComments] = useState(comments);
    const [commentIndex, setCommentIndex] = useState(0);
    const [searchIndexes, setSearchIndexes] = useState([]);
    const [animation, setAnimation] = useState(false);

    // ============== ( CommentContext.Provider states ) ==============
    const [scroll, setScroll] = useState(false);
    const [selectedComments, setSecletedComments] = useState({});
    const [mentionedComment, setMentionedComment] = useState(null);
    const [contextHolder, setContextHolder] = useState(null);
    // =================================================================

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
                onSelect={()=>{
                  setSecletedComments((prev)=>({
                    ...prev,
                    [contextHolder.id]:contextHolder.user_id,
                }))
                }}
            >
                <TbMessage2Check className={`context_icons`} />
                <span className={`context_title`}>Select Message</span>
            </ContextMenuItem>
            <ContextMenuItem
            // onSelect={viewSource}
            >
                <MdOutlineContentCopy className={`context_icons`} />
                <span className={`context_title`}>Copy</span>
            </ContextMenuItem>
            <ContextMenuItem
            // onSelect={viewSource}
            >
                <IoMdCloseCircleOutline className={`context_icons`} />
                <span className={`context_title`}>Remove</span>
            </ContextMenuItem>
        </>
    );

    const getTextContent = (element) => {
        if (typeof element === "string") {
            return element;
        }

        if (Array.isArray(element)) {
            return element.map(getTextContent).join("");
        }

        if (React.isValidElement(element)) {
            const children = React.Children.toArray(element.props.children);
            return getTextContent(children);
        }

        return "";
    };

    useEffect(() => {
        // console.log("searchText :", searchText);
        if (searchText) {
            setAllComments(() => {
                const filteredComments = [...comments].filter((comment) => {
                    return getTextContent(comment.comment)
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                    // const textContent = getTextContent(comment.comment).toLowerCase();
                    // console.log(textContent);
                    // return true;
                });
                setSearchIndexes(
                    filteredComments.map((comment) => {
                        return comment.id;
                    })
                );
                setCommentIndex(0);
                return filteredComments;
            });
        } else {
            // setScroll((prev) => !prev);
            setSearchIndexes([]);
            setCommentIndex(0);
            setAllComments([...comments]);
        }
    }, [searchText]);

    useEffect(() => {
        // chatbottom_ref.current?.scrollIntoView();
        chatbottom_ref.current?.scrollIntoView({
            // behavior: "smooth",
            block: "end",
        });
    }, [scroll]);

    // useEffect(() => {
    //     console.log({ contextHolder });
    // }, [contextHolder]);

    // useEffect(() => {
    //     console.log({ mentionedComment });
    // }, [mentionedComment]);

    useEffect(() => {
        if (commentIndex) {
            document
                .getElementById(
                    searchIndexes[searchIndexes.length - commentIndex]
                )
                .scrollIntoView({
                    behavior: "smooth",
                    // block: "",
                });
        } else {
            setScroll((prev) => !prev);
        }
        // console.log(searchIndexes.length - commentIndex,searchIndexes[searchIndexes.length - commentIndex]);
    }, [commentIndex]);

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
            }}
        >
            <div
                className={style.commentsBody}
                style={{
                    backgroundImage: `url(${commentBg})`,
                    // backgroundImage:`url(https://seopage1storage.s3.ap-southeast-1.amazonaws.com/655f048a34e53.jpg)`,
                    width: fullScreenView ? "100vw" : "auto",
                    height: fullScreenView ? "99vh" : "84vh",
                    maxHeight: fullScreenView ? "99vh" : "auto",
                }}
            >
                <header className={style.commentsBody_header}>
                    {/* refresh btn */}
                    <span className={style.commentsBody_header_btn}>
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

                    {showSearchBar ? (
                    <div
                        className={`${
                            style.commentsBody_header_searchBar_container
                        } ${animation ? style.open : style.close}`}
                    >
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                    <span
                        onClick={()=>{
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
                    {!fullScreenView ? (
                        <AiOutlineFullscreen
                            onClick={() => setFullScreenView(true)}
                            className={`${style.commentsBody_header_btn} ${style.fullscreen_icons}`}
                        />
                    ) : (
                        <AiOutlineFullscreenExit
                            onClick={() => setFullScreenView(false)}
                            className={`${style.commentsBody_header_btn} ${style.fullscreen_icons}`}
                        />
                    )}

                    {/* cancel btn */}
                    <span
                        onClick={() => {
                            setFullScreenView(false);
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
                </header>

                <main
                    // ref={chatbottom_ref}
                    className={`${style.commentsBody_commentArea}`}
                >
                    {allComments.map((comment, i) => {
                        return (
                            <SingleChat
                                idMatch={
                                    comment.id ===
                                    searchIndexes[
                                        searchIndexes.length - commentIndex
                                    ]
                                }
                                id={comment.id}
                                // comment_text_id={`${comment.id}_comment`}
                                setScroll={setScroll}
                                onContextMenu={onContextMenu}
                                onKeyDown={onKeyDown}
                                key={i}
                                comment={comment}
                                prevComment={i?allComments[i-1]:null}
                            />
                        );
                    })}
                    <div
                        style={{
                            minHeight: "10px",
                            height: "10px",
                            backgroundColor: "transparent",
                        }}
                        ref={chatbottom_ref}
                    />
                    {contextMenu}
                </main>

                <footer className={`${style.commentsBody_inputField}`}>
                    <ChatInput setScroll={setScroll} />
                </footer>

                {!true && (
                    <div
                        className={`${style.comments_selected_action_controller}`}
                    >
                        <section
                            className={`${style.comments_selected_action_controller_btn}`}
                        >
                            <span
                                className={`${style.comments_selected_action_controller_btn_icon}`}
                            >
                                {/* icon 1 */}
                            </span>
                            <span
                                className={`${style.comments_selected_action_controller_btn_text}`}
                            >
                                Copy
                            </span>
                        </section>
                        <section
                            className={`${style.comments_selected_action_controller_btn}`}
                        >
                            <span
                                className={`${style.comments_selected_action_controller_btn_icon}`}
                            >
                                {/* icon 2 */}
                            </span>
                            <span
                                className={`${style.comments_selected_action_controller_btn_text}`}
                            >
                                Remove
                            </span>
                        </section>
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
                )}
            </div>
        </CommentContext.Provider>
    );
};

export default CommentsBody;
