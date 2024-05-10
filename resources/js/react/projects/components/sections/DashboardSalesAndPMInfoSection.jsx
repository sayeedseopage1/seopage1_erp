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
import { formatHttp } from "../../helper";
import { DetailsSalesExecutiveConstant } from "../../constants";

const DashboardSalesAndPMInfoSection = ({ projectData }) => {
    const projectInfo = projectData.projectData.project;
    const dealInfo = projectData.projectData.project.deal;
    return (
        <React.Fragment>
            <DashboardCardTitle
                title="Details shared by the sales executive:"
                isBorderUse={false}
            />
            <div className={`${style.dashboardSalesAndPMInfoSection} mb-4`}>
                <div>
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.wordsHere2_8.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.wordsHere2_8
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description2),
                            }}
                        />
                    </SectionContainer>
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.linesHere3_4.title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.linesHere3_4
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description3),
                            }}
                        />
                    </SectionContainer>
                    <SectionContainer>
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.involvedProject
                                    .title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.involvedProject
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description8),
                            }}
                        />
                    </SectionContainer>
                </div>
                <div>
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.referenceWebsite
                                    .title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.referenceWebsite
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description4),
                            }}
                        />
                    </SectionContainer>
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.clientConcern
                                    .title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.clientConcern
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description5),
                            }}
                        />
                    </SectionContainer>
                    <SectionContainer className="mb-4">
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.logoReference
                                    .title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.logoReference
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description7),
                            }}
                        />
                    </SectionContainer>
                    <SectionContainer>
                        <DashboardCardTitle
                            title={
                                DetailsSalesExecutiveConstant.requiredLogins
                                    .title
                            }
                            isBorderUse={true}
                            borderType="dotted"
                            isInfoIconUse={true}
                            infoText={
                                DetailsSalesExecutiveConstant.requiredLogins
                                    .infoText
                            }
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description6),
                            }}
                        />
                    </SectionContainer>
                </div>
            </div>
            <DashboardCardTitle
                title="Comments by Project Manager:"
                isBorderUse={false}
            />
            <div className={`${style.dashboardSalesAndPMInfoSection}`}>
                <SectionContainer>
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
                        <p className="boldText">{projectInfo.requirement_defined}</p>
                    </SectionContentContainer>
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
                        <p className="boldText">{projectInfo.deadline_meet}</p>
                    </SectionContentContainer>
                </SectionContainer>

                <div>
                    <SectionContainer>
                        <DashboardCardTitle
                            title="Any other notes for the project manager/technical team"
                            isBorderUse={false}
                        />
                        <SectionContentContainer
                            color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                            maxHeight="35vh"
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                                __html: formatHttp(dealInfo.description9),
                            }}
                        />
                    </SectionContainer>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardSalesAndPMInfoSection;

DashboardSalesAndPMInfoSection.propTypes = {
    projectData: PropTypes.object.isRequired,
};
