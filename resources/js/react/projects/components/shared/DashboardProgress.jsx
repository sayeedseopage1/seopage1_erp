import React, { useContext } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
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

// Context
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";
import { handleLoadingComponent } from "../../helper";
import { Placeholder } from "../../../global/Placeholder";

/**
 *
 *  DashboardProgress component
 *  @param {object} projectData - Project data
 *  @param {object} style - Styles for the component
 *  @param {string} className - Additional class name
 *  @returns {JSX.Element}
 *  @description DashboardProgress component to render project progress
 */

const DashboardProgress = ({
    projectData,
    style,
    className = "",
    isLoading,
}) => {
    const { projectDeadlineExtensionHistory, isProjectDetailsLoading } =
        useContext(ProjectDashboardContext);
    const [isDeadlineHistoryModalOpen, setIsDeadlineHistoryModalOpen] =
        React.useState(false);

    // Handle Modal Open and Close
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    // Format the date

    const isPastDate = (date) => {
        return dayjs(date).isBefore(dayjs());
    };

    const formatDate = (date) => {
        return dayjs(date).format("DD MMM YYYY");
    };

    return (
        <CardWrapper color="#ffffff" className={`${className}`}>
            <DashboardCardTitle
                title="Project Progress"
                isBorderUse={true}
                rightText={`Completed: ${projectData?.progress}%`}
                rightTextColor={"#70CA62"}
                isLoading={isLoading}
                rightLoadingText="Completed: Loading..."
            />

            <div className="flexBetween my-3 dashboardProgressData">
                <div className="flexColumn justify-content-between dashboardProgressDataDates w-50">
                    <div className="flexColumn">
                        <p>Start Date</p>
                        <span className="flexItemCenter">
                            <LuCalendarDays size={20} className="mr-1" />
                            {handleLoadingComponent(
                                isLoading,
                                <Placeholder height="20px" width="100%" />,
                                formatDate(projectData?.start_date)
                            )}
                        </span>
                    </div>
                    <div className="flexColumn">
                        <p> Deadline</p>
                        <button
                            className="flexItemCenter cursor-pointer deadlineBtn"
                            style={{
                                color: isPastDate(projectData?.deadline)
                                    ? "#FF0000"
                                    : "#000000",
                            }}
                            onClick={() =>
                                projectData?.project_deadline_extension
                                    ?.length &&
                                !isLoading &&
                                handleModal(setIsDeadlineHistoryModalOpen, true)
                            }
                        >
                            <LuCalendarDays size={20} className="mr-1" />{" "}
                            {handleLoadingComponent(
                                isLoading,
                                <Placeholder height="20px" width="100%" />,
                                formatDate(projectData?.deadline)
                            )}
                        </button>
                    </div>
                </div>
                {/* Dashboard Chart */}

                {handleLoadingComponent(
                    isLoading,
                    <Placeholder className="projectDashboardProgressLoader" />,
                    <ProjectProgressChart
                        chartData={projectData?.progress_chart_values}
                    />
                )}
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

            {/*---- Modal ----*/}

            {/* Deadline Change History Modal */}
            {isDeadlineHistoryModalOpen && (
                <DeadlineChangeHistoryModal
                    isModalOpen={isDeadlineHistoryModalOpen}
                    closeModal={() =>
                        handleModal(setIsDeadlineHistoryModalOpen, false)
                    }
                    modalData={projectData?.project_deadline_extension}
                    isLoading={isProjectDetailsLoading}
                />
            )}

            {/* ---- End Modal ---- */}
        </CardWrapper>
    );
};

export default DashboardProgress;

DashboardProgress.propTypes = {
    projectData: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    isProjectDetailsLoading: PropTypes.any,
};
