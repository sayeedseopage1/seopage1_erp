import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";

const CloningPage = ({
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [cloningPageData, setCloningPageData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        totalClonedPages: "",
        isContentChanged: "",
        screenshotUrl: "",
        comment: "",
    });

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === cloningPageData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = cloningPageData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, cloningPageData];
            }
        });
    }, [cloningPageData]);
    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);
    const handleDataChange = (value, dataName) => {
        setCloningPageData({
            ...cloningPageData,
            [dataName]: value,
        });
    };

    // console.log("cloningPageData", cloningPageData);
    return (
        <div>
            <div>
                <div>
                    How many pages did you create today by cloning a main page
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "totalClonedPages")
                    }
                />
            </div>
            <div>
                <div>Did you change content & Images on those cloned pages</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "isContentChanged")
                    }
                />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all the pages from the
                    dashboard (Where all the todays uploaded pages can be seen)
                </div>
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

export default CloningPage;
