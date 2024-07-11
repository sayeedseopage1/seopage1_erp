import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components - UI - Shared
import ProfileAvatar from "../components/shared/ProfileAvatar";

// Components - UI - Styled
import { SectionWrapper } from "../components/UI/StyledComponents";

// Components - UI - Custom
import CustomDropDown from "../components/UI/CustomDropDown/CustomDropDown";
import DashboardMonthFilter from "../components/UI/DashboardMonthFilter/DashboardMonthFilter";

// Constants
import { DeveloperDummyData } from "../constant";

// Components - UI - Modal
import DeveloperDashboardDataModal from "../components/modal/DeveloperDashboardDataModal/DeveloperDashboardDataModal";

// Components - Sections
import DeveloperDashboardContent from "../components/sections/DeveloperDashboardContent";

// Components - Logic - Global
import Switch from "../../global/Switch";

// Context
import { DeveloperDashboardContext } from "../context/DeveloperDashboardContext";

const DeveloperDashboard = () => {
    const { user } = useContext(DeveloperDashboardContext);
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
    const [developerModalData, setDeveloperModalData] = useState({});

    const handleLoadingCheck = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    };

    /**
     * Toggles the state of a modal and optionally executes an additional action.
     *
     * @param {Function} setModalOpenFunc - Function to set the modal open state.
     * @param {boolean} isOpen - Boolean indicating whether the modal should be open (true) or closed (false).
     * @param {Function} [action] - Optional function to execute after setting the modal state.
     */
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    const handleModalOpen = (data) => {
        handleModal(setIsDeveloperModalOpen, true, () => {
            setDeveloperModalData(data);
        });
    };

    return (
        <SectionWrapper
            className="d-flex flex-column"
            gap="20px"
            padding="0px"
            backgroundColor="transparent"
        >
            {/* Lead Developer Dashboard Header Section */}
            <SectionWrapper
                className="sp1_dashboard_header_section"
                border="1px solid var(--primaryLightBorder)"
                gap="20px"
            >
                <Switch>
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
                            isLoading={isLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper
                        className={`sp1_dashboard_header_filter_section ${
                            user?.roleId === 1
                                ? "justify-content-between"
                                : "justify-content-center"
                        }`}
                        backgroundColor="var(--primaryLightWhiteBg)"
                        border="1px solid var(--primaryLightBorder)"
                        gap="10px"
                    >
                        <Switch.Case condition={user?.roleId === 1}>
                            <CustomDropDown
                                data={DeveloperDummyData}
                                selected={filter?.person}
                                setSelected={(e) =>
                                    setFilter({
                                        ...filter,
                                        person: e?.target?.value,
                                    })
                                }
                                filedName="person"
                                isSearchBoxUse
                            />
                        </Switch.Case>
                        <DashboardMonthFilter
                            setFilter={setFilter}
                            isLoading={isLoading}
                        />
                    </SectionWrapper>
                </Switch>
            </SectionWrapper>

            {/* Lead Developer Dashboard Content */}
            <DeveloperDashboardContent
                isLoading={isLoading}
                handleLoadingCheck={handleLoadingCheck} // temp function to check loading
                handleModalOpen={handleModalOpen}
            />

            {/* Modal */}
            {/* Developer Dashboard Data Modal */}
            {isDeveloperModalOpen && (
                <DeveloperDashboardDataModal
                    isModalOpen={isDeveloperModalOpen}
                    closeModal={() =>
                        handleModal(setIsDeveloperModalOpen, false, () => {
                            setDeveloperModalData({});
                        })
                    }
                    modalData={developerModalData}
                />
            )}
        </SectionWrapper>
    );
};

export default DeveloperDashboard;

DeveloperDashboard.propTypes = {};
