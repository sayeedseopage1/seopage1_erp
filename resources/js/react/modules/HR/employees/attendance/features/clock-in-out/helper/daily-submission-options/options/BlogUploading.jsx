import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";

const BlogUploading = ({
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

export default BlogUploading;
