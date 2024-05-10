import React from "react";
import { useCopyToClipboard } from "react-use";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdDone } from "react-icons/md";
import PropTypes from "prop-types";

import "./customCopyToClipboard.css";

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
