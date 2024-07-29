import { InputItem } from "../../../DailySubmissionUI";
import React, { useEffect, useState } from "react";
const FunctionalityDevelopment = ({
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
            </div>
        </div>
    );
};

export default FunctionalityDevelopment;
