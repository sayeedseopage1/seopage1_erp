import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components - UI - Shared
import ProfileAvatar from "../components/shared/ProfileAvatar";

// Components - UI - Styled
import { SectionWrapper } from "../components/UI/StyledComponents";

// Components - UI - Custom
import DashboardMonthFilter from "../components/UI/DashboardMonthFilter/DashboardMonthFilter";

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
        <section className="d-flex flex-column">
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
                    <button className="btn btn-primary">View Profile</button>
                </SectionWrapper>
                <SectionWrapper
                    className="d-flex justify-content-between align-items-center"
                    backgroundColor="var(--primaryLightWhiteBg)"
                    border="1px solid var(--primaryLightBorder)"
                >
                    <DashboardMonthFilter
                        setFilter={setFilter}
                        isLoading={true}
                    />
                </SectionWrapper>
            </SectionWrapper>
        </section>
    );
};

export default LeadDeveloperDashboard;

LeadDeveloperDashboard.propTypes = {};
