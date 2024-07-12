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
import { HourlyProjectSalesData, ProjectBudgetData } from "../../constants";

// style
import style from "./styles/dashboardProjectInfoHourlySection.module.css";

// Helper
import { handleLoadingComponent } from "../../helper";

// Components - Loader
import TextLoaderDynamic from "../loader/TextLoaderDynamic";
import Switch from "../../../global/Switch";

/**
 * Dashboard Project Info Hourly Section
 * @component
 * @param {object} props - Component properties
 * @param {object} props.projectData - Data related to the project
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 * @description Dashboard Project Info Hourly Section Component for showing hourly project info on the dashboard page.
 */

const DashboardProjectInfoHourlySection = ({ projectData, isLoading }) => {
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
                            price: Number(projectData?.earnings)?.toFixed(2),
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    } else if (budget.key === "actual_earnings") {
                        return {
                            ...budget,
                            price: Number(
                                projectData?.actual_earnings
                            )?.toFixed(2),
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
                            price: Number(projectData?.total_expenses)?.toFixed(
                                2
                            ),
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
                            price: Number(
                                projectData?.deal?.upsell_amount
                            )?.toFixed(2),
                            currency: projectData?.currency?.currency_code,
                            currency_symbol:
                                projectData?.currency?.currency_symbol,
                        };
                    } else if (budget.key === "upsell_actual_amount") {
                        return {
                            ...budget,
                            price: Number(
                                projectData?.deal?.upsell_actual_amount
                            ).toFixed(2),
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
                        } else {
                            totalTime = "0 Hours";
                        }
                    }
                    return {
                        ...logInfo,
                        time: totalTime,
                    };
                }
            );

            const hourlyProjectSales = projectBudgetData?.hourlyProjectSalesData?.map((item) => {
                if (item?.key === "expect_amount") {
                    return {
                        ...item,
                        answer: projectData?.deal?.expect_amount
                            ? projectData?.deal?.expect_amount
                            : "N/A",
                    };
                } else if (item?.key === "certain_amount_hour") {
                    return {
                        ...item,
                        answer: projectData?.deal?.certain_amount_hour
                            ? projectData?.deal?.certain_amount_hour
                            : "N/A",
                    };
                } else if (item?.key === "long_project") {
                    return {
                        ...item,
                        answer: projectData?.deal?.long_project
                            ? projectData?.deal?.long_project
                            : "N/A",
                    };
                }
            });

            setProjectBudgetData({
                ...projectBudgetData,
                project_budget: updateProjectBudget,
                earning_expenses: earningExpenses,
                upsold_amount: updateUpsoldAmount,
                hours_logged: hoursLogged,
                hourlyProjectSalesData: hourlyProjectSales,
            });
        }
    }, [projectData, isLoading, ProjectBudgetData]);
    return (
        <SectionWrapper className="my-4 m-0 projectHourlyContainer">
            <div className={`px-0 ${style.projectHourlyLeft}`}>
                <div className="d-flex row px-0 h-100 m-0">
                    {/* Client And PM Card */}
                    <div
                        className="d-flex flex-column col-12 col-md-3 px-0"
                        style={{
                            gap: "16px",
                        }}
                    >
                        <DashboardClientAndPMCard
                            projectData={projectData}
                            className="h-100"
                            isLoading={isLoading}
                        />
                    </div>
                    {/* End  Client And PM Card*/}
                    {/* Project Progress */}
                    <div className="px-0 px-md-3 my-4 my-md-0 col-12 col-md-6">
                        <DashboardProgress
                            projectData={projectData}
                            style={style}
                            className="h-100"
                            isLoading={isLoading}
                        />
                    </div>
                    {/* End Project Progress */}
                    {/* Hours Log and Earnings & Expenses*/}
                    <div
                        className="d-flex flex-column  col-12 col-md-3  px-0"
                        style={{
                            gap: "16px",
                        }}
                    >
                        <CardWrapper
                            color="#ffffff"
                            className="d-flex flex-column h-100"
                        >
                            <DashboardCardTitle
                                title={
                                    projectBudgetData?.hours_logged[1]?.title
                                }
                                isBorderUse={true}
                            />
                            <DashboardCardPricingInfo
                                amount={
                                    projectBudgetData?.hours_logged[1]?.time
                                }
                                icon={projectBudgetData?.hours_logged[1]?.icon}
                                isLoading={isLoading}
                                loaderInformation={{
                                    number: 1,
                                    height: 21,
                                    parentClassName: "w-100",
                                }}
                                className="py-3"
                            />
                        </CardWrapper>
                        <CardWrapper
                            color="#ffffff"
                            className="d-flex flex-column h-100"
                        >
                            <DashboardCardTitle
                                title="Earnings & Expenses"
                                isBorderUse={true}
                            />
                            <div className="d-flex justify-content-between py-3">
                                {projectBudgetData?.earning_expenses
                                    .slice(0, 1)
                                    .map((moneyInfo) => (
                                        <DashboardCardPricingInfo
                                            key={moneyInfo?.id}
                                            amount={moneyInfo?.price}
                                            title={moneyInfo?.title}
                                            icon={moneyInfo?.icon}
                                            isLoading={isLoading}
                                            currency={moneyInfo?.currency}
                                            currency_symbol={
                                                moneyInfo?.currency_symbol
                                            }
                                            loaderInformation={{
                                                number: 1,
                                                height: 21,
                                                parentClassName: "w-100",
                                            }}
                                        />
                                    ))}
                            </div>
                            <div className="d-flex">
                                {projectBudgetData?.earning_expenses
                                    .slice(2, 3)
                                    .map((moneyInfo) => (
                                        <DashboardCardPricingInfo
                                            key={moneyInfo?.id}
                                            amount={moneyInfo?.price}
                                            title={moneyInfo?.title}
                                            icon={moneyInfo?.icon}
                                            isLoading={isLoading}
                                            currency={moneyInfo?.currency}
                                            loaderInformation={{
                                                number: 1,
                                                height: 21,
                                                parentClassName: "w-100",
                                            }}
                                            currency_symbol={
                                                moneyInfo?.currency_symbol
                                            }
                                        />
                                    ))}
                            </div>
                        </CardWrapper>
                    </div>
                    {/* End Hours Log and Earnings & Expenses*/}
                </div>
                {/* Project Hourly Questions time related */}
                <div className="d-flex row px-0 h-100 m-0 mt-3">
                    <div
                        className="d-flex flex-column  col-12 col-md-9 px-0 pr-md-3 pl-md-0"
                        style={{
                            gap: "16px",
                        }}
                    >
                        <CardWrapper
                            color="#ffffff"
                            className="d-flex flex-column h-100"
                        >
                            <DashboardCardTitle
                                title="How many hours need to be tracked in the first 24 hours"
                                isBorderUse={true}
                            />

                            {handleLoadingComponent(
                                isLoading,
                                <TextLoaderDynamic
                                    number={1}
                                    hight={25}
                                    parentClassName="py-3 w-75"
                                />,
                                <p className="questionAnswerDashboard">
                                    {projectData?.deal?.tracked_hours ?? "--"}
                                </p>
                            )}
                            <DashboardCardTitle
                                title="How many hours need to be tracked on the 2nd day i.e. between 25th-48th hours? "
                                isBorderUse={true}
                            />
                            {handleLoadingComponent(
                                isLoading,
                                <TextLoaderDynamic
                                    number={1}
                                    hight={25}
                                    parentClassName="py-3 w-75"
                                />,
                                <p className="questionAnswerDashboard">
                                    {projectData?.deal
                                        ?.second_day_tracked_hours ?? "--"}
                                </p>
                            )}
                        </CardWrapper>
                    </div>
                    <div
                        className="d-flex flex-column  col-12 col-md-3  px-0 mt-3 mt-md-0"
                        style={{
                            gap: "24px",
                        }}
                    >
                        <CardWrapper
                            color="#ffffff"
                            className="d-flex flex-column h-100"
                        >
                            <DashboardCardTitle
                                title="Did the client confirm
                                    Hubstaff tracking? "
                                isBorderUse={true}
                            />
                            {handleLoadingComponent(
                                isLoading,
                                <TextLoaderDynamic
                                    number={1}
                                    hight={25}
                                    parentClassName="py-3 w-75"
                                />,
                                <p className="questionAnswerDashboard">
                                    <Switch>
                                        <Switch.Case
                                            condition={
                                                projectData?.deal
                                                    ?.hubstaff_tracking === null
                                            }
                                        >
                                            --
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                projectData?.deal
                                                    ?.hubstaff_tracking === 0
                                            }
                                        >
                                            No
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                projectData?.deal
                                                    ?.hubstaff_tracking === 1
                                            }
                                        >
                                            Yes
                                        </Switch.Case>
                                    </Switch>
                                </p>
                            )}
                        </CardWrapper>
                    </div>
                </div>
                {/* End Project Hourly Questions time related */}
            </div>
            {/* Project Hourly Right */}
            <div className={`px-0 ${style.projectHourlyRight}`}>
                <div
                    className="col-12 d-flex flex-column px-0 pl-md-3 pr-md-0 mt-3 mt-md-0 projectHourlyRightContainer"
                    style={{
                        gap: "16px",
                    }}
                >
                    <CardWrapper
                        color="#ffffff"
                        gap="16px"
                        className="d-flex flex-row estimateHourlyRateContainer"
                    >
                        {/* Estimated Hours */}
                        <div className="w-100 w-md-50">
                            <DashboardCardTitle
                                title="Estimated Hours (Set 1)"
                                isBorderUse={true}
                                isInfoIconUse={true}
                                infoText="Estimated hours required to complete the first set of tasks "
                            />
                            <div className="pt-3 pt-md-0 py-0 py-md-3">
                                <div className="d-flex justify-content-md-between flex-column flex-md-row ">
                                    <DashboardCardPricingInfo
                                        amount={
                                            projectBudgetData.hours_logged?.[0]
                                                ?.time
                                        }
                                        icon="/images/timer.png"
                                        className="w-100"
                                        isLoading={isLoading}
                                        loaderInformation={{
                                            number: 1,
                                            height: 21,
                                            parentClassName: "w-100",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* End Estimated Hours */}
                        {/* Hourly Rate */}
                        <div className="w-100 w-md-50">
                            <DashboardCardTitle
                                title="Hourly Rate"
                                isBorderUse={true}
                            />
                            <div
                                className="pt-3 pt-md-0 py-0 py-md-3 d-flex justify-content-between"
                                style={{
                                    gap: "16px",
                                }}
                            >
                                <DashboardCardPricingInfo
                                    amount={`${
                                        projectData?.deal?.original_currency
                                            ?.currency_symbol
                                    } ${Number(
                                        projectData?.deal?.actual_hourly_rate
                                    )?.toFixed(2)} ${
                                        projectData?.deal?.original_currency
                                            ?.currency_code
                                    }`}
                                    isLoading={isLoading}
                                    className="w-100"
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
                                />
                                <DashboardCardPricingInfo
                                    amount={`${
                                        projectData?.currency?.currency_symbol
                                    } ${Number(
                                        projectData?.deal?.hourly_rate
                                    )?.toFixed(2)} ${
                                        projectData?.currency?.currency_code
                                    }`}
                                    className="w-100"
                                    isLoading={isLoading}
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
                                />
                            </div>
                        </div>
                        {/* End Hourly Rate */}
                    </CardWrapper>
                    {/* Hourly Rate Related Question */}
                    <CardWrapper color="#ffffff" className="h-100">
                        {projectBudgetData.hourlyProjectSalesData?.map((item) => (
                            <div className="mb-3" key={item?.id}>
                                <DashboardCardTitle
                                    title={item?.question}
                                    isBorderUse={true}
                                />
                                <DashboardCardPricingInfo
                                    amount={item?.answer}
                                    isLoading={isLoading}
                                    className="py-3"
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
                                />
                            </div>
                        ))}
                    </CardWrapper>
                    {/* End Hourly Rate Related Question */}
                </div>
            </div>
            {/* End Project Hourly Right */}
        </SectionWrapper>
    );
};

export default DashboardProjectInfoHourlySection;

DashboardProjectInfoHourlySection.propTypes = {
    projectData: PropTypes.object || null,
    isLoading: PropTypes.bool,
};
