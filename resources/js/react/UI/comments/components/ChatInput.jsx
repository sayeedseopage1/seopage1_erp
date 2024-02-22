// import React, { useEffect, useMemo, useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import "quill-mention";
// import "react-quill/dist/quill.snow.css";
// import "../styles/quill.css";
// import style from "../styles/comments.module.css";
// import { FaFileCirclePlus } from "react-icons/fa6";
// import { LuPencilLine } from "react-icons/lu";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
// import { AiOutlinePlusSquare } from "react-icons/ai";
// import { FaFile } from "react-icons/fa";
// import { BsEmojiSmile } from "react-icons/bs";
// import EmojiPicker, { Emoji } from "emoji-picker-react";
// import { HiReply } from "react-icons/hi";
// import { useCommentContext } from "../CommentsBody";
// import { MdClose } from "react-icons/md";
// import dayjs from "dayjs";
// import HandleFileIcon from "../utils/HandleFileIcon";
// import Swal from "sweetalert2";
// import { usePostCommentMutation } from "../../../services/api/commentsApiSlice";
// import { User } from "../utils/user-details";
// import getTextContent, {
//     getTrimmedHtml,
//     htmlToString,
// } from "../utils/getTextContent";
// import getFormattedTime from "../utils/getFormattedTime";
// import AutoLinker from 'autolinker';
// const currentUser = new User(window.Laravel.user);

// const ChatInput = ({ setScroll, taskId, setIsLoading, onSubmit }) => {
//     const [postComment, { isLoading }] = usePostCommentMutation();
//     const [showEmoji, setShowEmoji] = useState(false);
//     const [buttonClick, setButtonClick] = useState();
//     const [editorHtml, setEditorHtml] = useState("");
//     const [show, setShow] = useState(false);
//     const [files, setFiles] = useState([]);
//     const {
//         mentionedComment,
//         setMentionedComment,
//         setContextHolder,
//         setSecletedComments,
//     } = useCommentContext();

//     useEffect(() => {
//         setIsLoading(isLoading);
//     }, [isLoading]);

//     const handleSendComment = async ({ onEnter = false }) => {
//         if (!htmlToString(editorHtml) && !files.length) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Enter your comment or attachment",
//                 showConfirmButton: true,
//                 timer: 2000,
//                 timerProgressBar: true,
//             });
//             return;
//         }

//         const formdata = new FormData();
//         formdata.append(
//             "_token",
//             document
//                 .querySelector("meta[name='csrf-token']")
//                 .getAttribute("content")
//         );

//         const comment = AutoLinker.link(editorHtml); // convert link text to link

//         formdata.append(
//             "comment",
//             htmlToString(comment)
//                 ? onEnter
//                     ? getTrimmedHtml(comment)
//                     : comment
//                 : ""
//         );
//         formdata.append("user_id", currentUser.id);
//         formdata.append("task_id", taskId);
//         formdata.append("added_by", currentUser.id);
//         formdata.append("last_updated_by", currentUser.id);
//         formdata.append("mention_id", mentionedComment?.id || null);
//         if (files.length) {
//             Array.from(files).forEach((file) => {
//                 formdata.append(`file[]`, file);
//             });
//         }

//         // const result = {};
//         // for (const data of formdata.entries()) {
//         //     result[data[0]] = data[1];
//         //     // console.log(`${data[0]} : ${data[1]}`);
//         // }
//         // console.log(result);

//         try {
//             await postComment({ taskId, data: formdata });
//             await onSubmit(formdata);
//             // Swal.fire({
//             //     icon: "success",
//             //     title: "Comment Sent",
//             //     showConfirmButton: true,
//             //     timer: 2000,
//             //     timerProgressBar: true,
//             // });
//         } catch (err) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Comment not sent",
//                 showConfirmButton: true,
//                 confirmButtonColor: "red",
//             });
//         }

//         setSecletedComments({});
//         setMentionedComment(null);
//         setContextHolder(null);
//         setEditorHtml("");
//         setShow(false);
//         setShowEmoji(false);
//         setFiles([]);
//         setScroll((prev) => !prev);
//     };

//     useEffect(() => {
//         // if (buttonClick?.shiftKey && buttonClick?.keyCode === 13) {
//         //     return ;
//         // }
//         // console.log(buttonClick);
//         if (buttonClick?.keyCode === 13 && !buttonClick?.shiftKey) {
//             handleSendComment({ onEnter: true });
//         }
//     }, [buttonClick]);

