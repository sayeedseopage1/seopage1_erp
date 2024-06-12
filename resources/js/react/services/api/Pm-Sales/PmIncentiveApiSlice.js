import { apiSlice } from "../apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const pmSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // getIncentiveFactors: build.query({
        //     query: (data) => {
        //         let searchParams = {};

        //         if (data) {
        //             if (Object.keys(data)?.length) {
        //                 searchParams = new URLSearchParams({
        //                     ...(data?.user_id && { user_id: data.user_id }),
        //                     ...(data?.start_date && {
        //                         start_date: data.start_date,
        //                     }),
        //                     ...(data?.end_date && { end_date: data.end_date }),
        //                 });
        //             }
        //         }

        //         return {
        //             url: `/account/incentive-factor?${searchParams.toString()}`,
        //             method: "GET",
        //         };
        //     },
        //     providesTags: ["GET_INCENTIVE_FACTORS"],
        // }),
        getIncentiveFactors: build.query({
            query: (query) => `/account/incentive-factor?${query}`,
            providesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        getSingleIncentiveCriteria: build.query({
            query: (id) => `/account/incentive-criteria/${id}`,
            providesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveTypes: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-type/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveFactors: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-factor/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveCriteria: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-criteria/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        addIncentiveFactors: build.mutation({
            query: (payload) => ({
                url: `/account/incentive-factor`,
                method: "POST",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        deleteIncentiveFactor: build.mutation({
            query: (id) => ({
                url: `/account/incentive-factor/${id}`,
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        getAchievedIncentive: build.query({
            query: (query) => `/account/get-achieved-incentive?${query}`,
            providesTags: ["GET_ACHIEVED_INCENTIVE"],
        }),
        getIncentiveHeldAmount: build.query({
            query: (query) => `/account/get-incentive-held-amount?${query}`,
            providesTags: ["GET_INCENTIVE_HELD_AMOUNT"],
        }),
        payIncentiveHeldAmount: build.mutation({
            query: (payload) => {
                return {
                    url: `/account/incentive-payments`,
                    method: "POST",
                    body: payload,
                    headers: {
                        "X-CSRF-TOKEN": _token,
                    },
                };
            },
            invalidatesTags: ["GET_INCENTIVE_HELD_AMOUNT"],
        }),
    }),
});

export const {
    useGetIncentiveFactorsQuery,
    useGetSingleIncentiveCriteriaQuery,
    useEditIncentiveTypesMutation,
    useEditIncentiveFactorsMutation,
    useEditIncentiveCriteriaMutation,
    useAddIncentiveFactorsMutation,
    useDeleteIncentiveFactorMutation,
    useGetAchievedIncentiveQuery,
    useGetIncentiveHeldAmountQuery,
    usePayIncentiveHeldAmountMutation,
} = pmSalesApiSlice;
