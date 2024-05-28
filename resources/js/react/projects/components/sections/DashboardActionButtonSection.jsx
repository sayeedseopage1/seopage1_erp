import React from "react";
import PropTypes from "prop-types";

// UI Components - Styled Components
import { SectionContainer } from "../ui/styledComponents";

// Components - UI - Custom
import Button from "../ui/customComponents/Button/Button";

// Style
import style from "./styles/dashboardActionButtonSection.module.css";

// Components - Modal
import PMTaskGuidelineModal from "../modal/PMTaskGuidelineModal";
import ProjectCompletionModal from "../modal/ProjectCompletionModal";
import ProjectDeadlineExtensionModal from "../modal/ProjectDeadlineExtensionModal";
import ProjectQCSubmissionFormModal from "../modal/ProjectQCSubmissionFormModal";
import DisputeProjectFromModal from "../modal/DisputeProjectFromModal";
import DisputeProjectAuthorizeModal from "../modal/DisputeProjectAuthorizeModal";

// Modal Names
// ProjectDE = Project Deadline Extension
// ProjectQCSF = Project QC Submission Form





const DashboardActionButtonSection = ({ projectData, isLoading }) => {
    // Dummy for Dispute Project Authorization Modal
    const [dummyDisputeData, setDummyDisputeData] = React.useState({
        isDisputeSubmitted: false,
        disputeData: {},
    });

    // Modal Open State Variables
    const [isPmTaskGuidelineModalOpen, setIsPmTaskGuidelineModalOpen] =
        React.useState(false);
    const [isProjectCompletionModalOpen, setIsProjectCompletionModalOpen] =
        React.useState(false);
    const [isProjectDEModalOpen, setIsProjectDEModalOpen] =
        React.useState(false);
    const [isProjectQCSFModalOpen, setIsProjectQCSFModalOpen] =
        React.useState(false);
    const [isDisputeProjectModalOpen, setIsDisputeProjectModalOpen] =
        React.useState(false);
    const [
        isDisputeProjectAuthorizeModalOpen,
        setIsDisputeProjectAuthorizeModalOpen,
    ] = React.useState(false);

    // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    return (
        <div className={`${style.dashboardActionButtonSection} mb-4`}>
            <SectionContainer className={`${style.dashboardActionLeftButton}`}>
                <Button
                    onClick={() =>
                        handleModal(setIsPmTaskGuidelineModalOpen, true)
                    }
                    className={`${style.dashboardActionButton}`}
                >
                    PM Task Guideline
                </Button>
                <Button
                    onClick={() => handleModal(setIsProjectDEModalOpen, true)}
                    className={`${style.dashboardActionButton}`}
                >
                    Project Deadline Ext. Request
                </Button>
            </SectionContainer>
            <SectionContainer className={`${style.dashboardActionRightButton}`}>
                <Button
                    onClick={() => handleModal(setIsProjectQCSFModalOpen, true)}
                    className={`${style.dashboardActionButton}`}
                >
                    QC Form
                </Button>
                <Button
                    onClick={() =>
                        handleModal(setIsProjectCompletionModalOpen, true)
                    }
                    className={`${style.dashboardActionButton}`}
                >
                    Completion Form
                </Button>
                <Button
                    onClick={() =>
                        handleModal(
                            dummyDisputeData.isDisputeSubmitted // This is a dummy data to check if the dispute is submitted or not
                                ? setIsDisputeProjectAuthorizeModalOpen
                                : setIsDisputeProjectModalOpen,
                            true
                        )
                    }
                    className={`${style.dashboardActionButton}`}
                >
                    Dispute Form
                </Button>
            </SectionContainer>

            {/* Modal */}
            {/* Pm Task Guideline */}
            {isPmTaskGuidelineModalOpen && (
                <PMTaskGuidelineModal
                    isModalOpen={isPmTaskGuidelineModalOpen}
                    closeModal={() =>
                        handleModal(setIsPmTaskGuidelineModalOpen, false)
                    }
                    modalData={projectData?.projectData?.pm_task_guideline}
                    isLoading={isLoading}
                />
            )}
            {/* Project Completion */}
            {isProjectCompletionModalOpen && (
                <ProjectCompletionModal
                    isModalOpen={isProjectCompletionModalOpen}
                    closeModal={() =>
                        handleModal(setIsProjectCompletionModalOpen, false)
                    }
                    modalData={projectData?.projectData}
                    isLoading={false}
                />
            )}
            {/* Project Deadline Extension Form */}
            {isProjectDEModalOpen && (
                <ProjectDeadlineExtensionModal
                    isModalOpen={isProjectDEModalOpen}
                    closeModal={() =>
                        handleModal(setIsProjectDEModalOpen, false)
                    }
                    modalData={projectData?.projectData?.project}
                    isLoading={isLoading}
                />
            )}

            {/* Project QC Submission Form */}

            {isProjectQCSFModalOpen && (
                <ProjectQCSubmissionFormModal
                    isModalOpen={isProjectQCSFModalOpen}
                    closeModal={() =>
                        handleModal(setIsProjectQCSFModalOpen, false)
                    }
                />
            )}

            {/* Dispute Project Form */}

            {isDisputeProjectModalOpen && (
                <DisputeProjectFromModal
                    isModalOpen={isDisputeProjectModalOpen}
                    closeModal={() =>
                        handleModal(setIsDisputeProjectModalOpen, false)
                    }
                    setDummyDisputeData={setDummyDisputeData}
                />
            )}

            {/* Dispute Project Authorization Form */}

            {isDisputeProjectAuthorizeModalOpen && (
                <DisputeProjectAuthorizeModal
                    isModalOpen={isDisputeProjectAuthorizeModalOpen}
                    closeModal={() =>
                        handleModal(
                            setIsDisputeProjectAuthorizeModalOpen,
                            false
                        )
                    }
                    payloadData={dummyDisputeData?.disputeData}
                />
            )}
        </div>
    );
};

export default DashboardActionButtonSection;

DashboardActionButtonSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