//     return (
//         <>
//             <section className={`${style.chatInput}`}>
//                 {mentionedComment ? <MentionedComment /> : <></>}
//                 <FilePreviewer files={files} setFiles={setFiles} />
//                 <CommentEditor
//                     editorHtml={editorHtml}
//                     setEditorHtml={setEditorHtml}
//                     files={files}
//                     show={show}
//                     setShow={setShow}
//                     setShowEmoji={setShowEmoji}
//                     showEmoji={showEmoji}
//                     buttonClick={buttonClick}
//                     setButtonClick={setButtonClick}
//                     isLoading={isLoading}
//                 />
//             </section>
//             <section
//                 style={{
//                     flexDirection:
//                         show || files.length || mentionedComment
//                             ? // || isEditorHeightIncrease
//                               "column"
//                             : "row",
//                 }}
//                 className={`${style.chatInput_actions_btn_container}`}
//             >
//                 <FileUpload files={files} setFiles={setFiles} />
//                 <IoMdSend
//                     onClick={handleSendComment}
//                     className={`${style.chatInput_actions_btn_send}`}
//                 />
//             </section>
//         </>
//     );
// };

// export default ChatInput;

// function MentionedComment() {
//     const { mentionedComment, setMentionedComment } = useCommentContext();

//     // console.log({mentionedComment});
//     return (
//         <div
//             style={{
//                 borderBottom: "solid 0.5px white",
//             }}
//             className={`${style.chatInput_mentioned_comment}`}
//         >
//             <HiReply className={`${style.chatInput_mentioned_comment_icon}`} />
//             <MdClose
//                 onClick={() => {
//                     setMentionedComment(null);
//                 }}
//                 className={`${style.chatInput_mentioned_comment_close_icon}`}
//             />
//             <article
//                 className={`${style.chatInput_mentioned_comment_text_area}`}
//             >
//                 {mentionedComment?.comment ? (
//                     <span
//                         className={`${style.chatInput_mentioned_comment_text_area_mssg}`}
//                     >
//                         <div
//                             dangerouslySetInnerHTML={{
//                                 __html: mentionedComment?.comment,
//                             }}
//                         />
//                     </span>
//                 ) : (
//                     <></>
//                 )}

//                 {mentionedComment?.files_data?.length ? (
//                     <span
//                         className={`${style.chatInput_mentioned_comment_text_area_attachments}`}
//                     >
//                         {/* {console.log("=>", mentionedComment)} */}
//                         {mentionedComment?.files_data?.map((file, i) => {
//                             return (
//                                 <div
//                                     key={i}
//                                     className={`${style.chatInput_filePreview__file} shadow-sm`}
//                                 >
//                                     <HandleFileIcon
//                                         fileName={
//                                             mentionedComment?.original_files
//                                                 ? mentionedComment
//                                                       ?.original_files[i]
//                                                 : file.name
//                                         }
//                                         URL={file?.url}
//                                     />
//                                 </div>
//                             );
//                         })}
//                     </span>
//                 ) : (
//                     <></>
//                 )}
//                 <span
//                     className={`${style.chatInput_mentioned_comment_text_area_sender_time}`}
//                 >
//                     {/* Nafis, 30 Nov, 2023 at 3:15 PM */}
//                     {`${mentionedComment?.user?.name}, ${getFormattedTime(
//                         mentionedComment?.created_date
//                     )}`}
//                 </span>
//             </article>
//         </div>
//     );
// }

// function FilePreviewer({ files, setFiles }) {
//     const { mentionedComment } = useCommentContext();

//     return files.length ? (
//         <div
//             style={{
//                 borderRadius: mentionedComment ? "0" : "10px 10px 0 0",
//                 borderBottom: "solid 0.5px white",
//             }}
//             className={`${style.chatInput_filePreview}`}
//         >
//             {files.map((file, i) => {
//                 return (
//                     <div
//                         key={i}
//                         className={`${style.chatInput_filePreview__file} shadow-sm`}
//                     >
//                         <HandleFileIcon file={file} />
//                         <IoMdCloseCircle
//                             className={`${style.chatInput_filePreview__removeFile}`}
//                             onClick={() => {
//                                 const newFiles = [...files];
//                                 newFiles.splice(i, 1);
//                                 setFiles(newFiles);
//                             }}
//                             style={{
//                                 cursor: "pointer",
//                                 position: "absolute",
//                                 top: "5px",
//                                 right: "5px",
//                             }}
//                         />
//                     </div>
//                 );
//             })}
//             <label
//                 htmlFor="add-file"
//                 className={`${style.chatInput_filePreview__addFile}`}
//             >
//                 <AiOutlinePlusSquare
//                     style={{
//                         height: "19.42px",
//                         width: "19.42px",
//                         color: "gray",
//                     }}
//                 />
//                 <input
//                     style={{ display: "none" }}
//                     type="file"
//                     multiple
//                     id="add-file"
//                     onChange={(e) =>
//                         setFiles((prev) => [
//                             ...prev,
//                             ...Object.values(e.target.files),
//                         ])
//                     }
//                 />
//             </label>
//         </div>
//     ) : (
//         <></>
//     );
// }

