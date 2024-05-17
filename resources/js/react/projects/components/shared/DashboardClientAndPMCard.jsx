import React from "react";
import PropTypes from "prop-types";


// UI Components - Custom
import { CardWrapper } from "../ui/styledComponents";
import PersonAvatar from "../PersonAvatar";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

const DashboardClientAndPMCard = ({ projectData, className = "" }) => {
    const projectInfo = projectData?.projectData;
    return (
        <>
            <CardWrapper color="#ffffff" className={`${className}`}>
                <DashboardCardTitle title="Client" isBorderUse={true} />
                <div className="d-flex align-items-center py-4">
                    <div className="dashboardCardPersonImage">
                        <a
                            href={`/account/clients/${projectInfo?.client?.client_id}`}
                        >
                            <PersonAvatar
                                name={projectInfo?.client?.name}
                                avatar={projectInfo?.client?.image_url}
                            />
                        </a>
                    </div>
                    <div className="d-flex flex-column ml-3">
                        <a
                            className="dashboardCardPersonName"
                            href={`/account/clients/${projectInfo?.client?.client_id}`}
                        >
                            {projectInfo?.client?.name}
                        </a>
                        <div className="d-flex align-items-center dashboardCardPersonCountry">
                            <img
                                src={`/flags/4x3/${
                                    projectInfo?.client?.country?.iso || "BD"
                                }.svg`}
                                alt="client country flag"
                                className="mr-1"
                            />
                            <span>{projectInfo?.client?.country?.nicename}</span>
                        </div>
                    </div>
                </div>
            </CardWrapper>
            <CardWrapper color="#ffffff" className={`${className}`}>
                <DashboardCardTitle
                    title="Project Manager"
                    isBorderUse={true}
                />
                <div className="d-flex align-items-center py-4">
                    <div className="dashboardCardPersonImage">
                        <a
                            href={`/account/employees/${projectInfo?.pm?.pm_id}`}
                        >
                            <PersonAvatar
                                name={projectInfo?.pm?.name}
                                avatar={projectInfo?.pm?.image_url}
                            />
                        </a>
                    </div>
                    <div className="d-flex flex-column ml-3">
                        <a
                            className="dashboardCardPersonName"
                            href={`/account/clients/${projectInfo?.pm?.client_id}`}
                        >
                            {projectInfo?.pm?.name}
                        </a>
                        <div className="d-flex align-items-center dashboardCardPersonCountry">
                            <img
                                src={`/flags/4x3/${
                                    projectInfo?.pm?.country?.iso || "BD"
                                }.svg`}
                                alt="pm country flag"
                                className="mr-1"
                            />
                            <span>{projectInfo?.client?.country?.nicename}</span>
                        </div>
                    </div>
                </div>
            </CardWrapper>
        </>
    );
};

export default DashboardClientAndPMCard;

DashboardClientAndPMCard.propTypes = {
    projectData: PropTypes.object.isRequired,
    className: PropTypes.string,
};
