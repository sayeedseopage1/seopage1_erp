import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const Migration = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [migrationData, setMigrationData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        websiteSize: "",
        migrationReason: "",
        comment: "",
    });

    useEffect(() => {
        setMigrationData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === migrationData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = migrationData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, migrationData];
            }
        });
    }, [migrationData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setMigrationData({
            ...migrationData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === migrationData.pageId &&
                errorField.categoryId === migrationData.categoryId &&
                errorField.sectionId === migrationData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, migrationData]);

    // console.log("migrationData", migrationData);

    return (
        <div>
            <div>
                <div>Size of the website that was migrated</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "websiteSize")
                    }
                />
                <ErrorDisplay errors={errors} errorName="websiteSize" />
            </div>
            <div>
                <div>
                    Reason of the migration (We used our staging site earlier,
                    Others)
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "migrationReason")
                    }
                />
                <ErrorDisplay errors={errors} errorName="migrationReason" />
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

export default Migration;
