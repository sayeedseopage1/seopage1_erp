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
            return <FaFileImage />;
        case "pdf":
            return <FaFilePdf />;
        case "doc":
        case "docx":
            return <FaFileWord />;
        case "xls":
        case "xlsx":
            return <FaFileExcel />;
        case "ppt":
        case "pptx":
            return <FaFilePowerpoint />;
        default:
            return <FaFile />;
    }
}

export function shortenFileName(fileName) {
    const nameWithoutExtension = fileName?.substring(
        0,
        fileName?.lastIndexOf(".")
    );
    const extension = fileName?.substring(fileName?.lastIndexOf(".") + 1);
    if (nameWithoutExtension?.length > 5) {
        return (
            nameWithoutExtension?.substring(0, 4) +
            "..." +
            nameWithoutExtension?.charAt(nameWithoutExtension?.length - 1) +
            "." +
            extension
        );
    }
    return fileName;
}
