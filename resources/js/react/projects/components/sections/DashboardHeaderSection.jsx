import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components - Custom
import Button from "../ui/customComponents/Button/Button";
import ConfirmationModal from "../modal/ConfirmationModal";
import PageNavigateButtons from "../shared/PageNavigateButtons";

// Styles
import style from "./styles/dashboardHeaderSection.module.css";

// Components - Modal
import WorkingEnvironmentModal from "../modal/WorkingEnvironmentModal";
import TaskGuidelineNeedsAuthorizedAdmin from "../modal/TaskGuidelineNeedsAuthorizedAdmin";
import ProjectDeadlineExtensionAuthorizeModal from "../modal/ProjectDeadlineExtensionAuthorizeModal";

// Icons
import RefreshIcon from "../ui/Icons/RefreshIcon";

// Context
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";

// API
import { useIncompleteProjectMutation } from "../../../services/api/projectApiSlice";

// Components - Global
import Loader from "../../../global/Loader";
import Switch from "../../../global/Switch";
import { toast } from "react-toastify";
import DisputeProjectFromModal from "../modal/DisputeProjectFromModal";
import DisputeProjectAuthorizeModal from "../modal/DisputeProjectAuthorizeModal";
import ProjectQCSubmissionFormModal from "../modal/ProjectQCSubmissionFormModal";
import ProjectCompletionModal from "../modal/ProjectCompletionModal";

// ShortName
// WN - WorkingEnvironment;
// TGABA - TaskGuidelineNeedsAuthorizedByAdmin;
// DE- DeadlineExtension;
// PD - ProjectDispute;

/**
 * Dashboard Header Section
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {boolean} props.isLoading - Loading state
 * @param {function} props.setDummyTypeChange - Set Dummy Type Change
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Header Section Component for showing header section on the dashboard page.
 *
 */

