import React, { useEffect, useMemo } from "react";
import ReactModal from "react-modal";

import RefreshButton from "../RefreshButton";
import { PmGoalsTableColumns } from "./PmGoalsTableColumn";
import PmGoalsTable from "./PmGoalsTable";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const ProjectModal = ({
    refetchPmGoal,
    projectDetails,
    isFetchingPmGoal,
    pmGoal,
    isOpen,
    closeModal,
    projectStatus,
    setProjectDetails,
}) => {
    const [updatePmGoal, setUpdatePmGoal] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Clean up when component unmounts
        return () => {
            ReactModal.setAppElement(null);
        };
    }, []);

    // use this to update the pmGoal state for next 24 hours this goal will be expired
    React.useMemo(() => {
        if (
            searchParams.get("modal_type") === "filtered_goal_details" &&
            pmGoal?.length > 0
        ) {
            const queryGoalId = Number(searchParams.get("goal_id"));
            const queryProjectId = Number(searchParams.get("project_id"));

            const updateGoal = pmGoal?.filter(
                (item) => item.id === queryGoalId
            );
            const getProjectDetails = projectStatus?.find(
                (item) => item?.project_id === queryProjectId
            );

            setProjectDetails(getProjectDetails);
            setUpdatePmGoal(updateGoal);

            if (!isOpen) {
                searchParams.delete("modal_type");
                searchParams.delete("goal_id");
                searchParams.delete("project_id");
                setSearchParams(searchParams);
            }
        } else {
            setUpdatePmGoal(pmGoal)
        }
    }, [isOpen, pmGoal, projectStatus, searchParams]);

    return (
        <>
            <ReactModal
                style={customStyles}
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                contentLabel="Project Details"
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0" style={{ fontSize: "20px" }}>
                        Goal Details
                    </h5>
                    <div
                        className="d-flex align-items-center"
                        style={{
                            gap: "10px",
                        }}
                    >
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
                    pmGoal={updatePmGoal}
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
        maxWidth: "76vw",
        maxHeight: "85vh",
        height: "fit-content",
        margin: "auto auto",
        padding: "20px",
    },
};
