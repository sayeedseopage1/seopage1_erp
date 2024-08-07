import React, { useState, useContext,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
import { LeadDeveloperDashboardContext } from "../context/LeadDeveloperDashboardContext";
import { LeadDeveloperAdminDashboardContext } from "../context/LeadDeveloperAdminDashboardContext";



const LeadDeveloperDashboard = () => {
    const { id: leadDevParamsId } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    // Get the context based on the user role ID to access the user data
    const DashboardContext =
        auth.getRoleId() === 1
            ? LeadDeveloperAdminDashboardContext
            : LeadDeveloperDashboardContext;

    const { userData, setLeadDev_id , filter, setFilter } = useContext(DashboardContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isLeadDeveloperModalOpen, setIsLeadDeveloperModalOpen] =
        useState(false);
    const [leadDeveloperModalData, setLeadDeveloperModalData] = useState({});


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

    // Set the sales ID to the state when the salesParamsId changes (when the URL changes)
    // This is only necessary for the Sales Executive Admin Dashboard
    useEffect(() => { 
        if (leadDevParamsId) {
            setLeadDev_id(leadDevParamsId);
        } else if (userData?.isAdmin && filter?.person) {
            setLeadDev_id(filter?.person?.id);
        }
    }, [leadDevParamsId, userData, filter?.person]);

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
                            personInfo={userData}
                            isLoading={isLoading}
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
                                data={LeadDeveloperDummyData}
                                selected={filter?.person}
                                setSelected={(e) => {
                                    setFilter({
                                        ...filter,
                                        person: e?.target?.value,
                                    })
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
                            isLoading={isLoading}
                        />
                    </SectionWrapper>
                </Switch>
            </SectionWrapper>

            {/* Lead Developer Dashboard Content */}
            <LeadDeveloperDashboardContent
                isLoading={isLoading}
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
