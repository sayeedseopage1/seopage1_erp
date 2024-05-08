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

const DashboardProgress = ({ projectData, style }) => {
    return (
        <CardWrapper color="#ffffff">
            <DashboardCardTitle
                title="Project Progress"
                isBorderUse={true}
                rightText={`Completed: ${projectData.project.progress}%`}
                rightTextColor={"#70CA62"}
            />
            <div className="flexBetween my-3 dashboardProgressData">
                <div className="flexColumn justify-content-between dashboardProgressDataDates">
                    <div className="flexColumn">
                        <p>Start Date</p>
                        <span className="flexItemCenter">
                            <LuCalendarDays className="mr-1" />
                            {projectData.project.start_date}
                        </span>
                    </div>
                    <div className="flexColumn">
                        <p> Deadline</p>
                        <span className="flexItemCenter">
                            <LuCalendarDays className="mr-1" />{" "}
                            {projectData.project.deadline}
                        </span>
                    </div>
                </div>
                <ProjectProgressChart />
            </div>

            <div className={`${style.dashboardProgressStatusContainer} mt-5`}>
                {ProjectProgressStatus.map((status) => (
                    <DashboardProgressStatus
                        key={status.id}
                        title={status.name}
                        statusType={status.tag}
                    />
                ))}
            </div>
        </CardWrapper>
    );
};

export default DashboardProgress;

DashboardProgress.propTypes = {
    projectData: PropTypes.object.isRequired,
    style: PropTypes.object,
};
