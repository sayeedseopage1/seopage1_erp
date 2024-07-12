import * as React from "react";
import PropTypes from "prop-types";

// hooks
import { useAuth } from "../../hooks/useAuth";

// Constants
import { SaleExecutiveDashboardDataConstant } from "../constant/saleExecutiveDashboardDataConstant";

export const SaleExecutiveDashboardContext = React.createContext();

export const SaleExecutiveDashboardProvider = ({ children }) => {
    const user = useAuth();
    const [saleExecutiveDashboardData, setSaleExecutiveDashboardData] =
        React.useState(SaleExecutiveDashboardDataConstant);

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
      saleExecutiveDashboardData,
        user: userData,
    }));

    return (
        <SaleExecutiveDashboardContext.Provider value={DeveloperContextValue}>
            {children}
        </SaleExecutiveDashboardContext.Provider>
    );
};


SaleExecutiveDashboardProvider.propTypes = {
    children: PropTypes.node,
}