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
import PageNavigateButtons from "../components/shared/PageNavigateButtons";

// Components - UI - Custom
import Switch from "../../global/Switch";

// context
import { ProjectDashboardContext } from "../context/ProjectDashboardProvider";

// hooks - custom - useWhyDidYouRender
import useWhyDidYouRender from "../../hooks/useWhyDidYouRender";

// Components - styled components
import { SectionContainer } from "../components/ui/styledComponents";

const ProjectDashboard = ({ projectType }) => {
    useWhyDidYouRender("ProjectDashboard");
    const pathName = window?.location?.pathname?.split("projects/").pop();
    const { setProject_id, projectData, isProjectDetailsLoading } = useContext(
        ProjectDashboardContext
    );

    console.log(projectData);

    // get project id from the url path and set it to the context
    useEffect(() => {
        setProject_id(pathName);
    }, [pathName]);

    // check if the view all view modal buttons are visible
    const isVShowAllViewModalButtons = () => {
        const buttons = projectData?.buttons;

        return (
            buttons?.pm_task_guidline ||
            buttons?.project_qc_data ||
            buttons?.completion_form_data ||
            buttons?.see_project_dispute
        );
    };

    return (
        <section>
            <Switch>
                {/* Project Dashboard Header Section */}
                <DashboardHeaderSection
                    isLoading={isProjectDetailsLoading}
                    projectData={{
                        ...projectData,
                        projectType,
                    }}
                />
                {/* End Project Dashboard Header Section */}

                {/* Fixed Project Info Section */}
                <Switch.Case condition={projectType === "fixed"}>
                    <DashboardProjectInfoFixedSection
                        isLoading={isProjectDetailsLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                {/* End Fixed Project Info Section */}

                {/* Hourly Project Info Section */}
                <Switch.Case condition={projectType === "hourly"}>
                    <DashboardProjectInfoHourlySection
                        isLoading={isProjectDetailsLoading}
                        projectData={projectData}
                    />
                </Switch.Case>
                {/* End Hourly Project Info Section */}

                {/* Project Dashboard Actions Button Section */}
                <Switch.Case condition={isVShowAllViewModalButtons()}>
                    <DashboardActionButtonSection
                        projectData={projectData}
                        isLoading={isProjectDetailsLoading}
                    />
                </Switch.Case>
                {/* End Project Dashboard Actions Button Section */}

                {/* Project Dashboard Task and Milestone Section */}
                <DashboardTaskAndMileStoneSection />
                {/* End Project Dashboard Task and Milestone Section */}

                {/* Project Freelancer Info Section */}
                <DashboardFreelancerInfoSection
                    isLoading={isProjectDetailsLoading}
                    projectData={projectData}
                />
                {/* End Project Freelancer Info Section */}

                {/* Project Guide and Challenge Section */}
                <DashboardProjectGuideAndChallengeSection
                    isLoading={isProjectDetailsLoading}
                    projectData={projectData}
                />
                {/* End Project Guide and Challenge Section */}

                {/* Project Sales and PM Info Section */}
                <DashboardSalesAndPMInfoSection
                    isLoading={isProjectDetailsLoading}
                    projectData={projectData}
                />
                {/* End Project Sales and PM Info Section */}

                {/* Page Navigate Buttons */}
                <SectionContainer className="mt-4 d-flex d-md-none">
                    <PageNavigateButtons
                        className="d-flex d-md-none"
                        navigateData={projectData}
                    />
                </SectionContainer>
                {/* End Page Navigate Buttons */}
            </Switch>
        </section>
    );
};

export default ProjectDashboard;
