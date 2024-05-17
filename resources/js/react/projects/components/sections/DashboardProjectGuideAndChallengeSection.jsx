import React, { useEffect } from "react";
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

const DashboardProjectGuideAndChallengeSection = ({
    isLoading,
    projectData,
}) => {
    const projectInfo = projectData?.projectData?.project;

    return (
        <div
            className={`${style.dashboardProjectGuideAndChallengeSection} mb-4`}
        >
            <SectionContainer>
                <DashboardCardTitle
                    title="Project General Guidelines"
                    isBorderUse={false}
                />
                {handleLoadingComponent(
                    isLoading,
                    <SectionContentContainer color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9" maxHeight="35vh">
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
                    <SectionContentContainer
                        color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
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
            <SectionContainer>
                <DashboardCardTitle
                    title="Project Challenge"
                    isBorderUse={false}
                />
                <SectionContentContainer color="#FFF" maxHeight="35vh">
                    {handleLoadingComponent(
                        isLoading,
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
                        <p>
                            {projectInfo?.project_challenges ??
                                projectInfo?.comment}
                        </p>
                    )}
                </SectionContentContainer>
            </SectionContainer>
        </div>
    );
};

export default DashboardProjectGuideAndChallengeSection;

DashboardProjectGuideAndChallengeSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
};
