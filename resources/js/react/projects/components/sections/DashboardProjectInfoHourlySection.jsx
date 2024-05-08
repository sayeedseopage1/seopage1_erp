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
import style from "./styles/dashboardProjectInfoHourlySection.module.css";

const DashboardProjectInfoHourlySection = ({ projectData }) => {
    return (
        <SectionWrapper className="my-4 row m-0">
            <div className="d-flex flex-column col-12 col-md-9 px-0">
                <div className="d-flex col-12 px-0">
                    <div className="d-flex flex-column col-12 col-md-3 justify-content-between px-0">
                        <DashboardClientAndPMCard projectData={projectData} />
                    </div>
                    <div className="d-flex px-0 px-md-3 my-4 my-md-0 col-12 col-md-7">
                        <DashboardProgress
                            projectData={projectData}
                            style={style}
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-between col-12 col-md-2  px-0">
                        <CardWrapper
                            color="#ffffff"
                            className="d-flex flex-column mb-4"
                        >
                            <DashboardCardTitle
                                title={ProjectBudgetData.hours_logged[1].title}
                                isBorderUse={true}
                            />
                            <DashboardCardPricingInfo
                                amount={ProjectBudgetData.hours_logged[1].time}
                                icon={ProjectBudgetData.hours_logged[1].icon}
                                className="py-3"
                            />
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
                                    .slice(0, 1)
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
                </div>
                <div></div>
            </div>
            <div className="d-flex flex-column justify-content-between col-12 col-md-3 pr-0">
                <CardWrapper color="#ffffff">
                    <DashboardCardTitle
                        title="Project Budget"
                        isBorderUse={true}
                    />
                    <div className="pt-3 pt-md-0 py-0 py-md-3">
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
        </SectionWrapper>
    );
};

export default DashboardProjectInfoHourlySection;

DashboardProjectInfoHourlySection.propTypes = {
    projectData: PropTypes.object.isRequired,
};
