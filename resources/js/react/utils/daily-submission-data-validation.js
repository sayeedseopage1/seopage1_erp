import { checkIsURL } from "./check-is-url";

export const validateDailySubPagesData = (
    dailySubPagesData,
    isFrontendPassword,
    setErrorFields,
    errorFields
) => {
    const errors = [];

    const { pageData, frontendPasswordValue } = dailySubPagesData;

    if (
        isFrontendPassword === "yes" &&
        (frontendPasswordValue === undefined ||
            frontendPasswordValue.trim() === "")
    ) {
        errors.push({
            errorName: "frontendPasswordValue",
            errorMessage: "frontend password cannot be empty.",
        });
    }

    pageData.forEach((page, pageIndex) => {
        if (page.length === 0) {
            errors.push(`Please select a category for Page-${pageIndex + 1}.`);
        }
        if (page) {
            page.forEach((section, sectionIndex) => {
                const pageUrl = section.pageUrl;
                if (
                    pageUrl === undefined ||
                    pageUrl === "" ||
                    !checkIsURL(pageUrl)
                ) {
                    errors.push({
                        pageId: section.pageId,
                        categoryId: section.categoryId,
                        sectionId: section.id,
                        errorName: "pageUrl",
                        errorMessage: "Page URL is invalid.",
                    });
                }

                if (section.categoryId == 1) {
                    const webUrl = section.webVersionUrl;
                    const mobileUrl = section.mobileVersionUrl;
                    const tabUrl = section.tabVersionUrl;
                    const webFile = section.webVersionFile || [];
                    const mobileFile = section.mobileVersionFile || [];
                    const tabFile = section.tabVersionFile || [];
                    const comment = section.comment;
                    const sectionName = section.sectionName;

                    if (
                        (webUrl === undefined ||
                            webUrl === "" ||
                            !checkIsURL(webUrl)) &&
                        webFile.length === 0
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "webVersionUrl",
                            errorMessage:
                                "Web Version URL/file is invalid in error field.",
                        });
                        console.log("error in form", errors);
                    }
                    if (
                        (mobileUrl === undefined ||
                            mobileUrl === "" ||
                            !checkIsURL(mobileUrl)) &&
                        mobileFile.length === 0
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "mobileVersionUrl",
                            errorMessage:
                                "Mobile Version URL/file is invalid in error field.",
                        });
                    }
                    if (
                        (tabUrl === undefined ||
                            tabUrl === "" ||
                            !checkIsURL(tabUrl)) &&
                        tabFile.length === 0
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "tabVersionUrl",
                            errorMessage:
                                "Tab Version URL/file is invalid in error field.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                    if (sectionName === undefined || sectionName === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "sectionName",
                            errorMessage: "Section Name is required.",
                        });
                    }
                } else if (section.categoryId == 2) {
                    const name = section.name;
                    const screenshotUrl = section.screenshotUrl;
                    const comment = section.comment;

                    if (name === undefined || name === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "name",
                            errorMessage: "Name is required.",
                        });
                    }
                    if (
                        screenshotUrl === undefined ||
                        screenshotUrl === "" ||
                        !checkIsURL(screenshotUrl)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrl",
                            errorMessage: "Screenshot URL is invalid.",
                        });
                    }

                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 3) {
                    const assignedRevisions = section.assignedRevisions;
                    const completedRevisions = section.completedRevisions;
                    const completedPercentage = section.completedPercentage;
                    const comment = section.comment;

                    if (
                        assignedRevisions === undefined ||
                        assignedRevisions === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "assignedRevisions",
                            errorMessage: "Assigned Revisions is required.",
                        });
                    }
                    if (
                        completedRevisions === undefined ||
                        completedRevisions === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "completedRevisions",
                            errorMessage: "Completed Revisions is required.",
                        });
                    }
                    if (
                        completedPercentage === undefined ||
                        completedPercentage === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "completedPercentage",
                            errorMessage: "Completed Percentage is required.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 4) {
                    const bugName = section.bugName;
                    const bugFixedPercentage = section.bugFixedPercentage;
                    const comment = section.comment;
                    if (bugName === undefined || bugName === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "bugName",
                            errorMessage: "Bug Name is required.",
                        });
                    }
                    if (
                        bugFixedPercentage === undefined ||
                        bugFixedPercentage === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "bugFixedPercentage",
                            errorMessage: "Bug Fixed Percentage is required.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 5) {
                    const functionalityName = section.functionalityName;
                    const totalFixedPercentage = section.totalFixedPercentage;
                    const comment = section.comment;
                    if (
                        functionalityName === undefined ||
                        functionalityName === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "functionalityName",
                            errorMessage: "Functionality Name is required.",
                        });
                    }
                    if (
                        totalFixedPercentage === undefined ||
                        totalFixedPercentage === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "totalFixedPercentage",
                            errorMessage: "Total Fixed Percentage is required.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 6) {
                    const speedBeforeStarted = section.speedBeforeStarted;
                    const screenshotUrlBeforeStarted =
                        section.screenshotUrlBeforeStarted;
                    const speedAfterFinished = section.speedAfterFinished;
                    const screenshotUrlAfterFinished =
                        section.screenshotUrlAfterFinished;
                    const comment = section.comment;
                    if (
                        speedBeforeStarted === undefined ||
                        speedBeforeStarted === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "speedBeforeStarted",
                            errorMessage: "Speed Before Started is required.",
                        });
                    }
                    if (
                        screenshotUrlBeforeStarted === undefined ||
                        screenshotUrlBeforeStarted === "" ||
                        !checkIsURL(screenshotUrlBeforeStarted)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrlBeforeStarted",
                            errorMessage:
                                "Screenshot URL Before Started is invalid.",
                        });
                    }
                    if (
                        speedAfterFinished === undefined ||
                        speedAfterFinished === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "speedAfterFinished",
                            errorMessage: "Speed After Finished is required.",
                        });
                    }
                    if (
                        screenshotUrlAfterFinished === undefined ||
                        screenshotUrlAfterFinished === "" ||
                        !checkIsURL(screenshotUrlAfterFinished)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrlAfterFinished",
                            errorMessage:
                                "Screenshot URL After Finished is invalid.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 7) {
                    const comment = section.comment;
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 8) {
                    const websiteSize = section.websiteSize;
                    const migrationReason = section.migrationReason;
                    const comment = section.comment;
                    if (websiteSize === undefined || websiteSize === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "websiteSize",
                            errorMessage: "Website Size is required.",
                        });
                    }
                    if (
                        migrationReason === undefined ||
                        migrationReason === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "migrationReason",
                            errorMessage: "Migration Reason is required.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 9) {
                    const totalProducts = section.totalProducts;
                    const screenshotUrl = section.screenshotUrl;
                    const comment = section.comment;
                    if (totalProducts === undefined || totalProducts === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "totalProducts",
                            errorMessage: "Total Products is required.",
                        });
                    }
                    if (
                        screenshotUrl === undefined ||
                        screenshotUrl === "" ||
                        !checkIsURL(screenshotUrl)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrl",
                            errorMessage: "Screenshot URL is invalid.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 10) {
                    const totalBlogPosts = section.totalBlogPosts;
                    const screenshotUrl = section.screenshotUrl;
                    const comment = section.comment;
                    if (totalBlogPosts === undefined || totalBlogPosts === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "totalBlogPosts",
                            errorMessage: "Total Blog Posts is required.",
                        });
                    }
                    if (
                        screenshotUrl === undefined ||
                        screenshotUrl === "" ||
                        !checkIsURL(screenshotUrl)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrl",
                            errorMessage: "Screenshot URL is invalid.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 11) {
                    const totalClonedPages = section.totalClonedPages;
                    const screenshotUrl = section.screenshotUrl;
                    const isContentChanged = section.isContentChanged;
                    const comment = section.comment;
                    if (
                        totalClonedPages === undefined ||
                        totalClonedPages === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "totalClonedPages",
                            errorMessage: "Total Cloned Pages is required.",
                        });
                    }

                    if (
                        screenshotUrl === undefined ||
                        screenshotUrl === "" ||
                        !checkIsURL(screenshotUrl)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrl",
                            errorMessage: "Screenshot URL is invalid.",
                        });
                    }
                    if (
                        isContentChanged === undefined ||
                        isContentChanged === ""
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "isContentChanged",
                            errorMessage: "Is Content Changed is required.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                } else if (section.categoryId == 12) {
                    const workDone = section.workDone;
                    const screenshotUrl = section.screenshotUrl;
                    const comment = section.comment;
                    if (workDone === undefined || workDone === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "workDone",
                            errorMessage: "Work Done is required.",
                        });
                    }
                    if (
                        screenshotUrl === undefined ||
                        screenshotUrl === "" ||
                        !checkIsURL(screenshotUrl)
                    ) {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "screenshotUrl",
                            errorMessage: "Screenshot URL is invalid.",
                        });
                    }
                    if (comment === undefined || comment === "") {
                        errors.push({
                            pageId: section.pageId,
                            categoryId: section.categoryId,
                            sectionId: section.id,
                            errorName: "comment",
                            errorMessage: "Comment is required.",
                        });
                    }
                }
            });
        }
    });

    setErrorFields(errors);
    return errors;
};

// 4 :   bugName ,bugFixedPercentage,comment
// 5: functionalityName,totalFixedPercentage,comment
// 6: speedBeforeStarted,screenshotUrlBeforeStarted,speedAfterFinished,screenshotUrlAfterFinished,comment
// 7: comment
// 8: websiteSize,migrationReason,comment
// 9:  totalProducts,screenshotUrl,comment
// 10: totalBlogPosts,screenshotUrl,comment
// 11.totalClonedPages,screenshotUrl,isContentChanged,comment
// 12: workDone,screenshotUrl,comment
