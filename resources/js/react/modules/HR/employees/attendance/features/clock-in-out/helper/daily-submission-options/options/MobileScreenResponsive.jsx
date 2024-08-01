import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const MobileScreenResponsive = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [responsiveData, setResponsiveData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        name: "",
        screenshotUrl: "",
        comment: "",
    });

    useEffect(() => {
        setResponsiveData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === responsiveData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = responsiveData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, responsiveData];
            }
        });
    }, [responsiveData]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setResponsiveData({
            ...responsiveData,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === responsiveData.pageId &&
                errorField.categoryId === responsiveData.categoryId &&
                errorField.sectionId === responsiveData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, responsiveData]);

    // console.log("responsiveData", responsiveData);

    return (
        <div>
            <div>
                <div>Name</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) => handleDataChange(e.target.value, "name")}
                />
                <ErrorDisplay errors={errors} errorName="name" />
            </div>
            <div>
                <div>
                    Enter screenshot/screen record for section 1 on mobile
                    device
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

export default MobileScreenResponsive;
