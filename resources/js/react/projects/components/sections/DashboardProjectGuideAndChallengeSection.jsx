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
import Switch from "../../../global/Switch";

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
                    <SectionContentContainer color="#FFF" maxHeight="35vh">
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
                    <Switch>
                        <Switch.Case
                            condition={
                                !isLoading && projectData?.project_summary
                            }
                        >
                            <SectionContentContainer
                                color="#FFF"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(
                                            projectData?.project_summary
                                        ),
                                }}
                            />
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                !isLoading && !projectData?.project_summary
                            }
                        >
                            <SectionContentContainer
                                color="#FFF"
                                maxHeight="35vh"
                                className="pt-3"
                            >
                                <p>N/A</p>
                            </SectionContentContainer>
                        </Switch.Case>
                    </Switch>
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
                            {projectData?.project_challenges ??
                                projectData?.comments ??
                                "N/A"}
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
