import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Components - custom
import {
    SectionContainer,
    SectionContentContainer,
} from "../ui/styledComponents";

// Styles
import style from "./styles/dashboardProjectGuideAndChallengeSection.module.css";

// Helper
import { formatHttp } from "../../helper";


const DashboardProjectGuideAndChallengeSection = ({ projectData }) => {
    const projectInfo = projectData.projectData.project;


    return (
        <div
            className={`${style.dashboardProjectGuideAndChallengeSection} mb-4`}
        >
            <SectionContainer>
                <DashboardCardTitle
                    title="Project General Guidelines"
                    isBorderUse={false}
                />
                <SectionContentContainer
                    color="#FFF"
                    maxHeight="35vh"
                    dangerouslySetInnerHTML={{
                        __html: `
                            ${formatHttp(projectInfo.project_summary)}
                        `,
                    }}
                />
            </SectionContainer>
            <SectionContainer>
                <DashboardCardTitle
                    title="Project Challenge"
                    isBorderUse={false}
                />
                <SectionContentContainer color="#FFF" maxHeight="35vh">
                    <p>
                        {projectInfo.project_challenges ?? projectInfo.comment}
                    </p>
                </SectionContentContainer>
            </SectionContainer>
        </div>
    );
};

export default DashboardProjectGuideAndChallengeSection;

DashboardProjectGuideAndChallengeSection.propTypes = {
    projectData: PropTypes.object,
};
