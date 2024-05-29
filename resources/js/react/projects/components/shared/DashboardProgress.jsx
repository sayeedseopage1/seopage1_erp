import React from "react";
import PropTypes from "prop-types";
import { LuCalendarDays } from "react-icons/lu";

// UI Components - Custom
import { CardWrapper } from "../ui/styledComponents";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";
import DashboardProgressStatus from "../ui/DashboardProgressStatus/DashboardProgressStatus";
import ProjectProgressChart from "../ui/ProjectProgressChart/ProjectProgressChart";

// Constants
import { ProjectProgressStatus } from "../../constants";

// Modal
import DeadlineChangeHistoryModal from "../modal/DeadlineChangeHistoryModal";

/**
 *
 *  DashboardProgress component
 *  @param {object} projectData - Project data
 *  @param {object} style - Styles for the component
 *  @param {string} className - Additional class name
 *  @returns {JSX.Element}
 *  @description DashboardProgress component to render project progress
 */

const DashboardProgress = ({ projectData, style, className = "" }) => {
    const [isDeadlineHistoryModalOpen, setIsDeadlineHistoryModalOpen] =
        React.useState(false);
    const projectInfo = projectData?.projectData;

    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    return (
        <CardWrapper color="#ffffff" className={`${className}`}>
            <DashboardCardTitle
                title="Project Progress"
                isBorderUse={true}
                rightText={`Completed: ${projectInfo?.project?.progress}%`}
                rightTextColor={"#70CA62"}
            />
            <div className="flexBetween my-3 dashboardProgressData">
                <div className="flexColumn justify-content-between dashboardProgressDataDates">
                    <div className="flexColumn">
                        <p>Start Date</p>
                        <span className="flexItemCenter">
                            <LuCalendarDays className="mr-1" />
                            {projectInfo?.project?.start_date}
                        </span>
                    </div>
                    <div className="flexColumn">
                        <p> Deadline</p>
                        <button
                            className="flexItemCenter cursor-pointer deadlineBtn"
                            style={{
                                color:
                                    new Date(projectInfo?.project?.deadline) <
                                    new Date()
                                        ? "#FF0000"
                                        : "#000000",
                            }}
                            onClick={()  => handleModal(
                                setIsDeadlineHistoryModalOpen,
                                true
                            )}
                        >
                            <LuCalendarDays className="mr-1" />{" "}
                            {projectInfo?.project?.deadline}
                        </button>
                    </div>
                </div>
                <ProjectProgressChart chartData={[0, 15, 70, 15, 0, 0, 0, 0]} />
            </div>
            <div
                className={`${style.dashboardProgressStatusContainer} mt-2 mt-md-5`}
            >
                {ProjectProgressStatus?.map((status) => (
                    <DashboardProgressStatus
                        key={status.id}
                        title={status.name}
                        statusType={status.tag}
                    />
                ))}
            </div>

            {/* Deadline Change History Modal */}
            {isDeadlineHistoryModalOpen && (
                <DeadlineChangeHistoryModal
                    isModalOpen={isDeadlineHistoryModalOpen}
                    closeModal={()  => handleModal(
                        setIsDeadlineHistoryModalOpen,
                        false
                    )}
                    modalData={projectInfo?.project}
                    isLoading={false}
                />
            )}
        </CardWrapper>
    );
};

export default DashboardProgress;

DashboardProgress.propTypes = {
    projectData: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};
