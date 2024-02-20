import React, { useEffect } from "react";
import ReactModal from "react-modal";


import RefreshButton from "../RefreshButton";
import { PmGoalsTableColumns } from "./PmGoalsTableColumn";
import PmGoalsTable from "./PmGoalsTable";


const ProjectModal = ({
    refetchPmGoal,
    projectDetails,
    isFetchingPmGoal,
    pmGoal,
    isOpen,
    closeModal,
}) => {

    useEffect(() => {
        // Clean up when component unmounts
        return () => {
            ReactModal.setAppElement(null);
        };
    }, []);
    return (
        <>
            <ReactModal
                style={customStyles}
                isOpen={isOpen}
                ariaHideApp={false}
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
                  <PmGoalsTable
                    projectDetails={projectDetails}
                    refetchPmGoal={refetchPmGoal}
                    pmGoal={pmGoal}
                    tableName="pmGoalsTable"
                    isLoading={isFetchingPmGoal}
                    PmGoalsTableColumns={PmGoalsTableColumns}
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
        maxHeight: "fit-content",
        height: "fit-content",
        margin: "auto auto",
        padding: "20px",
    },
};
