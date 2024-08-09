import * as React from "react";
import PropTypes from "prop-types";

// constant
import { LeadDeveloperDataTitle } from "../constant/leadDeveloperConstant";

// hooks
import { useAuth } from "../../hooks/useAuth";

export const LeadDeveloperDashboardContext = React.createContext();

export const LeadDeveloperDashboardProvider = ({ children }) => {
    const user = useAuth();
    const [leadDev_id, setLeadDev_id] = React.useState();
    const [filter, setFilter] = React.useState();
    const [leadDeveloperDashboardData, setLeadDeveloperDashboardData] =
        React.useState(LeadDeveloperDataTitle);

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

    // Set the lead developer dashboard data to the context value
    const LeadDeveloperContextValue = React.useMemo(() => ({
        leadDeveloperDashboardData,
        userData,
        filter,
        setFilter,
        setLeadDev_id
    }));

    return (
        <LeadDeveloperDashboardContext.Provider
            value={LeadDeveloperContextValue}
        >
            {children}
        </LeadDeveloperDashboardContext.Provider>
    );
};

LeadDeveloperDashboardProvider.propTypes = {
    children: PropTypes.node,
};
