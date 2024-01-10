import React from "react";
import ReactModal from "react-modal";

const ProjectModal = ({ isOpen, closeModal, selectedProjectName }) => {
    return (
        <ReactModal
            style={{
                overlay: {
                    zIndex: 9999998,
                },
                content: {
                    zIndex: 9999999,
                },
            }}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Project Details"
        >
            <button onClick={closeModal}>Close Modal</button>
            <h2>Project Details</h2>
            <p>Project Name: {selectedProjectName}</p>
        </ReactModal>
    );
};

export default ProjectModal;
