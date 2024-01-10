import React from "react";
import ReactModal from "react-modal";
import PMGoalsTable from "./PmGoalsTable";
import { IoClose } from "react-icons/io5";

const customStyles = {
    overlay: {
        zIndex: 9999998,
    },
    content: {
        zIndex: 9999999,
        width: "70%",
        height: "70%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
    },
};

const ProjectModal = ({ isFetchingPmGoal, pmGoal, isOpen, closeModal }) => {
    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Project Details"
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div style={{ fontSize: "25px" }}> Goal Details</div>
                <button onClick={closeModal}>
                    <IoClose />
                </button>
            </div>

            <PMGoalsTable pmGoal={pmGoal} isFetchingPmGoal={isFetchingPmGoal} />
        </ReactModal>
    );
};

export default ProjectModal;
