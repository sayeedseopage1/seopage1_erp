import * as React from "react";
import { LeadDeveloperDataTitle } from "../constant/leadDeveloperConstant";
import { useAuth } from "../../hooks/useAuth";
import { DeveloperDashboardDataConstant } from "../constant/developerDashboardConstant";

export const DeveloperDashboardContext = React.createContext();

export const DeveloperDashboardProvider = ({ children }) => {
    const user = useAuth();
    const [developerDashboardData, setDeveloperDashboardData] =
        React.useState(DeveloperDashboardDataConstant);

    // set user data to the context value
    const userData = {
        roleId: user?.getRoleId(),
        name: user?.name,
        id: user?.id,
        email: user?.email,
        imageUrl: user?.getAvatar(),
        countryId: user?.countryId,
    };

    // Set the  developer dashboard data to the context value
    const DeveloperContextValue = React.useMemo(() => ({
        developerDashboardData,
        user: userData,
    }));

    return (
        <DeveloperDashboardContext.Provider value={DeveloperContextValue}>
            {children}
        </DeveloperDashboardContext.Provider>
    );
};
