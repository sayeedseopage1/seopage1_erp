import { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

// API
import {
    useGetClientsQuery,
    useGetCMSListQuery,
    useGetCurrenciesQuery,
} from "../../../../services/api/priceQuotationsApiSlice";

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
        currency_id: {},
        deadline_type: null,
        no_of_days: null,
        platform_account_id: {},
        step: "submit-price-quotation", // This will be default value
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
        currency_id: false,
        deadline_type: false,
        platform_account_id: false,
        is_submitting: false,
    },
};

export const PriceQuotationsContext = createContext({});

const PriceQuotationsProvider = ({ children }) => {
    const [cmsData, setCMSData] = useState([]);
    const [clientsData, setClientsData] = useState([]);
    const [currenciesData, setCurrenciesData] = useState([]);
    const [priceQuotationsResponse, setPriceQuotationsResponse] = useState({
        data: [],
        previous_payloads: {},
        invoiceData: null,
        isNotDoAble: false,
    });

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

    // Get Clients Data
    const { data: clientResponse, isLoading: isClientsLoading } =
        useGetClientsQuery("", {
            refetchOnMountOrArgChange: true,
        });

    useEffect(() => {
        if (!isCurrenciesLoading && currenciesResponse?.data?.length > 0) {
            const formatCurrencies = currenciesResponse?.data?.map(
                (currency) => {
                    return {
                        ...currency,
                        name: currency?.currency_name,
                    };
                }
            );
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

        // Format the Clients Data
        if (!isClientsLoading && clientResponse?.data?.length > 0) {
            const formatClients = clientResponse?.data.map((client, index) => ({
                id: index + 1,
                name: client,
            }));
            setClientsData(formatClients);
        }
    }, [isCurrenciesLoading, isCMSLoading, isClientsLoading]);

    // Value
    const PriceQuotationsValue = useMemo(() => {
        return {
           
            cmsData,
            isCMSLoading,
            currenciesData,
            clientsData,
            isClientsLoading,
            isCurrenciesLoading,
            priceQuotationsInputs,
            setPriceQuotationsInputs,
            priceQuotationsResponse,
            setPriceQuotationsResponse,
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
