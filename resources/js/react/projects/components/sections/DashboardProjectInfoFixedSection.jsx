import React from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import { CardWrapper, SectionWrapper } from "../ui/styledComponents";

// Components - Section - Shared
import DashboardProgress from "../shared/DashboardProgress";
import DashboardClientAndPMCard from "../shared/DashboardClientAndPMCard";

// Components - UI - Shared
import DashboardCardPricingInfo from "../ui/DashboardCardPricingInfo/DashboardCardPricingInfo";
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Constants
import { ProjectBudgetData } from "../../constants";

// style
import style from "./styles/dashboardProjectInfoFixedSection.module.css";

/**
 *  Dashboard Project Info Fixed Section
 *  @component
 *  @param {object} props - Component properties
 *  @param {object} props.projectData - Data related to the project
 *  @returns {JSX.Element} - Rendered component
 * @description Dashboard Project Info Fixed Section Component for showing fixed project info on the dashboard page.
 *
 */

const DashboardProjectInfoFixedSection = ({ projectData }) => {
    return (
        <SectionWrapper className="my-4 row m-0">
            {/* Client And PM Card */}
            <div
                className={`d-flex flex-column justify-content-between  px-0 ${style.clientInfoCard}`}
            >
                <DashboardClientAndPMCard projectData={projectData} />
            </div>
            {/* End Client And PM Card */}
            {/* Project Progress */}
            <div
                className={`d-flex  px-0 px-md-3 my-4 my-md-0 ${style.projectProgressInfoCard}`}
            >
                <DashboardProgress projectData={projectData} style={style} />
            </div>
            {/* End Project Progress */}
            {/* Project Budget And Upsold Amount */}
            <div
                className={`d-flex flex-column  ${style.projectBudgetInfoCard}`}
            >
                {/* Project Budget */}
                <CardWrapper color="#ffffff">
                    <DashboardCardTitle
                        title="Project Budget"
                        isBorderUse={true}
                    />
                    <div className="pt-3 pt-md-0 py-0 py-md-3">
                        <div className="d-flex justify-content-md-between flex-column flex-md-row ">
                            {ProjectBudgetData?.project_budget.map((budget) => (
                                <DashboardCardPricingInfo
                                    key={budget?.id}
                                    amount={budget.price}
                                    title={budget?.title}
                                    icon={budget?.icon}
                                    currency={budget?.currency}
                                    currency_symbol={budget?.currency_symbol}
                                />
                            ))}
                        </div>
                    </div>
                </CardWrapper>
                {/* End Project Budget */}
                {/* Upsold Amount */}
                <CardWrapper color="#ffffff" className="">
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
                {/* End Upsold Amount */}
            </div>
            {/* End Project Budget And Upsold Amount */}
            <div
                className={`d-flex flex-column justify-content-between mt-4 mt-md-0  ${style.timeEarningInfoCard}`}
                id="timeEarningInfoCard"
            >
                {/* Estimated Time Log */}
                <CardWrapper
                    color="#ffffff"
                    className="d-flex justify-content-between flex-column flex-md-row estimatedTimeHoursLoggedCard"
                >
                    {ProjectBudgetData.hours_logged.map((logInfo) => (
                        <div className="d-flex flex-column" key={logInfo.id}>
                            <DashboardCardTitle
                                title={logInfo.title}
                                isBorderUse={true}
                            />
                            <DashboardCardPricingInfo
                                key={logInfo.id}
                                amount={logInfo.time}
                                icon={logInfo.icon}
                                className="py-3"
                            />
                        </div>
                    ))}
                </CardWrapper>
                {/* End Estimated Time Log */}
                {/* Earnings & Expenses card*/}
                <CardWrapper
                    color="#ffffff"
                    className="d-flex flex-column earningExpensesCard"
                >
                    <DashboardCardTitle
                        title="Earnings & Expenses"
                        isBorderUse={true}
                    />
                    <div className="d-flex justify-content-between flex-wrap py-3">
                        {ProjectBudgetData.earning_expenses.map((moneyInfo) => (
                            <DashboardCardPricingInfo
                                key={moneyInfo.id}
                                amount={moneyInfo.price}
                                title={moneyInfo.title}
                                icon={moneyInfo.icon}
                                currency={moneyInfo.currency}
                                currency_symbol={moneyInfo.currency_symbol}
                            />
                        ))}
                    </div>
                </CardWrapper>
                {/* End Earnings & Expenses Card */}
            </div>
        </SectionWrapper>
    );
};

export default DashboardProjectInfoFixedSection;

DashboardProjectInfoFixedSection.propTypes = {
    projectData: PropTypes.object.isRequired,
};
