import { apiSlice } from "./apiSlice";            

const boardColumnApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBoardColoumnList: build.query({
            query: () => `/get-board-column-list`
        })
    })
}) ;

 
export const { 
    useGetBoardColoumnListQuery,
 } = boardColumnApiSlice;

