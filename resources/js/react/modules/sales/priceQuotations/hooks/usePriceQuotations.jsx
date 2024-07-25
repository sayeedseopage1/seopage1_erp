import React from "react";

// Services
import {
    useGetClientsQuery,
    useGetDealNamesQuery,
    useGetProjectNichesQuery,
} from "../../../../services/api/priceQuotationsApiSlice";
import { useGetAllPlatformAccountsQuery } from "../../../../services/api/platformAccountApiSlice";

const usePriceQuotations = (priceQuotationsInputs) => {
    const [clientsData, setClientsData] = React.useState([]);
    const [dealsData, setDealsData] = React.useState([]);
    const [projectNichesData, setProjectNichesData] = React.useState([]);
    const [accountsData, setAccountsData] = React.useState([]);

    // Get Project Niches Data
    const { data: projectResponse, isLoading: isProjectNichesLoading } =
        useGetProjectNichesQuery("", {
            refetchOnMountOrArgChange: true,
        });

    // Get Deal Names Data
    const {
        data: dealResponse,
        isLoading: isDealResponseLoading,
        isFetching: isDealRetching,
    } = useGetDealNamesQuery(priceQuotationsInputs?.client?.name, {
        skip: !priceQuotationsInputs?.client?.name,
        refetchOnMountOrArgChange: true,
    });
    const isDealLoading = isDealResponseLoading || isDealRetching;

    // Get Platform Accounts Data
    const { data: accountsResponse, isLoading: isAccountsLoading } =
        useGetAllPlatformAccountsQuery();

    // Get Clients Data
    const { data: clientResponse, isLoading: isClientsLoading } =
        useGetClientsQuery("", {
            refetchOnMountOrArgChange: true,
        });

    React.useEffect(() => {
        // Format the Clients Data
        if (!isClientsLoading && clientResponse?.data?.length > 0) {
            const formatClients = clientResponse?.data.map((client, index) => ({
                id: index + 1,
                name: client,
            }));
            setClientsData(formatClients);
        }

        // Format the Deals Data
        if (!isDealLoading && dealResponse?.data?.length > 0) {
            const formatDealNames = dealResponse?.data?.map((deal, index) => {
                return {
                    ...deal,
                    name: deal?.project_name,
                };
            });
            setDealsData(formatDealNames);
        }

        // Format the Project Niches Data
        if (!isProjectNichesLoading && projectResponse?.data?.length > 0) {
            const formatProjectNiches = projectResponse?.data?.map(
                (project, index) => {
                    return {
                        ...project,
                        name: project?.category_name,
                    };
                }
            );
            setProjectNichesData(formatProjectNiches);
        }

        // Format the Accounts Data
        if (!isAccountsLoading && accountsResponse?.data?.data?.length > 0) {
            const formatAccounts = accountsResponse?.data?.data?.map(
                (account) => {
                    return {
                        ...account,
                        name: account?.username,
                    };
                }
            );
            formatAccounts?.unshift({ id: 0, name: "All", status: 1 });
            setAccountsData(formatAccounts);
        }
    }, [isDealLoading, isClientsLoading, isProjectNichesLoading, isAccountsLoading]);

    return {
        clientsData,
        isClientsLoading,
        dealsData,
        isDealLoading,
        projectNichesData,
        isProjectNichesLoading,
        accountsData,
        isAccountsLoading,
    };
};

export default usePriceQuotations;
