import React from "react";

// sections
import DashboardHeaderSection from "../components/sections/DashboardHeaderSection";
import DashboardProjectInfoSection from "../components/sections/DashboardProjectInfoSection";
import DashboardActionButtonSection from "../components/sections/DashboardActionButtonSection";
import DashboardTaskAndMileStoneSection from "../components/sections/DashboardTaskAndMileStoneSection";
import DashboardFreelancerInfoSection from "../components/sections/DashboardFreelancerInfoSection";
import DashboardProjectGuideAndChallengeSection from "../components/sections/DashboardProjectGuideAndChallengeSection";
import DashboardSalesAndPMInfoSection from "../components/sections/DashboardSalesAndPMInfoSection";
import { projectData } from "../constants";

const ProjectDashboard = () => {
    return (
        <section>
            <DashboardHeaderSection />
            <DashboardProjectInfoSection projectData={projectData} />
            <DashboardActionButtonSection />
            <DashboardTaskAndMileStoneSection />
            <DashboardFreelancerInfoSection />
            <DashboardProjectGuideAndChallengeSection />
            <DashboardSalesAndPMInfoSection />
        </section>
    );
};

export default ProjectDashboard;
