import React from "react";
import PropTypes from "prop-types";
import { LuCalendarDays } from "react-icons/lu";

// UI Components - Custom
import { CardWrapper, SectionWrapper } from "../ui/styledComponents";
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Components
import PersonAvatar from "../PersonAvatar";
import ProjectProgressChart from "../ui/ProjectProgressChart/ProjectProgressChart";
import DashboardProgressStatus from "../ui/DashboardProgressStatus/DashboardProgressStatus";

// Constants
import { ProjectBudgetData, ProjectProgressStatus } from "../../constants";

// style

import style from "./styles/dashboardProjectInfoSection.module.css";
import DashboardCardPricingInfo from "../ui/DashboardCardPricingInfo/DashboardCardPricingInfo";

const DashboardProjectInfoSection = ({ projectData }) => {
    return (
        <SectionWrapper className="my-4 row m-0">
            <div className="d-flex flex-column justify-content-between col-12 col-md-2 px-0">
                <CardWrapper color="#ffffff" className="mb-4">
                    <DashboardCardTitle title="Client" isBorderUse={true} />
                    <div className="d-flex align-items-center py-3">
                        <div className="dashboardCardPersonImage">
                            <a
                                href={`/account/clients/${projectData.client.client_id}`}
                            >
                                <PersonAvatar
                                    name={projectData.client.name}
                                    avatar={projectData.client.image_url}
                                />
                            </a>
                        </div>
                        <div className="d-flex flex-column ml-3">
                            <a
                                className="dashboardCardPersonName"
                                href={`/account/clients/${projectData.client.client_id}`}
                            >
                                {projectData.client.name}
                            </a>
                            <div className="d-flex align-items-center dashboardCardPersonCountry">
                                <img
                                    src={`/flags/4x3/${
                                        projectData.client.country.iso || "BD"
                                    }.svg`}
                                    alt="client country flag"
                                    className="mr-1"
                                />
                                <span>
                                    {projectData.client.country.nicename}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper color="#ffffff">
                    <DashboardCardTitle
                        title="Project Manager"
                        isBorderUse={true}
                    />
                    <div className="d-flex align-items-center py-3">
                        <div className="dashboardCardPersonImage">
                            <a
                                href={`/account/clients/${projectData.pm.client_id}`}
                            >
                                <PersonAvatar
                                    name={projectData.pm.name}
                                    avatar={projectData.pm.image_url}
                                />
                            </a>
                        </div>
                        <div className="d-flex flex-column ml-3">
                            <a
                                className="dashboardCardPersonName"
                                href={`/account/clients/${projectData.pm.client_id}`}
                            >
                                {projectData.pm.name}
                            </a>
                            <div className="d-flex align-items-center dashboardCardPersonCountry">
                                <img
                                    src={`/flags/4x3/${
                                        projectData.pm.country.iso || "BD"
                                    }.svg`}
                                    alt="pm country flag"
                                    className="mr-1"
                                />
                                <span>
                                    {projectData.client.country.nicename}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardWrapper>
            </div>
            <div className="d-flex col-12 col-md-4 px-0 px-md-3 my-4 my-md-0">
                <CardWrapper color="#ffffff">
                    <DashboardCardTitle
                        title="Project Progress"
                        isBorderUse={true}
                        rightText={`Completed: ${projectData.project.progress}%`}
                        rightTextColor={"#70CA62"}
                    />
                    <div className="flexBetween my-3 dashboardProgressData">
                        <div className="flexColumn justify-content-between dashboardProgressDataDates">
                            <div className="flexColumn">
                                <p>Start Date</p>
                                <span className="flexItemCenter">
                                    <LuCalendarDays className="mr-1" />
                                    {projectData.project.start_date}
                                </span>
                            </div>
                            <div className="flexColumn">
                                <p> Deadline</p>
                                <span className="flexItemCenter">
                                    <LuCalendarDays className="mr-1" />{" "}
                                    {projectData.project.deadline}
                                </span>
                            </div>
                        </div>
                        <ProjectProgressChart />
                    </div>

                    <div
                        className={`${style.dashboardProgressStatusContainer}`}
                    >
                        {ProjectProgressStatus.map((status) => (
                            <DashboardProgressStatus
                                key={status.id}
                                title={status.name}
                                statusType={status.tag}
                            />
                        ))}
                    </div>
                </CardWrapper>
            </div>
            <div className="d-flex flex-column justify-content-between col-12 col-md-3 px-0">
                <CardWrapper color="#ffffff">
                    <DashboardCardTitle
                        title="Project Budget"
                        isBorderUse={true}
                    />
                    <div className="py-3">
                        <div className="d-flex justify-content-md-between flex-column flex-md-row ">
                            {ProjectBudgetData?.project_budget.map((budget) => (
                                <DashboardCardPricingInfo
                                    key={budget.id}
                                    amount={budget.price}
                                    title={budget.title}
                                    icon={budget.icon}
                                    currency={budget.currency}
                                    currency_symbol={budget.currency_symbol}
                                />
                            ))}
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper color="#ffffff" className="my-4 my-md-0">
                    <DashboardCardTitle
                        title="Upsold Amount"
                        isBorderUse={true}
                    />
                    <div className="pt-3 pt-md-0 py-0 py-md-3">
                        <div className="d-flex justify-content-between flex-column flex-md-row">
                            {ProjectBudgetData?.upsold_amount.map((budget) => (
                                <DashboardCardPricingInfo
                                    key={budget.id}
                                    amount={budget.price}
                                    title={budget.title}
                                    icon={budget.icon}
                                    currency={budget.currency}
                                    currency_symbol={budget.currency_symbol}
                                />
                            ))}
                        </div>
                    </div>
                </CardWrapper>
            </div>
            <div className="d-flex col-3">hello</div>
        </SectionWrapper>
    );
};

export default DashboardProjectInfoSection;

DashboardProjectInfoSection.propTypes = {
    projectData: PropTypes.object.isRequired,
};
