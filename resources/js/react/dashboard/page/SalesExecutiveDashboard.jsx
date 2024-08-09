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
import SalesExecutiveDashboardDataModal from "../components/modal/SalesExecutiveDashboardDataModal/SalesExecutiveDashboardDataModal";

// Components - Sections
import SalesExecutiveDashboardContent from "../components/sections/SalesExecutiveDashboardContent";

// Components - Logic - Global
import Switch from "../../global/Switch";

// Context
import { SaleExecutiveDashboardContext } from "../context/SalesExecutiveDashboardContext";
import { SalesExecutiveAdminDashboardContext } from "../context/SalesExecutiveAdminDashboardContext";

// Hooks
import { useAuth } from "../../hooks/useAuth";

const SalesExecutiveDashboard = () => {
    const { id: salesParamsId } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    // Get the context based on the user role ID to access the user data
    const DashboardContext =
        auth.getRoleId() === 1
            ? SalesExecutiveAdminDashboardContext
            : SaleExecutiveDashboardContext;
    // Get the user data from the context
    const {
        userData,
        isSaleExecutiveDashboardIsLoading,
        setSale_id,
        userList,
        filter,
        setFilter,
    } = useContext(DashboardContext);

    const [isSaleExecutiveModalOpen, setIsSaleExecutiveModalOpen] =
        useState(false);
    const [saleExecutiveModalData, setSaleExecutiveModalData] = useState({});

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
        handleModal(setIsSaleExecutiveModalOpen, true, () => {
            setSaleExecutiveModalData(data);
        });
    };

    // Set the sales ID to the state when the salesParamsId changes (when the URL changes)
    // This is only necessary for the Sales Executive Admin Dashboard
    useEffect(() => {
        if (salesParamsId) {
            setSale_id(salesParamsId);
        } else if (userData?.isAdmin && filter?.person) {
            setSale_id(filter?.person?.id);
        }
    }, [salesParamsId, userData, filter?.person]);

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
                            isLoading={isSaleExecutiveDashboardIsLoading}
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
                        {/* This Section only for Admin */}
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
                            isLoading={isSaleExecutiveDashboardIsLoading}
                        />
                    </SectionWrapper>
                </Switch>
            </SectionWrapper>

            {/* Lead Developer Dashboard Content */}
            <SalesExecutiveDashboardContent
                isLoading={isSaleExecutiveDashboardIsLoading}
                handleModalOpen={handleModalOpen}
            />

            {/* Modal */}
            {/* Sales Executive Dashboard Data Modal */}
            {isSaleExecutiveModalOpen && (
                <SalesExecutiveDashboardDataModal
                    isModalOpen={isSaleExecutiveModalOpen}
                    closeModal={() =>
                        handleModal(setIsSaleExecutiveModalOpen, false, () => {
                            setSaleExecutiveModalData({});
                        })
                    }
                    modalData={saleExecutiveModalData}
                    filter={filter}
                    userData={userData}
                />
            )}
        </SectionWrapper>
    );
};

export default SalesExecutiveDashboard;

SalesExecutiveDashboard.propTypes = {};
