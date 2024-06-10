import React from "react";
import { FaFileAlt } from "react-icons/fa"; // Import FontAwesome file icon
import { Flex } from "../../../react/global/styled-component/Flex";
const FileList = ({ links }) => {
    // Function to check if a URL is an image
    const isImage = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    };

    return (
        <div>
            <h6>File Lists:</h6>
            <Flex>
                {links?.map((link, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            {isImage(link) ? (
                                <img
                                    src={link}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        marginRight: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            ) : (
                                <FaFileAlt
                                    size={50}
                                    style={{
                                        marginRight: "10px",
                                        color: "#555",
                                    }}
                                />
                            )}
                            {/* <span>File {index + 1}</span> */}
                        </a>
                    </li>
                ))}
            </Flex>
        </div>
    );
};

export default FileList;