// function CommentEditor({
//     show,
//     setShow,
//     files,
//     editorHtml,
//     setEditorHtml,
//     showEmoji,
//     setShowEmoji,
//     buttonClick,
//     setButtonClick,
//     isLoading,
// }) {
//     const quillRef = useRef(null);
//     const { mentionedComment } = useCommentContext();
//     const [value, setValue] = useState("");

//     // const [showEmoji, setShowEmoji] = useState(false);

//     // useEffect(() => {
//     //     document.getElementById("quill").addEventListener("keydown", (e) => {
//     //         if (e.key === "Enter" && !e.shiftKey) {
//     //             setValue((prev) => prev);
//     //         } else {
//     //             setValue(editorHtml);
//     //         }
//     //     });
//     // }, [editorHtml]);

//     // useEffect(() => {
//     //     console.log(editorHtml);
//     // }, [editorHtml]);

//     // useEffect(() => {
//     //     if (!(!buttonClick?.shiftKey && buttonClick?.keyCode === 13)) {
//     //         setValue(editorHtml);
//     //     }
//     // }, [buttonClick]);

//     useEffect(() => {
//         // Focus the Quill editor when the component is rendered
//         if (quillRef.current && showEmoji) {
//             quillRef.current.getEditor().focus();
//             quillRef.current
//                 ?.getEditor()
//                 ?.setSelection(quillRef.current?.getEditor().getLength());
//         }
//     }, [showEmoji]);

//     const handleEmojiSelection = (emoji, e) => {
//         // console.log(emoji);
//         // console.log(quillRef?.current);

//         const quill = quillRef.current?.getEditor();
//         const cursorPosition = quill?.getSelection()?.index;

//         if (cursorPosition !== undefined && emoji.imageUrl) {
//             // Insert the mention at the cursor position
//             quill?.insertText(cursorPosition, `${emoji.emoji}`);
//             // quill?.insertEmbed(cursorPosition, 'image', emoji.imageUrl);
//             // <img src="" alt="" />
//         }
//     };

//     useEffect(() => {
//         const quill = quillRef.current.getEditor();

//         // Access the Quill toolbar container
//         const toolbar = quill.container.previousSibling;

//         // Hide the toolbar
//         toolbar.style.display = show ? "block" : "none";

//         // Clean up when component unmounts
//         return () => {
//             quill.off("text-change"); // Optional: Unsubscribe from any event listeners
//         };
//     }, [show]);

//     const atValues = [
//         { id: 1, value: "Fredrik Sundqvist" },
//         { id: 2, value: "Patrik Sjölin" },
//     ];
//     const hashValues = [
//         { id: 3, value: "Fredrik Sundqvist 2" },
//         { id: 4, value: "Patrik Sjölin 2" },
//     ];

//     async function suggestPeople(searchTerm) {
//         const allPeople = [
//             {
//                 id: 1,
//                 value: "Fredrik Sundqvist",
//             },
//             {
//                 id: 2,
//                 value: "Patrik Sjölin",
//             },
//         ];
//         return allPeople.filter((person) => person.value.includes(searchTerm));
//     }

//     // console.log(ReactQuill)

//     const modules = {
//         toolbar: [
//             [
//                 "bold",
//                 "italic",
//                 "underline",
//                 "strike",
//                 // "link"
//             ],
//         ],
//         // clipboard: {
//         //     matchVisual: false,
//         // },
//         // keyboard: {
//         //     bindings: {
//         //         // Intercept the Enter key event
//         //         enter: {
//         //             key: 13,
//         //             handler: function (range, context) {
//         //                 // Prevent the default behavior (inserting a new line)
//         //                 return true;
//         //             },
//         //         },
//         //     },
//         // },
//         // mention: {
//         //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//         //     mentionDenotationChars: ["@", "#"],
//         //     source: async function (searchTerm, renderList) {
//         //         console.log({searchTerm, renderList});
//         //         const matchedPeople = await suggestPeople(searchTerm);
//         //         renderList(matchedPeople);
//         //     },
//         // },
//         // mention: {
//         //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//         //     mentionDenotationChars: ['@', '#'],
//         //     source: function (searchTerm, renderList, mentionChar) {
//         //       let values;

