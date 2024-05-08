import React from "react";

// UI Components - Custom
import { SectionContainer } from "../ui/styledComponents";

// Components - UI - Custom
import Button from "../ui/customComponents/Button/Button";

// Style
import style from "./styles/dashboardActionButtonSection.module.css";

const DashboardActionButtonSection = () => {
    return (
        <div className={`${style.dashboardActionButtonSection} mb-4`}>
            <SectionContainer className={`${style.dashboardActionLeftButton}`}>
                <Button className={`${style.dashboardActionButton}`}>
                    PM Task Guideline
                </Button>
                <Button className={`${style.dashboardActionButton}`}>
                    Project Deadline Ext. Request
                </Button>
            </SectionContainer>
            <SectionContainer className={`${style.dashboardActionRightButton}`}>
                <Button className={`${style.dashboardActionButton}`}>
                    QC Form
                </Button>
                <Button className={`${style.dashboardActionButton}`}>
                    Completion Form
                </Button>
                <Button className={`${style.dashboardActionButton}`}>
                    Dispute Form
                </Button>
            </SectionContainer>
        </div>
    );
};

export default DashboardActionButtonSection;
