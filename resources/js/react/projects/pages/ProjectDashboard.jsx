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
    const projectData = ProjectData[1];
    const [isLoading, setIsLoading] = React.useState(false);

    setTimeout(() => {
        setIsLoading(false);
    }, 16000);

    return (
        <section>
            <DashboardHeaderSection isLoading={isLoading} projectData={projectData} />
            <Switch>
                <Switch.Case condition={projectData?.projectType === "Fixed"}>
                    <DashboardProjectInfoFixedSection
                        isLoading={isLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                <Switch.Case condition={projectData?.projectType === "Hourly"}>
                    <DashboardProjectInfoHourlySection
                        isLoading={isLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
            </Switch>
            <DashboardActionButtonSection projectData={projectData} isLoading={isLoading}  />
            <DashboardTaskAndMileStoneSection isLoading={isLoading}  />
            <DashboardFreelancerInfoSection isLoading={isLoading} projectData={projectData} />
            <DashboardProjectGuideAndChallengeSection isLoading={isLoading} projectData={projectData} />
            <DashboardSalesAndPMInfoSection isLoading={isLoading} projectData={projectData} />
        </section>
    );
};

export default ProjectDashboard;
