import React, { useRef } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";

const FileUpload = ({ handleFileChange, className }) => {
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={className}>
            <div onClick={handleIconClick}>
                <LiaFileUploadSolid style={customIconStyle} />
            </div>
            <input
                ref={fileInputRef}
                style={fileInputStyle}
                type="file"
                multiple
                // accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};
const fileInputStyle = {
    display: "none",
};

const customIconStyle = {
    cursor: "pointer",
    fontSize: "2em",
    color: "#589ae6",
    transition: "color 0.3s ease",
};
export default FileUpload;
