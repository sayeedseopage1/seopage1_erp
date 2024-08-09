import * as React from "react";
import PropTypes from "prop-types";

// hooks
import { useAuth } from "../../hooks/useAuth";

// constant
import { DeveloperDashboardDataConstant } from "../constant/developerDashboardConstant";
import { useGetDashboardUserListQuery } from "../../services/api/dashboardApiSlice";

export const DeveloperAdminDashboardContext = React.createContext();

export const DeveloperAdminDashboardProvider = ({ children }) => {
    const user = useAuth();
    const devRoleId = 5; // Developer Role ID
    const [dev_id, setDev_id] = React.useState();
    const [filter, setFilter] = React.useState();
    const [userList, setUserList] = React.useState([]);
    const [developerDashboardData, setDeveloperDashboardData] = React.useState(
        DeveloperDashboardDataConstant
    );

    // set user data to the context value
    const userData = {
        roleId: user?.getRoleId(),
        isAdmin: user?.getRoleId() === 1,
        name: user?.name,
        id: user?.id,
        email: user?.email,
        imageUrl: user?.getAvatar(),
        countryId: user?.countryId,
        designation: user.getDesignationName(),
        employee_id: user?.getEmployeeId(),
        image: user?.image || null,
    };

    // ---- Get the developer admin dashboard data ---- //

    // Get the user list for the sale executive dashboard
    const {
        data: userListResponse,
        isLoading: userListIsLoading,
        isFetching: userListIsFetching,
    } = useGetDashboardUserListQuery(devRoleId);

    const isUserListLoading = userListIsLoading || userListIsFetching;

    React.useEffect(() => {
        if (userListResponse?.data && !isUserListLoading) {
            setUserList(userListResponse?.data);
        }
    }, [userListResponse, isUserListLoading]);

    // ---- End of Get the developer admin dashboard data ---- //

    // Set the  developer dashboard data to the context value
    const DeveloperAdminContextValue = React.useMemo(() => ({
        developerDashboardData,
        userData,
        filter,
        setFilter,
        userList,
        setDev_id,
    }));

    return (
        <DeveloperAdminDashboardContext.Provider
            value={DeveloperAdminContextValue}
        >
            {children}
        </DeveloperAdminDashboardContext.Provider>
    );
};

DeveloperAdminDashboardProvider.propTypes = {
    children: PropTypes.node,
};
