import React, { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
const FileInputWithCustomIcon = ({ handleFileChange,className }) => {
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={className}>
            <div onClick={handleIconClick}>
                <FaCloudUploadAlt style={customIconStyle} />
            </div>
            <input
                ref={fileInputRef}
                style={fileInputStyle}
                type="file"
                multiple
                accept="image/*"
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
    fontSize: "4em",
    color: "green",
    transition: "color 0.3s ease",
};
export default FileInputWithCustomIcon;
