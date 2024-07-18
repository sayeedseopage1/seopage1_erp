import React from "react";

// Services
import {
    useGetClientsQuery,
    useGetDealNamesQuery,
    useGetProjectNichesQuery,
} from "../../../../services/api/priceQuotationsApiSlice";

const usePriceQuotations = (priceQuotationsInputs) => {
    const [clientsData, setClientsData] = React.useState([]);
    const [dealsData, setDealsData] = React.useState([]);
    const [projectNichesData, setProjectNichesData] = React.useState([]);

    const { data: projectResponse, isLoading: isProjectNichesLoading } =
        useGetProjectNichesQuery("", {
            refetchOnMountOrArgChange: true,
        });

    const {
        data: dealResponse,
        isLoading: isDealResponseLoading,
        isFetching: isDealRetching,
    } = useGetDealNamesQuery(priceQuotationsInputs?.client?.name, {
        skip: !priceQuotationsInputs?.client?.name,
        refetchOnMountOrArgChange: true,
    });

    const isDealLoading = isDealResponseLoading || isDealRetching;

    const { data: clientResponse, isLoading: isClientsLoading } =
        useGetClientsQuery("", {
            refetchOnMountOrArgChange: true,
        });

    React.useEffect(() => {
        if (!isClientsLoading && clientResponse?.data?.length > 0) {
            const formatClients = clientResponse?.data.map((client, index) => ({
                id: index + 1,
                name: client,
            }));
            setClientsData(formatClients);
        }
        if (!isDealLoading && dealResponse?.data?.length > 0) {
            const formatDealNames = dealResponse?.data?.map((deal, index) => {
                return {
                    ...deal,
                    name: deal?.project_name,
                };
            });
            setDealsData(formatDealNames);
        }
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
    }, [isDealLoading, isClientsLoading, isProjectNichesLoading]);

    return {
        clientsData,
        isClientsLoading,
        dealsData,
        isDealLoading,
        projectNichesData,
        isProjectNichesLoading,
    };
};

export default usePriceQuotations;
