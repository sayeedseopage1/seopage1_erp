import { apiSlice } from "./apiSlice";

const taskCommentApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // get task comments
        getTaskComments: build.query({
            query: (taskId) => `/account/tasks/${taskId}/comments`,
            providesTags: (result = [], error, arg) => [
                "TASK_COMMENTS",
                "TASK_COMMENT",
                ...result.map(({ id }) => ({ type: "TASK_COMMENT", id })),
            ],
        }),

        // get task comments
        getTaskCommentReplies: build.query({
            query: (commentId) =>
                `/account/tasks/comments/${commentId}/replies`,
            providesTags: ["TASK_COMMENT_REPLIES"],
        }),

        // widget data
        getTaskCommentWidgetData: build.query({
            query: (taskId) => `/account/tasks/comments-widget-data/${taskId}`,
            providesTags: ["TASK_COMMENTS_WIDGET"],
        }),

        // preview a comment
        getPreviewCommentData: build.query({
            query: (commentId) =>
                `/account/tasks/comments/${commentId}/preview`,
            providesTags: ["TASK_COMMENT_PREVIEW"],
        }),

        // update comment
        updateComment: build.mutation({
            query: ({ data }) => ({
                url: `/account/tasks/comment-edit`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["TASK_COMMENTS_WIDGET", "TASK_COMMENT_PREVIEW"],
        }),

        // remove file
        removeCommentPreviousUploadedFile: build.mutation({
            query: (data) => ({
                url: `/account/tasks/${data.task_id}/comments/${data.comment_id}/delete-attach-file`,
                method: "DELETE",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["TASK_COMMENTS_WIDGET", "TASK_COMMENT_PREVIEW"],
        }),

        // reply comment
        replyTaskComment: build.mutation({
            query: (data) => ({
                url: `/account/tasks/comment-reply`,
                method: "POST",
                body: data.formData,
                formData: true,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "TASK_COMMENT", id: arg.commentId },
                "TASK_COMMENT_REPLIES",
                "TASK_COMMENTS_WIDGET",
                "TASK_COMMENT_PREVIEW",
            ],
        }),

        deleteComment: build.mutation({
            query: (commentId) => ({
                url: `/account/tasks/comments/${commentId}/delete`,
                method: "DELETE",
                body: {
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),

            invalidatesTags: (_result = [], _error, arg) => [
                { type: "TASK_COMMENT", id: arg },
                "TASK_COMMENT_REPLIES",
                "TASK_COMMENTS_WIDGET",
                "TASK_COMMENT_PREVIEW",
            ],
        }),
    }),
});

export const {
    useGetTaskCommentsQuery,
    useGetTaskCommentRepliesQuery,
    useGetTaskCommentWidgetDataQuery,
    useLazyGetTaskCommentWidgetDataQuery,
    useGetPreviewCommentDataQuery,
    useUpdateCommentMutation,
    useRemoveCommentPreviousUploadedFileMutation,
    useReplyTaskCommentMutation,
    useDeleteCommentMutation,
} = taskCommentApiSlice;
