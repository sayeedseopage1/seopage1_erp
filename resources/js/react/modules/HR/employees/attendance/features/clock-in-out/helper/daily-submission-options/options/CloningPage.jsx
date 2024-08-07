import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const CloningPage = ({
    errorFields,
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
        setCloningPageData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);
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
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === cloningPageData.pageId &&
                errorField.categoryId === cloningPageData.categoryId &&
                errorField.sectionId === cloningPageData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields]);
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
                <ErrorDisplay errors={errors} errorName="totalClonedPages" />
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
                <ErrorDisplay errors={errors} errorName="isContentChanged" />
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
                <ErrorDisplay errors={errors} errorName="screenshotUrl" />
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

export default CloningPage;
