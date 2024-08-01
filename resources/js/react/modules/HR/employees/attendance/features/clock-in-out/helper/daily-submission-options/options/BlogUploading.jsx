import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
import ErrorDisplay from "../components/ErrorDisplay";

const BlogUploading = ({
    errorFields,
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [blogUploadData, setBlogUploadData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        totalBlogPosts: "",
        screenshotUrl: "",
        comment: "",
    });

    useEffect(() => {
        setBlogUploadData((prev) => ({
            ...prev,
            pageUrl: `${pageUrl}`,
        }));
    }, [pageUrl]);

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === blogUploadData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = blogUploadData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, blogUploadData];
            }
        });
    }, [blogUploadData]);
    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);
    const handleDataChange = (value, dataName) => {
        setBlogUploadData({
            ...blogUploadData,
            [dataName]: value,
        });
    };
    // console.log("section building data", sectionBuildingData);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (errorField) =>
                errorField.pageId === blogUploadData.pageId &&
                errorField.categoryId === blogUploadData.categoryId &&
                errorField.sectionId === blogUploadData.id
        );
        setErrors(filteredErrorFields);
    }, [errorFields]);
    // console.log("blogUploadData", blogUploadData);
    return (
        <div>
            <div>
                <div>How many blog posts did you upload today</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "totalBlogPosts")
                    }
                />
                <ErrorDisplay errors={errors} errorName="totalBlogPosts" />
            </div>
            <div>
                <div>
                    Screenshot/screen-record of the all the blog posts in the
                    dashboards (Where all the todays uploaded blogs can be seen)
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

export default BlogUploading;
