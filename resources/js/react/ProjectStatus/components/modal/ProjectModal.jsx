import React, { useEffect } from "react";
import ReactModal from "react-modal";


import RefreshButton from "../RefreshButton";
import { PmGoalsTableColumns } from "./PmGoalsTableColumn";
import PmGoalsTable from "./PmGoalsTable";
import { IoClose } from "react-icons/io5";


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
                style={customStyles}k
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                contentLabel="Project Details"
            >
                <div
                    className="d-flex justify-content-between align-items-center mb-3"
                >
                    <h5 className="mb-0" style={{ fontSize: "20px" }}>Goal Details</h5>
                    <div className="d-flex align-items-center" style={{
                        gap: "10px"
                    }}>
                        <RefreshButton
                            onClick={refetchPmGoal}
                            isLoading={isFetchingPmGoal}
                        />
                        <button
                            onClick={closeModal}
                            className="d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                                backgroundColor: "gray",
                                padding: "2px 4px 2px 4px",
                                color: "white",
                                width: "24px",
                                height: "24px",
                            }}
                        >
                            <IoClose />
                        </button>
                    </div>
                    

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
