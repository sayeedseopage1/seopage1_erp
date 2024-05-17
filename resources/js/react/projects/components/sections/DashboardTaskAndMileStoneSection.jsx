import React from "react";
import PropTypes from "prop-types";

// style
import style from "./styles/dashboardTaskAndMileStoneSection.module.css";

// components - custom
import { SectionContainer } from "../ui/styledComponents";

// components - ui - shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// components - table
import DashboardDataTable from "../Table/DashboardDataTable";
import { DashboardDataTableTaskColumns } from "../Table/DashboardDataTableTaskColumns";
import { DashboardDataTableMilestoneColumns } from "../Table/DashboardDataTableMilestoneColumns";

// constants
import { DashboardMileStoneTableData, DashboardTaskTableData } from "../../constants";

const DashboardTaskAndMileStoneSection = ({
    isLoading
}) => {
    return (
        <div className={`${style.dashboardTaskAndMileStoneSection} mb-4`}>
            <SectionContainer>
                <DashboardCardTitle title="Task List" isBorderUse={false} />
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* Dashboard Task Table */}
                        <DashboardDataTable
                            tableColumns={DashboardDataTableTaskColumns}
                            tableName="Task List"
                            tableData={DashboardTaskTableData}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer>
                <DashboardCardTitle title="Project Milestones" isBorderUse={false} />
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* Dashboard Task Table */}
                        <DashboardDataTable
                            tableColumns={DashboardDataTableMilestoneColumns}
                            tableName="Project Milestones"
                            tableData={DashboardMileStoneTableData}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default DashboardTaskAndMileStoneSection;

DashboardTaskAndMileStoneSection.propTypes = {
    isLoading: PropTypes.bool,
};
