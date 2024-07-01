import React from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import { CardWrapper } from "../ui/styledComponents";
import PersonAvatar from "../PersonAvatar";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";
import { handleLoadingComponent } from "../../helper";
import UserCardLoader from "../loader/UserCardLoader";

/**
 * DashboardClientAndPMCard component
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {string} props.className - Additional classes
 * @returns {JSX.Element} - Rendered component
 * @description DashboardClientAndPMCard component for showing client and project manager info on the dashboard page.
 */
const DashboardClientAndPMCard = ({
    projectData,
    className = "",
    isLoading,
}) => {
    return (
        <>
            {/* Client Card */}
            <CardWrapper color="#ffffff" className={`${className}`}>
                <DashboardCardTitle title="Client" isBorderUse={true} />
                {handleLoadingComponent(
                    isLoading,
                    <UserCardLoader />,
                    <div className="d-flex align-items-center py-4">
                        <div className="dashboardCardPersonImage">
                            <a
                                href={`/account/clients/${projectData?.client?.id}`}
                            >
                                <PersonAvatar
                                    name={projectData?.client?.name}
                                    avatar={projectData?.client?.image_url}
                                />
                            </a>
                        </div>
                        <div className="d-flex flex-column ml-3">
                            <a
                                className="dashboardCardPersonName"
                                href={`/account/clients/${projectData?.client?.id}`}
                            >
                                {projectData?.client?.name}
                            </a>
                            <div className="d-flex align-items-center dashboardCardPersonCountry">
                                <img
                                    src={`/flags/4x3/${
                                        projectData?.client?.country?.iso ||
                                        "BD"
                                    }.svg`}
                                    alt="client country flag"
                                    className="mr-1"
                                />
                                <span>
                                    {projectData?.client?.country?.nicename}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </CardWrapper>
            {/* End Client card */}
            {/* Project Manager Card */}
            <CardWrapper color="#ffffff" className={`${className}`}>
                <DashboardCardTitle
                    title="Project Manager"
                    isBorderUse={true}
                />
                {handleLoadingComponent(
                    isLoading,
                    <UserCardLoader />,
                    <div className="d-flex align-items-center py-4">
                        <div className="dashboardCardPersonImage">
                            <a
                                href={`/account/employees/${projectData?.pm?.id}`}
                            >
                                <PersonAvatar
                                    name={projectData?.pm?.name}
                                    avatar={projectData?.pm?.image_url}
                                />
                            </a>
                        </div>
                        <div className="d-flex flex-column ml-3">
                            <a
                                className="dashboardCardPersonName"
                                href={`/account/employees/${projectData?.pm?.id}`}
                            >
                                {projectData?.pm?.name}
                            </a>
                            <div className="d-flex align-items-center dashboardCardPersonCountry">
                                <img
                                    src={`/flags/4x3/${
                                        projectData?.pm?.country?.iso || "BD"
                                    }.svg`}
                                    alt="pm country flag"
                                    className="mr-1"
                                />
                                <span>
                                    {projectData?.pm?.country?.nicename}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </CardWrapper>
            {/* End Project Manager card */}
        </>
    );
};

export default DashboardClientAndPMCard;

DashboardClientAndPMCard.propTypes = {
    projectData: PropTypes.any,
    className: PropTypes.string,
    isProjectDetailsLoading: PropTypes.bool,
};