//         //       if (mentionChar === '@') {
//         //         values = atValues;
//         //       } else {
//         //         values = hashValues;
//         //       }

//         //       if (searchTerm.length === 0) {
//         //         renderList(values, searchTerm);
//         //       } else {
//         //         const matches = [];
//         //         for (let i = 0; i < values.length; i++)
//         //           if (
//         //             ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
//         //           )
//         //             matches.push(values[i]);
//         //         renderList(matches, searchTerm);
//         //       }
//         //     },
//         //   },
//     };

//     const formats = [
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         // "link",
//         // "mention",
//     ];

//     const checkPressedBtn = () => {
//         return new Promise((resolve, reject) => {
//             document
//                 .getElementById("quill")
//                 .addEventListener("keydown", (e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                         reject({ acceptToSubmit: true });
//                         return;
//                     } else {
//                         resolve({ acceptToSubmit: false });
//                         return;
//                     }
//                 });
//         });
//     };

//     return (
//         <div
//             id="editor_container"
//             className={`${style.chatInput_text_input}`}
//             style={{
//                 borderRadius: `${(() => {
//                     if (mentionedComment || files.length) {
//                         return "0 0 10px 10px";
//                         // !(show || files.length || mentionedComment)
//                         // ? "40px"
//                         // : "10px"
//                     } else {
//                         if (show) {
//                             return "10px";
//                         } else {
//                             return "40px";
//                         }
//                     }
//                 })()}`,
//                 // overflow: "hidden",
//             }}
//         >
//             <ReactQuill
//                 id="quill"
//                 ref={quillRef}
//                 theme="snow"
//                 value={editorHtml}
//                 // value={value}
//                 onKeyDown={(e) => {
//                     // e.preventDefault();
//                     setButtonClick(e);
//                 }}
//                 // onKeyDown={(e) => {
//                 //     e.preventDefault();
//                 //     console.log("key down", e);
//                 // }}
//                 // onKeyPress={(e) => {
//                 //     e.preventDefault();
//                 //     console.log("key press", e);
//                 // }}
//                 // onKeyUp={(e) => {
//                 //     e.preventDefault();
//                 //     console.log("key up", e);
//                 // }}
//                 onChange={(value) => setEditorHtml(value)}
//                 modules={{
//                     ...modules,
//                 }}
//                 formats={formats}
//                 placeholder="Write your comment..."
//                 readOnly={isLoading}
//             />
//             <span
//                 // onClick={() => setShowEmoji((prev) => !prev)}
//                 style={{
//                     bottom: show ? "14.16px" : "calc(50% - 7.66px)",
//                 }}
//                 className={`${style.chatInput_text_emoji_icon}`}
//             >
//                 <BsEmojiSmile
//                     onClick={() => setShowEmoji((prev) => !prev)}
//                     style={{
//                         height: "15.32px",
//                         width: "15.32px",
//                     }}
//                 />
//                 {showEmoji && (
//                     <div className={`${style.chatInput_text_emojis}`}>
//                         <EmojiPicker
//                             width={"100%"}
//                             height={"100%"}
//                             skinTonesDisabled
//                             emojiStyle="facebook"
//                             onEmojiClick={handleEmojiSelection}
//                         />
//                     </div>
//                 )}
//             </span>
//             {!show ? (
//                 <LuPencilLine
//                     onClick={() => setShow(true)}
//                     className={`${style.chatInput_text_style_icon}`}
//                 />
//             ) : (
//                 <IoChevronDownOutline
//                     onClick={() => setShow(false)}
//                     className={`${style.chatInput_text_style_icon}`}
//                     style={{
//                         bottom: "14.16px",
//                     }}
//                 />
//             )}
//         </div>
//     );
// }

// function FileUpload({ files, setFiles }) {
//     return (
//         <label
//             className={`${style.chatInput_file_add_btn}`}
//             htmlFor="file-input"
//         >
//             <FaFileCirclePlus
//                 style={{
//                     height: "100%",
//                     width: "100%",
//                 }}
//             />
//             {/* {!files.length ? ( */}
//             <input
//                 type="file"
//                 id="file-input"
//                 multiple
//                 onChange={(e) => {
//                     setFiles([...Object.values(e.target.files)]);
//                     e.target.value = "";
//                 }}
//                 style={{ display: "none" }}
//             />
//             {/* ) : (
//                 <></>
//             )} */}
//         </label>
//     );
// }
