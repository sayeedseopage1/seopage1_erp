import React, { useEffect, useState } from "react";
import { InputItem } from "../../../DailySubmissionUI";
const SpeedOptimization = ({
    pageUrl,
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [speedOptimizationdata, setSpeedOptimizationdata] = useState({
        id: `${sectionId}`,
        pageId: `${pageNumber}`,
        pageUrl: `${pageUrl}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        speedBeforeStarted: "",
        screenshotUrlBeforeStarted: "",
        speedAfterFinished: "",
        screenshotUrlAfterFinished: "",
        comment: "",
    });

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === speedOptimizationdata.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = speedOptimizationdata;
                return updatedData;
            } else {
                // Add new section
                return [...prev, speedOptimizationdata];
            }
        });
    }, [speedOptimizationdata]);
    useEffect(() => {
        return () => {
            setSinglePageData((prev) =>
                prev.filter((data) => data.id !== `${sectionId}`)
            );
        };
    }, [sectionId, setSinglePageData]);
    const handleDataChange = (value, dataName) => {
        setSpeedOptimizationdata({
            ...speedOptimizationdata,
            [dataName]: value,
        });
    };

    // console.log("speedOptimizationdata", speedOptimizationdata);
    return (
        <div>
            <div>
                <div>What was the speed before you started today?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "speedBeforeStarted")
                    }
                />
            </div>
            <div>
                <div>
                    Share screenshot of the the speed before you started today
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(
                            e.target.value,
                            "screenshotUrlBeforeStarted"
                        )
                    }
                />
            </div>
            <div>
                <div>What is the speed after you finished working today?</div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "speedAfterFinished")
                    }
                />
            </div>
            <div>
                <div>
                    Share screenshot of the speed after you finished working
                    today.
                </div>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(
                            e.target.value,
                            "screenshotUrlAfterFinished"
                        )
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

export default SpeedOptimization;
