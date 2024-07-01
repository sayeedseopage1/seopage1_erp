import React, { useEffect, useState } from "react";
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

const DashboardProjectInfoFixedSection = ({ projectData, isLoading }) => {
    const [projectBudgetData, setProjectBudgetData] =
        useState(ProjectBudgetData);

    useEffect(() => {
        if (projectData && !isLoading) {
            const updateProjectBudget = projectBudgetData.project_budget.map(
                (budget) => {
                    if (budget.key === "project_budget") {
                        return {
                            ...budget,
                            price: projectData?.project_budget,
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    } else if (budget.key === "amount") {
                        return {
                            ...budget,
                            price: Number(projectData?.deal.amount).toFixed(2),
                            currency:
                                projectData?.deal?.original_currency
                                    .currency_code,
                            currency_symbol:
                                projectData?.deal?.original_currency
                                    ?.currency_symbol,
                        };
                    }
                }
            );

            const earningExpenses = projectBudgetData.earning_expenses.map(
                (budget) => {
                    if (budget.key === "earnings") {
                        return {
                            ...budget,
                            price: projectData?.earnings,
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    } else if (budget.key === "actual_earnings") {
                        return {
                            ...budget,
                            price: projectData?.actual_earnings,
                            currency:
                                projectData?.deal?.original_currency
                                    ?.currency_code,
                            currency_symbol:
                                projectData?.deal?.original_currency
                                    ?.currency_symbol,
                        };
                    } else if (budget.key === "total_expenses") {
                        return {
                            ...budget,
                            price: projectData?.total_expenses,
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    }
                }
            );

            const updateUpsoldAmount = projectBudgetData.upsold_amount.map(
                (budget) => {
                    if (budget.key === "upsell_amount") {
                        return {
                            ...budget,
                            price: projectData?.deal?.upsell_amount,
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    } else if (budget.key === "upsell_actual_amount") {
                        return {
                            ...budget,
                            price: projectData?.deal?.upsell_actual_amount,
                            currency:
                                projectData?.deal?.original_currency
                                    ?.currency_code,
                            currency_symbol:
                                projectData?.deal?.original_currency
                                    ?.currency_symbol,
                        };
                    }
                }
            );

            const hoursLogged = projectBudgetData.hours_logged.map(
                (logInfo) => {
                    if (logInfo.key === "estimate_time_in_hours") {
                        return {
                            ...logInfo,
                            time: `${projectData?.estimate_time_in_hours} Hours`,
                        };
                    }
                    let totalTime;
                    if (logInfo.key === "logged_time_in_hours") {
                        if (projectData?.logged_time_in_hours > 0) {
                            if (
                                projectData?.additional_logged_time_in_minutes >
                                0
                            ) {
                                totalTime = `${projectData?.logged_time_in_hours} Hours ${projectData?.additional_logged_time_in_minutes} Min.`;
                            } else {
                                totalTime = `${projectData?.logged_time_in_hours} Hours`;
                            }
                        }
                    }
                    return {
                        ...logInfo,
                        time: totalTime,
                    };
                }
            );

            setProjectBudgetData({
                ...projectBudgetData,
                project_budget: updateProjectBudget,
                earning_expenses: earningExpenses,
                upsold_amount: updateUpsoldAmount,
                hours_logged: hoursLogged,
            });
        }
    }, [projectData, isLoading, ProjectBudgetData]);

    return (
        <SectionWrapper className="my-4 row m-0">
            {/* Client And PM Card */}
            <div
                className={`d-flex flex-column justify-content-between  px-0 ${style.clientInfoCard}`}
            >
                <DashboardClientAndPMCard
                    projectData={projectData}
                    isLoading={isLoading}
                />
            </div>
            {/* End Client And PM Card */}
            {/* Project Progress */}
            <div
                className={`d-flex  px-0 px-md-3 my-4 my-md-0 ${style.projectProgressInfoCard}`}
            >
                <DashboardProgress
                    projectData={projectData}
                    style={style}
                    isLoading={isLoading}
                />
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
                            {projectBudgetData?.project_budget.map((budget) => (
                                <DashboardCardPricingInfo
                                    key={budget?.id}
                                    amount={budget.price}
                                    title={budget?.title}
                                    icon={budget?.icon}
                                    currency={budget?.currency}
                                    currency_symbol={budget?.currency_symbol}
                                    isLoading={isLoading}
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
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
                            {projectBudgetData?.upsold_amount?.map((budget) => (
                                <DashboardCardPricingInfo
                                    key={budget?.id}
                                    amount={budget?.price}
                                    title={budget?.title}
                                    icon={budget?.icon}
                                    currency={budget?.currency}
                                    currency_symbol={budget?.currency_symbol}
                                    isLoading={isLoading}
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
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
                    {projectBudgetData.hours_logged.map((logInfo) => (
                        <div className="d-flex flex-column" key={logInfo.id}>
                            <DashboardCardTitle
                                title={logInfo?.title}
                                isBorderUse={true}
                            />
                            <DashboardCardPricingInfo
                                key={logInfo?.id}
                                amount={logInfo?.time}
                                icon={logInfo?.icon}
                                className="py-3"
                                isLoading={isLoading}
                                loaderInformation={{
                                    number: 1,
                                    height: 21,
                                    parentClassName: "w-100",
                                }}
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
                        {projectBudgetData.earning_expenses.map((moneyInfo) => (
                            <DashboardCardPricingInfo
                                key={moneyInfo?.id}
                                amount={Number(moneyInfo?.price)?.toFixed(2)}
                                title={moneyInfo?.title}
                                icon={moneyInfo?.icon}
                                currency={moneyInfo?.currency}
                                currency_symbol={moneyInfo?.currency_symbol}
                                isLoading={isLoading}
                                loaderInformation={{
                                    number: 1,
                                    height: 21,
                                    parentClassName: "w-100",
                                }}
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
    projectData: PropTypes.object,
    isLoading: PropTypes.bool
};
