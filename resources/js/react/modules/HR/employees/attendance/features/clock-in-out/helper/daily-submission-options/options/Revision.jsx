import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";

const Revision = ({
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

export default Revision;
