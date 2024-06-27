import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BsPinAngle } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

// Components - Custom
import Button from "../ui/customComponents/Button/Button";

// Styles
import style from "./styles/dashboardHeaderSection.module.css";

// Components - Modal
import WorkingEnvironmentModal from "../modal/WorkingEnvironmentModal";
import TaskGuidelineNeedsAuthorizedAdmin from "../modal/TaskGuidelineNeedsAuthorizedAdmin";

// Icons
import RefreshIcon from "../ui/Icons/RefreshIcon";

// Context
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";

// ShortName
// WN - WorkingEnvironment;
// TGABA - TaskGuidelineNeedsAuthorizedByAdmin;

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
    const { refetchProjectDetails, isProjectDetailsLoading } = useContext(
        ProjectDashboardContext
    );
    const [isWNModalOpen, setIsWNModalOpen] = React.useState(false);
    const [isTGABAModalOpen, setIsTGABAModalOpen] = React.useState(false);

    // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4">
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
            </div>
            <div className="d-flex mb-3 mb-md-0 ">
                <Button
                    onClick={() => handleModal(setIsTGABAModalOpen, true)}
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Mark as complete
                </Button>
                {/* Refresh Button */}

                <Button
                    onClick={() => refetchProjectDetails()}
                    className={`${style?.refreshButton} ml-2`}
                >
                    <RefreshIcon className={isProjectDetailsLoading && style?.refreshButtonActive} />
                </Button>
            </div>

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
                    modalData={
                        projectData?.projectData?.task_guideline_authorization
                    }
                    isLoading={isLoading}
                />
            )}
            {/* End Top Management Pm Task Guideline Authorization */}
        </div>
    );
};

export default DashboardHeaderSection;

DashboardHeaderSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
