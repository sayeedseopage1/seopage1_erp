import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const BugFixing = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [bugFixingData, setBugFixingData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        bugName: "",
        bugFixedPercentage: "",
        comment: "",
    });

    useEffect(() => {
        setBugFixingData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === bugFixingData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = bugFixingData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, bugFixingData];
            }
        });
    }, [bugFixingData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setBugFixingData({
            ...bugFixingData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === bugFixingData.pageId &&
                errorField.categoryId === bugFixingData.categoryId &&
                errorField.sectionId === bugFixingData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields]);
    return (
        <div>
            <div>
                <div>
                    What was the bug about? (You can copy paste from the task
                    details)
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "bugName")
                    }
                />
                <ErrorDisplay errors={errors} errorName="bugName" />
            </div>
            <div>
                <div>How much of it was fixed today? (In percentage)</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "bugFixedPercentage")
                    }
                />
                <ErrorDisplay errors={errors} errorName="bugFixedPercentage" />
            </div>
            <div>
                <div>Comments</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "comment")
                    }
                />
                <ErrorDisplay errors={errors} errorName="comment" />
            </div>
        </div>
    );
};

export default BugFixing;
