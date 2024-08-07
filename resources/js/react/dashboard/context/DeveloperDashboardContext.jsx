import * as React from "react";
import PropTypes from "prop-types";

// hooks
import { useAuth } from "../../hooks/useAuth";

// constant
import { DeveloperDashboardDataConstant } from "../constant/developerDashboardConstant";

export const DeveloperDashboardContext = React.createContext();

export const DeveloperDashboardProvider = ({ children }) => {
    const user = useAuth();
    const [dev_id, setDev_id] = React.useState();
    const [filter, setFilter] = React.useState();
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

    // Set the  developer dashboard data to the context value
    const DeveloperContextValue = React.useMemo(() => ({
        developerDashboardData,
        userData,
        filter,
        setFilter,
    }));

    return (
        <DeveloperDashboardContext.Provider value={DeveloperContextValue}>
            {children}
        </DeveloperDashboardContext.Provider>
    );
};

DeveloperDashboardProvider.propTypes = {
    children: PropTypes.node,
};
