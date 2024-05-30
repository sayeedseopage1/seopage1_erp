import React from "react";
import PropTypes from "prop-types";

// styles
import style from "./styles/dashboardSalesAndPMInfoSection.module.css";

// Components - Custom
import {
    SectionContainer,
    SectionContentContainer,
} from "../ui/styledComponents";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Components - Loader
import TextLoaderDynamic from "../loader/TextLoaderDynamic";

// Constants
import { DetailsSalesExecutiveConstant } from "../../constants";

// Helper -
import { formatHttp, handleLoadingComponent } from "../../helper";

/**
 * Dashboard Sales And PM Info Section
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Sales And PM Info Section Component for showing sales and project manager info on the dashboard page.
 */

const DashboardSalesAndPMInfoSection = ({ projectData, isLoading }) => {
    const projectInfo = projectData?.projectData?.project;
    const dealInfo = projectData?.projectData?.project?.deal;
    return (
        <React.Fragment>
            <DashboardCardTitle
                title="Details shared by the sales executive:"
                isBorderUse={false}
            />
            {/* Details shared by the sales executive */}
            <div className={`${style.dashboardSalesAndPMInfoSection} mb-4`}>
                <div>
                    {/* Project Brief in 2-8 Words */}
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.wordsHere2_8
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.wordsHere2_8
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={2}
                                widthDeference={20}
                                hight={16}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description2),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Project Brief in 2-8 Words */}
                    {/* Project Brief in 3-4 Words */}
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.linesHere3_4
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.linesHere3_4
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={10}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={5}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description3),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Project Brief in 3-4 Words */}
                    {/* Project Involved Other Department */}
                    <SectionContainer>
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.involvedProject
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.involvedProject
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={8}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={3}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description8),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Project Involved Other Department */}
                </div>
                <div>
                    {/* Project Reference Website */}
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.referenceWebsite
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.referenceWebsite
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={2}
                                widthDeference={20}
                                hight={16}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description4),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Project Reference Website */}
                    {/* Client Concern */}
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.clientConcern
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.clientConcern
                                    ?.infoText
                            }
                        />

                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={2}
                                widthDeference={20}
                                hight={16}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description5),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Client Concern */}
                    {/* Logo Reference */}
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.logoReference
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.logoReference
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <>
                                <TextLoaderDynamic
                                    number={3}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={3}
                                    className="mb-2"
                                    parentClassName="pl-4 pt-3"
                                />
                                <br />
                                <TextLoaderDynamic
                                    number={4}
                                    widthDeference={10}
                                    hight={16}
                                    fullSizeCount={1}
                                    className="mb-2"
                                    parentClassName="pl-4 pt-3"
                                />
                            </>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description7),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Logo Reference */}
                    {/* login Information */}
                    <SectionContainer>
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant?.requiredLogins
                                    ?.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant?.requiredLogins
                                    ?.infoText
                            }
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={6}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={2}
                                className="mb-2"
                                parentClassName="pl-4 pt-3"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description6),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End login Information */}
                </div>
            </div>
            {/* End Details shared by the sales executive */}
            <DashboardCardTitle
                title="Comments by Project Manager:"
                isBorderUse={false}
            />
            {/* Comments by Project Manager */}
            <div className={`${style.dashboardSalesAndPMInfoSection}`}>
                <SectionContainer>
                    {/* Requirements Defined*/}
                    <SectionContentContainer
                        color="#D8EDFC"
                        maxHeight="35vh"
                        className="pt-3 mb-4"
                    >
                        {" "}
                        <DashboardCardTitle
                            title="Were the requirements properly defined by Sales"
                            isBorderUse={true}
                            borderType="dotted"
                            className="mb-3"
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={5}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={2}
                                className="mb-2"
                            />,
                            <p className="boldText">
                                {projectInfo?.requirement_defined}
                            </p>
                        )}
                    </SectionContentContainer>
                    {/* End Requirements Defined*/}
                    {/* Deadline Provided */}
                    <SectionContentContainer
                        color="#D8EDFC"
                        maxHeight="35vh"
                        className="pt-3"
                    >
                        <DashboardCardTitle
                            title="Is the deadline provided by sales realistic"
                            isBorderUse={true}
                            borderType="dotted"
                            className="mb-3"
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={5}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={1}
                                className="mb-2"
                            />,
                            <p className="boldText">
                                {projectInfo?.deadline_meet}
                            </p>
                        )}
                    </SectionContentContainer>
                    {/* End Deadline Provided */}
                </SectionContainer>

                <div>
                    {/* Any other notes for the project manager/technical team */}
                    <SectionContainer>
                        <DashboardCardTitle
                            title="Any other notes for the project manager/technical team"
                            isBorderUse={true}
                            borderType="dotted"
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <TextLoaderDynamic
                                number={6}
                                widthDeference={20}
                                hight={16}
                                fullSizeCount={2}
                                className="mb-2"
                                parentClassName="pl-4"
                            />,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="35vh"
                                className="pt-3"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description9),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End Any other notes for the project manager/technical team */}
                </div>
            </div>
            {/* End Comments by Project Manager */}
        </React.Fragment>
    );
};

export default DashboardSalesAndPMInfoSection;

DashboardSalesAndPMInfoSection.propTypes = {
    projectData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};
