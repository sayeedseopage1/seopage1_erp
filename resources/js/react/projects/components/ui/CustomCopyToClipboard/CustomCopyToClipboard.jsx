import React from "react";
import { useCopyToClipboard } from "react-use";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdDone } from "react-icons/md";
import PropTypes from "prop-types";

import "./customCopyToClipboard.css";

/**
 *  CustomCopyToClipboard component
 *  @param {string} text - Text to be copied
 *  @param {function} onCopy - OnCopy event handler
 *  @param {object} options - Options for the copy
 *  @param {string} className - Additional class name
 *  @returns {JSX.Element}
 *  @description CustomCopyToClipboard component to copy text to clipboard
 *
 */

const CustomCopyToClipboard = ({
    text,
    onCopy,
    options = { format: "text/plain" },
    className = "",
}) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
        copyToClipboard(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`${className} customCopyToClipboard`}
        >
            {isCopied ? <MdDone /> : <MdOutlineContentCopy />}
        </button>
    );
};

export default CustomCopyToClipboard;

CustomCopyToClipboard.propTypes = {
    text: PropTypes.any,
    onCopy: PropTypes.func,
    options: PropTypes.object,
};
