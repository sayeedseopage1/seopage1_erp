import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "react-quill/dist/quill.snow.css";
import "../styles/quill.css";
import style from "../styles/comments.module.css";
import { FaFileCirclePlus } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaFile } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { HiReply } from "react-icons/hi";
import { useCommentContext } from "../CommentsBody";
import { MdClose } from "react-icons/md";
import dayjs from "dayjs";
import HandleFileIcon from "../utils/HandleFileIcon";
import Swal from "sweetalert2";

const ChatInput = ({ setScroll }) => {
    const [editorHtml, setEditorHtml] = useState("");
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState([]);
    const {
        mentionedComment,
        setMentionedComment,
        setContextHolder,
        setSecletedComments,
    } = useCommentContext();

    const handleSendComment = () => {
        console.log({comment:editorHtml,files,mentioned:mentionedComment});
        Swal.fire({
            icon: "success",
            title: "Comment Sent",
            showConfirmButton: true,
            timer: 2000,
            timerProgressBar: true,
        });
        setSecletedComments({});
        setMentionedComment(null);
        setContextHolder(null);
        setEditorHtml("");
        setShow(false);
        setFiles([]);
        setScroll(prev=>!prev);
    };

    return (
        <>
            <section className={`${style.chatInput}`}>
                {mentionedComment ? <MentionedComment /> : <></>}
                <FilePreviewer files={files} setFiles={setFiles} />
                <CommentEditor
                    editorHtml={editorHtml}
                    setEditorHtml={setEditorHtml}
                    files={files}
                    show={show}
                    setShow={setShow}
                    // setShowEmoji={setShowEmoji}
                    // quillRef={quillRef}
                    // text={text}
                    // setText={setText}
                />
            </section>
            <section
                style={{
                    flexDirection:
                        show || files.length || mentionedComment
                            ? "column"
                            : "row",
                }}
                className={`${style.chatInput_actions_btn_container}`}
            >
                <FileUpload files={files} setFiles={setFiles} />
                <IoMdSend
                    onClick={handleSendComment}
                    className={`${style.chatInput_actions_btn_send}`}
                />
            </section>
        </>
    );
};

export default ChatInput;

function MentionedComment() {
    const { mentionedComment, setMentionedComment } = useCommentContext();

    return (
        <div
            style={{
                borderBottom: "solid 0.5px white",
            }}
            className={`${style.chatInput_mentioned_comment}`}
        >
            <HiReply className={`${style.chatInput_mentioned_comment_icon}`} />
            <MdClose
                onClick={() => {
                    setMentionedComment(null);
                }}
                className={`${style.chatInput_mentioned_comment_close_icon}`}
            />
            <article
                className={`${style.chatInput_mentioned_comment_text_area}`}
            >
                {mentionedComment?.comment ? (
                    <span
                        className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
                    >
                        {mentionedComment.comment}
                    </span>
                ) : (
                    <></>
                )}
                {mentionedComment?.files?.length ? (
                    <span
                        className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
                    >
                        {mentionedComment?.files?.map((file, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`${style.chatInput_filePreview__file} shadow-sm`}
                                >
                                    <HandleFileIcon fileName={file} />
                                </div>
                            );
                        })}
                    </span>
                ) : (
                    <></>
                )}
                <span
                    className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
                >
                    {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
                    {`${mentionedComment?.added_by_name}, ${dayjs(
                        mentionedComment?.created_at
                    ).format("MMM DD, YYYY, hh:mm A")}`}
                </span>
            </article>
        </div>
    );
}

function FilePreviewer({ files, setFiles }) {
    const { mentionedComment } = useCommentContext();

    return files.length ? (
        <div
            style={{
                borderRadius: mentionedComment ? "0" : "10px 10px 0 0",
                borderBottom: "solid 0.5px white",
            }}
            className={`${style.chatInput_filePreview}`}
        >
            {files.map((file, i) => {
                return (
                    <div
                        key={i}
                        className={`${style.chatInput_filePreview__file} shadow-sm`}
                    >
                        <HandleFileIcon file={file} />
                        <IoMdCloseCircle
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
                        />
                    </div>
                );
            })}
            <label
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
            </label>
        </div>
    ) : (
        <></>
    );
}

function CommentEditor({
    show,
    setShow,
    files,
    editorHtml,
    setEditorHtml,
}) {
    const quillRef = useRef(null);
    const { mentionedComment } = useCommentContext();
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        // Focus the Quill editor when the component is rendered
        if (quillRef.current && showEmoji) {
            quillRef.current.getEditor().focus();
            quillRef.current
                ?.getEditor()
                ?.setSelection(quillRef.current?.getEditor().getLength());
        }
    }, [showEmoji]);

    const handleEmojiSelection = (emoji, e) => {
        const quill = quillRef.current?.getEditor();
        const cursorPosition = quill?.getSelection()?.index;

        if (cursorPosition !== undefined) {
            // Insert the mention at the cursor position
            quill?.insertText(cursorPosition, `${emoji.emoji}`);
        }
    };

    useEffect(() => {
        const quill = quillRef.current.getEditor();

        // Access the Quill toolbar container
        const toolbar = quill.container.previousSibling;

        // Hide the toolbar
        toolbar.style.display = show ? "block" : "none";

        // Clean up when component unmounts
        return () => {
            quill.off("text-change"); // Optional: Unsubscribe from any event listeners
        };
    }, [show]);
    
