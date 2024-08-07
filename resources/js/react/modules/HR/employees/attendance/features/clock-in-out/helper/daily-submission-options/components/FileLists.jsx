import React from "react";
import { FaFileAlt } from "react-icons/fa"; // Import FontAwesome file icon
import { Flex } from "../../../../../../../../../global/styled-component/Flex";

const FileLists = ({ links }) => {
    // Function to check if a URL is an image
    const isImage = (url) => {
        // return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
        return false;
    };

    return (
        <div>
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
                            // href={link?.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                            title={link?.name}
                        >
                            {isImage(link?.name) ? (
                                <img
                                    // src={link?.name}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        objectFit: "cover",
                                        marginRight: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                    title={link?.name}
                                />
                            ) : (
                                <FaFileAlt
                                    size={25}
                                    style={{
                                        marginRight: "10px",
                                        color: "#8b8a8a",
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

export default FileLists;