const DashboardHeaderSection = ({ projectData, isLoading }) => {
    const {
        isProjectDetailsLoading,
        refetchAllProjectDashboardData,
        projectPendingDeadlineExtensionData,
        isProjectPendingExtensionLoading,
    } = useContext(ProjectDashboardContext);
    const actionButtons = projectData?.buttons;

    //  Modal State
    const [isWNModalOpen, setIsWNModalOpen] = React.useState(false);
    const [isTGABAModalOpen, setIsTGABAModalOpen] = React.useState(false);
    const [isIncompleteModalOpen, setIsIncompleteModalOpen] =
        React.useState(false);
    const [isDEAuthorizeModalOpen, setIsDEAuthorizeModalOpen] =
        React.useState(false);
    const [isExplainDisputeModalOpen, setIsExplainDisputeModalOpen] =
        React.useState(false);
    const [isPDAuthorizationModalOpen, setIsPDAuthorizationModalOpen] =
        React.useState(false);
    const [isQCSubmissionModalOpen, setIsQCSubmissionModalOpen] =
        React.useState(false);
    const [isCompletionAuthorizeModalOpen, setIsCompletionAuthorizeModalOpen] =
        React.useState(false);

    // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    const [
        submitIncompleteProject,
        {
            isLoading: incompleteProjectLoading,
            isSuccess: incompleteProjectSuccess,
            data: incompleteProjectData,
        },
    ] = useIncompleteProjectMutation();

    // Handle Project Incomplete Function to mark project as incomplete
    const handleProjectIncomplete = async () => {
        try {
            const payload = {
                id: projectData?.id,
            };
            const res = await submitIncompleteProject(payload).unwrap();
            // this status code is coming from the backend API response for this request (400)
            // if the status code is 400 then the project is marked as incomplete successfully
            if (res.status === 400) {
                refetchAllProjectDashboardData();
                toast.success("Project marked as incomplete successfully!");
                handleModal(setIsIncompleteModalOpen, false);
            }
        } catch (error) {
            toast.error("Failed to mark project as incomplete!");
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4">
            <Switch>
                <div className="d-flex mb-3 mb-md-0">
                    <Button
                        className={`${style?.dashboardHeaderForType} text-capitalize`}
                    >
                        Project Type: {projectData?.projectType}
                    </Button>
                    <Button
                        onClick={() => handleModal(setIsWNModalOpen, true)}
                        className={`${style?.dashboardHeaderButton} ml-2`}
                    >
                        Working Environment
                    </Button>
                    <PageNavigateButtons
                        className="d-none d-md-flex ml-2"
                        style={style}
                        navigateData={projectData}
                    />
                </div>
                <div className="d-flex mb-3 mb-md-0 ">
                    <Switch.Case
                        condition={
                            actionButtons?.deadline_extension_authorization
                        }
                    >
                        <Button
                            onClick={() =>
                                handleModal(setIsDEAuthorizeModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton}`}
                            disabled={isProjectPendingExtensionLoading}
                        >
                            {isProjectPendingExtensionLoading ? (
                                <Loader title="Loading Deadline Extension" />
                            ) : (
                                "Deadline Extension Authorize"
                            )}
                        </Button>
                    </Switch.Case>

                    <Switch.Case
                        condition={
                            actionButtons?.pm_task_guidline_authorization
                        }
                    >
                        <Button
                            onClick={() =>
                                handleModal(setIsTGABAModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            PM Task Guideline Authorize
                        </Button>
                    </Switch.Case>
                    <Switch.Case
                        condition={actionButtons?.project_qc_authorization}
                    >
                        <Button
                            onClick={() =>
                                handleModal(setIsQCSubmissionModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            Project QC Authorize
                        </Button>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            actionButtons?.completion_form_authorization
                        }
                    >
                        <Button
                            onClick={() =>
                                handleModal(
                                    setIsCompletionAuthorizeModalOpen,
                                    true
                                )
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            Project Completion Authorize
                        </Button>
                    </Switch.Case>
                    <Switch.Case condition={actionButtons?.explain_dispute}>
                        <Button
                            onClick={() =>
                                handleModal(setIsExplainDisputeModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            Explain Dispute
                        </Button>
                    </Switch.Case>
                    <Switch.Case
                        condition={actionButtons?.project_dispute_authorization}
                    >
                        <Button
                            onClick={() =>
                                handleModal(setIsPDAuthorizationModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            Dispute Authorization
                        </Button>
                    </Switch.Case>
                    <Switch.Case condition={actionButtons?.mark_as_incomplete}>
                        <Button
                            onClick={() =>
                                handleModal(setIsIncompleteModalOpen, true)
                            }
                            className={`${style?.dashboardHeaderButton} ml-2`}
                        >
                            Mark as incomplete
                        </Button>
                    </Switch.Case>
                    {/* Refresh Button */}
                    <Button
                        onClick={() => refetchAllProjectDashboardData()}
                        className={`${style?.refreshButton} ml-2`}
                    >
                        <RefreshIcon
                            className={
                                isProjectDetailsLoading &&
                                style?.refreshButtonActive
                            }
                        />
                    </Button>
                </div>
            </Switch>
            {/* ----- Modal ------ */}

            {/* Working Environment Modal */}
            {isWNModalOpen && (
                <WorkingEnvironmentModal
                    isModalOpen={isWNModalOpen}
                    closeModal={() => handleModal(setIsWNModalOpen, false)}
                    modalData={projectData?.working_environment}
                    isLoading={isLoading}
                />
            )}
            {/* End Working Environment Modal */}

            {/* Top Management Pm Task Guideline Authorization */}
            {isTGABAModalOpen && (
                <TaskGuidelineNeedsAuthorizedAdmin
                    isModalOpen={isTGABAModalOpen}
                    closeModal={() => handleModal(setIsTGABAModalOpen, false)}
                    modalData={projectData?.pm_task_guideline_authorizations}
                    isLoading={isLoading}
                />
            )}
            {/* End Top Management Pm Task Guideline Authorization */}

            {isIncompleteModalOpen && (
                <ConfirmationModal
                    isModalOpen={isIncompleteModalOpen}
                    closeModal={() =>
                        handleModal(setIsIncompleteModalOpen, false)
                    }
                    modalData={{
                        modalTitle: "Mark as Incomplete",
                        confirmationInfo:
                            "If you click Yes, This project will be marked as incomplete!",
                        confirmationButton: "Yes",
                        cancelButton: "No",
                    }}
                    handleAction={handleProjectIncomplete}
                    isLoading={incompleteProjectLoading}
                />
            )}

            {isDEAuthorizeModalOpen && (
                <ProjectDeadlineExtensionAuthorizeModal
                    isModalOpen={isDEAuthorizeModalOpen}
                    closeModal={() =>
                        handleModal(setIsDEAuthorizeModalOpen, false)
                    }
                    modalData={{
                        projectPendingDeadlineExtensionData:
                            projectPendingDeadlineExtensionData,
                        pm: projectData.pm,
                    }}
                    isLoading={isProjectPendingExtensionLoading}
                />
            )}
            {isExplainDisputeModalOpen && (
                <DisputeProjectFromModal
                    isModalOpen={isExplainDisputeModalOpen}
                    closeModal={() =>
                        handleModal(setIsExplainDisputeModalOpen, false)
                    }
                    modalData={projectData}
                    isLoading={isLoading}
                />
            )}
            {isPDAuthorizationModalOpen && (
                <DisputeProjectAuthorizeModal
                    isModalOpen={isPDAuthorizationModalOpen}
                    closeModal={() =>
                        handleModal(setIsPDAuthorizationModalOpen, false)
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
                        buttons: projectData.buttons,
                    }}
                    isLoading={isProjectDetailsLoading}
                />
            )}

            {isQCSubmissionModalOpen && (
                <ProjectQCSubmissionFormModal
                    isModalOpen={isQCSubmissionModalOpen}
                    closeModal={() =>
                        handleModal(setIsQCSubmissionModalOpen, false)
                    }
                    modalData={{
                        project_qc_submission: projectData?.project_qc_submission,
                        buttons: projectData?.buttons,
                    }}
                    isLoading={isLoading}
                />
            )}
            {isCompletionAuthorizeModalOpen && (
                <ProjectCompletionModal
                    isModalOpen={isCompletionAuthorizeModalOpen}
                    closeModal={() =>
                        handleModal(setIsCompletionAuthorizeModalOpen, false)
                    }
                    modalData={projectData}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default DashboardHeaderSection;

DashboardHeaderSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
