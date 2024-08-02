import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components - UI - styled
import { SectionWrapper } from "../UI/StyledComponents";

// Components - UI - Custom
import CustomCardHeader from "../UI/CustomCardHeader/CustomCardHeader";
import CustomCardInfo from "../UI/CustomCardInfo/CustomCardInfo";

// context for user
import { SaleExecutiveDashboardContext } from "../../context/SalesExecutiveDashboardContext";
// context for admin
import { SalesExecutiveAdminDashboardContext } from "../../context/SalesExecutiveAdminDashboardContext";

// Components - shared - Custom
import RefreshButton from "../shared/RefreshButton";

// table columns
import { SalesExecutiveDashboardTableColumn } from "../table/columns/SalesExecutiveDashboardTableColumn";
import SaleExecutiveDashboardTableLoader from "../loader/SaleExecutiveDashboardTableLoader";
import DashboardDataTable from "../table/DashboardDataTable";

// hooks
import { useAuth } from "../../../hooks/useAuth";

const SalesExecutiveDashboardContent = ({ isLoading, handleModalOpen }) => {
    const auth = useAuth();
    // Get the context based on the user role ID to access the user data
    const DashboardContext =
        auth.getRoleId() === 1
            ? SalesExecutiveAdminDashboardContext
            : SaleExecutiveDashboardContext;
    const {
        saleExecutiveDashboardData,
        countryWBB,
        isCountryWBBLoading,
        countryWBBRefetch,
        countryWWD,
        isCountryWWDLoading,
        countryWWDRefetch,
    } = useContext(DashboardContext);

    
    return (
        <SectionWrapper
            className="sp1_dashboard_sale_executive_content"
            gap="10px"
            border="1px solid var(--primaryLightBorder)"
        >
            <SectionWrapper
                gap="10px"
                className="d-flex flex-column w-50"
                backgroundColor="var(--priMaryWhiteBg)"
            >
                <CustomCardHeader
                    title="Core Metrics For Bidders"
                    border={true}
                    borderStyle="1px dotted var(--primaryLightBorder)"
                />
                <SectionWrapper
                    className="d-flex"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(0, 2)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex flex-column"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(2, 4)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                <SectionWrapper
                    className="sp1_dashboard__sale_executive_3rd_section"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(4, 6)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex flex-column"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    style={{
                        minHeight: "47vh",
                    }}
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Country Wise Bidding Breakdown" />
                        <RefreshButton
                            onClick={countryWBBRefetch}
                            isLoading={isCountryWBBLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="var(--primaryDarkBlue)">
                        <DashboardDataTable
                            tableColumns={
                                SalesExecutiveDashboardTableColumn?.CountryWiseBiddingBreakdown
                            }
                            tableData={countryWBB?.country_wise_leads}
                            isLoading={isCountryWBBLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={
                                SaleExecutiveDashboardTableLoader
                            }
                            className="sp1_dashboard_sale_executive_table"
                            tableStyles={{
                                height: {
                                    minHeight: "35vh",
                                    maxHeight: "35vh",
                                },
                                justifyStyleColumn: {
                                    total_leads: "center",
                                    percentage: "center",
                                    average_bidding_amount: "center",
                                },
                            }}
                        />
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
            <SectionWrapper
                gap="10px"
                className="d-flex flex-column w-50"
                backgroundColor="var(--priMaryWhiteBg)"
            >
                <CustomCardHeader
                    title="Core Metrics For Closers"
                    border={true}
                    borderStyle="1px dotted var(--primaryLightBorder)"
                />
                <SectionWrapper
                    className="d-flex"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(6, 8)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex flex-column"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(8, 10)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                <SectionWrapper
                    className="sp1_dashboard__sale_executive_3rd_section"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                >
                    {saleExecutiveDashboardData?.slice(10, 12)?.map((data) => {
                        return (
                            <SectionWrapper
                                key={data?.id}
                                backgroundColor="transparent"
                                flex="1"
                            >
                                <CustomCardHeader
                                    title={data?.title}
                                    info={data?.info}
                                    border={true}
                                />
                                <CustomCardInfo
                                    cardData={{
                                        subTitle: data?.subTitle,
                                        value: data?.value,
                                        valueTypeBefore: data?.valueTypeBefore,
                                        valueTypeAfter: data?.valueTypeAfter,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
                                            data?.value !== 0 &&
                                                handleModalOpen(data);
                                        },
                                        loadingValueWidth: "20%",
                                        info: data?.info,
                                    }}
                                    isLoading={isLoading}
                                    className="align-items-start"
                                />
                            </SectionWrapper>
                        );
                    })}
                </SectionWrapper>
                {/* Country Wise Won Deals */}
                <SectionWrapper
                    className="d-flex flex-column"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    style={{
                        minHeight: "47vh",
                    }}
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Country Wise Won Deals" />
                        <RefreshButton
                            onClick={countryWWDRefetch}
                            isLoading={isCountryWWDLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="var(--primaryDarkBlue)">
                        <DashboardDataTable
                            tableColumns={
                                SalesExecutiveDashboardTableColumn?.CountryWiseWonDeals
                            }
                            tableData={countryWWD?.country_wise_won_deals}
                            isLoading={isCountryWWDLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={
                                SaleExecutiveDashboardTableLoader
                            }
                            className="sp1_dashboard_sale_executive_table"
                            tableStyles={{
                                height: {
                                    minHeight: "35vh",
                                    maxHeight: "35vh",
                                },
                                justifyStyleColumn: {
                                    percentage_won_deals_value: "center",
                                    avg_won_deals_value: "center",
                                    won_deals_count: "center",
                                    won_deals_value: "center",
                                },
                            }}
                        />
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
        </SectionWrapper>
    );
};

export default SalesExecutiveDashboardContent;

SalesExecutiveDashboardContent.propTypes = {
    isLoading: PropTypes.bool,
    handleModalOpen: PropTypes.func,
};
