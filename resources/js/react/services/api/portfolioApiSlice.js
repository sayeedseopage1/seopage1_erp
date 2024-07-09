import { apiSlice } from "./apiSlice";
const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");
const portfolioApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPortfolioFilterMenuItems: build.query({
            query: () => `/account/portfolio/filter-menu`,
        }),

        getPortfolioData: build.query({
            query: (query) => `/account/portfolio/data?${query}`,
            providesTags: ["ALL_PORTFOLIO"],
        }),

        getPortfolioDataById: build.query({
            query: (id) => `/account/portfolio/${id}`,
            providesTags: ["PORTFOLIO_BY_ID"],
        }),
        storePortfolioRating: build.mutation({
            query: (data) => ({
                url: `/account/portfolio-rating-store`,
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),

            invalidatesTags: ["ALL_PORTFOLIO", "PORTFOLIO_BY_ID"],
        }),
        updatePortfolioRating: build.mutation({
            query: (data) => ({
                url: `/account/portfolio-rating-update`,
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),

            invalidatesTags: ["ALL_PORTFOLIO", "PORTFOLIO_BY_ID"],
        }),
    }),
});

export const {
    useGetPortfolioFilterMenuItemsQuery,
    useLazyGetPortfolioFilterMenuItemsQuery,
    useGetPortfolioDataQuery,
    useLazyGetPortfolioDataQuery,
    useLazyGetPortfolioDataByIdQuery,
    useStorePortfolioRatingMutation,
    useUpdatePortfolioRatingMutation,
} = portfolioApiSlice;
