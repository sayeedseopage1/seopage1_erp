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
import ErrorDisplay from "./components/ErrorDisplay";
import { toast } from "react-toastify";

const SubmissionForSinglePage = ({
    errorFields,
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
                        errorFields={errorFields}
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
        // Default category with ID 1
        const defaultCategory = categories.find(
            (category) => category.id === 1
        );

        setSections((prevSections) => [
            ...prevSections,
            { id: prevSections.length },
        ]);

        // Set default category for the new section
        setSelectedCategories((prevCategories) => [
            ...prevCategories,
            defaultCategory || {}, // Add default category if found
        ]);
    };

    const handleAddCategory = () => {
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
        toast.success("Section Removed");
    };

    console.log("page url", pageUrl);
    console.log("single page data", singlePageData);
    const [error, setError] = useState([]);
    useEffect(() => {
        const filteredErrorFields = errorFields.filter(
            (field) =>
                field.pageId === currentPage && field.errorName === "pageUrl"
        );
        // Set only the first item if it exists
        if (filteredErrorFields.length > 0) {
            setError([filteredErrorFields[0]]);
        } else {
            setError([]);
        }
    }, [errorFields, currentPage]);
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
            <ErrorDisplay errors={error} errorName="pageUrl" />

            <strong>What did you do on this page</strong>

            {sections.map((section, index) => (
                <div key={section.id}>
                    {/* Remove the dropdown for section building option where section id more than 0 */}
                    {selectedCategories &&
                    selectedCategories[index]?.id == 1 &&
                    index > 0 ? (
                        ""
                    ) : (
                        <SubmissionDropDown
                            categories={categories}
                            setCategories={setCategories}
                            selectedCategory={selectedCategories[index]}
                            onCategoryChange={(category) =>
                                handleCategoryChange(index, category)
                            }
                        />
                    )}

                    {selectedCategories[index] !== undefined && (
                        <SectionContainer>
                            <SectionTitle>
                                {selectedCategories[index]?.id == 1 ? (
                                    <div>
                                        <span>Section {index + 1}: </span>{" "}
                                        <span>
                                            {selectedCategories[index]?.name}
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>
                                            {selectedCategories[index]?.name}
                                        </span>
                                    </div>
                                )}
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
                                          <span>
                                              Remove Section {index + 1}
                                          </span>
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
                <Button size="md" onClick={handleAddCategory}>
                    Add New
                </Button>
            </div>
        </div>
    );
};

export default SubmissionForSinglePage;
