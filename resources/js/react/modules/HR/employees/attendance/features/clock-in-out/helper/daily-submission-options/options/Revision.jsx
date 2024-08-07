import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const Revision = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [revisionData, setRevisionData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        assignedRevisions: "",
        completedRevisions: "",
        completedPercentage: "",
        comment: "",
    });

    useEffect(() => {
        setRevisionData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex((item) => item.id === revisionData.id);
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = revisionData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, revisionData];
            }
        });
    }, [revisionData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setRevisionData({
            ...revisionData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === revisionData.pageId &&
                errorField.categoryId === revisionData.categoryId &&
                errorField.sectionId === revisionData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, revisionData]);

    // console.log("revisionData", revisionData);
    return (
        <div>
            <div>
                <div>Share the list of revisions assigned to you</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "assignedRevisions")
                    }
                />
                <ErrorDisplay errors={errors} errorName="assignedRevisions" />
            </div>
            <div>
                <div>Which ones of them did you complete today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "completedRevisions")
                    }
                />
                <ErrorDisplay errors={errors} errorName="completedRevisions" />
            </div>
            <div>
                <div>
                    Quantity Wise, what's the percentage of revisions you
                    completed today
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "completedPercentage")
                    }
                />
                <ErrorDisplay errors={errors} errorName="completedPercentage" />
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

export default Revision;
