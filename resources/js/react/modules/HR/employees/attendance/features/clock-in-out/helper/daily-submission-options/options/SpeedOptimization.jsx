import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const SpeedOptimization = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [speedOptimizationData, setSpeedOptimizationData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        speedBeforeStarted: "",
        screenshotUrlBeforeStarted: "",
        speedAfterFinished: "",
        screenshotUrlAfterFinished: "",
        comment: "",
    });

    useEffect(() => {
        setSpeedOptimizationData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === speedOptimizationData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = speedOptimizationData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, speedOptimizationData];
            }
        });
    }, [speedOptimizationData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setSpeedOptimizationData({
            ...speedOptimizationData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === speedOptimizationData.pageId &&
                errorField.categoryId === speedOptimizationData.categoryId &&
                errorField.sectionId === speedOptimizationData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, speedOptimizationData]);

    // console.log("speedOptimizationData", speedOptimizationData);
    return (
        <div>
            <div>
                <div>What was the speed before you started today?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "speedBeforeStarted")
                    }
                />
                <ErrorDisplay errors={errors} errorName="speedBeforeStarted" />
            </div>
            <div>
                <div>
                    Share screenshot of the speed before you started today
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(
                            e.target.value,
                            "screenshotUrlBeforeStarted"
                        )
                    }
                />
                <ErrorDisplay
                    errors={errors}
                    errorName="screenshotUrlBeforeStarted"
                />
            </div>
            <div>
                <div>What is the speed after you finished working today?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "speedAfterFinished")
                    }
                />
                <ErrorDisplay errors={errors} errorName="speedAfterFinished" />
            </div>
            <div>
                <div>
                    Share screenshot of the speed after you finished working
                    today.
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(
                            e.target.value,
                            "screenshotUrlAfterFinished"
                        )
                    }
                />
                <ErrorDisplay
                    errors={errors}
                    errorName="screenshotUrlAfterFinished"
                />
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

export default SpeedOptimization;
