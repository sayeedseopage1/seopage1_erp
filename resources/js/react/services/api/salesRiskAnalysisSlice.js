import { method } from "lodash";
import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const salesRiskAnalysisApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getSalesRiskAnalysisRules: build.query({
            query: (query) => `/account/sales-risk-policies/rule-list`,
            providesTags: ["GET_SALES_RISK_ANALYSIS_RULES"],
        }),
        getSalesRiskAnalysisInputs: build.query({
            query: (query) => `/account/sales-risk-policies/input-fields`,
        }),
        addSalesRiskAnalysisRule: build.mutation({
            query: (body) => ({
                url: `/account/sales-risk-policies/save`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_SALES_RISK_ANALYSIS_RULES"],
        }),
        questionInputFields: build.query({
            query: (query) => `/account/sales-risk-policies/question-fields`,

        }),
        editSalesRiskAnalysisPoints: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/edit/${body.id}`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_SALES_RISK_ANALYSIS_RULES"],
        }),
        singleRuleStatusUpdate: build.mutation({
            query: (rule) => ({
                url: `account/sales-risk-policies/status-change/${rule.id}/${rule.status}`,
                method: "PUT",
                headers: {
                    "X-CSRF-TOKEN": _token,
                    "origin": "http://localhost:8000"
                },
            }),
            invalidatesTags: ["GET_SALES_RISK_ANALYSIS_RULES"],
        })

    })
});

export const {
    useGetSalesRiskAnalysisRulesQuery,
    useGetSalesRiskAnalysisInputsQuery,
    useAddSalesRiskAnalysisRuleMutation,
    useQuestionInputFieldsQuery,
    useEditSalesRiskAnalysisPointsMutation,
    useSingleRuleStatusUpdateMutation
} = salesRiskAnalysisApiSlice;