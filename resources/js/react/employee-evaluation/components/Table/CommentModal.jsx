import React, { useState } from "react";
import ReactModal from "react-modal";
import { RxCrossCircled } from "react-icons/rx";
const CommentModal = ({ comment }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-info" onClick={openModal}>
                View
            </button>
            <ReactModal
                style={{
                    overlay: {
                        zIndex: 99999998,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        margin: "auto auto",
                        padding: "20px",
                    },
                    content: {
                        zIndex: 99999999,
                        height: "fit-content",
                        maxHeight: "fit-content",
                        maxWidth: "600px",
                        margin: "auto auto",
                        padding: "20px",
                        borderRadius: "20px",
                        border: "none",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
                        blur: "5px",
                    },
                }}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Team Lead Comment Modal"
            >
                <div
                    onClick={() => setIsRelevantModal(false)}
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                >
                    <RxCrossCircled size={`30px`} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: comment }} />
            </ReactModal>
        </div>
    );
};

export default CommentModal;
