import {
    FaFileImage,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFilePowerpoint,
    FaFile,
} from "react-icons/fa";

export const validateUrl = (url) => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};

export function getFileIcon(extension) {
    switch (extension?.toLowerCase()) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
            return <FaFileImage size={24} />;
        case "pdf":
            return <FaFilePdf size={24} />;
        case "doc":
        case "docx":
            return <FaFileWord size={24} />;
        case "xls":
        case "xlsx":
            return <FaFileExcel size={24} />;
        case "ppt":
        case "pptx":
            return <FaFilePowerpoint size={24} />;
        default:
            return <FaFile size={24} />;
    }
}

export function shortenFileName(fileName) {
    const nameWithoutExtension = fileName?.substring(
        0,
        fileName?.lastIndexOf(".")
    );
    const extension = fileName?.substring(fileName?.lastIndexOf(".") + 1);
    if (nameWithoutExtension?.length > 3) {
        return (
            nameWithoutExtension?.substring(0, 2) +
            "..." +
            nameWithoutExtension?.charAt(nameWithoutExtension?.length - 1) +
            "." +
            extension
        );
    }
    return fileName;
}
