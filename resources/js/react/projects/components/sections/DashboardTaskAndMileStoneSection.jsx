import React, { useContext } from "react";
import PropTypes from "prop-types";

// style
import style from "./styles/dashboardTaskAndMileStoneSection.module.css";

// components - styled components
import { SectionContainer } from "../ui/styledComponents";

// components - ui - shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";
import SingleButton from "../ui/CustomButton/SingleButton";

// components - table
import DashboardDataTable from "../Table/DashboardDataTable";
import { DashboardDataTableTaskColumns } from "../Table/DashboardDataTableTaskColumns";
import { DashboardDataTableMilestoneColumns } from "../Table/DashboardDataTableMilestoneColumns";

// context
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";


// loader
import Loader from "../../../global/Loader";

/**
 * Dashboard Task And Milestone Section
 * @component
 * @param {object} props - Component properties
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Task And Milestone Section Component for showing task and milestone on the dashboard page.
 */

const DashboardTaskAndMileStoneSection = () => {
    const {
        projectTaskList,
        isProjectTaskListLoading,
        refetchProjectTaskList,
        projectMilestoneList,
        isProjectMilestoneLoading,
        refetchProjectMilestone,
    } = useContext(ProjectDashboardContext);


    return (
        <div className={`${style.dashboardTaskAndMileStoneSection} mb-4`}>
            <SectionContainer>
                <div className="d-flex justify-content-between align-items-center">
                    <DashboardCardTitle title="Task List" isBorderUse={false} />
                    <SingleButton
                        label={
                            isProjectTaskListLoading ? (
                                <Loader title="Refreshing" />
                            ) : (
                                "Refresh"
                            )
                        }
                        className="mr-0"
                        onClick={() => refetchProjectTaskList()}
                        type="primary"
                    />
                </div>
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* Dashboard Task Table */}
                        <DashboardDataTable
                            tableColumns={DashboardDataTableTaskColumns}
                            tableName="Task List"
                            tableData={projectTaskList}
                            isLoading={isProjectTaskListLoading}
                        />
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer>
                <div className="d-flex justify-content-between align-items-center">
                    <DashboardCardTitle
                        title="Project Milestones"
                        isBorderUse={false}
                    />
                    <SingleButton
                        label={
                            isProjectMilestoneLoading ? (
                                <Loader title="Refreshing" />
                            ) : (
                                "Refresh"
                            )
                        }
                        className="mr-0"
                        onClick={() => refetchProjectMilestone()}
                        type="primary"
                    />
                </div>
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* Dashboard Project Milestones Table */}
                        <DashboardDataTable
                            tableColumns={DashboardDataTableMilestoneColumns}
                            tableName="Project Milestones"
                            tableData={projectMilestoneList}
                            isLoading={isProjectMilestoneLoading}
                        />
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default DashboardTaskAndMileStoneSection;

DashboardTaskAndMileStoneSection.propTypes = {};
