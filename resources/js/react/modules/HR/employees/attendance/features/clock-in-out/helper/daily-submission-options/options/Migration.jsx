import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
const Migration = ({
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

export default Migration;
