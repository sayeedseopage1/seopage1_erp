import { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

// API

import {
    useGetCMSListQuery,
    useGetCurrenciesQuery,
} from "../../../../services/api/priceQuotationsApiSlice";
import { useGetAllPlatformAccountsQuery } from "../../../../services/api/platformAccountApiSlice";

export const priceQuotationsState = {
    inputs: {
        cms: {},
        category: {},
        primary_page: null,
        secondary_page: null,
        major_works: null,
        number_of_functionalities: null,
        other_works: [],
        risk_factors: null,
        risk_percentage: null,
        other_works_data: [],
        client: {},
        deal: {},
        client_currency: {},
        deadline: null,
        platform_account: {},
        step: "submit-price-quotation",
    },
    validation: {
        cms: false,
        category: false,
        primary_page: false,
        client: false,
        deal: false,
        secondary_page: false,
        major_works: false,
        other_works: false,
        risk_factors: false,
        client_currency: false,
        deadline: false,
        platform_account: false,
        is_submitting: false,
    },
};

export const PriceQuotationsContext = createContext({});

const PriceQuotationsProvider = ({ children }) => {
    const [cmsData, setCMSData] = useState([]);
    const [currenciesData, setCurrenciesData] = useState([]);
    const [accountsData, setAccountsData] = useState([]);

    const [priceQuotationsInputs, setPriceQuotationsInputs] = useState(
        priceQuotationsState.inputs
    );

    // CMS
    const { data: cmsResponse, isLoading: isCMSLoading } = useGetCMSListQuery(
        "",
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const { data: currenciesResponse, isLoading: isCurrenciesLoading } =
        useGetCurrenciesQuery("", {
            refetchOnMountOrArgChange: true,
        });

    const { data: accountsResponse, isLoading: isAccountsLoading } =
        useGetAllPlatformAccountsQuery();

    useEffect(() => {
        if (!isCurrenciesLoading && currenciesResponse?.data?.length >0) {
            const formatCurrencies = currenciesResponse?.data?.map((currency) => {
                return {
                    ...currency,
                    name: currency?.currency_name,
                };
            });
            setCurrenciesData(formatCurrencies);
        }

        if (!isCMSLoading && cmsResponse?.data?.length > 0) {
            const formatCMS = cmsResponse?.data?.map((cms) => {
                return {
                    ...cms,
                    name: cms?.cms_name,
                };
            });
            setCMSData(formatCMS);
        }

        if (!isAccountsLoading && accountsResponse?.data?.data?.length > 0) {
            const formatAccounts = accountsResponse?.data?.data?.map((account) => {
                return {
                    ...account,
                    name: account?.username,
                };
            });
            setAccountsData(formatAccounts);
        }
    }, [isCurrenciesLoading, isCMSLoading, isAccountsLoading]);

    // Value
    const PriceQuotationsValue = useMemo(() => {
        return {
            cmsData,
            isCMSLoading,
            currenciesData,
            isCurrenciesLoading,
            accountsData,
            isAccountsLoading,
            priceQuotationsInputs,
            setPriceQuotationsInputs,
        };
    });

    return (
        <PriceQuotationsContext.Provider value={PriceQuotationsValue}>
            {children}
        </PriceQuotationsContext.Provider>
    );
};

export default PriceQuotationsProvider;

PriceQuotationsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
