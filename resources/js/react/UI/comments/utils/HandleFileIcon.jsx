import React, { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import style from "../styles/comments.module.css";
import { useCommentContext } from "../CommentsBody";

export const handleFileUrl = (url, fileName, file) => {
    if (fileName) {
        const file_name = fileName.split(".");
        const [name, ext] = [
            file_name.slice(0, file_name.length - 1).join("."),
            file_name[file_name.length - 1],
        ];
        return [url, name, ext];
        console.log(fileName);
    } else if (file) {
        const file_name = file.name.split(".");
        const [name, ext] = [
            file_name.slice(0, file_name.length - 1).join("."),
            file_name[file_name.length - 1],
        ];
        return [URL.createObjectURL(file), name, ext];
    }
};

export const isImageFile = (extension) => {
    if (
        extension === "png" ||
        extension === "img" ||
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "svg" ||
        extension === "gif" ||
        extension === "webp"
    ) {
        return true;
    } else {
        return false;
    }
};

const isObjectURL = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "blob:";
};

const HandleFileIcon = ({ URL = "", fileName = "", file = null }) => {
    const {setIsImageModalOpen,setImageModalCurrentFileUrl} = useCommentContext();
    const selectFileComponent = ({ fileName = "", file = null }) => {
        const [url, name, ext] = handleFileUrl(URL, fileName, file);
        if (isImageFile(ext)) {
            return (
                <span
                    style={{
                        objectFit: "cover",
                        width: "69px",
                        height: "69px",
                        display: "flex",
                        overflow: "hidden",
                        borderRadius: "4px",
                    }}
                >
                    <img
                        title={`${name}.${ext}`}
                        onClick={() => {
                            if (isObjectURL(url)) {
                                window.open(url, "_blank");
                            } else {
                                setIsImageModalOpen(true);
                                // console.log(url);
                                setImageModalCurrentFileUrl(url);
                            }
                        }}
                        style={{
                            objectFit: "cover",
                            width: "69px",
                            // height: "51px",
                            height: "69px",
                        }}
                        src={url}
                        alt=""
                    />
                </span>
            );
        } else {
            return (
                <span
                    title={`${name}.${ext}`}
                    className={`${style.filePreview__notImg}`}
                    onClick={() => window.open(url, "_blank")}
                >
                    {/* <FaFile
                        className={`${style.chatInput_filePreview__file__fileIcon}`}
                    /> */}
                    <span
                        className={`${style.chatInput_filePreview__file__fileIcon}`}
                    >
                        <FileIcon extension={ext} {...defaultStyles[ext]} />
                    </span>
                    <p className={style.chatInput_filePreview__file__fileName}>
                        {name}.{ext}
                    </p>
                </span>
            );
        }
    };

    return selectFileComponent({ fileName, file });
};

export default HandleFileIcon;
