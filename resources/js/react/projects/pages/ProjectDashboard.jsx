import React from "react";

// sections
import DashboardHeaderSection from "../components/sections/DashboardHeaderSection";
import DashboardActionButtonSection from "../components/sections/DashboardActionButtonSection";
import DashboardTaskAndMileStoneSection from "../components/sections/DashboardTaskAndMileStoneSection";
import DashboardFreelancerInfoSection from "../components/sections/DashboardFreelancerInfoSection";
import DashboardProjectGuideAndChallengeSection from "../components/sections/DashboardProjectGuideAndChallengeSection";
import DashboardSalesAndPMInfoSection from "../components/sections/DashboardSalesAndPMInfoSection";
import DashboardProjectInfoFixedSection from "../components/sections/DashboardProjectInfoFixedSection";
import DashboardProjectInfoHourlySection from "../components/sections/DashboardProjectInfoHourlySection";

// Constants
import { ProjectData, projectData } from "../constants";

// Components - UI - Custom
import Switch from "../../global/Switch";

const ProjectDashboard = () => {
    const [dummyTypeChange, setDummyTypeChange] = React.useState(0);
    const projectData = ProjectData[dummyTypeChange];
    const [isLoading, setIsLoading] = React.useState(false);

    setTimeout(() => {
        setIsLoading(false);
    }, 16000);

    return (
        <section>
            {/* Project Dashboard Header Section */}
            <DashboardHeaderSection
                setDummyTypeChange={setDummyTypeChange}
                isLoading={isLoading}
                projectData={projectData}
            />
            {/* End Project Dashboard Header Section */}

            <Switch>
                {/* Fixed Project Info Section */}
                <Switch.Case condition={projectData?.projectType === "Fixed"}>
                    <DashboardProjectInfoFixedSection
                        isLoading={isLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                {/* End Fixed Project Info Section */}

                {/* Hourly Project Info Section */}
                <Switch.Case condition={projectData?.projectType === "Hourly"}>
                    <DashboardProjectInfoHourlySection
                        isLoading={isLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                {/* End Hourly Project Info Section */}
            </Switch>

            {/* Project Dashboard Actions Button Section */}
            <DashboardActionButtonSection
                projectData={projectData}
                isLoading={isLoading}
            />
            {/* End Project Dashboard Actions Button Section */}

            {/* Project Dashboard Task and Milestone Section */}
            <DashboardTaskAndMileStoneSection isLoading={isLoading} />
            {/* End Project Dashboard Task and Milestone Section */}

            {/* Project Freelancer Info Section */}
            <DashboardFreelancerInfoSection
                isLoading={isLoading}
                projectData={projectData}
            />
            {/* End Project Freelancer Info Section */}

            {/* Project Guide and Challenge Section */}
            <DashboardProjectGuideAndChallengeSection
                isLoading={isLoading}
                projectData={projectData}
            />
            {/* End Project Guide and Challenge Section */}

            {/* Project Sales and PM Info Section */}
            <DashboardSalesAndPMInfoSection
                isLoading={isLoading}
                projectData={projectData}
            />
            {/* End Project Sales and PM Info Section */}
        </section>
    );
};

export default ProjectDashboard;
