import { apiSlice } from "./apiSlice";            

const portfolioApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPortfolioFilterMenuItems: build.query({
            query: () => `/account/portfolio/filter-menu`,
        }),
        
        getPortfolioData: build.query({
            query: (query) => `/account/portfolio/data${query}`
        }),

        getPortfolioDataById: build.query({
            query: (id) => `/account/portfolio/${id}` 
        })
    })
}) ;

 
export const { 
    useGetPortfolioFilterMenuItemsQuery,
    useLazyGetPortfolioFilterMenuItemsQuery,
    useGetPortfolioDataQuery,
    useLazyGetPortfolioDataQuery,
    useLazyGetPortfolioDataByIdQuery
} = portfolioApiSlice;

