import { apiSlice } from "./apiSlice";

const pendingActions = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // sales revision response
        pendingActionsId: build.mutation({
            query: (data) => ({
                url: `account/settings/past-pending-action-comment`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: [
                "LIVE_ACTIONS",
                "EXPIRED_ACTIONS",
                "PAST_ACTIONS",
            ],
        }),
        acknowledgePendingActionsPast: build.mutation({
            query: (data) => ({
                url: `account/employee-evaluation-acknowledged`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: [
                "LIVE_ACTIONS",
                "EXPIRED_ACTIONS",
                "PAST_ACTIONS",
            ],
        }),
    }),
});

export const {
    usePendingActionsIdMutation,
    useAcknowledgePendingActionsPastMutation,
} = pendingActions;
