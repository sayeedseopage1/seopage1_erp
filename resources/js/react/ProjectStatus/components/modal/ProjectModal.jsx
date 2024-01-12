import React from "react";
import ReactModal from "react-modal";
import PMGoalsTable from "./PmGoalsTable";
import { IoClose } from "react-icons/io5";

const customStyles = {
    overlay: {
        zIndex: 9999998,
        backgroundColor: "rgba(0, 0, 0, 0.5)",

        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 9999999,
        maxWidth: "90%",
        maxHeight: "70vh",
        margin: "auto auto",
        padding: "20px",
    },
};

const ProjectModal = ({
    projectDetails,
    isFetchingPmGoal,
    pmGoal,
    isOpen,
    closeModal,
}) => {
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
                <button
                    onClick={closeModal}
                    style={{
                        backgroundColor: "red",
                        padding: "2px 4px 2px 4px",

                        color: "white",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <PMGoalsTable
                projectDetails={projectDetails}
                pmGoal={pmGoal}
                isFetchingPmGoal={isFetchingPmGoal}
            />
        </ReactModal>
    );
};

export default ProjectModal;