const atValues = [
    { id: 1, value: 'Fredrik Sundqvist' },
    { id: 2, value: 'Patrik Sjölin' },
  ];
  const hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' },
  ];
  

    async function suggestPeople(searchTerm) {
        const allPeople = [
            {
                id: 1,
                value: "Fredrik Sundqvist",
            },
            {
                id: 2,
                value: "Patrik Sjölin",
            },
        ];
        return allPeople.filter((person) => person.value.includes(searchTerm));
    }

    const modules = {
        toolbar: [["bold", "italic", "underline", "strike", "link"]],
        // mention: {
        //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        //     mentionDenotationChars: ["@", "#"],
        //     source: async function (searchTerm, renderList) {
        //         console.log({searchTerm, renderList});
        //         const matchedPeople = await suggestPeople(searchTerm);
        //         renderList(matchedPeople);
        //     },
        // },
        // mention: {
        //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        //     mentionDenotationChars: ['@', '#'],
        //     source: function (searchTerm, renderList, mentionChar) {
        //       let values;
      
        //       if (mentionChar === '@') {
        //         values = atValues;
        //       } else {
        //         values = hashValues;
        //       }
      
        //       if (searchTerm.length === 0) {
        //         renderList(values, searchTerm);
        //       } else {
        //         const matches = [];
        //         for (let i = 0; i < values.length; i++)
        //           if (
        //             ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
        //           )
        //             matches.push(values[i]);
        //         renderList(matches, searchTerm);
        //       }
        //     },
        //   },
    };

    const formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "link",
        // "mention",
    ];

    return (
        <div
            className={`${style.chatInput_text_input}`}
            style={{
                borderRadius: `${(() => {
                    if (mentionedComment || files.length) {
                        return "0 0 10px 10px";
                        // !(show || files.length || mentionedComment)
                        // ? "40px"
                        // : "10px"
                    } else {
                        if (show) {
                            return "10px";
                        } else {
                            return "40px";
                        }
                    }
                })()}`,
                // overflow: "hidden",
            }}
        >
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorHtml}
                onChange={(value) => setEditorHtml(value)}
                modules={{ ...modules }}
                formats={formats}
                placeholder="Write your comment..."
                // onKeyUp={(e) => {
                //     console.log(e, quillRef?.current);
                //     if (quillRef?.current?.editor) {
                //       const delta = quillRef.current.editor.getContents();
                //       const html = quillRef.current.editor.root.innerHTML;
                //       console.log({ delta, html });
                //     }
                //   }}
            />
            <span
                // onClick={() => setShowEmoji((prev) => !prev)}
                style={{
                    bottom: show ? "14.16px" : "calc(50% - 7.66px)",
                }}
                className={`${style.chatInput_text_emoji_icon}`}
            >
                <BsEmojiSmile
                    onClick={() => setShowEmoji((prev) => !prev)}
                    style={{
                        height: "15.32px",
                        width: "15.32px",
                    }}
                />
                {showEmoji && (
                    <div className={`${style.chatInput_text_emojis}`}>
                        <EmojiPicker
                            width={"100%"}
                            height={"100%"}
                            skinTonesDisabled
                            emojiStyle="facebook"
                            onEmojiClick={handleEmojiSelection}
                        />
                    </div>
                )}
            </span>
            {!show ? (
                <LuPencilLine
                    onClick={() => setShow(true)}
                    className={`${style.chatInput_text_style_icon}`}
                />
            ) : (
                <IoChevronDownOutline
                    onClick={() => setShow(false)}
                    className={`${style.chatInput_text_style_icon}`}
                    style={{
                        bottom: "14.16px",
                    }}
                />
            )}
        </div>
    );
}

function FileUpload({ files, setFiles }) {
    return (
        <label
            className={`${style.chatInput_file_add_btn}`}
            htmlFor="file-input"
        >
            <FaFileCirclePlus
                style={{
                    height: "100%",
                    width: "100%",
                }}
            />
            {!files.length ? (
                <input
                    type="file"
                    id="file-input"
                    multiple
                    onChange={(e) =>
                        setFiles([...Object.values(e.target.files)])
                    }
                    style={{ display: "none" }}
                />
            ) : (
                <></>
            )}
        </label>
    );
}
