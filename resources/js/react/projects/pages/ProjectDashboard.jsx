import React, { useContext, useEffect } from "react";

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
import { ProjectData } from "../constants";

// Components - UI - Custom
import Switch from "../../global/Switch";

// context
import { ProjectDashboardContext } from "../context/ProjectDashboardProvider";

// hooks - custom - useWhyDidYouRender
import useWhyDidYouRender from "../../hooks/useWhyDidYouRender";


const ProjectDashboard = ({ projectType }) => {
    useWhyDidYouRender("ProjectDashboard");
    const pathName = window.location.pathname.split("projects/").pop();
    const { setProject_id, projectData } = useContext(ProjectDashboardContext);
    const [dummyTypeChange, setDummyTypeChange] = React.useState(0);
    const projectDataDummy = ProjectData[dummyTypeChange];
    const [isLoading, setIsLoading] = React.useState(false);

    setTimeout(() => {
        setIsLoading(false);
    }, 16000);

    console.log(projectData);
    console.log(pathName);

    useEffect(() => {
        setProject_id(pathName);
    }, [pathName]);

    return (
        <section>
            {/* Project Dashboard Header Section */}
            <DashboardHeaderSection
                setDummyTypeChange={setDummyTypeChange}
                isLoading={isLoading}
                projectData={projectDataDummy}
            />
            {/* End Project Dashboard Header Section */}

            <Switch>
                {/* Fixed Project Info Section */}
                <Switch.Case condition={projectType === "fixed"}>
                    <DashboardProjectInfoFixedSection
                        isLoading={isLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                {/* End Fixed Project Info Section */}

                {/* Hourly Project Info Section */}
                <Switch.Case condition={projectType === "hourly"}>
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
