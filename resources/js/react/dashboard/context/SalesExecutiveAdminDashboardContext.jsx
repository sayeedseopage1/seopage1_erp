import * as React from "react";
import PropTypes from "prop-types";

// hooks
import { useAuth } from "../../hooks/useAuth";

// Constants
import { SaleExecutiveDashboardDataConstant } from "../constant/saleExecutiveDashboardDataConstant";

// Services - API
import {
    useGetCountryWiseBiddingBreakdownForAdminQuery,
    useGetCountryWiseWonDealForAdminQuery,
    useGetDashboardUserListQuery,
    useGetSaleExecutiveDashboardDataForAdminQuery,
} from "../../services/api/dashboardApiSlice";

// Utils
import { User } from "../../utils/user-details";
import { formattedDataForSaleExDashboard } from "../helper/formattedDataforSaleExDashboard";

export const SalesExecutiveAdminDashboardContext = React.createContext();

// Sort from  here some Sate //
// CountryWBB - Country Wise Bidding Breakdown
// CountryWWD - Country Wise Won Deals

export const SaleExecutiveAdminDashboardProvider = ({ children }) => {
    const AuthUser = useAuth();
    const saleRoleId = 7; // Sale Executive Role ID
    const [sale_id, setSale_id] = React.useState();
    const [saleExecutiveDashboardData, setSaleExecutiveDashboardData] =
        React.useState(SaleExecutiveDashboardDataConstant);
    const [filter, setFilter] = React.useState();
    const [userData, setUserData] = React.useState({});
    const [countryWBB, setCountryWBB] = React.useState([]);
    const [countryWWD, setCountryWWD] = React.useState([]);
    const [userList, setUserList] = React.useState([]);

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
        sale_id: sale_id,
        query: queryString({
            ...restFilter,
        }),
    };

    // Get the sale executive dashboard data for the admin
    const {
        data: saleExecutiveDashboardResponse,
        isLoading: saleExecutiveDashboardIsLoading,
        isFetching: saleExecutiveDashboardIsFetching,
    } = useGetSaleExecutiveDashboardDataForAdminQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload?.sale_id && !payload?.query,
    });

    const isSaleExecutiveDashboardIsLoading =
        saleExecutiveDashboardIsLoading || saleExecutiveDashboardIsFetching;

    // Get the user list for the sale executive dashboard
    const {
        data: userListResponse,
        isLoading: userListIsLoading,
        isFetching: userListIsFetching,
    } = useGetDashboardUserListQuery(saleRoleId);

    const isUserListLoading = userListIsLoading || userListIsFetching;

    // Get the country wise bidding breakdown for the admin
    const {
        data: countryWBBResponse,
        isLoading: countryWBBIsLoading,
        isFetching: countryWBBIsFetching,
        refetch: countryWBBRefetch,
    } = useGetCountryWiseBiddingBreakdownForAdminQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload?.sale_id,
    });

    const isCountryWBBLoading = countryWBBIsLoading || countryWBBIsFetching;

    // Get the country wise won deal for the admin
    const {
        data: countryWWDResponse,
        isLoading: countryWWDIsLoading,
        isFetching: countryWWDIsFetching,
        refetch: countryWWDRefetch,
    } = useGetCountryWiseWonDealForAdminQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload?.sale_id,
    });

    const isCountryWWDLoading = countryWWDIsLoading || countryWWDIsFetching;

    // Set the  developer dashboard data to the context value
    React.useEffect(() => {
        if (
            saleExecutiveDashboardResponse?.data &&
            !isSaleExecutiveDashboardIsLoading
        ) {
            const formattedData = saleExecutiveDashboardData.map((item) => {
                const data = saleExecutiveDashboardResponse?.data[item?.key];

                return {
                    ...item,
                    value: formattedDataForSaleExDashboard(data, item?.key),
                };
            });
            const user = new User(
                saleExecutiveDashboardResponse?.data?.sale_user
            );
            const formattedUserData = {
                roleId: user?.getRoleId(),
                isAdmin: AuthUser?.getRoleId() === 1,
                name: user?.name,
                id: user?.id,
                email: user?.email,
                imageUrl: user?.getAvatar(),
                countryId: user?.countryId,
                designation: user.getDesignationName(),
                employee_id: user?.getEmployeeId(),
                image: user?.image || null,
            };
            setFilter({
                ...filter,
                person: {
                    id: user?.id,
                    name: user?.name,
                    user_name: user?.name,
                },
            });
            setUserData(formattedUserData);
            setSaleExecutiveDashboardData(formattedData);
        }
    }, [saleExecutiveDashboardResponse, isSaleExecutiveDashboardIsLoading]);

    // Set the  developer dashboard data to the context value
    React.useEffect(() => {
        if (userListResponse?.data && !isUserListLoading) {
            setUserList(userListResponse?.data);
        }
    }, [userListResponse, isUserListLoading]);

    React.useEffect(() => {
        if (countryWBBResponse?.data && !isCountryWBBLoading) {
            setCountryWBB(countryWBBResponse?.data);
        }
    }, [countryWBBResponse, isCountryWBBLoading]);

    React.useEffect(() => {
        if (countryWWDResponse?.data && !isCountryWWDLoading) {
            setCountryWWD(countryWWDResponse?.data);
        }
    }, [countryWWDResponse, isCountryWWDLoading]);

    // Set the  developer dashboard data to the context value
    const DeveloperContextValue = React.useMemo(() => ({
        // Sale Executive Dashboard Data
        saleExecutiveDashboardData,
        isSaleExecutiveDashboardIsLoading,

        // Set Sale ID
        setSale_id,

        // User Data
        userData,
        // User List
        userList,
        isUserListLoading,

        // Filter
        setFilter,
        filter,

        // Country Wise Bidding Breakdown
        countryWBB,
        isCountryWBBLoading,
        countryWBBRefetch,

        // Country Wise Won Deals
        countryWWD,
        isCountryWWDLoading,
        countryWWDRefetch,
    }));

    return (
        <SalesExecutiveAdminDashboardContext.Provider
            value={DeveloperContextValue}
        >
            {children}
        </SalesExecutiveAdminDashboardContext.Provider>
    );
};

SaleExecutiveAdminDashboardProvider.propTypes = {
    children: PropTypes.node,
};
