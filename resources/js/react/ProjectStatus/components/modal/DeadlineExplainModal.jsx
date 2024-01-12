import React from "react";
import ReactModal from "react-modal";

import { IoClose } from "react-icons/io5";

const customStyles = {
    overlay: {
        zIndex: 99999998,
        backgroundColor: "rgba(0, 0, 0, 0.5)",

        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 99999999,
        maxWidth: "70%",

        margin: "auto auto",
        padding: "20px",
    },
};

const DeadlineExplainModal = ({ isModalTwoOpen, closeModalTwo, projectId }) => {
    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalTwoOpen}
            onRequestClose={closeModalTwo}
            contentLabel="Project Details"
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div style={{ fontSize: "25px" }}>Deadline Explanation</div>

                <button
                    onClick={closeModalTwo}
                    style={{
                        backgroundColor: "red",
                        padding: "2px 4px 2px 4px",

                        color: "white",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <div style={{ fontSize: "25px", marginTop: "50px" }}>
                ProjectId:{projectId}
            </div>
        </ReactModal>
    );
};

export default DeadlineExplainModal;
