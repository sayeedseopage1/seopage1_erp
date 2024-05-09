import React from "react";

// sections
import DashboardHeaderSection from "../components/sections/DashboardHeaderSection";
import DashboardActionButtonSection from "../components/sections/DashboardActionButtonSection";
import DashboardTaskAndMileStoneSection from "../components/sections/DashboardTaskAndMileStoneSection";
import DashboardFreelancerInfoSection from "../components/sections/DashboardFreelancerInfoSection";
import DashboardProjectGuideAndChallengeSection from "../components/sections/DashboardProjectGuideAndChallengeSection";
import DashboardSalesAndPMInfoSection from "../components/sections/DashboardSalesAndPMInfoSection";
import { projectData } from "../constants";
import DashboardProjectInfoFixedSection from "../components/sections/DashboardProjectInfoFixedSection";
import DashboardProjectInfoHourlySection from "../components/sections/DashboardProjectInfoHourlySection";

// Components - UI - Custom
import Switch from "../../global/Switch";

const ProjectDashboard = () => {
    const projectType = projectData[1].projectType;
    return (
        <section>
            <DashboardHeaderSection />
            <Switch>
                <Switch.Case condition={projectType === "Fixed"}>
                    <DashboardProjectInfoFixedSection
                        projectData={projectData[1].projectData}
                    />
                </Switch.Case>
                <Switch.Case condition={projectType === "Hourly"}>
                    <DashboardProjectInfoHourlySection
                        projectData={projectData[0].projectData}
                    />
                </Switch.Case>
            </Switch>
            <DashboardActionButtonSection   />
            <DashboardTaskAndMileStoneSection  />
            <DashboardFreelancerInfoSection projectData={projectData[1]} />
            <DashboardProjectGuideAndChallengeSection />
            <DashboardSalesAndPMInfoSection />
        </section>
    );
};

export default ProjectDashboard;
