import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";

// style
import "./customModalHeader.css";

const CustomModalHeader = ({ title = "", closeModal, className }) => {
    return (
        <div className={`customModalHeader ${className}`}>
            <h2>{title}</h2>
            <button onClick={closeModal}>
                <AiOutlineClose size={26} />
            </button>
        </div>
    );
};

export default CustomModalHeader;


CustomModalHeader.propTypes = {
    title: PropTypes.string,
    closeModal: PropTypes.func,
    className: PropTypes.object,
}