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
import { HourlyProjectSalesData, ProjectBudgetData } from "../../constants";

// style
import style from "./styles/dashboardProjectInfoHourlySection.module.css";

// Helper
import { handleLoadingComponent } from "../../helper";

// Components - Loader
import TextLoaderDynamic from "../loader/TextLoaderDynamic";

const DashboardProjectInfoHourlySection = ({ projectData, isLoading }) => {
    return (
        <SectionWrapper className="my-4 m-0 projectHourlyContainer">
            <div className={`px-0 ${style.projectHourlyLeft}`}>
                <div className="d-flex row px-0 h-100 m-0">
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
                    <div className="px-0 px-md-3 my-4 my-md-0 col-12 col-md-6">
                        <DashboardProgress
                            projectData={projectData}
                            style={style}
                            className="h-100"
                            isLoading={isLoading}
                        />
                    </div>
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
                                title={ProjectBudgetData?.hours_logged[1].title}
                                isBorderUse={true}
                            />
                            <DashboardCardPricingInfo
                                amount={ProjectBudgetData?.hours_logged[1].time}
                                icon={ProjectBudgetData?.hours_logged[1].icon}
                                isLoading={isLoading}
                                loaderInformation={{
                                    number: 1,
                                    height: 21,
                                    parentClassName: "w-100 py-3",
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
                                {ProjectBudgetData?.earning_expenses
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
                                {ProjectBudgetData?.earning_expenses
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
                </div>
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
                                    2 Hours
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
                                    3 Hours
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
                                <p className="questionAnswerDashboard">yes</p>
                            )}
                        </CardWrapper>
                    </div>
                </div>
            </div>
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
                                        amount="1-5 hours"
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
                                    amount="10.00 GBP (£)"
                                    isLoading={isLoading}
                                    className="w-100"
                                    loaderInformation={{
                                        number: 1,
                                        height: 21,
                                        parentClassName: "w-100",
                                    }}
                                />
                                <DashboardCardPricingInfo
                                    amount="17.00 USD ($)"
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
                    </CardWrapper>
                    <CardWrapper color="#ffffff" className="h-100">
                        {HourlyProjectSalesData?.map((item) => (
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
                </div>
            </div>
        </SectionWrapper>
    );
};

export default DashboardProjectInfoHourlySection;

DashboardProjectInfoHourlySection.propTypes = {
    projectData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};
