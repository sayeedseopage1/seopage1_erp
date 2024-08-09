import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components - UI - Shared
import ProfileAvatar from "../components/shared/ProfileAvatar";

// Components - UI - Styled
import { SectionWrapper } from "../components/UI/StyledComponents";

// Components - UI - Custom
import CustomDropDown from "../components/UI/CustomDropDown/CustomDropDown";
import DashboardMonthFilter from "../components/UI/DashboardMonthFilter/DashboardMonthFilter";


// Components - UI - Modal
import DeveloperDashboardDataModal from "../components/modal/DeveloperDashboardDataModal/DeveloperDashboardDataModal";

// Components - Sections
import DeveloperDashboardContent from "../components/sections/DeveloperDashboardContent";

// Components - Logic - Global
import Switch from "../../global/Switch";

// Context
import { DeveloperDashboardContext } from "../context/DeveloperDashboardContext";
import { DeveloperAdminDashboardContext } from "../context/DeveloperAdminDashboardContext";

// Hooks
import { useAuth } from "../../hooks/useAuth";

const DeveloperDashboard = () => {
    const { id: devParamsId } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();

    // Get the context based on the user role ID to access the user data
    const DashboardContext =
        auth.getRoleId() === 1
            ? DeveloperAdminDashboardContext
            : DeveloperDashboardContext;
    // Get the user data from the context
    const {
        userData,
        isDeveloperDashboardIsLoading,
        setDev_id,
        userList,
        filter,
        setFilter,
    } = useContext(DashboardContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
    const [developerModalData, setDeveloperModalData] = useState({});

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

    // Set the sales ID to the state when the salesParamsId changes (when the URL changes)
    // This is only necessary for the Sales Executive Admin Dashboard
    useEffect(() => {
        if (devParamsId) {
            setDev_id(devParamsId);
        } else if (userData?.isAdmin && filter?.person) {
            setDev_id(filter?.person?.id);
        }
    }, [devParamsId, userData, filter?.person]);

    return (
        <SectionWrapper
            className="d-flex flex-column"
            gap="20px"
            padding="0px"
            backgroundColor="transparent"
        >
            {/* Dashboard Header Section */}
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
                            personInfo={userData}
                            isLoading={isDeveloperDashboardIsLoading}
                        />
                    </SectionWrapper>

                    <SectionWrapper
                        className={`sp1_dashboard_header_filter_section ${
                            userData?.isAdmin
                                ? "justify-content-between"
                                : "justify-content-center"
                        }`}
                        backgroundColor="var(--primaryLightWhiteBg)"
                        border="1px solid var(--primaryLightBorder)"
                        gap="10px"
                    >
                        <Switch.Case condition={userData?.isAdmin}>
                            <CustomDropDown
                                data={userList}
                                selected={filter?.person}
                                setSelected={(e) => {
                                    setFilter({
                                        ...filter,
                                        person: e?.target?.value,
                                    });
                                    navigate(`/${e?.target?.value?.id}`, {
                                        replace: true,
                                    });
                                }}
                                filedName="person"
                                isSearchBoxUse
                            />
                        </Switch.Case>
                        <DashboardMonthFilter
                            setFilter={setFilter}
                            isLoading={isDeveloperDashboardIsLoading}
                        />
                    </SectionWrapper>
                </Switch>
            </SectionWrapper>

            {/* Lead Developer Dashboard Content */}
            <DeveloperDashboardContent
                isLoading={isDeveloperDashboardIsLoading}
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
                    filter={filter}
                    userData={userData}
                />
            )}
        </SectionWrapper>
    );
};

export default DeveloperDashboard;

DeveloperDashboard.propTypes = {};
