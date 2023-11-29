import React, { useEffect } from "react";
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


const CommentsBody = ({
    close,
    comments,
    fullScreenView,
    setFullScreenView,
}) => {
    const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
        <>
            <ContextMenuItem
            // onSelect={selectAll}
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
    // const menuRef = useRef(null);
    // const [contextMenu, setContextMenu] = useState({
    //     showMenu: false,
    //     position: { x: 0, y: 0 },
    // });

    // const handleContextMenu = (event) => {
    //     event.preventDefault();
    //     setContextMenu({
    //         showMenu: true,
    //         position: { x: event.clientX, y: event.clientY },
    //     });
    // };

    // const handleCloseContextMenu = () => {
    //     setContextMenu({ showMenu: false, position: { x: 0, y: 0 } });
    // };

    // const handleClickOutside = useCallback((event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         handleCloseContextMenu();
    //     }
    // },[handleCloseContextMenu]);

    // useEffect(()=>{
    //   console.log(contextMenu);
    // },[contextMenu])

    useEffect(() => {
        document.getElementById("chat-bottom-point").scrollIntoView();
    }, []);

    return (
        <div
            className={style.commentsBody}
            style={{
                backgroundImage:`url(${commentBg})`,
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

            <main className={`${style.commentsBody_commentArea}`}>
                {_.fill(Array(20), "*").map((v, i) => {
                    return (
                        <SingleChat
                            // handleContextMenu={handleContextMenu}
                            onContextMenu={onContextMenu}
                            onKeyDown={onKeyDown}
                            key={i}
                            index={i + 1}
                        />
                    );
                })}
                <div id="chat-bottom-point" />
                {/* <CustomContextMenu
                    showMenu={contextMenu.showMenu}
                    position={contextMenu.position}
                    onClose={handleCloseContextMenu}
                    handleClickOutside={handleClickOutside}
                    menuRef={menuRef}
                /> */}
                {contextMenu}
            </main>

            <footer className={`${style.commentsBody_inputField}`}>
                <ChatInput />
            </footer>
        </div>
    );
};

export default CommentsBody;

const CustomContextMenu = ({
    showMenu,
    position,
    onClose,
    handleClickOutside,
    menuRef,
}) => {
    // const menuRef = useRef(null);

    // const handleClickOutside = useCallback((event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         onClose();
    //     }
    // },[onClose]);

    // Close the menu when clicking outside of it
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        // document.addEventListener("contextmenu", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    if (!showMenu) return null;

    return (
        <div
            ref={menuRef}
            className={`${style.context_container}`}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                zIndex: "9999",
            }}
        >
            <ul>
                <li>Action 1</li>
                <li>Action 2</li>
                <li>Action 3</li>
            </ul>
        </div>
    );
};
