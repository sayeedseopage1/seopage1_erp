import * as React from "react";
import { LeadDeveloperDataTitle } from "../constant/leadDeveloperConstant";
import { useAuth } from "../../hooks/useAuth";

export const LeadDeveloperContext = React.createContext();

export const LeadDeveloperProvider = ({ children }) => {
    const user = useAuth();
    const [leadDeveloperDashboardData, setLeadDeveloperDashboardData] =
        React.useState(LeadDeveloperDataTitle);

    // set user data to the context value
    const userData = {
        roleId: user?.getRoleId(),
        name: user?.name,
        id: user?.id,
        email: user?.email,
        imageUrl: user?.getAvatar(),
        countryId: user?.countryId,
    };

    // Set the lead developer dashboard data to the context value
    const LeadDeveloperContextValue = React.useMemo(() => ({
        leadDeveloperDashboardData,
        user: userData,
    }));

    return (
        <LeadDeveloperContext.Provider value={LeadDeveloperContextValue}>
            {children}
        </LeadDeveloperContext.Provider>
    );
};
