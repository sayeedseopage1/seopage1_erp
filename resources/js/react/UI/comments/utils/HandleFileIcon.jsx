import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import style from "../styles/comments.module.css";

const handleFileUrl = (fileName, file) => {
    if (fileName) {
        const file_name = fileName.split(".");
        const [name, ext] = [
            file_name.slice(0, file_name.length - 1).join("."),
            file_name[file_name.length - 1],
        ];
        return [`${name}.${ext}`, name, ext];
    } else if (file) {
        const file_name = file.name.split(".");
        const [name, ext] = [
            file_name.slice(0, file_name.length - 1).join("."),
            file_name[file_name.length - 1],
        ];
        return [URL.createObjectURL(file), name, ext];
    }
};

const HandleFileIcon = ({ fileName = "", file = null }) => {
    const selectFileComponent = ({ fileName = "", file = null }) => {
        const [url, name, ext] = handleFileUrl(fileName, file);
        if (
            // false
            ext === "img" ||
            ext === "png" ||
            ext === "jpg" ||
            ext === "jpeg" ||
            ext === "svg" ||
            ext === "gif" ||
            ext === "webp"
        ) {
            return (
                <span
                    style={{
                        objectFit: "cover",
                        width: "69px",
                        height: "51px",
                        display: "flex",
                    }}
                >
                    <img
                        title={`${name}.${ext}`}
                        onClick={() => window.open(url, "_blank")}
                        style={{
                            objectFit: "cover",
                            width: "69px",
                            height: "51px",
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
