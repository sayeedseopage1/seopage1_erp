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
import Switch from "../../../global/Switch";
import { useAuth } from "../../../hooks/useAuth";
import DeadlineChangeHistoryModal from "../modal/DeadlineChangeHistoryModal";

// Modal Names
// ProjectDE = Project Deadline Extension
// ProjectQCSF = Project QC Submission Form

/**
 * Dashboard Action Button Section
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Action Button Section Component for showing action buttons on the dashboard page.
 */

const DashboardActionButtonSection = ({ projectData, isLoading }) => {
    const ViewModalButtons = projectData?.buttons;
    const user = useAuth();

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
    const [isDeadlineHistoryModalOpen, setIsDeadlineHistoryModalOpen] =
        React.useState(false);

    // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    return (
        <div className={`${style.dashboardActionButtonSection} mb-4`}>
            <Switch>
                <Switch.Case
                    condition={
                        ViewModalButtons?.extend_deadline_form ||
                        ViewModalButtons?.pm_task_guidline ||
                        ViewModalButtons?.extend_deadline_pending ||
                        (user.getRoleId() === 1 &&
                            projectData?.project_deadline_extension?.length)
                    }
                >
                    <SectionContainer
                        className={`${style.dashboardActionLeftButton}`}
                    >
                        <Switch.Case
                            condition={
                                ViewModalButtons?.extend_deadline_pending
                            }
                        >
                            <Button
                                disabled
                                className={`${style.dashboardActionButton} ${style.dashboardActionButtonPending}`}
                            >
                                Project Deadline Ext. Pending
                            </Button>
                        </Switch.Case>
                        <Switch.Case
                            condition={ViewModalButtons?.extend_deadline_form}
                        >
                            <Button
                                onClick={() =>
                                    handleModal(setIsProjectDEModalOpen, true)
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                Project Deadline Ext. Request
                            </Button>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                user.getRoleId() === 1 &&
                                projectData?.project_deadline_extension?.length
                            }
                        >
                            <Button
                                onClick={() =>
                                    handleModal(
                                        setIsDeadlineHistoryModalOpen,
                                        true
                                    )
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                Project Deadline History
                            </Button>
                        </Switch.Case>
                        <Switch.Case
                            condition={ViewModalButtons?.pm_task_guidline}
                        >
                            <Button
                                onClick={() =>
                                    handleModal(
                                        setIsPmTaskGuidelineModalOpen,
                                        true
                                    )
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                PM Task Guideline
                            </Button>
                        </Switch.Case>
                    </SectionContainer>
                </Switch.Case>
                <Switch.Case
                    condition={
                        (ViewModalButtons?.project_qc_data &&
                            !ViewModalButtons?.project_qc_authorization) ||
                        (ViewModalButtons?.completion_form_data &&
                            !ViewModalButtons?.completion_form_authorization) ||
                        (ViewModalButtons?.see_project_dispute &&
                            !ViewModalButtons?.project_dispute_authorization)
                    }
                >
                    <SectionContainer
                        className={`${style.dashboardActionRightButton}`}
                    >
                        <Switch.Case
                            condition={
                                ViewModalButtons?.project_qc_data &&
                                !ViewModalButtons?.project_qc_authorization &&
                                projectData?.project_qc_submission &&
                                projectData?.project_qc_submission?.status ===
                                    "accepted"
                            }
                        >
                            <Button
                                onClick={() =>
                                    handleModal(setIsProjectQCSFModalOpen, true)
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                QC Form
                            </Button>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                ViewModalButtons?.completion_form_data &&
                                !ViewModalButtons?.completion_form_authorization &&
                                projectData?.project_submission &&
                                projectData?.project_submission?.status ===
                                    "accepted"
                            }
                        >
                            <Button
                                onClick={() =>
                                    handleModal(
                                        setIsProjectCompletionModalOpen,
                                        true
                                    )
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                Completion Form
                            </Button>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                ViewModalButtons?.see_project_dispute &&
                                !ViewModalButtons?.project_dispute_authorization
                            }
                        >
                            <Button
                                onClick={() =>
                                    handleModal(
                                        setIsDisputeProjectModalOpen,
                                        true
                                    )
                                }
                                className={`${style.dashboardActionButton}`}
                            >
                                See Dispute
                            </Button>
                        </Switch.Case>
                    </SectionContainer>
                </Switch.Case>
            </Switch>

            {/* Modal */}
            {/* Pm Task Guideline */}
            {isPmTaskGuidelineModalOpen && (
                <PMTaskGuidelineModal
                    isModalOpen={isPmTaskGuidelineModalOpen}
                    closeModal={() =>
                        handleModal(setIsPmTaskGuidelineModalOpen, false)
                    }
                    modalData={projectData?.pm_task_guidline}
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
                    modalData={projectData}
                    isLoading={isLoading}
                />
            )}
            {/* Project Deadline Extension Form */}
            {isProjectDEModalOpen && (
                <ProjectDeadlineExtensionModal
                    isModalOpen={isProjectDEModalOpen}
                    closeModal={() =>
                        handleModal(setIsProjectDEModalOpen, false)
                    }
                    modalData={projectData}
                    isLoading={isLoading}
                />
            )}

            {/* Project QC Submission Form */}
            {isProjectQCSFModalOpen && (
                <ProjectQCSubmissionFormModal
                    isModalOpen={isProjectQCSFModalOpen}
                    modalData={{
                        project_qc_submission:
                            projectData?.project_qc_submission,
                        buttons: projectData?.buttons,
                    }}
                    isLoading={isLoading}
                    closeModal={() =>
                        handleModal(setIsProjectQCSFModalOpen, false)
                    }
                />
            )}
            {/* Dispute Project Show Data */}
            {isDisputeProjectModalOpen && (
                <DisputeProjectAuthorizeModal
                    isModalOpen={isDisputeProjectModalOpen}
                    closeModal={() =>
                        handleModal(setIsDisputeProjectModalOpen, false)
                    }
                    modalData={{
                        disputeData: projectData?.project_dispute,
                        pm: projectData.pm,
                        client: projectData.client,
                        projectData: {
                            id: projectData.id,
                            project_budget: projectData.project_budget,
                            currency: projectData.currency,
                            dispute_admin_comment:
                                projectData?.dispute_admin_comment,
                        },
                    }}
                    isLoading={isLoading}
                />
            )}

            {/* Deadline Change History Modal */}
            {isDeadlineHistoryModalOpen && (
                <DeadlineChangeHistoryModal
                    isModalOpen={isDeadlineHistoryModalOpen}
                    closeModal={() =>
                        handleModal(setIsDeadlineHistoryModalOpen, false)
                    }
                    modalData={projectData?.project_deadline_extension}
                    isLoading={isLoading}
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
