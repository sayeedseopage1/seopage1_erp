import React, { useContext } from "react";
import PropTypes from "prop-types";

// style
import style from "./styles/dashboardTaskAndMileStoneSection.module.css";
import btnStyle from "./styles/dashboardHeaderSection.module.css";

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
import Button from "../ui/customComponents/Button/Button";
import RefreshIcon from "../ui/Icons/RefreshIcon";

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
                    <Button
                        onClick={() => refetchProjectTaskList()}
                        className={`${btnStyle?.refreshButton} ml-0 ml-md-2 d-flex align-items-center justify-content-center`}
                        style={{ padding: "9px 20px" }}
                    >
                        <RefreshIcon
                            className={
                                isProjectTaskListLoading
                                    ? btnStyle?.refreshButtonActive
                                    : ""
                            }
                        />
                    </Button>
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
                    <Button
                        onClick={() => refetchProjectMilestone()}
                        className={`${btnStyle?.refreshButton} ml-0 ml-md-2 d-flex align-items-center justify-content-center`}
                        style={{ padding: "9px 20px" }}
                    >
                        <RefreshIcon
                            className={
                                isProjectMilestoneLoading
                                    ? btnStyle?.refreshButtonActive
                                    : ""
                            }
                        />
                    </Button>
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
