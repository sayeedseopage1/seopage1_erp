import React from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import { SectionContainer } from "../ui/styledComponents";

// Components - UI - Custom
import Button from "../ui/customComponents/Button/Button";

// Style
import style from "./styles/dashboardActionButtonSection.module.css";
import PMTaskGuidelineModal from "../modal/PMTaskGuidelineModal";

const DashboardActionButtonSection = ({
    projectData,
    isLoading
}) => {
    const [isPmTaskGuidelineModalOpen, setIsPmTaskGuidelineModalOpen] =
        React.useState(false);

    const handleOpenPmTaskGuidelineModal = () => {
        setIsPmTaskGuidelineModalOpen(true);
    };

    const handleClosePmTaskGuidelineModal = () => {
        setIsPmTaskGuidelineModalOpen(false);
    };

    return (
        <div className={`${style.dashboardActionButtonSection} mb-4`}>
            <SectionContainer className={`${style.dashboardActionLeftButton}`}>
                <Button
                    onClick={handleOpenPmTaskGuidelineModal}
                    className={`${style.dashboardActionButton}`}
                >
                    PM Task Guideline
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style.dashboardActionButton}`}
                >
                    Project Deadline Ext. Request
                </Button>
            </SectionContainer>
            <SectionContainer className={`${style.dashboardActionRightButton}`}>
                <Button
                    onClick={() => {}}
                    className={`${style.dashboardActionButton}`}
                >
                    QC Form
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style.dashboardActionButton}`}
                >
                    Completion Form
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style.dashboardActionButton}`}
                >
                    Dispute Form
                </Button>
            </SectionContainer>

            {/* Modal */}

            <PMTaskGuidelineModal
                isModalOpen={isPmTaskGuidelineModalOpen}
                closeModal={handleClosePmTaskGuidelineModal}
                modalData={projectData?.projectData?.pm_task_guideline}
                isLoading={isLoading}
            />
        </div>
    );
};

export default DashboardActionButtonSection;


DashboardActionButtonSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
}