import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components - UI - styled
import { SectionWrapper } from "../UI/StyledComponents";

// Components - UI - Custom
import CustomCardHeader from "../UI/CustomCardHeader/CustomCardHeader";
import CustomCardInfo from "../UI/CustomCardInfo/CustomCardInfo";

// context
import { SaleExecutiveDashboardContext } from "../../context/SalesExecutiveDashboardContext";
import RefreshButton from "../shared/RefreshButton";
import DashboardDataTable from "../table/DashboardDataTable";

// table columns
import { SalesExecutiveDashboardTableColumn } from "../table/columns/SalesExecutiveDashboardTableColumn";
import SaleExecutiveDashboardTableLoader from "../loader/SaleExecutiveDashboardTableLoader";

const SalesExecutiveDashboardContent = ({
    isLoading,
    handleLoadingCheck,
    handleModalOpen,
}) => {
    const { saleExecutiveDashboardData } = useContext(
        SaleExecutiveDashboardContext
    );
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Country Wise Bidding Breakdown" />
                        <RefreshButton
                            onClick={handleLoadingCheck}
                            isLoading={isLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="var(--primaryDarkBlue)">
                        <DashboardDataTable
                            tableColumns={
                                SalesExecutiveDashboardTableColumn?.CountryWiseBiddingBreakdown
                            }
                            tableData={[]}
                            isLoading={isLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={
                                SaleExecutiveDashboardTableLoader
                            }
                            className="sp1_dashboard_sale_executive_table"
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                                        valueType: data?.valueType,
                                        hasPermissionForModal:
                                            data?.hasPermissionForModal,
                                        onClick: () => {
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
                    
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Country Wise Won Deals" />
                        <RefreshButton
                            onClick={handleLoadingCheck}
                            isLoading={isLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="var(--primaryDarkBlue)">
                        <DashboardDataTable
                            tableColumns={
                                SalesExecutiveDashboardTableColumn?.CountryWiseWonDeals
                            }
                            tableData={[]}
                            isLoading={isLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={
                                SaleExecutiveDashboardTableLoader
                            }
                            className="sp1_dashboard_sale_executive_table"
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
    handleLoadingCheck: PropTypes.func,
    handleModalOpen: PropTypes.func,
};
