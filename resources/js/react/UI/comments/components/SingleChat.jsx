import React, { useEffect, useRef, useState } from "react";
import style from "../styles/comments.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { HiReply } from "react-icons/hi";
import { TbMessage2Check } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SingleChat = ({ index, onContextMenu, onKeyDown, setScroll }) => {
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const menuRef = useRef(null);
    const menuBtnRef = useRef(null);

    const closeContext = ()=>{
        setShowCommentMenu(false);
    }

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
        document.addEventListener("contextmenu", closeContext)

        return () => {
            document.removeEventListener("contextmenu", closeContext)
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const isCurrentUser = () => {
        return index % 2 === 0;
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
                        Nafis, Nov 16,2023, 2:54 PM
                    </span>
                    <div
                        className={`${style.singleChat_comment_card_text_container}`}
                    >
                        <div
                            // onContextMenu={handleContextMenu}
                            onContextMenu={onContextMenu}
                            onKeyDown={onKeyDown}
                            style={{
                                position: "relative",
                            }}
                            className={`${style.singleChat_comment_card_text_message}`}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Assumenda, qui quaerat. Atque, odit temporibus
                            esse excepturi expedita aut eos repellendus.
                        </div>
                        <span
                            onClick={() => {
                                setScroll((prev) => !prev);
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
                                // onClick={selectAll}
                                >
                                    <HiReply className={`${style.context_icons}`} />
                                    <span className={`${style.context_title}`}>
                                        Reply
                                    </span>
                                </section>
                                <section
                                // onSelect={copyText}
                                >
                                    <TbMessage2Check
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Select Message
                                    </span>
                                </section>
                                <section
                                // onSelect={viewSource}
                                >
                                    <MdOutlineContentCopy
                                        className={`${style.context_icons}`}
                                    />
                                    <span className={`${style.context_title}`}>
                                        Copy
                                    </span>
                                </section>
                                <section
                                // onSelect={viewSource}
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
                    {/* <span
                        className={`${style.singleChat_comment_card_text_files}`}
                    >
                    </span> */}
                </article>
            </section>
        </div>
    );
};

export default SingleChat;
