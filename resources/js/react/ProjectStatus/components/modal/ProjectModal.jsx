import React from "react";
import ReactModal from "react-modal";
import PMGoalsTable from "./PmGoalsTable";

import RefreshButton from "../RefreshButton";

const ProjectModal = ({
    refetchPmGoal,

    projectDetails,
    isFetchingPmGoal,
    pmGoal,
    isOpen,
    closeModal,
}) => {
    return (
        <>
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

                    <RefreshButton
                        onClick={refetchPmGoal}
                        isLoading={isFetchingPmGoal}
                    />
                </div>

                <PMGoalsTable
                    projectDetails={projectDetails}
                    pmGoal={pmGoal}
                    isFetchingPmGoal={isFetchingPmGoal}
                />
            </ReactModal>
        </>
    );
};

export default ProjectModal;

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
        maxHeight: "500px",
        margin: "auto auto",
        padding: "20px",
    },
};
