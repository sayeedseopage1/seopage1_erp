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
    numberOfPages,
    pageNumber,
    dailySubPagesData,
    setDailySubPagesData,
    handleDailySubPagesData,
}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories(dailySubmissionStaticData?.categories);
    }, []);
    const [sections, setSections] = useState([{ id: 0 }]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageUrl, setPageUrl] = useState("");
    const [singlePageData, setSinglePageData] = useState([]);

    useEffect(() => {
        setCurrentPage(pageNumber);
    }, []);

    useEffect(() => {
        if (!singlePageData) return;

        setDailySubPagesData((prev) => {
            const updatedPageData = [...(prev.pageData || [])];
            updatedPageData[currentPage - 1] = singlePageData;

            return {
                ...prev,
                totalPage: pageNumber,
                pageData: updatedPageData,
            };
        });
    }, [singlePageData, currentPage]);

    useEffect(() => {
        setDailySubPagesData({});
    }, [numberOfPages]);

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
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 2:
                return (
                    <MobileScreenResponsive
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 3:
                return (
                    <Revision
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 4:
                return (
                    <BugFixing
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 5:
                return (
                    <FunctionalityDevelopment
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 6:
                return (
                    <SpeedOptimization
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 7:
                return (
                    <DomainHostingConnection
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 8:
                return (
                    <Migration
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 9:
                return (
                    <ProductUploading
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 10:
                return (
                    <BlogUploading
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 11:
                return (
                    <CloningPage
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            case 12:
                return (
                    <Others
                        pageUrl={pageUrl}
                        sectionId={index}
                        pageNumber={pageNumber}
                        category={category}
                        setSinglePageData={setSinglePageData}
                    />
                );
            default:
                return null;
        }
    };

    const handleAddSection = () => {
        setSections((prevSections) => [
            ...prevSections,
            { id: prevSections.length },
        ]);
    };

    const handleRemoveSection = (id) => {
        setSections((prevSections) =>
            prevSections.filter((section) => section.id !== id)
        );
        setSelectedCategories((prevCategories) =>
            prevCategories.filter((_, index) => index !== id)
        );
        setSinglePageData((prevData) =>
            prevData.filter((data) => data.id !== `${id}`)
        );
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

            {sections.map((section, index) => (
                <div key={section.id}>
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
                    {selectedCategories[index]?.id == 1
                        ? index === sections.length - 1 && (
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
                                              handleRemoveSection(section.id)
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
                                          onClick={handleAddSection}
                                      >
                                          <span>
                                              <CiCirclePlus size={25} />
                                          </span>{" "}
                                          <span>Add New section</span>
                                      </div>
                                  </div>
                              </div>
                          )
                        : sections.length > 1 &&
                          index === sections.length - 1 && (
                              <div
                                  style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      width: "60%",
                                      fontSize: "18px",
                                      cursor: "pointer",
                                      margin: "0px 10px",
                                  }}
                              >
                                  <Button
                                      size="sm"
                                      variant="danger"
                                      onClick={() =>
                                          handleRemoveSection(section.id)
                                      }
                                  >
                                      Remove
                                  </Button>
                              </div>
                          )}
                </div>
            ))}
            <div style={{ marginTop: "10px" }}>
                <Button size="md" onClick={handleAddSection}>
                    Add New
                </Button>
            </div>
        </div>
    );
};

export default SubmissionForSinglePage;
