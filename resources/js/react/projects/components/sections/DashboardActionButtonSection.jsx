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
import { ProjectQualityControlDummyData } from "../../constants";


// Modal Names
// ProjectDE = Project Deadline Extension
// ProjectQCSF = Project QC Submission Form

const DashboardActionButtonSection = ({ projectData, isLoading }) => {
    const [isPmTaskGuidelineModalOpen, setIsPmTaskGuidelineModalOpen] =
        React.useState(false);
    const [isProjectCompletionModalOpen, setIsProjectCompletionModalOpen] =
        React.useState(false);
    const [isProjectDEModalOpen, setIsProjectDEModalOpen] =
        React.useState(false);
    const [isProjectQCSFModalOpen, setIsProjectQCSFModalOpen] = React.useState(
        false
    )

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
                    onClick={() => {}}
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

            <ProjectQCSubmissionFormModal
                isModalOpen={isProjectQCSFModalOpen}
                closeModal={() => handleModal(setIsProjectQCSFModalOpen, false)}
                modalData={ProjectQualityControlDummyData}
            />
        </div>
    );
};

export default DashboardActionButtonSection;

DashboardActionButtonSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
