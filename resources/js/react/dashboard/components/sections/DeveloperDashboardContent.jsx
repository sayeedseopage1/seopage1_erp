import React, { useState } from "react";
import PropTypes from "prop-types";

// Components - UI - Styled Components
import { SectionWrapper } from "../UI/StyledComponents";

// Components - UI - Custom
import CustomCardInfo from "../UI/CustomCardInfo/CustomCardInfo";
import CustomCardHeader from "../UI/CustomCardHeader/CustomCardHeader";

// Components - Table
import DashboardDataTable from "../table/DashboardDataTable";
import { LeadDeveloperTableColumns } from "../table/columns/LeadDeveloperTableColumns";

// Components - UI - Shared
import RefreshButton from "../shared/RefreshButton";

// Components - Loader
import LeadDashboardTableLoader from "../loader/LeadDashboardTableLoader";

// Context
import { DeveloperDashboardContext } from "../../context/DeveloperDashboardContext";

const DeveloperDashboardContent = ({
    isLoading,
    handleLoadingCheck,
    handleModalOpen,
}) => {
    const { developerDashboardData } = React.useContext(
        DeveloperDashboardContext
    );

    return (
        <SectionWrapper
            className="d-flex flex-column sp1_dashboard_developer_content"
            gap="10px"
            border="1px solid var(--primaryLightBorder)"
        >
            {/* 1st Section  */}
            <SectionWrapper
                gap="10px"
                className="sp1_dashboard_developer_1st_section"
                padding="0px"
            >
                <SectionWrapper
                    className="sp1_dashboard_developer_1st_section_left"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    {developerDashboardData?.slice(0, 2)?.map((data) => {
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
                    className="sp1_dashboard_developer_1st_section_right"
                    backgroundColor="transparent"
                    padding="0px"
                    gap="10px"
                    flex="1"
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        border="1px solid var(--primaryDarkBorderBlue)"
                        flex="1"
                    >
                        {developerDashboardData?.slice(2, 3)?.map((data) => {
                            return (
                                <SectionWrapper
                                    key={data?.id}
                                    backgroundColor="transparent"
                                    className="d-flex flex-column"
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
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        border="1px solid var(--primaryDarkBorderBlue)"
                    >
                        {developerDashboardData
                            ?.filter(
                                (item) =>
                                    item?.key ===
                                    "spent_revision_developer_lead"
                            )
                            .map((data) => (
                                <SectionWrapper
                                    key={data?.id}
                                    backgroundColor="transparent"
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
                            ))}
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
            {/* End 1st Section  */}
            {/* 2nd Section  */}
            <SectionWrapper
                gap="10px"
                className="sp1_dashboard_developer_2nd_section"
                padding="0px"
            >
                <SectionWrapper
                    className="sp1_dashboard_developer_2nd_section_left"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    {developerDashboardData?.slice(4, 6)?.map((data) => {
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
                    className="sp1_dashboard_developer_2nd_section_right"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    gap="10px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    <SectionWrapper
                        padding="0px"
                        backgroundColor="var(--primaryDarkBlue)"
                    >
                        {developerDashboardData?.slice(3, 4)?.map((data) => {
                            return (
                                <SectionWrapper
                                    key={data?.id}
                                    backgroundColor="transparent"
                                    className="d-flex flex-column"
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
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        className="d-flex flex-column flex-md-row"
                    >
                        {developerDashboardData?.slice(6, 8).map((data) => (
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
                        ))}
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
            {/* End 2nd Section  */}
            {/* 3rd Section  */}
            <SectionWrapper
                gap="10px"
                className="sp1_dashboard_developer_3rd_section"
                padding="0px"
            >
                <SectionWrapper
                    className="sp1_dashboard_developer_3rd_section_left"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    gap="10px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    <SectionWrapper
                        padding="0px"
                        backgroundColor="var(--primaryDarkBlue)"
                    >
                        {developerDashboardData?.slice(8, 9)?.map((data) => {
                            return (
                                <SectionWrapper
                                    key={data?.id}
                                    backgroundColor="transparent"
                                    className="d-flex flex-column"
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
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        className="d-flex flex-column flex-md-row"
                    >
                        {developerDashboardData?.slice(9, 11).map((data) => (
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
                        ))}
                    </SectionWrapper>
                </SectionWrapper>
                <SectionWrapper
                    className="sp1_dashboard_developer_3rd_section_right"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    {developerDashboardData?.slice(11, 13)?.map((data) => {
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
            </SectionWrapper>
            {/* End 3rd Section  */}
            {/* 4th Section  */}
            <SectionWrapper
                gap="10px"
                className="sp1_dashboard_developer_4th_section"
                padding="0px"
            >
                <SectionWrapper
                    className="sp1_dashboard_developer_4th_section_left"
                    backgroundColor="var(--primaryDarkBlue)"
                    padding="0px"
                    border="1px solid var(--primaryDarkBorderBlue)"
                    flex="1"
                >
                    {developerDashboardData?.slice(13, 16)?.map((data) => {
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
                    className="sp1_dashboard_developer_4th_section_right"
                    backgroundColor="transparent"
                    padding="0px"
                    gap="10px"
                    flex="1"
                >
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        flex="1"
                        border="1px solid var(--primaryDarkBorderBlue)"
                    >
                        <SectionWrapper backgroundColor="transparent">
                            <CustomCardHeader
                                title="Number Of Disputes Filed"
                                border={true}
                            />
                            <SectionWrapper
                                backgroundColor="transparent"
                                padding="0px"
                                className="d-flex flex-column flex-md-row"
                                gap="10px"
                            >
                                {developerDashboardData
                                    .slice(16, 18)
                                    .map((data) => (
                                        <CustomCardInfo
                                            cardData={{
                                                title: data?.title,
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
                                            style={{
                                                flex: "1",
                                            }}
                                        />
                                    ))}
                            </SectionWrapper>
                        </SectionWrapper>
                    </SectionWrapper>
                    <SectionWrapper
                        backgroundColor="var(--primaryDarkBlue)"
                        padding="0px"
                        flex="1"
                        border="1px solid var(--primaryDarkBorderBlue)"
                    >
                        <SectionWrapper backgroundColor="transparent">
                            <CustomCardHeader
                                title="No. Of Disputes Lost"
                                border={true}
                                info={{
                                    content: "Raised By Developer",
                                }}
                            />
                            <SectionWrapper
                                backgroundColor="transparent"
                                padding="0px"
                                className="d-flex flex-column flex-md-row"
                                gap="10px"
                            >
                                {developerDashboardData
                                    .slice(18, 20)
                                    .map((data) => (
                                        <CustomCardInfo
                                            key={data?.id}
                                            cardData={{
                                                title: data?.title,
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
                                            className="align-items-start w-50"
                                        />
                                    ))}
                            </SectionWrapper>
                        </SectionWrapper>
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
            {/* End 4th Section  */}
            <SectionWrapper
                className="sp1_dashboard_developer_table_section"
                padding="0px"
                gap="10px"
            >
                <SectionWrapper
                    className="d-flex w-50 flex-column"
                    backgroundColor="var(--priMaryWhiteBg)"
                    padding="0px"
                >
                    <SectionWrapper
                        backgroundColor="var(--priMaryWhiteBg)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Number of completed tasks" />
                        <RefreshButton
                            onClick={handleLoadingCheck}
                            isLoading={isLoading}
                        />
                    </SectionWrapper>
                    <SectionWrapper backgroundColor="var(--priMaryWhiteBg)">
                        <DashboardDataTable
                            tableColumns={LeadDeveloperTableColumns?.Complete}
                            tableData={[]}
                            isLoading={isLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={LeadDashboardTableLoader}
                        />
                    </SectionWrapper>
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex w-50 flex-column"
                    backgroundColor="var(--priMaryWhiteBg)"
                    padding="0px"
                >
                    <SectionWrapper
                        backgroundColor="var(--priMaryWhiteBg)"
                        className="d-flex pb-0 align-items-center"
                    >
                        <CustomCardHeader title="Number of Pending tasks" />
                        <RefreshButton
                            onClick={handleLoadingCheck}
                            isLoading={isLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper backgroundColor="var(--priMaryWhiteBg)">
                        <DashboardDataTable
                            tableColumns={LeadDeveloperTableColumns?.Complete}
                            tableData={[]}
                            isLoading={isLoading}
                            tableName="Lead Developer Table"
                            getLoadingComponent={LeadDashboardTableLoader}
                        />
                    </SectionWrapper>
                </SectionWrapper>
            </SectionWrapper>
        </SectionWrapper>
    );
};

export default DeveloperDashboardContent;

DeveloperDashboardContent.propTypes = {
    isLoading: PropTypes.bool,
    handleLoadingCheck: PropTypes.func,
    handleModalOpen: PropTypes.func,
};
