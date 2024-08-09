import * as React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// hooks
import { useAuth } from "../../hooks/useAuth";

// Constants
import { SaleExecutiveDashboardDataConstant } from "../constant/saleExecutiveDashboardDataConstant";

// Services - API
import {
    useGetCountryWiseBiddingBreakdownForUserQuery,
    useGetCountryWiseWonDealForUserQuery,
    useGetSaleExecutiveDashboardDataQuery,
} from "../../services/api/dashboardApiSlice";

// Utils
import { formattedDataForSaleExDashboard } from "../helper/formattedDataforSaleExDashboard";

export const SaleExecutiveDashboardContext = React.createContext();

// Sort from  here some Sate
// CountryWBB - Country Wise Bidding Breakdown
// CountryWWD - Country Wise Won Deals

export const SaleExecutiveDashboardProvider = ({ children }) => {
    const user = useAuth();
    const [sale_id, setSale_id] = React.useState();
    const [saleExecutiveDashboardData, setSaleExecutiveDashboardData] =
        React.useState(SaleExecutiveDashboardDataConstant);
    const [filter, setFilter] = React.useState();
    const [countryWBB, setCountryWBB] = React.useState([]);
    const [countryWWD, setCountryWWD] = React.useState([]);

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
    const payload = queryString({
        ...restFilter,
    });

    const {
        data: saleExecutiveDashboardResponse,
        isLoading: saleExecutiveDashboardIsLoading,
        isFetching: saleExecutiveDashboardIsFetching,
    } = useGetSaleExecutiveDashboardDataQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload,
    });

    const isSaleExecutiveDashboardIsLoading =
        saleExecutiveDashboardIsLoading || saleExecutiveDashboardIsFetching;

    React.useEffect(() => {
        if (
            saleExecutiveDashboardResponse?.data &&
            !isSaleExecutiveDashboardIsLoading
        ) {
            const formattedData = saleExecutiveDashboardData.map((item) => {
                const data = saleExecutiveDashboardResponse?.data[item.key];
                return {
                    ...item,
                    value: formattedDataForSaleExDashboard(data, item?.key),
                };
            });
            setSaleExecutiveDashboardData(formattedData);
        }
    }, [saleExecutiveDashboardResponse, isSaleExecutiveDashboardIsLoading]);

    const {
        data: countryWBBResponse,
        isLoading: countryWBBIsLoading,
        isFetching: countryWBBIsFetching,
        refetch: countryWBBRefetch,
    } = useGetCountryWiseBiddingBreakdownForUserQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload,
    });

    const isCountryWBBLoading = countryWBBIsLoading || countryWBBIsFetching;

    React.useEffect(() => {
        if (countryWBBResponse?.data && !isCountryWBBLoading) {
            setCountryWBB(countryWBBResponse?.data);
        }
    }, [countryWBBResponse, isCountryWBBLoading]);

    const {
        data: countryWWDResponse,
        isLoading: countryWWDIsLoading,
        isFetching: countryWWDIsFetching,
        refetch: countryWWDRefetch,
    } = useGetCountryWiseWonDealForUserQuery(payload, {
        refetchOnMountOrArgChange: true,
        skip: !payload,
    });

    const isCountryWWDLoading = countryWWDIsLoading || countryWWDIsFetching;

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

        // Set sales ID
        setSale_id,

        // User Data
        userData,

        // User List
        userList: [], // This is a dummy value to avoid errors in the Sales Executive Dashboard component
        isUserListLoading: false, // This is a dummy value to avoid errors in the Sales Executive Dashboard component
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
        <SaleExecutiveDashboardContext.Provider value={DeveloperContextValue}>
            {children}
        </SaleExecutiveDashboardContext.Provider>
    );
};

SaleExecutiveDashboardProvider.propTypes = {
    children: PropTypes.node,
};
