import React, { useEffect, useState } from "react";
import {
    InputItem,
    SectionContainer,
    SectionTitle,
} from "../../DailySubmissionUI";

import SectionBuilding from "./options/SectionBuilding";
import SubmissionDropDown from "./SubmissionDropDown";
import MobileScreenResponsive from "./options/MobileScreenResponsive";
import Revision from "./options/Revision";
import BugFixing from "./options/BugFixing";
import FunctionalityDevelopment from "./options/FunctionalityDevelopment";
import SpeedOptimization from "./options/SpeedOptimization";
import DomainHostingConnection from "./options/DomainHostingConnection";
import Migration from "./options/Migration";
import ProductUploading from "./options/ProductUploading";
import BlogUploading from "./options/BlogUploading";
import CloningPage from "./options/CloningPage";
import Others from "./options/Others";
import { dailySubmissionStaticData } from "../../../../../../../../utils/daily-submission-categories";
import Button from "../../../../../../../../global/Button";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
const SubmissionForSinglePage = ({
    pageNumber,
    dailySubPagesData,
    setDailySubPagesData,
    handleDailySubPagesData,
}) => {
    const [numberOfSections, setNumberOfSections] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [pageUrl, setPageUrl] = useState("");
    const [singlePageData, setSinglePageData] = useState([]);

    const SectionNumberArray = Array.from(
        { length: numberOfSections },
        (_, index) => index
    );

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(dailySubmissionStaticData?.categories);
    }, []);

    const handleCategoryChange = (sectionIndex, category) => {
        setSelectedCategories((prev) => {
            const newCategories = [...prev];
            newCategories[sectionIndex] = category;
            return newCategories;
        });
    };

    const getComponentForCategory = (index, category, pageNumber) => {
        switch (category?.id) {
            case 1:
                return (
                    <SectionBuilding
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 2:
                return <MobileScreenResponsive />;
            case 3:
                return <Revision />;
            case 4:
                return <BugFixing />;
            case 5:
                return <FunctionalityDevelopment />;
            case 6:
                return <SpeedOptimization />;
            case 7:
                return <DomainHostingConnection />;
            case 8:
                return <Migration />;
            case 9:
                return <ProductUploading />;
            case 10:
                return <BlogUploading />;
            case 11:
                return <CloningPage />;
            case 12:
                return <Others />;
            default:
                return null;
        }
    };

    console.log("page url", pageUrl);
    console.log("single page data", singlePageData);
    return (
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
            <div style={{ color: "#979797" }}>
                Enter the page URL for Page # {""}
                {pageNumber}
            </div>
            <InputItem
                width="65%"
                placeHolder=""
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
            />

            <strong>What did you do on this page</strong>

            {SectionNumberArray.map((index) => (
                <div style={{ marginBottom: "10px" }} key={index}>
                    <SubmissionDropDown
                        categories={categories}
                        setCategories={setCategories}
                        selectedCategory={selectedCategories[index]}
                        onCategoryChange={(category) =>
                            handleCategoryChange(index, category)
                        }
                    />
                    {selectedCategories[index] !== undefined && (
                        <SectionContainer>
                            <SectionTitle>
                                Section {index + 1}:{" "}
                                {selectedCategories[index]?.name}
                            </SectionTitle>
                            {getComponentForCategory(
                                index,
                                selectedCategories[index],
                                pageNumber
                            )}
                        </SectionContainer>
                    )}
                </div>
            ))}

            {SectionNumberArray?.length > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "60%",
                        fontSize: "18px",
                        cursor: "pointer",
                        margin: "0px 20px",
                    }}
                >
                    <div>
                        <div
                            style={{ color: "red" }}
                            onClick={() =>
                                setNumberOfSections((prev) => prev - 1)
                            }
                        >
                            <span>
                                <CiCircleMinus size={25} />
                            </span>{" "}
                            <span>Remove the section</span>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ color: "Blue" }}
                            onClick={() =>
                                setNumberOfSections((prev) => prev + 1)
                            }
                        >
                            <span>
                                <CiCirclePlus size={25} />
                            </span>{" "}
                            <span>Add New section</span>
                        </div>
                    </div>
                </div>
            )}

            {SectionNumberArray.length < 2 && (
                <div>
                    <Button
                        size="md"
                        onClick={() => setNumberOfSections((prev) => prev + 1)}
                    >
                        Add New
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SubmissionForSinglePage;
