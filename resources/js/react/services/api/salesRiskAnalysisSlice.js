
import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const salesRiskAnalysisApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getSalesRiskAnalysisRules: build.query({
            query: (query) => `/account/sales-risk-policies/rule-list?${query}`,
            providesTags: ["GET_SALES_RISK_ANALYSIS_RULES"],
        }),
        getSinglePolicySalesRiskAnalysis: build.query({
            query: (policyId) => `/account/sales-risk-policies/rule-list?policy_id=${policyId}`,
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
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }
            }
        }),
        questionInputFields: build.query({
            query: (query) => `/account/sales-risk-policies/question-fields`,

        }),
        editSalesRiskAnalysisPoints: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/edit-single/${body.id}`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }
            }
        }),
        editSinglePolicySalesRiskAnalysis: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/edit/${body.id}`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }


            },
        }),
        editSingleRuleSalesRiskAnalysis: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/edit-single/${body.id}`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }

            },
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
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }
            },
        }),
        singlePolicyQuestions: build.query({
            query: (policyId) => `/account/sales-risk-policies/question-fields/${policyId}`,
        }),
        policyQuestionsListByPolicyId: build.query({
            query: (policyId) => `account/sales-risk-policies/question-list?policy_id=${policyId}`,
        }),
        policyQuestionsList: build.query({
            query: () => `account/sales-risk-policies/question-list`,
        }),
        questionAddonPolicy: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/question-fields/save`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }
            },
        }),
        editQuestionSalesRiskAnalysis: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/question-fields/edit/${body.id}`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (result && !error) {
                    return [{ type: "GET_SALES_RISK_ANALYSIS_RULES" }];
                }
            },
        }),
        saleRiskQuestionAnswerSave: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/question-value/save`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
        }),
        saleRiskQuestionsListFiledType: build.query({
            query: () => `account/sales-risk-policies/question/fields-type`,
            providesTags: ["GET_SALES_RISK_ANALYSIS_QUESTION_FIELDS_TYPE"],
        }),
        saleAnalysisQuestionSave: build.mutation({
            query: (body) => ({
                url: `account/sales-risk-policies/question/save`,
                method: "POST",
                body,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                const tags = ["GET_SALES_RISK_ANALYSIS_QUESTION_LIST", "GET_SALES_RISK_ANALYSIS_QUESTION_FIELDS_TYPE"];
                if (result && !error) {
                    return tags.map((tag) => ({ type: tag }));
                }
            },
        }),
        saleAnalysisQuestionsList: build.query({
            query: (query) => `account/sales-risk-policies/question/list?${query}`,
            providesTags: ["GET_SALES_RISK_ANALYSIS_QUESTION_LIST"],
        }),
        saleAnalysisQuestionByPolicyId: build.query({
            query: (policy_id) => `account/sales-risk-policies/question/list?policy_id=${policy_id}`,
        }),
        saleRiskQuestionDealReport: build.query({
            query: (deal_id) => `account/sales-risk-policies/deals/report/${deal_id}`,
        }),
    })
});

export const {
    useGetSalesRiskAnalysisRulesQuery,
    useGetSalesRiskAnalysisInputsQuery,
    useAddSalesRiskAnalysisRuleMutation,
    useQuestionInputFieldsQuery,
    useSingleRuleStatusUpdateMutation,
    useEditSinglePolicySalesRiskAnalysisMutation,
    useEditSingleRuleSalesRiskAnalysisMutation,
    useSinglePolicyQuestionsQuery,
    useQuestionAddonPolicyMutation,
    useGetSinglePolicySalesRiskAnalysisQuery,
    usePolicyQuestionsListByPolicyIdQuery,
    usePolicyQuestionsListQuery,
    useEditQuestionSalesRiskAnalysisMutation,
    useSaleRiskQuestionAnswerSaveMutation,
    useSaleRiskQuestionsListFiledTypeQuery,
    useSaleAnalysisQuestionSaveMutation,
    useSaleAnalysisQuestionsListQuery,
    useSaleRiskQuestionDealReportQuery,
    useSaleAnalysisQuestionByPolicyIdQuery
} = salesRiskAnalysisApiSlice;