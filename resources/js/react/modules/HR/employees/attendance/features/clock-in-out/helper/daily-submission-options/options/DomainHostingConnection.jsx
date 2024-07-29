import { InputItem } from "../../../DailySubmissionUI";
import React, { useEffect, useState } from "react";
const DomainHostingConnection = ({
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [domainHostingData, setDomainHostingData] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,

        comment: "",
    });

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === domainHostingData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = domainHostingData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, domainHostingData];
            }
        });
    }, [domainHostingData]);
    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);
    const handleDataChange = (value, dataName) => {
        setDomainHostingData({
            ...domainHostingData,
            [dataName]: value,
        });
    };

    // console.log("domainHostingData", domainHostingData);
    return (
        <div>
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

export default DomainHostingConnection;
