import * as React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// constant
import { LeadDeveloperDataTitle } from "../constant/leadDeveloperConstant";

// hooks
import { useAuth } from "../../hooks/useAuth";


export const LeadDeveloperAdminDashboardContext = React.createContext();

export const LeadDeveloperAdminDashboardProvider = ({ children }) => {
    const AuthUser = useAuth();
    const leadDevRoleId = 6; // Lead Developer Role ID
    const [leadDev_id, setLeadDev_id] = React.useState();
    // const [userData, setUserData] = React.useState({});
    const [filter, setFilter] = React.useState();
    const [leadDeveloperDashboardData, setLeadDeveloperDashboardData] =
        React.useState(LeadDeveloperDataTitle);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(
            object,
            (value) => value !== null && value !== undefined
        );
        return new URLSearchParams(queryObject).toString();
    };

    // Get the sale executive dashboard data for the admin
    const { person, ...restFilter } = filter || {};
    const payload = {
        leadDev_id: leadDev_id,
        query: queryString({
            ...restFilter,
        }),
    };

    // set user data to the context value
    const userData = {
        roleId: AuthUser?.getRoleId(),
        name: AuthUser?.name,
        id: AuthUser?.id,
        email: AuthUser?.email,
        imageUrl: AuthUser?.getAvatar(),
        countryId: AuthUser?.countryId,
    };

    // Set the lead developer dashboard data to the context value
    const LeadDeveloperContextValue = React.useMemo(() => ({
        leadDeveloperDashboardData,
        userData,
        filter,
        setFilter,
        setLeadDev_id,
    }));

    return (
        <LeadDeveloperAdminDashboardContext.Provider
            value={LeadDeveloperContextValue}
        >
            {children}
        </LeadDeveloperAdminDashboardContext.Provider>
    );
};

LeadDeveloperAdminDashboardProvider.propTypes = {
    children: PropTypes.node,
};
