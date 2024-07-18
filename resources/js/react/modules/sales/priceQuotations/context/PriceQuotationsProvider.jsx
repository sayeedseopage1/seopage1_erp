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
        project_cms_id: {},
        project_niche_id: {},
        no_of_primary_pages: null,
        no_of_secondary_pages: null,
        major_works: null,
        no_of_major_functionalities: null,
        other_works: [],
        risk_factor: null,
        risk_percentage: null,
        other_works_data: [],
        client: {},
        deal_stage_id: {},
        client_currency: {},
        deadline: null,
        platform_account: {},
        step: "submit-price-quotation",
    },
    validation: {
        project_cms_id: false,
        project_niche_id: false,
        no_of_primary_pages: false,
        client: false,
        deal_stage_id: false,
        no_of_secondary_pages: false,
        major_works: false,
        other_works: false,
        risk_factor: false,
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
