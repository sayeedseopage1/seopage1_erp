import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const FunctionalityDevelopment = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [functionalityDevelopmentData, setFunctionalityDevelopmentData] =
        useState({
            id: `${sectionId}`,
            pageId: `${pageNumber}`,
            pageUrl: `${pageUrl}`,
            categoryId: `${category.id}`,
            categoryName: `${category.name}`,
            functionalityName: "",
            totalFixedPercentage: "",
            comment: "",
        });

    useEffect(() => {
        setFunctionalityDevelopmentData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === functionalityDevelopmentData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = functionalityDevelopmentData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, functionalityDevelopmentData];
            }
        });
    }, [functionalityDevelopmentData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setFunctionalityDevelopmentData({
            ...functionalityDevelopmentData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === functionalityDevelopmentData.pageId &&
                errorField.categoryId ===
                    functionalityDevelopmentData.categoryId &&
                errorField.sectionId === functionalityDevelopmentData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, functionalityDevelopmentData]);

    // console.log("functionalityDevelopmentData", functionalityDevelopmentData);

    return (
        <div>
            <p style={{ fontWeight: "bold" }}>Functionality development</p>
            <div>
                <div>What is the functionality about?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "functionalityName")
                    }
                />
                <ErrorDisplay errors={errors} errorName="functionalityName" />
            </div>
            <div>
                <div>How much of it was fixed today? (In percentage)</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "totalFixedPercentage")
                    }
                />
                <ErrorDisplay
                    errors={errors}
                    errorName="totalFixedPercentage"
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

export default FunctionalityDevelopment;
