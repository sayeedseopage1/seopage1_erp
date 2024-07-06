import React from "react";
import ReactModal from "react-modal";
const RatingModal = ({ showEditModal, setShowEditModal }) => {
    return (
        <div>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "10px",
                        maxWidth: "800px",
                        height: "260px",
                        margin: "auto auto",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
                isOpen={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
            ></ReactModal>
        </div>
    );
};

export default RatingModal;
