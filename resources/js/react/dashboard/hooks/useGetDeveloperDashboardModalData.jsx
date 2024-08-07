import { useState } from "react";

// Services - API


// Helper
import { queryString } from "../helper";

/**
 * Custom hook to fetch and manage sale executive dashboard modal data.
 *
 * @param {Object} modalData - Contains the query type, response key, and formatting function.
 * @param {Object} filter - Filter criteria for the query.
 * @param {Object} userData - User information including role.
 * @returns {Object} - Contains sale executive modal data, loading states, modal extra info, and refetch function.
 */
export const useGetDeveloperDashboardModalData = (modalData, filter, userData) => {
    const [developerDashboardModalData, setDeveloperDevDashboardModalData] = useState([]);
    const [modalExtraInfo, setModalExtraInfo] = useState(
        modalData?.isShowModalExtraInfo
    );
    const { query, responseKey, formateResponse } = modalData;

    /**
     * Constructs the query payload based on the user's role and filter criteria.
     *
     * @param {Object} filter - The filter object containing filter criteria.
     * @param {Object} userData - The user data containing user information.
     * @returns {Object} - The payload object containing the query string based on the user's role.
     */
    const getQueryByRole = (filter, userData) => {
        // Destructure person from the filter object and get the remaining filter criteria
        const { person, ...restFilter } = filter || {};

        let payload = {};

        if (userData.isAdmin) {
            // TODO: Replace the key with the appropriate key for the lead developer
            payload = {
                dev_id: person?.id,
                query: queryString({
                    ...restFilter,
                    table_type: query,
                }),
            };
        } else {
            payload = queryString({
                ...restFilter,
                table_type: query,
            });
        }

        return payload;
    };

    // TODO: Implement the query to fetch the data
    const fetchDataQuery = () => {};

    // const {
    //     data: developerDashboardModalResponse,
    //     isLoading: developerDashboardModalIsLoading,
    //     isFetching: developerDashboardModalIsFetching,
    //     refetch: developerDashboardModalRefetch,
    // } = fetchDataQuery(getQueryByRole(filter, userData), {
    //     refetchOnMountOrArgChange: true,
    //     skip: !getQueryByRole(filter, userData),
    // });

    const isModalDataRetchingOrLoading = false

    // useEffect(() => {
    //     /**
    //      * Effect to handle the response data and update state when data is loaded and not fetching.
    //      * This effect runs whenever `developerDashboardModalResponse?.data` or `isModalDataRetchingOrLoading` changes.
    //      *
    //      * It formats the data using the provided `formateResponse` function and updates
    //      * the state for modal extra information and sale executive modal data.
    //      */
    //     if (
    //         developerDashboardModalResponse?.data &&
    //         !isModalDataRetchingOrLoading
    //     ) {
    //         // Format the main data based on the response
    //         // formateResponse is a function that formats the response data based on the query type and response key , this function is coming from the constants file 
    //         const formattedData =
    //             formateResponse(
    //                 developerDashboardModalResponse?.data[responseKey]
    //             ) || []; 

    //         // Map and format the extra info
    //         const formatExtraInfo = modalExtraInfo?.map((item) => ({
    //             ...item,
    //             value: developerDashboardModalResponse?.data[item?.key],
    //         }));

    //         // Update state with the formatted extra info and data
    //         setModalExtraInfo(formatExtraInfo);
    //         setDeveloperDashboardModalData(formattedData);
    //     }
    // }, [developerDashboardModalResponse?.data, isModalDataRetchingOrLoading]);

    return {
        developerDashboardModalData,
        isModalDataRetchingOrLoading,
        modalExtraInfo,
    };
};
