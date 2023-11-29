import React, { useEffect, useRef, useState } from "react";
import style from "../styles/comments.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { HiReply } from "react-icons/hi";
import { TbMessage2Check } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaFile } from "react-icons/fa6";
import _ from "lodash";

const SingleChat = ({ index, onContextMenu, onKeyDown, setScroll }) => {
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const menuRef = useRef(null);
    const menuBtnRef = useRef(null);

    const closeContext = () => {
        setShowCommentMenu(false);
    };

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
                                // onClick={selectAll}
                                >
                                    <HiReply
                                        className={`${style.context_icons}`}
                                    />
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
                    <FileView
                        isCurrentUser={isCurrentUser()}
                        files={_.fill(Array(3), {
                            type: "doc",
                            name: "file_name",
                        })}
                    />
                </article>
            </section>
        </div>
    );
};

export default SingleChat;

const FileView = ({ files, isCurrentUser }) => {
    const handlePreviewUrl = (file) => {
        return URL.createObjectURL(file);
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
                            {file.name}
                        </p>
                    </div>
                );
        }
    };

    return files?.length ? (
        <span
            style={{
                alignSelf: isCurrentUser ? "flex-end" : "flex-start",
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
                        {/* <IoMdCloseCircle
                            className={`${style.chatInput_filePreview__removeFile}`}
                            onClick={() => {
                                const newFiles = [...files];
                                newFiles.splice(i, 1);
                                setFiles(newFiles);
                            }}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                            }}
                        /> */}
                    </div>
                );
            })}
            {/* <label
                htmlFor="add-file"
                className={`${style.chatInput_filePreview__addFile}`}
            >
                <AiOutlinePlusSquare
                    style={{
                        height: "19.42px",
                        width: "19.42px",
                        color: "gray",
                    }}
                />
                <input
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    id="add-file"
                    onChange={(e) =>
                        setFiles((prev) => [
                            ...prev,
                            ...Object.values(e.target.files),
                        ])
                    }
                />
            </label> */}
        </span>
    ) : (
        <></>
    );
};
