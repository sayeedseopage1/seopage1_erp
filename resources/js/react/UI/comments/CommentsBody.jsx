import React, { createContext, useContext, useEffect } from "react";
import style from "./styles/comments.module.css";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
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

const CommentContext = createContext({
    setScroll: ()=>{},
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
    console.log({param});
    const chatbottom_ref = useRef(null);
    
    // ============== ( CommentContext.Provider states ) ==============
    const [scroll, setScroll] = useState(false);
    const [selectedComments, setSecletedComments] = useState([]);
    const [mentionedComment, setMentionedComment] = useState(null);
    const [contextHolder, setContextHolder] = useState(null);
    // =================================================================

    const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
        <>
            <ContextMenuItem
                onSelect={()=>{
                  setMentionedComment(contextHolder);
                }}
            >
                <HiReply className={`context_icons`} />
                <span className={`context_title`}>Reply</span>
            </ContextMenuItem>
            <ContextMenuItem
            // onSelect={copyText}
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

    useEffect(() => {
        console.log({ mentionedComment });
    }, [mentionedComment]);

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
                    <img
                        className={style.commentsBody_header_btn}
                        src={commentRefresh}
                        alt=""
                    />
                    <img
                        className={style.commentsBody_header_btn}
                        src={commentSearch}
                        alt=""
                    />
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
                    <GiCancel
                        onClick={() => {
                            setFullScreenView(false);
                            close();
                        }}
                        className={`${style.commentsBody_header_btn} text-danger`}
                    />
                </header>

                <main
                    // ref={chatbottom_ref}
                    className={`${style.commentsBody_commentArea}`}
                >
                    {comments.map((comment, i) => {
                        return (
                            <SingleChat
                                setScroll={setScroll}
                                onContextMenu={onContextMenu}
                                onKeyDown={onKeyDown}
                                key={i}
                                comment={comment}
                            />
                        );
                    })}
                    <div ref={chatbottom_ref} />
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
