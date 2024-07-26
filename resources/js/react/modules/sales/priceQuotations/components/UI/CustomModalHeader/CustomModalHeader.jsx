import React from "react";
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import PropTypes from "prop-types";

// style
import "./customModalHeader.css";

const CustomModalHeader = ({
    title = "",
    closeModal,
    minimize = false,
    handleMinimize,
    className,
}) => {
    return (
        <div className={`customModalHeader ${className}`}>
            <h2 className="singleline-ellipsis">{title}</h2>
            <div className="d-flex">
                {minimize && (
                    <button onClick={handleMinimize} className="mr-2">
                        <AiOutlineMinus size={26} />
                    </button>
                )}
                <button onClick={closeModal}>
                    <AiOutlineClose size={26} />
                </button>
            </div>
        </div>
    );
};

export default CustomModalHeader;

CustomModalHeader.propTypes = {
    title: PropTypes.string,
    closeModal: PropTypes.func,
    className: PropTypes.object,
    minimize: PropTypes.bool,
    handleMinimize: PropTypes.func
};
