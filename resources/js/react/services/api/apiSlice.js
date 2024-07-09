import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    keepUnusedDataFor: 60,
    tagTypes: [
        "points_page_filter_options",
        "TASK_STATUS",
        "TASKS",
        "TASKSREPORT",
        "PMGUIDELINE",
        "DAILY_SUBMISSION_STATUS",
        "TASK_TYPE_STATUS_DATA",
        "ENABLE_MARKASCOMPLETE",
        "USER_IN_PROGRESS_TASKS",
        "DISPUTES",
        "SUB_TASKS",
        "AUTHORIZE_PARENT_TASK",
        "PENDING_TASK_AUTHORIZATION_CONVERSATIONS",
        "INDEPENDENT_TASK",
        "TASK_COMMENTS_WIDGET",
        "TASK_COMMENT_PREVIEW",
        "TASK_COMMENTS",
        "TASK_COMMENT",
        "TASK_COMMENT_REPLIES",
        "IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS",
        "COMMENTS",
        "LEADS",
        "DM_LEADS",
        "ALL_DAILY_SUBMISSION_STATUS",
        "DEALS",
        "DM_DEALS",
        "WON_DEALS",
        "GET_PROJECT_STATUS",
        "GET_PM_GOAL",
        "GET_SALES_RISK_ANALYSIS_RULES",
        "GET_SALES_RISK_ANALYSIS_QUESTION_LIST",
        "GET_SALES_RISK_ANALYSIS_QUESTION_FIELDS_TYPE",
        "GET_SALES_RISK_ANALYSIS_QUESTION_LIST_BY_DEAL_ID",
        "All_TASKS",
        "All_EVALUATION",
        "GET_SALES_RISK_ANALYSIS_INPUT_FIELDS",
        "ALL_REVISION",
        "EVALUATION_HISTORY",
        "GET_PM_POINT_FACTORS",
        "GET_INCENTIVE_FACTORS",
        "GET_ACHIEVED_INCENTIVE",
        "GET_INCENTIVE_HELD_AMOUNT",
        "INCENTIVE_CRITERIA",
    ],
    endpoints: () => ({}),
});
