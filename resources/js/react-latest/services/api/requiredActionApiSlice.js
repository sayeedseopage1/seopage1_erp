import { apiSlice } from "./apiSlice";

const requiredActionApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLiveRequiredAction: build.query({
            query: (query) =>
                `/account/get-pending-active-live-action?${query}`,
            providesTags: "LIVE_ACTIONS",
        }),

        getExpiredRequiredAction: build.query({
            query: (query) =>
                `/account/get-pending-expired-live-action?${query}`,
            providesTags: "EXPIRED_ACTIONS",
        }),

        getPastRequiredAction: build.query({
            query: (query) => `/account/get-pending-past-action?${query}`,
            providesTags: "PAST_ACTIONS",
        }),

        getFormData: build.query({
            query: (url) => url,
        }),
    }),
});

export const {
    useLazyGetLiveRequiredActionQuery,
    useGetExpiredRequiredActionQuery,
    useLazyGetExpiredRequiredActionQuery,
    useLazyGetPastRequiredActionQuery,
    useGetFormDataQuery,
} = requiredActionApiSlice;
