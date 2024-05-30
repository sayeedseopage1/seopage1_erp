import React from "react";
import PropTypes from "prop-types";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Components - custom
import {
    SectionContainer,
    SectionContentContainer,
} from "../ui/styledComponents";

// Components - Ui - Loader
import TextLoaderDynamic from "../loader/TextLoaderDynamic";

// Styles
import style from "./styles/dashboardProjectGuideAndChallengeSection.module.css";

// Helper
import { formatHttp, handleLoadingComponent } from "../../helper";

/**
 * Dashboard Project Guide And Challenge Section
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Project Guide And Challenge Section Component for showing project guide and challenge on the dashboard page.
 *
 */

const DashboardProjectGuideAndChallengeSection = ({
    isLoading,
    projectData,
}) => {
    const projectInfo = projectData?.projectData?.project;

    return (
        <div
            className={`${style.dashboardProjectGuideAndChallengeSection} mb-4`}
        >
            {/* Project General Guidelines */}
            <SectionContainer>
                <DashboardCardTitle
                    title="Project General Guidelines"
                    isBorderUse={false}
                />
                {/* 
                    This Function will handle the loading state of the component,
                    and show the loader component when the data is loading
                */}
                {handleLoadingComponent(
                    isLoading,
                    // This will be shown when the data is loading
                    <SectionContentContainer
                        color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                        maxHeight="35vh"
                    >
                        <TextLoaderDynamic
                            number={4}
                            widthDeference={20}
                            hight={16}
                            fullSizeCount={4}
                            className="mb-2"
                            parentClassName="pt-3"
                        />
                        <TextLoaderDynamic
                            number={8}
                            widthDeference={20}
                            hight={16}
                            fullSizeCount={4}
                            className="mb-2"
                            parentClassName="pt-2"
                        />
                    </SectionContentContainer>,
                    // This will be shown when the data is loaded
                    <SectionContentContainer
                        color="#FFF"
                        maxHeight="35vh"
                        className="pt-3"
                        dangerouslySetInnerHTML={{
                            __html:
                                !isLoading &&
                                formatHttp(projectInfo?.project_summary),
                        }}
                    />
                )}
            </SectionContainer>
            {/*End Project General Guidelines  */}

            {/* Project Challenge */}
            <SectionContainer>
                <DashboardCardTitle
                    title="Project Challenge"
                    isBorderUse={false}
                />
                <SectionContentContainer color="#FFF" maxHeight="35vh">
                    {handleLoadingComponent(
                        isLoading,
                        // This will be shown when the data is loading
                        <>
                            <TextLoaderDynamic
                                number={4}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={4}
                                className="mb-2"
                                parentClassName="pt-3"
                            />
                            <TextLoaderDynamic
                                number={8}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={4}
                                className="mb-2"
                                parentClassName="pt-2"
                            />
                        </>,
                        // This will be shown when the data is loaded
                        <p>
                            {projectInfo?.project_challenges ??
                                projectInfo?.comment}
                        </p>
                    )}
                </SectionContentContainer>
            </SectionContainer>
            {/* End Project Challenge */}
        </div>
    );
};

export default DashboardProjectGuideAndChallengeSection;

DashboardProjectGuideAndChallengeSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
