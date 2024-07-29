import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
const Others = ({
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [othersData, setOthersData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        workDone: "",
        screenshotUrl: "",
        comment: "",
    });

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex((item) => item.id === othersData.id);
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = othersData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, othersData];
            }
        });
    }, [othersData]);
    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);
    const handleDataChange = (value, dataName) => {
        setOthersData({
            ...othersData,
            [dataName]: value,
        });
    };

    // console.log("othersData", othersData);
    return (
        <div>
            <div>
                <div>What did you do exactly?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "workDone")
                    }
                />
            </div>
            <div>
                <div>Screenshot/screen record of what you did</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "screenshotUrl")
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

export default Others;
