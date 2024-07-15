import React, { useState, useContext } from "react";

// Components - UI - Shared
import ProfileAvatar from "../components/shared/ProfileAvatar";

// Components - UI - Styled
import { SectionWrapper } from "../components/UI/StyledComponents";

// Components - UI - Custom
import CustomDropDown from "../components/UI/CustomDropDown/CustomDropDown";
import DashboardMonthFilter from "../components/UI/DashboardMonthFilter/DashboardMonthFilter";

// Constants
import { LeadDeveloperDummyData } from "../constant";

// Components - UI - Modal
import LeadDeveloperDataModal from "../components/modal/LeadDeveloperDataModal/LeadDeveloperDataModal";
import LeadDeveloperDashboardContent from "../components/sections/LeadDeveloperDashboardContent";

// Components - Logic - Global
import Switch from "../../global/Switch";

// Context
import { LeadDeveloperContext } from "../context/LeadDeveloperContext";

const LeadDeveloperDashboard = () => {
    const { user } = useContext(LeadDeveloperContext);
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLeadDeveloperModalOpen, setIsLeadDeveloperModalOpen] =
        useState(false);
    const [leadDeveloperModalData, setLeadDeveloperModalData] = useState({});

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
        handleModal(setIsLeadDeveloperModalOpen, true, () => {
            setLeadDeveloperModalData(data);
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
                                data={LeadDeveloperDummyData}
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
            <LeadDeveloperDashboardContent
                isLoading={isLoading}
                handleLoadingCheck={handleLoadingCheck} // temp function to check loading
                handleModalOpen={handleModalOpen}
            />

            {/* Modal */}
            {/* <LeadDeveloperDataModal */}
            {isLeadDeveloperModalOpen && (
                <LeadDeveloperDataModal
                    isModalOpen={isLeadDeveloperModalOpen}
                    closeModal={() =>
                        handleModal(setIsLeadDeveloperModalOpen, false, () => {
                            setLeadDeveloperModalData({});
                        })
                    }
                    modalData={leadDeveloperModalData}
                />
            )}
        </SectionWrapper>
    );
};

export default LeadDeveloperDashboard;

LeadDeveloperDashboard.propTypes = {};
