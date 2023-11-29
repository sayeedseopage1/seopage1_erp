import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/quill.css";
import style from "../styles/comments.module.css";
import { FaFileCirclePlus } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaFile } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";

const ChatInput = () => {
    const [editorHtml, setEditorHtml] = useState("");
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log(files);
    }, [files]);

    return (
        <>
            <section className={`${style.chatInput}`}>
                <FilePreviewer files={files} setFiles={setFiles} />
                <CommentEditor
                    editorHtml={editorHtml}
                    setEditorHtml={setEditorHtml}
                    files={files}
                    show={show}
                    setShow={setShow}
                />
            </section>
            <FileUpload files={files} setFiles={setFiles} />
        </>
    );
};

export default ChatInput;

function FilePreviewer({ files, setFiles }) {
    const handlePreviewUrl = (file) => {
        return URL.createObjectURL(file);
    };

    const handleFileComponent = (file) => {
        const [type, ext] = file.type.split("/");
        console.log({ type, ext });

        switch (type) {
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
                            display:'flex',
                            flexFlow:'column nowrap',
                            justifyContent:'center',
                            gap:'5px'
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

    return files.length ? (
        <div className={`${style.chatInput_filePreview}`}>
            {files.map((file, i) => {
                return (
                    <div
                        key={i}
                        className={`${style.chatInput_filePreview__file}`}
                    >
                        {handleFileComponent(file)}
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

function CommentEditor({ show, setShow, files, editorHtml, setEditorHtml }) {
    const quillRef = useRef(null);

    useEffect(() => {
        const quill = quillRef.current.getEditor();

        // Access the Quill toolbar container
        const toolbar = quill.container.previousSibling;

        // Hide the toolbar
        toolbar.style.display = show ? "block" : "none";

        // You can show the toolbar by changing 'none' to 'block' or any other display value
        // toolbar.style.display = 'block';

        // Clean up when component unmounts
        return () => {
            quill.off("text-change"); // Optional: Unsubscribe from any event listeners
        };
    }, [show]);

    const modules = {
        toolbar: [["bold", "italic", "underline"]],
    };

    const formats = ["bold", "italic", "underline"];

    return (
        <div
            className={`${style.chatInput_text_input}`}
            style={{
                borderRadius: !(show || files.length)
                    ? "60px"
                    : "0 0 10px 10px",
                overflow: "hidden",
            }}
        >
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorHtml}
                onChange={(value) => setEditorHtml(value)}
                modules={modules}
                formats={formats}
                placeholder="Write your comment..."
            />
            {/* <BsEmojiSmile className={`${style.chatInput_text_emoji_icon}`} /> */}
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
