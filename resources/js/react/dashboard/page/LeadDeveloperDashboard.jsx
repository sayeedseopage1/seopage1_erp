import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CiCircleInfo } from "react-icons/ci";

// Components - UI - Shared
import ProfileAvatar from "../components/shared/ProfileAvatar";

// Components - UI - Styled
import { SectionWrapper } from "../components/UI/StyledComponents";

// Components - UI - Custom
import CustomDropDown from "../components/UI/CustomDropDown/CustomDropDown";
import DashboardMonthFilter from "../components/UI/DashboardMonthFilter/DashboardMonthFilter";
import CustomCardHeader from "../components/UI/CustomCardHeader/CustomCardHeader";

// Constants
import { LeadDeveloperDummyData } from "../constant";
import CustomCardInfo from "../components/UI/CustomCardInfo/CustomCardInfo";
import DashboardDataTable from "../components/table/DashboardDataTable";
import { LeadDeveloperTableColumns } from "../components/table/columns/LeadDeveloperTableColumns";

const LeadDeveloperDashboard = () => {
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleFilterChange = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Filter Changed", filter);
            setIsLoading(false);
        }, 5000);
    };

    useEffect(() => {
        handleFilterChange();
    }, [filter]);

    return (
        <SectionWrapper
            className="d-flex flex-column"
            gap="20px"
            padding="0px"
            backgroundColor="transparent"
        >
            <SectionWrapper
                className="sp1_dashboard_header_section"
                border="1px solid var(--primaryLightBorder)"
                gap="20px"
            >
                <SectionWrapper
                    className="sp1_dashboard_header_user_info"
                    backgroundColor="var(--priMaryWhiteBg)"
                    border="1px solid var(--primaryLightBorder)"
                >
                    <ProfileAvatar
                        personInfo={{
                            name: "John Doe",
                            avatar: "avatar1.jpg",
                            position: "Sr. Executive",
                            employeeId: "Seopage1/0131",
                        }}
                    />
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex justify-content-between align-items-center"
                    backgroundColor="var(--primaryLightWhiteBg)"
                    border="1px solid var(--primaryLightBorder)"
                    gap="10px"
                >
                    <CustomDropDown
                        data={LeadDeveloperDummyData}
                        selected={filter?.person}
                        setSelected={(e) =>
                            setFilter({
                                ...filter,
                                person: e?.target?.value,
                            })
                        }
                        filedName="person"
                        isMultiple={false}
                    />
                    <DashboardMonthFilter
                        setFilter={setFilter}
                        isLoading={isLoading}
                    />
                </SectionWrapper>
            </SectionWrapper>
            <SectionWrapper
                className="d-flex flex-column"
                gap="20px"
                padding="20px 0"
            >
                <CustomCardHeader
                    title="Total Projects"
                    border
                    borderStyle="0.1px solid var(--primaryBorderBlue)"
                />
                <CustomCardInfo
                    isLoading={isLoading}
                    cardData={{
                        title: "Total Projects",
                        subTitle: "(This Month)",
                        value: 10,
                        isColorChange: true,
                        loadingValueWidth: "80%",
                        isModalOpen: false,
                        info: {
                            content: "Total Projects",
                            trigger: "hover",
                        },
                    }}
                    className="align-items-start"
                />
            </SectionWrapper>

            <SectionWrapper>
                <DashboardDataTable
                    tableName="LeadDeveloperCompletedProjects"
                    tableColumns={LeadDeveloperTableColumns?.Complete}
                />
            </SectionWrapper>
        </SectionWrapper>
    );
};

export default LeadDeveloperDashboard;

LeadDeveloperDashboard.propTypes = {};
