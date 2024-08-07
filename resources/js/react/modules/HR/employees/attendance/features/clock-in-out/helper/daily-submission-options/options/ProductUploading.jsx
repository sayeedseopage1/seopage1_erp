import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const ProductUploading = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [productUpload, setProductUpload] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        totalProducts: "",
        screenshotUrl: "",
        comment: "",
    });

    useEffect(() => {
        setProductUpload((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === productUpload.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = productUpload;
                return updatedData;
            } else {
                // Add new section
                return [...prev, productUpload];
            }
        });
    }, [productUpload]);

    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);

    const handleDataChange = (value, dataName) => {
        setProductUpload({
            ...productUpload,
            [dataName]: value,
        });
    };

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === productUpload.pageId &&
                errorField.categoryId === productUpload.categoryId &&
                errorField.sectionId === productUpload.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields, productUpload]);

    // console.log("productUpload", productUpload);
    return (
        <div>
            <div>
                <div>How many products did you upload today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "totalProducts")
                    }
                />
                <ErrorDisplay errors={errors} errorName="totalProducts" />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all products page from the
                    dashboard (Where all the todays uploaded products can be
                    seen)
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

export default ProductUploading;
