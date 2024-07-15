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
import Switch from "../../../global/Switch";

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
    const projectInfo = projectData;
    const dealInfo = projectData?.deal;
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
                    <SectionContainer className="mb-4" minHeight="16vh" maxHeight="16vh">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                            >
                                <TextLoaderDynamic
                                    number={1}
                                    widthDeference={20}
                                    hight={16}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
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
                    <SectionContainer className="mb-4" minHeight="60vh" maxHeight="60">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="44.5vh"
                                minHeight="44.5vh"
                            >
                                <TextLoaderDynamic
                                    number={10}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={5}
                                    className="mb-2"
                                />
                                <br />
                                <TextLoaderDynamic
                                    number={6}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={4}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="44.5vh"
                                minHeight="44.5vh"
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
                    <SectionContainer className="mb-4">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="12vh"
                                minHeight="12vh"
                            >
                                <TextLoaderDynamic
                                    number={8}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={3}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="12vh"
                                minHeight="12vh"
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
                    <SectionContainer className="mb-4" minHeight="16vh" maxHeight="16vh">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                            >
                                <TextLoaderDynamic
                                    number={2}
                                    widthDeference={20}
                                    hight={16}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
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
                    <SectionContainer className="mb-4" minHeight="16vh" maxHeight="16vh">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                            >
                                <TextLoaderDynamic
                                    number={4}
                                    widthDeference={20}
                                    hight={16}
                                    className="mb-2"
                                />
                                <TextLoaderDynamic
                                    number={4}
                                    widthDeference={20}
                                    hight={16}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                                className="pt-3 "
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
                    <SectionContainer className="mb-4" minHeight="16vh" maxHeight="16vh">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                            >
                                <TextLoaderDynamic
                                    number={5}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={4}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                                className="pt-3 "
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
                    <SectionContainer className="mb-4" minHeight="16vh" maxHeight="16vh">
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
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                            >
                                <TextLoaderDynamic
                                    number={6}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={2}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="7vh"
                                minHeight="7vh"
                                className="pt-3 "
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description6),
                                }}
                            />
                        )}
                    </SectionContainer>
                    {/* End login Information */}
                    <SectionContainer>
                        <DashboardCardTitle
                            title="Any other notes for the project manager/technical team"
                            isBorderUse={true}
                            borderType="dotted"
                        />
                        {handleLoadingComponent(
                            isLoading,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="12vh"
                                minHeight="12vh"
                            >
                                <TextLoaderDynamic
                                    number={5}
                                    widthDeference={20}
                                    hight={16}
                                    fullSizeCount={2}
                                    className="mb-2"
                                />
                            </SectionContentContainer>,
                            <SectionContentContainer
                                color="linear-gradient(0deg, #F2F9FE 0%, #F2F9FE 100%), #D9D9D9"
                                maxHeight="12vh"
                                minHeight="12vh"
                                className="pt-3 "
                                dangerouslySetInnerHTML={{
                                    __html:
                                        !isLoading &&
                                        formatHttp(dealInfo?.description9),
                                }}
                            />
                        )}
                    </SectionContainer>
                </div>
            </div>
            {/* End Details shared by the sales executive */}

            <div
                className={`${style.dashboardSalesAndPMInfoSection} ${style.dashboardSalesAndPMInfoReverseSection}`}
            >
                <div>
                    {/* End Details shared by the sales executive */}
                    <DashboardCardTitle
                        title="Comments by Seals Lead:"
                        isBorderUse={false}
                    />
                    {/* Comments by Project Manager */}

                    <Switch>
                        <SectionContainer>
                            {/* Requirements Defined*/}
                            <SectionContentContainer
                                color="#D8EDFC"
                                maxHeight="35vh"
                                className="pt-3 mb-4"
                            >
                                {" "}
                                <DashboardCardTitle
                                    title="Confirm that requirement is defined or not?"
                                    isBorderUse={true}
                                    borderType="dotted"
                                    className="mb-3"
                                />
                                {handleLoadingComponent(
                                    isLoading,
                                    <SectionContentContainer
                                        maxHeight="7vh"
                                        minHeight="7vh"
                                    >
                                        <TextLoaderDynamic
                                            number={5}
                                            widthDeference={20}
                                            hight={16}
                                            fullSizeCount={2}
                                            className="mb-2"
                                        />
                                    </SectionContentContainer>,
                                    <>
                                        <Switch.Case
                                            condition={
                                                !dealInfo?.requirment_define
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                            >
                                                <p className="boldText">N/A</p>
                                            </SectionContentContainer>
                                        </Switch.Case>

                                        <Switch.Case
                                            condition={
                                                dealInfo?.requirment_define
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        !isLoading &&
                                                        formatHttp(
                                                            dealInfo?.requirment_define
                                                        ),
                                                }}
                                            />
                                        </Switch.Case>
                                    </>
                                )}
                            </SectionContentContainer>
                            {/* End Requirements Defined*/}
                            {/* Price Authorization */}
                            <SectionContentContainer
                                color="#D8EDFC"
                                maxHeight="35vh"
                                className="pt-3 mb-4"
                            >
                                <DashboardCardTitle
                                    title="Confirm that price is ok?"
                                    isBorderUse={true}
                                    borderType="dotted"
                                    className="mb-3"
                                />
                                {handleLoadingComponent(
                                    isLoading,
                                    <SectionContentContainer
                                        maxHeight="7vh"
                                        minHeight="7vh"
                                    >
                                        <TextLoaderDynamic
                                            number={5}
                                            widthDeference={20}
                                            hight={16}
                                            fullSizeCount={1}
                                            className="mb-2"
                                        />
                                    </SectionContentContainer>,
                                    <>
                                        <Switch.Case
                                            condition={
                                                !dealInfo?.price_authorization
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                            >
                                                <p className="boldText">N/A</p>
                                            </SectionContentContainer>
                                        </Switch.Case>

                                        <Switch.Case
                                            condition={
                                                dealInfo?.price_authorization
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        !isLoading &&
                                                        formatHttp(
                                                            dealInfo?.price_authorization
                                                        ),
                                                }}
                                            />
                                        </Switch.Case>
                                    </>
                                )}
                            </SectionContentContainer>
                            {/* End Deadline Provided */}
                            <SectionContentContainer
                                color="#D8EDFC"
                                maxHeight="35vh"
                                className="pt-3"
                            >
                                <DashboardCardTitle
                                    title="Has sales team set project deadline properly?"
                                    isBorderUse={true}
                                    borderType="dotted"
                                    className="mb-3"
                                />
                                {handleLoadingComponent(
                                    isLoading,
                                    <SectionContentContainer
                                        maxHeight="7vh"
                                        minHeight="7vh"
                                    >
                                        <TextLoaderDynamic
                                            number={5}
                                            widthDeference={20}
                                            hight={16}
                                            fullSizeCount={1}
                                            className="mb-2"
                                        />
                                    </SectionContentContainer>,

                                    <>
                                        <Switch.Case
                                            condition={
                                                !dealInfo?.project_deadline_authorization
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                            >
                                                <p className="boldText">N/A</p>
                                            </SectionContentContainer>
                                        </Switch.Case>

                                        <Switch.Case
                                            condition={
                                                dealInfo?.project_deadline_authorization
                                            }
                                        >
                                            <SectionContentContainer
                                                color="#D8EDFC"
                                                maxHeight="7vh"
                                                minHeight="7vh"
                                                className="pt-0"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        !isLoading &&
                                                        formatHttp(
                                                            dealInfo?.project_deadline_authorization
                                                        ),
                                                }}
                                            />
                                        </Switch.Case>
                                    </>
                                )}
                            </SectionContentContainer>
                        </SectionContainer>
                    </Switch>
                </div>
                <div className="flex flex-column">
                    {/* Any other notes for the project manager/technical team */}

                    {/* End Any other notes for the project manager/technical team */}
                    {/* End Details shared by the sales executive */}
                    <DashboardCardTitle
                        title="Comments by Project Manager:"
                        isBorderUse={false}
                    />
                    {/* Comments by Project Manager */}

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
                                <SectionContentContainer
                                    color="#D8EDFC"
                                    maxHeight="7vh"
                                    minHeight="7vh"
                                >
                                    <TextLoaderDynamic
                                        number={5}
                                        widthDeference={20}
                                        hight={16}
                                        fullSizeCount={2}
                                        className="mb-2"
                                    />
                                </SectionContentContainer>,
                                <SectionContentContainer
                                    color="#D8EDFC"
                                    maxHeight="7vh"
                                    minHeight="7vh"
                                >
                                    <p className="boldText">
                                        {projectInfo?.requirement_defined ??
                                            "N/A"}
                                    </p>
                                </SectionContentContainer>
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
                                title="Is the deadline provided by sales realistic?"
                                isBorderUse={true}
                                borderType="dotted"
                                className="mb-3"
                            />
                            {handleLoadingComponent(
                                isLoading,
                                <SectionContentContainer
                                    color="#D8EDFC"
                                    maxHeight="7vh"
                                    minHeight="7vh"
                                >
                                    <TextLoaderDynamic
                                        number={5}
                                        widthDeference={20}
                                        hight={16}
                                        fullSizeCount={1}
                                        className="mb-2"
                                    />
                                </SectionContentContainer>,
                                <SectionContentContainer
                                    color="#D8EDFC"
                                    maxHeight="7vh"
                                    minHeight="7vh"
                                >
                                    <p className="boldText">
                                        {projectInfo?.deadline_meet ?? "N/A"}
                                    </p>
                                </SectionContentContainer>
                            )}
                        </SectionContentContainer>
                        {/* End Deadline Provided */}
                    </SectionContainer>
                </div>
            </div>
            {/* End Comments by Project Manager */}
        </React.Fragment>
    );
};

export default DashboardSalesAndPMInfoSection;

DashboardSalesAndPMInfoSection.propTypes = {
    projectData: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};
