import React, { useEffect, useRef, useState } from "react";
import style from "../styles/comments.module.css";
import { FiMoreVertical } from "react-icons/fi";

const SingleChat = ({ index, handleContextMenu, onContextMenu, onKeyDown }) => {

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
                        <FiMoreVertical
                            // onClick={handleContextMenu}
                            style={{
                                left: isCurrentUser() ? "-14px" : "auto",
                                right: isCurrentUser() ? "auto" : "-14px",
                            }}
                            className={`${style.singleChat_comment_card_text_more}`}
                        />
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