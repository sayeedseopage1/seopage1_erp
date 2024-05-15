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

const DashboardProjectInfoFixedSection = ({ projectData }) => {
    return (
        <>
            {/* <SectionWrapper className="my-4 row m-0">
                <div
                    className={`d-flex flex-column justify-content-between col-12 col-md-4 col-lg-4 col-xl-2 px-0 `}
                >
                    <DashboardClientAndPMCard
                        projectData={projectData}
                        className="mb-4"
                    />
                </div>
                <div
                    className={`d-flex col-12 col-md-8 col-lg-8 col-xl-4 px-0 px-md-3 my-4 my-md-0 `}
                >
                    <DashboardProgress
                        projectData={projectData}
                        style={style}
                    />
                </div>
                <div
                    className={`d-flex flex-column col-12 col-md-8 col-lg-8 col-xl-3 px-0 px-md-3 my-4 my-md-0 `}
                >
                    <CardWrapper color="#ffffff">
                        <DashboardCardTitle
                            title="Project Budget"
                            isBorderUse={true}
                        />
                        <div className="pt-3 pt-md-0 py-0 py-md-3">
                            <div className="d-flex justify-content-md-between flex-column flex-md-row ">
                                {ProjectBudgetData?.project_budget.map(
                                    (budget) => (
                                        <DashboardCardPricingInfo
                                            key={budget.id}
                                            amount={budget.price}
                                            title={budget.title}
                                            icon={budget.icon}
                                            currency={budget.currency}
                                            currency_symbol={
                                                budget.currency_symbol
                                            }
                                        />
                                    )
                                )}
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
                                {ProjectBudgetData?.upsold_amount.map(
                                    (budget) => (
                                        <DashboardCardPricingInfo
                                            key={budget.id}
                                            amount={budget.price}
                                            title={budget.title}
                                            icon={budget.icon}
                                            currency={budget.currency}
                                            currency_symbol={
                                                budget.currency_symbol
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </CardWrapper>
                </div>
                <div
                    className={`d-flex flex-column justify-content-between col-12 col-md-6 col-lg-6 col-xl-3 px-0 pl-md-3 `}
                >
                    <CardWrapper
                        color="#ffffff"
                        className="d-flex justify-content-between flex-column flex-md-row"
                    >
                        {ProjectBudgetData.hours_logged.map((logInfo) => (
                            <div
                                className="d-flex flex-column"
                                key={logInfo.id}
                            >
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
                    <CardWrapper
                        color="#ffffff"
                        className="d-flex flex-column my-4 my-md-0"
                    >
                        <DashboardCardTitle
                            title="Earnings & Expenses"
                            isBorderUse={true}
                        />
                        <div className="d-flex justify-content-between py-3">
                            {ProjectBudgetData.earning_expenses
                                .slice(0, 2)
                                .map((moneyInfo) => (
                                    <DashboardCardPricingInfo
                                        key={moneyInfo.id}
                                        amount={moneyInfo.price}
                                        title={moneyInfo.title}
                                        icon={moneyInfo.icon}
                                        currency={moneyInfo.currency}
                                        currency_symbol={
                                            moneyInfo.currency_symbol
                                        }
                                    />
                                ))}
                        </div>
                        <div className="d-flex">
                            {ProjectBudgetData.earning_expenses
                                .slice(2, 3)
                                .map((moneyInfo) => (
                                    <DashboardCardPricingInfo
                                        key={moneyInfo.id}
                                        amount={moneyInfo.price}
                                        title={moneyInfo.title}
                                        icon={moneyInfo.icon}
                                        currency={moneyInfo.currency}
                                        currency_symbol={
                                            moneyInfo.currency_symbol
                                        }
                                    />
                                ))}
                        </div>
                    </CardWrapper>
                </div>
            </SectionWrapper> */}
            <SectionWrapper className="my-4 row m-0">
                <div
                    className={`d-flex flex-column justify-content-between  px-0 ${style.clientInfoCard}`}
                >
                    <DashboardClientAndPMCard
                        projectData={projectData}
                        className="mb-4"
                    />
                </div>
                <div
                    className={`d-flex  px-0 px-md-3 my-4 my-md-0 ${style.projectProgressInfoCard}`}
                >
                    <DashboardProgress
                        projectData={projectData}
                        style={style}
                    />
                </div>
                <div
                    className={`d-flex flex-column  ${style.projectBudgetInfoCard}`}
                >
                    <CardWrapper color="#ffffff">
                        <DashboardCardTitle
                            title="Project Budget"
                            isBorderUse={true}
                        />
                        <div className="pt-3 pt-md-0 py-0 py-md-3">
                            <div className="d-flex justify-content-md-between flex-column flex-md-row ">
                                {ProjectBudgetData?.project_budget.map(
                                    (budget) => (
                                        <DashboardCardPricingInfo
                                            key={budget.id}
                                            amount={budget.price}
                                            title={budget.title}
                                            icon={budget.icon}
                                            currency={budget.currency}
                                            currency_symbol={
                                                budget.currency_symbol
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </CardWrapper>
                    <CardWrapper color="#ffffff" className="">
                        <DashboardCardTitle
                            title="Upsold Amount"
                            isBorderUse={true}
                        />
                        <div className="pt-3 pt-md-0 py-0 py-md-3">
                            <div className="d-flex justify-content-between flex-column flex-md-row">
                                {ProjectBudgetData?.upsold_amount.map(
                                    (budget) => (
                                        <DashboardCardPricingInfo
                                            key={budget.id}
                                            amount={budget.price}
                                            title={budget.title}
                                            icon={budget.icon}
                                            currency={budget.currency}
                                            currency_symbol={
                                                budget.currency_symbol
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </CardWrapper>
                </div>
                <div
                    className={`d-flex flex-column justify-content-between mt-4 mt-md-0  ${style.timeEarningInfoCard}`}
                >
                    <CardWrapper
                        color="#ffffff"
                        className="d-flex justify-content-between flex-column flex-md-row"
                    >
                        {ProjectBudgetData.hours_logged.map((logInfo) => (
                            <div
                                className="d-flex flex-column"
                                key={logInfo.id}
                            >
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
                    <CardWrapper
                        color="#ffffff"
                        className="d-flex flex-column"
                    >
                        <DashboardCardTitle
                            title="Earnings & Expenses"
                            isBorderUse={true}
                        />
                        <div className="d-flex justify-content-between py-3">
                            {ProjectBudgetData.earning_expenses
                                .slice(0, 2)
                                .map((moneyInfo) => (
                                    <DashboardCardPricingInfo
                                        key={moneyInfo.id}
                                        amount={moneyInfo.price}
                                        title={moneyInfo.title}
                                        icon={moneyInfo.icon}
                                        currency={moneyInfo.currency}
                                        currency_symbol={
                                            moneyInfo.currency_symbol
                                        }
                                    />
                                ))}
                        </div>
                        <div className="d-flex">
                            {ProjectBudgetData.earning_expenses
                                .slice(2, 3)
                                .map((moneyInfo) => (
                                    <DashboardCardPricingInfo
                                        key={moneyInfo.id}
                                        amount={moneyInfo.price}
                                        title={moneyInfo.title}
                                        icon={moneyInfo.icon}
                                        currency={moneyInfo.currency}
                                        currency_symbol={
                                            moneyInfo.currency_symbol
                                        }
                                    />
                                ))}
                        </div>
                    </CardWrapper>
                </div>
            </SectionWrapper>
        </>
    );
};

export default DashboardProjectInfoFixedSection;

DashboardProjectInfoFixedSection.propTypes = {
    projectData: PropTypes.object.isRequired,
};
